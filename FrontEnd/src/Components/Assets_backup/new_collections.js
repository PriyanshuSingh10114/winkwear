import p5_img from "./women5.webp";
import img8 from "./8.webp";
import img10 from "./10.webp";
import img14 from "./14.webp";
import men6 from "./men6.webp";
import men8 from "./men8.webp";
import men9 from "./men9.webp";
import p20_img from "./men20.webp";
import p21_img from "./men21.webp";
import p22_img from "./men22.webp";
import p3_img from "./women3.webp";
import p4_img from "./women4.webp";

let new_collections = [
  {
    id: 17,
    name: "Summer Beach Cover-up",
    category: "women",
    type: "cover-up",
    season: "summer",
    style: "casual",
    occasion: "vacation",
    image: p5_img,
    new_price: 38.0,
    old_price: 74.99,
    description:
      "A lightweight beach cover-up designed for sunny days. Breathable fabric makes it perfect for layering over swimwear during vacations."
  },
  {
    id: 50,
    name: "Knit Cardigan Sweater",
    category: "women",
    type: "cardigan",
    season: "winter",
    style: "casual",
    occasion: "daily",
    image: img8,
    new_price: 50.0,
    old_price: 99.99,
    description:
      "A cozy knit cardigan sweater designed for layering. Offers warmth and comfort with a versatile everyday look."
  },
  {
    id: 52,
    name: "Denim Shorts",
    category: "women",
    type: "shorts",
    season: "summer",
    style: "casual",
    occasion: "daily",
    image: img10,
    new_price: 36.0,
    old_price: 69.99,
    description:
      "Classic denim shorts crafted for summer comfort. Perfect for casual outings and relaxed styling."
  },
  {
    id: 56,
    name: "Puffed Sleeve Blouse",
    category: "women",
    type: "blouse",
    season: "all-season",
    style: "casual",
    occasion: "daily",
    image: img14,
    new_price: 50.0,
    old_price: 99.99,
    description:
      "A fashionable blouse featuring puffed sleeves for a modern feminine look. Comfortable and versatile."
  },
  {
    id: 63,
    name: "Striped Polo Shirt",
    category: "men",
    type: "polo shirt",
    season: "summer",
    style: "smart casual",
    occasion: "daily",
    image: men6,
    new_price: 35.0,
    old_price: 69.99,
    description:
      "A striped polo shirt blending casual comfort with a smart finish. Perfect for relaxed outings and semi-casual events."
  },
  {
    id: 65,
    name: "Slim Fit Jeans",
    category: "men",
    type: "jeans",
    season: "all-season",
    style: "casual",
    occasion: "daily",
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
    type: "shirt",
    season: "summer",
    style: "casual",
    occasion: "daily",
    image: men9,
    new_price: 42.0,
    old_price: 79.99,
    description:
      "A breathable linen shirt crafted for warm weather comfort. Ideal for casual outings and summer styling."
  },
  {
    id: 320,
    name: "Performance Sports Jacket",
    category: "men",
    type: "jacket",
    season: "all-season",
    style: "athletic",
    occasion: "daily",
    image: p20_img,
    new_price: 68.0,
    old_price: 129.99,
    description:
      "A performance sports jacket engineered for mobility and durability. Suitable for training and active lifestyles."
  },
  {
    id: 321,
    name: "Formal Blazer Jacket",
    category: "men",
    type: "blazer",
    season: "winter",
    style: "formal",
    occasion: "office",
    image: p21_img,
    new_price: 110.0,
    old_price: 199.0,
    description:
      "A formal blazer jacket designed for sharp silhouettes and professional styling. Ideal for office and events."
  },
  {
    id: 322,
    name: "Layered Winter Hoodie",
    category: "men",
    type: "hoodie",
    season: "winter",
    style: "casual",
    occasion: "daily",
    image: p22_img,
    new_price: 60.0,
    old_price: 115.0,
    description:
      "A layered winter hoodie offering enhanced warmth and comfort. Perfect for cold-weather casual wear."
  },
  {
    id: 15,
    name: "Vintage Retro Sweater",
    category: "women",
    type: "sweater",
    season: "winter",
    style: "casual",
    occasion: "daily",
    image: p3_img,
    new_price: 42.0,
    old_price: 79.99,
    description:
      "A vintage-inspired sweater with retro charm, offering warmth and comfort. Perfect for relaxed winter outfits with a nostalgic aesthetic."
  },
  {
    id: 16,
    name: "Designer Silk Blouse",
    category: "women",
    type: "blouse",
    season: "all-season",
    style: "formal",
    occasion: "office",
    image: p4_img,
    new_price: 68.0,
    old_price: 125.99,
    description:
      "A premium silk blouse designed with a luxurious feel and refined finish. Ideal for professional settings and elegant day-to-night looks."
  }
];

export default new_collections;
