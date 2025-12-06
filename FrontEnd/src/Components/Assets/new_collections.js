import p5_img from "./women5.webp";
import img8 from "./8.jpg";
import img10 from "./10.jpg";
import img14 from "./14.jpg";
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
    type: 'summer',
    image: p5_img,
    new_price: 38.0,
    old_price: 74.99,
  },
  {
    id: 50,
    name: "Knit Cardigan Sweater",
    category: "women",
    type: 'office',
    image: img8,
    new_price: 50.0,
    old_price: 99.99,
  },
  {
    id: 52,
    name: "Denim Shorts",
    category: "women",
    type: 'jacket',
    image: img10,
    new_price: 36.0,
    old_price: 69.99,
  },
  {
    id: 56,
    name: "Puffed Sleeve Blouse",
    category: "women",
    type: 'dress',
    image: img14,
    new_price: 50.0,
    old_price: 99.99,
  },
  {
    id: 63,
    name: "Striped Polo Shirt",
    category: "men",
    type: 'jacket',
    image: men6,
    new_price: 35.0,
    old_price: 69.99,
  },
  {
    id: 65,
    name: "Lightweight Linen Shirt",
    category: "men",
    type: 'summer',
    image: men8,
    new_price: 42.0,
    old_price: 79.99,
  },
  {
    id: 66,
    name: "Wool Overcoat",
    category: "men",
    type: 'winter',
    image: men9,
    new_price: 95.0,
    old_price: 179.99,
  },
  {
    id: 26,
    name: "Workwear Utility Jacket",
    category: "men",
    type: 'sport',
    image: p20_img,
    new_price: 68.0,
    old_price: 129.99,
  },
  {
    id: 27,
    name: "Oxford Cloth Shirt",
    category: "men",
    type: 'accessories',
    image: p21_img,
    new_price: 45.0,
    old_price: 89.99,
  },
  {
    id: 28,
    name: "Athletic Shorts",
    category: "men",
    type: 'accessories',
    image: p22_img,
    new_price: 38.0,
    old_price: 74.99,
  },
  {
    id: 15,
    name: "Vintage Retro Sweater",
    category: "women",
    type: 'dress',
    image: p3_img,
    new_price: 42.0,
    old_price: 79.99,
  },
  {
    id: 16,
    name: "Designer Silk Blouse",
    category: "women",
    type: 'winter',
    image: p4_img,
    new_price: 68.0,
    old_price: 125.99,
  }
];

export default new_collections;
