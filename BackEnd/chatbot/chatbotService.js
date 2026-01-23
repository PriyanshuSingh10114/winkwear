require("dotenv").config({
  path: require("path").join(process.cwd(), ".env"),
});

/* ================= CACHE ================= */
// Simple in-memory cache (key = user message)
const responseCache = new Map();

// Optional: auto-expire cache after 10 minutes
const CACHE_TTL = 10 * 60 * 1000; // 10 mins

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/Product");

/* ===================== SAFETY CHECK ===================== */
if (!process.env.GOOGLE_GEMINI_API) {
  throw new Error("GOOGLE_GEMINI_API is missing in .env");
}

/* ===================== GEMINI INIT ===================== */
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview", // free-tier, fast
});

/* ===================== SYSTEM PROMPT ===================== */
const SYSTEM_PROMPT = `
You are **Winkie**, the official AI shopping assistant for **WinkWear**.

Brand Info:
- Premium fashion brand
- 30-day return & refund policy
- Support email: support@winkwear.com

Behavior Rules:
- Be professional, friendly, and concise
- Never hallucinate products or policies
- Use ONLY the product data provided
- Keep responses under 6–8 lines
- Do not mention databases or internal logic

If the user says "hi", "hello", or seems confused, show this menu:

"Hi! I’m Winkie 👋 How can I help you today?

1️⃣ Browse products by category (Men / Women / Kids)
2️⃣ Find products under a price (e.g. under ₹2000)
3️⃣ View return & refund policy
4️⃣ Learn about WinkWear
5️⃣ Contact support

Just reply with a number or tell me what you’re looking for 🙂"

Product Response Format:
• Product Name  
  Price: ₹XXXX  
  Category: Men/Women/Kids
`;
/* ================= FAST PATH (NO GEMINI) ================= */
const fastPathReply = (message) => {
  const msg = message.toLowerCase().trim();

  // Greeting / menu
  if (["hi", "hello", "hey"].includes(msg)) {
    return `
Hi! I’m Winkie 👋 How can I help?

1️⃣ Browse products (Men / Women / Kids)
2️⃣ Products under a price
3️⃣ Return & refund policy
4️⃣ About WinkWear
5️⃣ Contact support
`;
  }

  // Return / refund
  if (msg.includes("return") || msg.includes("refund")) {
    return "WinkWear offers a 30-day return and refund policy on all products.";
  }

  // About
  if (msg.includes("about")) {
    return "WinkWear is a premium fashion brand focused on modern, stylish clothing.";
  }

  // Contact
  if (msg.includes("contact") || msg.includes("support")) {
    return "You can reach us anytime at support@winkwear.com";
  }

  return null; // means: go to Gemini
};

/* ===================== HELPERS ===================== */

const getCacheKey = (message) =>
  message.toLowerCase().trim();

// Detect category & price from user message
const detectFilters = (message) => {
  const filters = {};
  const priceMatch = message.match(/(\d+)/);

  if (/women/i.test(message)) filters.category = "women";
  if (/men/i.test(message)) filters.category = "men";
  if (/kids/i.test(message)) filters.category = "kids";
  if (priceMatch) filters.new_price = { $lte: Number(priceMatch[1]) };

  return filters;
};

// Format product list nicely
const formatProducts = (products) => {
  if (!products.length) return "No matching products found.";

  return products
    .map(
      (p) =>
        `• ${p.name}\n  Price: ₹${p.new_price}\n  Category: ${p.category}`
    )
    .join("\n\n");
};

// Gemini retry logic (handles 503 overload)
const generateWithRetry = async (prompt, retries = 2) => {
  try {
    return await model.generateContent(prompt);
  } catch (error) {
    if (error.status === 503 && retries > 0) {
      await new Promise((res) => setTimeout(res, 1000)); // wait 1s
      return generateWithRetry(prompt, retries - 1);
    }
    throw error;
  }
};

/* ================= STREAMING (FIX-4) ================= */
const streamGeminiResponse = async (prompt, onChunk) => {
  const stream = await model.generateContentStream(prompt);

  let fullText = "";

  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) {
      fullText += text;
      if (onChunk) onChunk(text); // send chunk to caller
    }
  }

  return fullText;
};

/* ===================== MAIN SERVICE ===================== */

const chatbotService = async (userMessage, onChunk = null) => {
  const fastReply = fastPathReply(userMessage);
  if (fastReply) return fastReply;
  const cacheKey = getCacheKey(userMessage);
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }
  let productContext = "";
  

  // Detect product intent
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
  const finalResponse = await streamGeminiResponse(
    finalPrompt,
    onChunk
  );

  // 🔥 FIX-3: cache streamed response
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

