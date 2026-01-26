import men8 from "./men8.webp";
import men9 from "./men9.webp";
import men10 from "./men10.webp";
import men11 from "./men11.webp";
import img325 from "./new_men_25.webp";
import img326 from "./new_men_26.webp";

import p37_img from "./kids_13.webp";
import p38_img from "./kids_14.webp";
import p39_img from "./kids_15.webp";
import p27_img from "./kids_3.webp";
import p28_img from "./kids_4.webp";

import img203 from "./new_women_3.webp";
import img204 from "./new_women_4.webp";
import img205 from "./new_women_5.webp";
import img206 from "./new_women_6.webp";
import img211 from "./new_women_11.webp";
import img212 from "./new_women_12.webp";

let data_product = [
  {
    id: 65,
    name: "Slim Fit Jeans",
    category: "men",
    image: men8,
    new_price: 52.0,
    old_price: 99.99,
    description:
      "Slim fit jeans designed for modern casual wear. Comfortable stretch fabric with a sharp everyday look."
  },
  {
    id: 66,
    name: "Lightweight Linen Shirt",
    category: "men",
    image: men9,
    new_price: 42.0,
    old_price: 79.99,
    description:
      "A breathable linen shirt crafted for warm weather comfort. Ideal for casual outings and summer styling."
  },
  {
    id: 67,
    name: "Wool Overcoat",
    category: "men",
    image: men10,
    new_price: 95.0,
    old_price: 179.99,
    description:
      "A premium wool overcoat designed for cold weather elegance. Provides warmth while maintaining a sophisticated look."
  },
  {
    id: 68,
    name: "Sport Performance Jacket",
    category: "men",
    image: men11,
    new_price: 62.0,
    old_price: 119.99,
    description:
      "A performance-driven jacket designed for active lifestyles. Lightweight and flexible for sports and training wear."
  },
    {
    id: 325,
    name: "Classic Crewneck Cotton Sweatshirt",
    category: "men",
    type: "sweatshirt",
    season: "winter",
    style: "casual",
    occasion: "daily",
    image: img325,
    new_price: 49.0,
    old_price: 92.0,
    description:
      "This crewneck sweatshirt is designed for everyday winter comfort. Made from soft cotton-blend fabric for warmth. Relaxed fit allows easy movement throughout the day. Ideal for casual wear and travel. Breathable construction prevents overheating indoors. Easy to layer under jackets. Maintains shape after repeated use. Simple design supports versatile styling. A dependable winter staple."
  },
  {
    id: 326,
    name: "Smart Casual Checked Shirt",
    category: "men",
    type: "shirt",
    season: "all-season",
    style: "smart casual",
    occasion: "office",
    image: img326,
    new_price: 46.0,
    old_price: 89.0,
    description:
      "This checked shirt blends smart and casual styling effortlessly. Crafted from breathable fabric for all-day comfort. Tailored fit enhances a clean silhouette. Suitable for office and casual meetings. Lightweight construction supports long wear. Easy to pair with chinos or jeans. Retains color vibrancy after washing. Comfortable for all seasons. A refined everyday shirt."
  },

  {
    id: 33,
    name: "Kids Sneakers",
    category: "kid",
    image: p27_img,
    new_price: 55.0,
    old_price: 109.99,
    description:
      "Durable and comfortable sneakers designed for daily wear and active movement."
  },
  {
    id: 34,
    name: "Girls Skirt",
    category: "kid",
    image: p28_img,
    new_price: 38.0,
    old_price: 74.99,
    description:
      "A lightweight skirt offering comfort and style for everyday summer wear."
  },
  {
    id: 71,
    name: "Boys Plaid Shirt",
    category: "kid",
    image: p38_img,
    new_price: 32.0,
    old_price: 64.99,
    description:
      "A classic plaid shirt suitable for casual outings and everyday comfort."
  },
  {
    id: 72,
    name: "Kids Denim Jacket",
    category: "kid",
    image: p39_img,
    new_price: 50.0,
    old_price: 99.99,
    description:
      "A timeless denim jacket designed for warmth, durability, and everyday style."
  },
    {
    id: 73,
    name: "Kids Printed Pajama Set",
    category: "kid",
    type: "sleepwear",
    season: "all-season",
    style: "casual",
    occasion: "loungewear",
    image: p37_img,
    new_price: 34.0,
    old_price: 69.0,
    description:
      "This printed pajama set is designed for comfortable sleep and lounging. Made from soft, skin-friendly fabric suitable for kids. Lightweight construction ensures comfort throughout the night. Relaxed fit allows free movement. Ideal for daily nightwear and home wear. Breathable fabric prevents discomfort. Easy to wash and maintain. Retains softness after washing. A cozy sleepwear essential for kids."
  },
  {
    id: 74,
    name: "Kids Winter Puffer Jacket",
    category: "kid",
    type: "jacket",
    season: "winter",
    style: "casual",
    occasion: "daily",
    image: p38_img,
    new_price: 58.0,
    old_price: 109.0,
    description:
      "This winter puffer jacket is designed to keep kids warm in cold weather. Insulated fabric traps heat effectively. Lightweight padding ensures comfort without bulk. Secure fit allows easy movement during play. Ideal for school and outdoor activities. Durable outer layer resists cold winds. Comfortable inner lining adds warmth. Easy to layer over sweaters. A reliable winter jacket for kids."
  },

  {
    id: 203,
    name: "Night City Party Dress",
    category: "women",
    image: img203,
    new_price: 72.0,
    old_price: 149.0,
    description:
      "A sleek party dress crafted to make a bold statement during evening events and celebrations."
  },
  {
    id: 204,
    name: "Everyday Autumn Cardigan",
    category: "women",
    image: img204,
    new_price: 58.0,
    old_price: 110.0,
    description:
      "A cozy autumn cardigan ideal for layering, offering warmth and comfort for everyday wear."
  },
  {
    id: 205,
    name: "Dark Sweater Cozy Fit",
    category: "women",
    image: img205,
    new_price: 52.0,
    old_price: 99.0,
    description:
      "A cozy-fit winter sweater designed to keep you warm while maintaining a clean, modern look."
  },
  {
    id: 206,
    name: "Minimal Aesthetic Top",
    category: "women",
    image: img206,
    new_price: 45.0,
    old_price: 85.0,
    description:
      "A minimal aesthetic top with a versatile silhouette, perfect for everyday styling."
  },
  {
  id: 211,
  name: "Soft Knit Winter Turtleneck",
  category: "women",
  type: "sweater",
  season: "winter",
  style: "casual",
  occasion: "daily",
  image: img211, // add image import
  new_price: 54.0,
  old_price: 105.0,
  description:
    "This soft knit turtleneck sweater is designed for cozy winter comfort. Crafted from warm, breathable fabric that feels gentle on the skin. The turtleneck design provides extra warmth during cold days. Relaxed fit allows easy layering. Ideal for daily wear and casual outings. Lightweight yet insulating construction. Easy to style with jeans or skirts. Maintains softness after washing. A winter wardrobe essential."
},
{
  id: 212,
  name: "Elegant Pleated Midi Skirt",
  category: "women",
  type: "skirt",
  season: "all-season",
  style: "formal",
  occasion: "office",
  image: img212,
  new_price: 62.0,
  old_price: 119.0,
  description:
    "This pleated midi skirt is designed for elegant everyday styling. Crafted from lightweight fabric with a graceful flow. Structured pleats add a refined and professional look. Comfortable waistband ensures all-day wear. Ideal for office and semi-formal occasions. Easy to pair with blouses and tops. Breathable material supports all-season use. Retains shape after washing. A versatile formal essential."
}

];

export default data_product;
