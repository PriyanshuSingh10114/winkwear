/**
 * Centralized SEO Configuration for Wink & Wear
 * Domain: https://winkandwear.com
 */

export const SITE_URL = "https://winkandwear.com";

export const DEFAULT_SEO = {
  title: "Wink & Wear | Online Fashion Store for Men, Women & Kids",
  description: "Shop trendy, high-quality fashion clothing for men, women, and kids at Wink & Wear. Experience fast delivery across India and personalized AI styling with Winkie.",
  keywords: "online fashion store, fashion clothing, men's clothing, women's clothing, kids clothing, trendy apparel India, Wink & Wear",
  siteName: "Wink & Wear",
  ogImage: `${SITE_URL}/new_logo2.png`,
  twitterCard: "summary_large_image",
};

export const PAGE_SEO = {
  home: {
    title: "Wink & Wear | Online Fashion Store for Men, Women & Kids",
    description: "Discover premium, comfortable and stylish fashion outfits for men, women, and kids at Wink & Wear. Fast delivery across India with 24/7 AI shopping assistance.",
    canonical: "/",
  },
  mens: {
    title: "Men's Clothing & Fashion | T-Shirts, Shirts & Jackets | Wink & Wear",
    description: "Explore the latest collection of men's clothing at Wink & Wear. Shop stylish t-shirts, casual shirts, jackets, denim and activewear with great offers.",
    canonical: "/mens",
  },
  womens: {
    title: "Women's Clothing & Fashion | Trendy Dresses, Tops & Wear | Wink & Wear",
    description: "Shop women's fashion clothing online at Wink & Wear. Discover trendy tops, stylish dresses, chic activewear and comfortable everyday apparel.",
    canonical: "/womens",
  },
  kids: {
    title: "Kids' Clothing & Fashion | Comfortable & Cute Styles | Wink & Wear",
    description: "Buy soft, comfortable, and durable clothing for kids at Wink & Wear. Explore colorful t-shirts, adorable dresses, and play-ready outfits.",
    canonical: "/kids",
  },
  about: {
    title: "About Us | Wink & Wear – Next-Gen AI-Powered E-Commerce",
    description: "Learn about Wink & Wear's mission, modern technology architecture, and Winkie — our Google Gemini powered AI shopping assistant.",
    canonical: "/about",
  },
  contact: {
    title: "Contact & Customer Support | Wink & Wear",
    description: "Have questions about your order or styling? Get in touch with the Wink & Wear customer support team.",
    canonical: "/contact",
  },
  privacyPolicy: {
    title: "Privacy Policy | Wink & Wear",
    description: "Read the privacy policy of Wink & Wear to understand how we collect, protect, and handle your data.",
    canonical: "/privacy-policy",
  },
  returnExchange: {
    title: "Return & Exchange Policy | Wink & Wear",
    description: "Learn about hassle-free returns, exchanges, and refund policies at Wink & Wear.",
    canonical: "/return-exchange",
  },
};
