const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/Product");
const env = require("../config/env");

/* ================= CACHE ================= */
// Simple in-memory cache (key = user message)
const responseCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 mins

/* ===================== GEMINI INIT ===================== */
const genAI = new GoogleGenerativeAI(env.GOOGLE_GEMINI_API || "dummy_key");
const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

/* ===================== SYSTEM PROMPT ===================== */
const SYSTEM_PROMPT = `
You are Winkie, the official AI shopping assistant for WinkWear.

About WinkWear:
- Premium fashion & lifestyle brand
- 30-day return and refund policy
- Support: support@winkwear.com

Behavior Rules:
- Professional, friendly, and confident tone
- Clear, concise replies (max 4–5 lines)
- Never invent products, prices, or policies
- Use only provided product information
- Do not mention internal systems or reasoning
- Speak as a brand representative, not a chatbot

Greeting Rule:
If the user says “hi”, “hello”, or seems unsure, reply exactly with:

"Hello! I’m Winkie, your personal shopping assistant at WinkWear 👋  
I can help you explore collections, find items by budget, understand our return policy, or connect you with support.  
Tell me what you’re looking for, and I’ll take care of the rest."

Product Format:
• Product Name  
  Price: ₹XXXX  
  Category: Men / Women / Kids`;

/* ================= FAST PATH (NO GEMINI) ================= */
const fastPathReply = (message) => {
  const msg = message.toLowerCase().trim();

  if (["hi", "hello", "hey"].includes(msg)) {
    return `
    Hey 👋 I’m Winkie from WinkWear.
    Tell me what you’re looking for, and I’ll help you find it.
    `;
  }

  if (msg.includes("return") || msg.includes("refund")) {
    return "WinkWear offers a 30-day return and refund policy on all products.";
  }

  if (msg.includes("about")) {
    return "WinkWear is a premium fashion brand focused on modern, stylish clothing.";
  }

  if (msg.includes("contact") || msg.includes("support")) {
    return "You can reach us anytime at support@winkwear.com";
  }

  return null;
};

const getCacheKey = (message) => message.toLowerCase().trim();

const detectFilters = (message) => {
  const filters = {};
  const priceMatch = message.match(/(\d+)/);

  if (/women/i.test(message)) filters.category = "women";
  if (/men/i.test(message)) filters.category = "men";
  if (/kids/i.test(message)) filters.category = "kids";
  if (priceMatch) filters.new_price = { $lte: Number(priceMatch[1]) };

  return filters;
};

const formatProducts = (products) => {
  if (!products.length) return "No matching products found.";
  return products
    .map((p) => `• ${p.name}\n  Price: ₹${p.new_price}\n  Category: ${p.category}`)
    .join("\n\n");
};

const streamGeminiResponse = async (prompt, onChunk) => {
  const stream = await model.generateContentStream(prompt);
  let fullText = "";

  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) {
      fullText += text;
      if (onChunk) onChunk(text);
    }
  }

  return fullText;
};

const chatbotService = async (userMessage, onChunk = null) => {
  const fastReply = fastPathReply(userMessage);
  if (fastReply) return fastReply;
  
  const cacheKey = getCacheKey(userMessage);
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }
  
  let productContext = "";

  const filters = detectFilters(userMessage);

  if (Object.keys(filters).length) {
    const products = await Product.find(filters).limit(5);
    productContext = `
    Available products:
    ${formatProducts(products)}
    `;
  }

  const finalPrompt = `
${SYSTEM_PROMPT}

User message:
"${userMessage}"

${productContext}

Respond as Winkie.
`;

  try {
    const finalResponse = await streamGeminiResponse(finalPrompt, onChunk);

    responseCache.set(cacheKey, finalResponse);
    setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);

    return finalResponse;
  } catch (error) {
    return `
⚠️ I’m a bit busy right now.

You can still:
1️⃣ Browse products by category  
2️⃣ Find products under a price  
3️⃣ View return & refund policy  
4️⃣ Contact support  

Please try again in a moment 🙂`;
  }
};

module.exports = chatbotService;
