const fs = require('fs');
const path = require('path');

// Curated pool of high-resolution fashion photography images from Unsplash CDN
const MEN_IMAGES = [
  "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618886614638-80e3c153d31a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
];

const WOMEN_IMAGES = [
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&w=800&q=80"
];

const KIDS_IMAGES = [
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595454223600-91fbdd776785?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560506840-ec148e8267f3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503944546559-009abbc530d2?auto=format&fit=crop&w=800&q=80"
];

const slugify = (text) => {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Raw product definitions for 150 Men products
const MEN_DEFINITIONS = [
  // 1-25: T-Shirts
  { name: "Urban Oversized Heavyweight Cotton T-Shirt", type: "tshirt", season: "summer", style: "streetwear", occasion: "daily", baseOld: 1299, baseNew: 799, sizes: ["S","M","L","XL","XXL"], colors: ["Jet Black", "Washed Grey", "Off-White"] },
  { name: "Vintage Wash Acid Drop Graphic Tee", type: "tshirt", season: "summer", style: "streetwear", occasion: "party", baseOld: 1499, baseNew: 899, sizes: ["S","M","L","XL"], colors: ["Charcoal", "Olive"] },
  { name: "Classic Supima Crew Neck Basic Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 999, baseNew: 599, sizes: ["XS","S","M","L","XL","XXL"], colors: ["Pure White", "Navy Blue", "Black"] },
  { name: "Slub Cotton Textured Henley T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1199, baseNew: 699, sizes: ["S","M","L","XL"], colors: ["Rust Brown", "Sage Green", "Oatmeal"] },
  { name: "Athletic Quick-Dry Moisture Wicking Tee", type: "tshirt", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 1099, baseNew: 649, sizes: ["S","M","L","XL","XXL"], colors: ["Cobalt Blue", "Steel Grey"] },
  { name: "Minimalist Typographic Boxy Fit T-Shirt", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1399, baseNew: 849, sizes: ["M","L","XL","XXL"], colors: ["Eggshell White", "Midnight Navy"] },
  { name: "Breton Striped Nautical Cotton Tee", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1299, baseNew: 749, sizes: ["S","M","L","XL"], colors: ["Navy/White", "Black/Beige"] },
  { name: "Ribbed Knit Slim Fit Crew Neck T-Shirt", type: "tshirt", season: "all-season", style: "casual", occasion: "office", baseOld: 1199, baseNew: 699, sizes: ["S","M","L","XL"], colors: ["Camel", "Dark Green", "White"] },
  { name: "Raw Hem Waffle Knit Essential Tee", type: "tshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1399, baseNew: 799, sizes: ["S","M","L","XL","XXL"], colors: ["Heather Grey", "Sand", "Black"] },
  { name: "Retro Sunset Gradient Graphic T-Shirt", type: "tshirt", season: "summer", style: "streetwear", occasion: "party", baseOld: 1499, baseNew: 899, sizes: ["S","M","L","XL"], colors: ["Vintage Black", "Clay"] },
  { name: "Chest Pocket Casual Slub T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["S","M","L","XL"], colors: ["Dusty Olive", "Navy", "White"] },
  { name: "Relaxed Fit Drop Shoulder Heather Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1299, baseNew: 749, sizes: ["M","L","XL","XXL"], colors: ["Charcoal Melange", "Light Grey"] },
  { name: "Japanese Calligraphy Graphic Back-Print Tee", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1599, baseNew: 999, sizes: ["S","M","L","XL","XXL"], colors: ["Off-White", "Onyx Black"] },
  { name: "Heavyweight Box Cut Mock Neck T-Shirt", type: "tshirt", season: "winter", style: "streetwear", occasion: "daily", baseOld: 1499, baseNew: 899, sizes: ["S","M","L","XL"], colors: ["Mocha", "Black", "Ivory"] },
  { name: "Tie-Dye Swirl Pastel Summer T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1399, baseNew: 799, sizes: ["S","M","L","XL"], colors: ["Sunset Orange", "Sky Blue"] },
  { name: "Essential Pima Cotton V-Neck Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1099, baseNew: 599, sizes: ["S","M","L","XL","XXL"], colors: ["White", "Navy", "Black"] },
  { name: "Embroidered Monogram Chest Logo T-Shirt", type: "tshirt", season: "all-season", style: "casual", occasion: "office", baseOld: 1299, baseNew: 799, sizes: ["S","M","L","XL"], colors: ["Burgundy", "Forest Green"] },
  { name: "Acid Wash Distressed Punk Rock Tee", type: "tshirt", season: "summer", style: "streetwear", occasion: "party", baseOld: 1499, baseNew: 849, sizes: ["S","M","L","XL"], colors: ["Washed Black", "Slate Grey"] },
  { name: "Colorblock Geometric Patchwork T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1399, baseNew: 799, sizes: ["M","L","XL"], colors: ["Teal/White/Navy", "Olive/Beige"] },
  { name: "Organic Earth Tone Oversized T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1299, baseNew: 699, sizes: ["S","M","L","XL","XXL"], colors: ["Terracotta", "Forest Olive", "Sand"] },
  { name: "Contrast Stitching Skater Graphic Tee", type: "tshirt", season: "all-season", style: "streetwear", occasion: "outdoor", baseOld: 1399, baseNew: 849, sizes: ["S","M","L","XL"], colors: ["Black/White", "Grey/Orange"] },
  { name: "Washed Ribbed Muscle Fit Workout Tee", type: "tshirt", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 1199, baseNew: 649, sizes: ["S","M","L","XL"], colors: ["Gunmetal", "Army Green"] },
  { name: "Minimal Abstract Art Print Crew Neck Tee", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1499, baseNew: 899, sizes: ["S","M","L","XL","XXL"], colors: ["Chalk White", "Pitch Black"] },
  { name: "Sun-Faded Coral Surf Lifestyle T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1299, baseNew: 749, sizes: ["S","M","L","XL"], colors: ["Faded Coral", "Aqua Blue"] },
  { name: "Heavyweight Double-Knit Luxury Blank Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1699, baseNew: 1099, sizes: ["S","M","L","XL","XXL"], colors: ["Ecru", "Taupe", "Anthracite"] },

  // 26-50: Shirts
  { name: "Classic Regular Fit Oxford Cotton Shirt", type: "shirt", season: "all-season", style: "casual", occasion: "office", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL","XXL"], colors: ["Sky Blue", "White", "Pale Pink"] },
  { name: "Pure Linen Breathable Mandarin Collar Shirt", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Ivory", "Olive Green", "Beige"] },
  { name: "Indigo Chambray Workwear Casual Shirt", type: "shirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL","XXL"], colors: ["Light Indigo", "Dark Stonewash"] },
  { name: "Tailored Slim Fit Luxury Poplin Dress Shirt", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 2599, baseNew: 1599, sizes: ["S","M","L","XL","XXL"], colors: ["Crisp White", "French Blue", "Black"] },
  { name: "Lumberjack Buffalo Check Flannel Overshirt", type: "shirt", season: "winter", style: "casual", occasion: "outdoor", baseOld: 2399, baseNew: 1499, sizes: ["S","M","L","XL","XXL"], colors: ["Red/Black", "Navy/White", "Green/Black"] },
  { name: "Cuban Collar Resort Print Camp Shirt", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL"], colors: ["Palm Olive", "Monochrome Floral"] },
  { name: "Heavyweight Fine Corduroy Casual Overshirt", type: "shirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2699, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Mustard Tan", "Dark Forest", "Burgundy"] },
  { name: "Textured Cotton Dobby Stripe Formal Shirt", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL","XXL"], colors: ["White/Blue Stripe", "Lilac Stripe"] },
  { name: "Garment-Dyed Twill Utility Military Shirt", type: "shirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Khaki", "Army Green", "Black"] },
  { name: "Satin Finish Luxury Evening Party Shirt", type: "shirt", season: "all-season", style: "partywear", occasion: "party", baseOld: 2799, baseNew: 1799, sizes: ["S","M","L","XL"], colors: ["Glossy Black", "Deep Wine", "Emerald"] },
  { name: "Seersucker Puckered Lightweight Summer Shirt", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Sky Stripe", "Navy Stripe"] },
  { name: "Windowpane Check Modern Slim Casual Shirt", type: "shirt", season: "all-season", style: "casual", occasion: "office", baseOld: 2099, baseNew: 1249, sizes: ["S","M","L","XL"], colors: ["Navy/Beige", "Grey/Black"] },
  { name: "Micro Houndstooth Spread Collar Shirt", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL","XXL"], colors: ["Black/White", "Blue/Navy"] },
  { name: "Raw Cotton Handloom Minimalist Short Shirt", type: "shirt", season: "summer", style: "ethnic", occasion: "festive", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL"], colors: ["Natural Cream", "Earth Brown"] },
  { name: "Western Snap Button Denim Overshirt", type: "shirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 2599, baseNew: 1599, sizes: ["S","M","L","XL","XXL"], colors: ["Vintage Mid-Blue", "Faded Black"] },
  { name: "Tropical Botanical Hawaiian Short Sleeve Shirt", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1899, baseNew: 1099, sizes: ["S","M","L","XL"], colors: ["Navy Floral", "Sage Floral"] },
  { name: "Brushed Cotton Twill Winter Flannel Shirt", type: "shirt", season: "winter", style: "casual", occasion: "outdoor", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Ochre Plaid", "Charcoal Plaid"] },
  { name: "Geometric Aztec Pattern Boxy Overshirt", type: "shirt", season: "winter", style: "streetwear", occasion: "party", baseOld: 2799, baseNew: 1699, sizes: ["M","L","XL","XXL"], colors: ["Sand/Black", "Rust/Navy"] },
  { name: "Double Pocket Heavy Duty Cargo Workshirt", type: "shirt", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Desert Sand", "Olive Drab"] },
  { name: "Wrinkle-Free Non-Iron Cotton Executive Shirt", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 2699, baseNew: 1649, sizes: ["S","M","L","XL","XXL"], colors: ["Pure White", "Ice Blue"] },
  { name: "Abstract Brushstroke Modern Art Casual Shirt", type: "shirt", season: "summer", style: "casual", occasion: "party", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Black/White", "Terracotta/Navy"] },
  { name: "Band Collar Textured Linen Blend Shirt", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 2299, baseNew: 1349, sizes: ["S","M","L","XL"], colors: ["Olive", "Oatmeal", "Navy"] },
  { name: "Herringbone Weave Heavy Cotton Overshirt", type: "shirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2699, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Charcoal", "Tobacco Brown"] },
  { name: "Gingham Check Button-Down Smart Casual Shirt", type: "shirt", season: "all-season", style: "casual", occasion: "office", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL","XXL"], colors: ["Navy Gingham", "Black Gingham"] },
  { name: "Printed Silk Blend Luxury Collar Shirt", type: "shirt", season: "all-season", style: "partywear", occasion: "party", baseOld: 2999, baseNew: 1899, sizes: ["S","M","L","XL"], colors: ["Midnight Gold", "Ruby Red"] },

  // 51-68: Jeans & Denim (18 products)
  { name: "Authentic Straight Leg Selvedge Raw Denim Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 3299, baseNew: 1999, sizes: ["30","32","34","36","38"], colors: ["Raw Indigo", "Dark Ink"] },
  { name: "Slim Tapered Stretch Comfort Denim Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["28","30","32","34","36"], colors: ["Stonewash Blue", "Midnight Black"] },
  { name: "Relaxed Carpenter Denim Utility Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2999, baseNew: 1799, sizes: ["30","32","34","36"], colors: ["Light Tint", "Washed Charcoal"] },
  { name: "Distressed Knee Ripped Biker Stretch Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 3199, baseNew: 1899, sizes: ["30","32","34","36"], colors: ["Washed Grey", "Faded Blue"] },
  { name: "Vintage 90s Baggy Wide Leg Skate Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2899, baseNew: 1749, sizes: ["30","32","34","36"], colors: ["Bleach Blue", "Vintage Indigo"] },
  { name: "Clean Rinse Mid-Rise Smart Casual Denim", type: "jeans", season: "all-season", style: "casual", occasion: "office", baseOld: 2699, baseNew: 1599, sizes: ["30","32","34","36","38"], colors: ["Dark Blue", "Jet Black"] },
  { name: "Acid Wash Retro Straight Cut Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 2999, baseNew: 1799, sizes: ["30","32","34","36"], colors: ["Acid Grey", "Acid Ice"] },
  { name: "Bootcut Heavyweight Vintage Western Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 3199, baseNew: 1899, sizes: ["30","32","34","36"], colors: ["Medium Blue", "Washed Brown"] },
  { name: "Skinny Fit Ultra-Flex Jet Black Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "party", baseOld: 2599, baseNew: 1499, sizes: ["28","30","32","34","36"], colors: ["Pitch Black"] },
  { name: "Ecru Off-White Relaxed Fit Cotton Denim", type: "jeans", season: "summer", style: "casual", occasion: "vacation", baseOld: 2899, baseNew: 1699, sizes: ["30","32","34","36"], colors: ["Ecru White", "Bone"] },
  { name: "Whiskered Fade Low-Rise Comfort Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2699, baseNew: 1599, sizes: ["30","32","34","36"], colors: ["Indigo Whiskered"] },
  { name: "Contrast Stitching Dark Navy Raw Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "office", baseOld: 2999, baseNew: 1799, sizes: ["30","32","34","36"], colors: ["Deep Navy"] },
  { name: "Tapered Ankle Crop Modern Stretch Denim", type: "jeans", season: "summer", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1649, sizes: ["30","32","34","36"], colors: ["Light Blue", "Ash Grey"] },
  { name: "Fleece Lined Thermal Winter Denim Jeans", type: "jeans", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3499, baseNew: 2199, sizes: ["30","32","34","36","38"], colors: ["Dark Blue", "Charcoal"] },
  { name: "Heavy Twill Duck Canvas Workwear Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 3199, baseNew: 1899, sizes: ["30","32","34","36"], colors: ["Caramel Brown", "Olive"] },
  { name: "Patchwork Denim Streetwear Custom Fit Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 3599, baseNew: 2299, sizes: ["30","32","34","36"], colors: ["Multi-Tone Indigo"] },
  { name: "Elastic Waistband Denim Relaxed Joggers", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Medium Indigo", "Black Denim"] },
  { name: "Vintage Faded Grey Straight Hem Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2899, baseNew: 1699, sizes: ["30","32","34","36"], colors: ["Smoke Grey", "Washed Charcoal"] },

  // 69-86: Trousers & Chinos (18 products)
  { name: "Slim Stretch Cotton Everyday Chino Pants", type: "trouser", season: "all-season", style: "casual", occasion: "office", baseOld: 2499, baseNew: 1499, sizes: ["30","32","34","36","38"], colors: ["British Khaki", "Navy Blue", "Olive"] },
  { name: "Tailored Double Pleated Formal Dress Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 2999, baseNew: 1799, sizes: ["30","32","34","36","38"], colors: ["Charcoal Grey", "Jet Black", "Dark Navy"] },
  { name: "Relaxed Fit 6-Pocket Tactical Cargo Trousers", type: "trouser", season: "all-season", style: "streetwear", occasion: "outdoor", baseOld: 2799, baseNew: 1699, sizes: ["30","32","34","36"], colors: ["Army Olive", "Black", "Desert Sand"] },
  { name: "Pure Linen Drawstring Summer Beach Pants", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 2599, baseNew: 1549, sizes: ["S","M","L","XL"], colors: ["White", "Natural Beige", "Sky Blue"] },
  { name: "Korean Aesthetic Wide Leg Pleated Trousers", type: "trouser", season: "all-season", style: "streetwear", occasion: "party", baseOld: 2899, baseNew: 1749, sizes: ["S","M","L","XL"], colors: ["Cocoa Brown", "Light Grey", "Black"] },
  { name: "Stretch Wool Blend Executive Business Trousers", type: "trouser", season: "winter", style: "formal", occasion: "office", baseOld: 3299, baseNew: 1999, sizes: ["30","32","34","36","38"], colors: ["Navy Check", "Anthracite"] },
  { name: "Cropped Ankle Fit Smart Tapered Trousers", type: "trouser", season: "summer", style: "casual", occasion: "office", baseOld: 2499, baseNew: 1449, sizes: ["30","32","34","36"], colors: ["Slate Grey", "Camel Tan"] },
  { name: "Heavy Cotton Canvas Utility Carpenter Pants", type: "trouser", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 2799, baseNew: 1649, sizes: ["30","32","34","36"], colors: ["Ochre Brown", "Olive Drab"] },
  { name: "Athletic Stretch Travel Jogger Trousers", type: "trouser", season: "all-season", style: "athletic", occasion: "daily", baseOld: 2299, baseNew: 1349, sizes: ["S","M","L","XL"], colors: ["Black", "Dark Charcoal"] },
  { name: "Vintage Houndstooth Tailored Wool Trousers", type: "trouser", season: "winter", style: "formal", occasion: "party", baseOld: 3499, baseNew: 2199, sizes: ["30","32","34","36"], colors: ["Grey/Black Houndstooth"] },
  { name: "Linen Blend Easy Pull-On Casual Trousers", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 2399, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Sand Beige", "Sage"] },
  { name: "Gurkha High-Waisted Double Buckle Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "party", baseOld: 3199, baseNew: 1899, sizes: ["30","32","34","36"], colors: ["Midnight Navy", "Ivory"] },
  { name: "Corduroy Straight Leg Autumn Trousers", type: "trouser", season: "winter", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["30","32","34","36"], colors: ["Rust Brown", "Forest Green"] },
  { name: "Pinstripe Slim Fit Classic Office Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 2699, baseNew: 1599, sizes: ["30","32","34","36"], colors: ["Navy/White Stripe", "Black/Grey Stripe"] },
  { name: "Techwear Water-Repellent Ankle Zip Pants", type: "trouser", season: "all-season", style: "streetwear", occasion: "outdoor", baseOld: 2999, baseNew: 1799, sizes: ["S","M","L","XL"], colors: ["Stealth Black", "Cyber Grey"] },
  { name: "Brushed Cotton Casual Weekend Lounge Pants", type: "trouser", season: "all-season", style: "casual", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL","XXL"], colors: ["Navy Melange", "Olive"] },
  { name: "Checkered Tartan Slim Smart Casual Chinos", type: "trouser", season: "winter", style: "casual", occasion: "party", baseOld: 2599, baseNew: 1549, sizes: ["30","32","34","36"], colors: ["Green/Navy Tartan", "Grey Tartan"] },
  { name: "Bermuda Pleated Casual Linen Blend Pants", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 2299, baseNew: 1349, sizes: ["30","32","34","36"], colors: ["Cream", "Light Khaki"] },

  // 87-104: Hoodies & Sweatshirts (18 products)
  { name: "Heavyweight 450GSM Organic Fleece Pullover Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 2899, baseNew: 1799, sizes: ["S","M","L","XL","XXL"], colors: ["Vintage Black", "Oatmeal", "Forest Green"] },
  { name: "French Terry Raglan Sleeve Classic Crewneck Sweatshirt", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Heather Grey", "Navy", "Maroon"] },
  { name: "Full Zip-Up Thermal Fleece Lined Winter Hoodie", type: "hoodie", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3199, baseNew: 1999, sizes: ["S","M","L","XL","XXL"], colors: ["Charcoal", "Army Green", "Black"] },
  { name: "Embroidered Gothic Logo Oversized Street Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "party", baseOld: 2999, baseNew: 1849, sizes: ["M","L","XL","XXL"], colors: ["Onyx Black", "Oxblood Red"] },
  { name: "Colorblock Retro 90s Quarter-Zip Sweatshirt", type: "sweatshirt", season: "winter", style: "casual", occasion: "outdoor", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Navy/Teal/White", "Burgundy/Cream"] },
  { name: "Waffle Knit Thermal Lounge Pullover Hoodie", type: "hoodie", season: "winter", style: "casual", occasion: "daily", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Sand", "Olive", "Charcoal"] },
  { name: "Acid Washed Drop-Shoulder Relaxed Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Acid Wash Slate", "Faded Rust"] },
  { name: "Sherpa Borg Lined Ultra-Warm Winter Pullover", type: "hoodie", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3499, baseNew: 2299, sizes: ["S","M","L","XL","XXL"], colors: ["Cream/Tan", "Black"] },
  { name: "Minimalist Chenille Patch Heavyweight Sweatshirt", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL"], colors: ["Mocha Brown", "Sage Green"] },
  { name: "Tie-Dye Swirl Streetwear Fleece Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "party", baseOld: 2899, baseNew: 1749, sizes: ["S","M","L","XL"], colors: ["Pastel Multi", "Monochrome Grey"] },
  { name: "Reflective Striped High-Visibility Night Hoodie", type: "hoodie", season: "winter", style: "athletic", occasion: "outdoor", baseOld: 2699, baseNew: 1599, sizes: ["S","M","L","XL"], colors: ["Gunmetal Black", "Electric Blue"] },
  { name: "Vintage Varsity Striped Trim Crew Sweatshirt", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Navy/Gold", "Forest/Cream"] },
  { name: "Raw Cut Hem Cropped Boxy Skate Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 2599, baseNew: 1599, sizes: ["S","M","L","XL"], colors: ["Off-Black", "Dusty Pink"] },
  { name: "Fleece Lined Mock Neck Half-Zip Sweater", type: "sweatshirt", season: "winter", style: "casual", occasion: "office", baseOld: 2699, baseNew: 1649, sizes: ["S","M","L","XL"], colors: ["Camel", "Dark Navy"] },
  { name: "Kangaroo Pocket Essential French Terry Hoodie", type: "hoodie", season: "all-season", style: "casual", occasion: "daily", baseOld: 2299, baseNew: 1349, sizes: ["S","M","L","XL","XXL"], colors: ["Heather Grey", "Deep Teal"] },
  { name: "Vintage Sunburst Back-Graphic Heavy Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "party", baseOld: 2999, baseNew: 1849, sizes: ["M","L","XL"], colors: ["Washed Brown", "Charcoal"] },
  { name: "Performance Breathable Running Training Hoodie", type: "hoodie", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Steel Grey", "Neon Lime"] },
  { name: "Oversized Cashmere-Feel Knit Hooded Sweater", type: "hoodie", season: "winter", style: "casual", occasion: "vacation", baseOld: 3299, baseNew: 2099, sizes: ["S","M","L","XL"], colors: ["Warm Taupe", "Midnight Blue"] },

  // 105-120: Jackets & Outerwear (16 products)
  { name: "Classic MA-1 Reversible Nylon Bomber Jacket", type: "jacket", season: "winter", style: "streetwear", occasion: "daily", baseOld: 3999, baseNew: 2499, sizes: ["S","M","L","XL","XXL"], colors: ["Sage Olive", "Midnight Black", "Burgundy"] },
  { name: "Sherpa Lined Trucker Denim Heavy Winter Jacket", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 4499, baseNew: 2799, sizes: ["S","M","L","XL"], colors: ["Stonewash Indigo", "Black Denim"] },
  { name: "Quilted Lightweight Down Puffer Packable Jacket", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3799, baseNew: 2299, sizes: ["S","M","L","XL","XXL"], colors: ["Jet Black", "Navy Blue", "Olive"] },
  { name: "Tailored Single-Breasted Wool Blend Overcoat", type: "jacket", season: "winter", style: "formal", occasion: "office", baseOld: 5999, baseNew: 3699, sizes: ["S","M","L","XL","XXL"], colors: ["Camel Tan", "Charcoal Grey", "Black"] },
  { name: "Waterproof Hooded Outdoor Windbreaker Jacket", type: "jacket", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 3299, baseNew: 1999, sizes: ["S","M","L","XL"], colors: ["Cobalt/Black", "Olive/Black"] },
  { name: "Military M-65 Multi-Pocket Field Utility Jacket", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 4199, baseNew: 2599, sizes: ["S","M","L","XL"], colors: ["Army Khaki", "Desert Camo"] },
  { name: "Faux Suede Biker Jacket with Asymmetric Zip", type: "jacket", season: "winter", style: "partywear", occasion: "party", baseOld: 4699, baseNew: 2899, sizes: ["S","M","L","XL"], colors: ["Cognac Brown", "Pitch Black"] },
  { name: "Corduroy Collar Barn Jacket with Plaid Lining", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 4299, baseNew: 2649, sizes: ["S","M","L","XL"], colors: ["Tobacco Tan", "Forest Green"] },
  { name: "Modern Structured Slim Fit Blazer Jacket", type: "blazer", season: "all-season", style: "formal", occasion: "office", baseOld: 4999, baseNew: 2999, sizes: ["38","40","42","44"], colors: ["Navy Blue", "Slate Grey", "Black"] },
  { name: "Vintage Leather-Look Varsity Letterman Jacket", type: "jacket", season: "winter", style: "streetwear", occasion: "daily", baseOld: 4599, baseNew: 2799, sizes: ["S","M","L","XL"], colors: ["Black/White", "Navy/Cream"] },
  { name: "Polar Fleece Full-Zip Stand Collar Outdoor Jacket", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 2799, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Charcoal", "Mocha", "Dark Teal"] },
  { name: "Double-Breasted Classic Peacoat Wool Blend", type: "jacket", season: "winter", style: "formal", occasion: "party", baseOld: 5499, baseNew: 3399, sizes: ["S","M","L","XL"], colors: ["Deep Navy", "Jet Black"] },
  { name: "Casual Denim Coach Jacket with Snap Buttons", type: "jacket", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 3499, baseNew: 2199, sizes: ["S","M","L","XL"], colors: ["Medium Indigo", "Washed Black"] },
  { name: "Heavyweight Parka with Detachable Faux Fur Hood", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 5999, baseNew: 3799, sizes: ["S","M","L","XL","XXL"], colors: ["Olive Green", "Matte Black"] },
  { name: "Water-Resistant Technical Softshell Zip Jacket", type: "jacket", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 3699, baseNew: 2249, sizes: ["S","M","L","XL"], colors: ["Steel Grey", "Dark Navy"] },
  { name: "Retro Puffer Vest Sleeveless Winter Gilet", type: "jacket", season: "winter", style: "casual", occasion: "daily", baseOld: 2999, baseNew: 1799, sizes: ["S","M","L","XL"], colors: ["Matte Black", "Mustard Yellow"] },

  // 121-132: Polo Shirts (12 products)
  { name: "Classic 100% Pique Cotton Slim Polo Shirt", type: "polo", season: "summer", style: "casual", occasion: "office", baseOld: 1699, baseNew: 999, sizes: ["S","M","L","XL","XXL"], colors: ["Navy Blue", "Crisp White", "Burgundy"] },
  { name: "Mercerized Cotton Luxury High-Shine Polo", type: "polo", season: "summer", style: "casual", occasion: "party", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Emerald Green", "Jet Black", "French Blue"] },
  { name: "Contrast Tipped Collar Modern Fit Polo", type: "polo", season: "summer", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1049, sizes: ["S","M","L","XL"], colors: ["White/Navy", "Black/Gold"] },
  { name: "Textured Cable Knit Retro Resort Polo", type: "polo", season: "summer", style: "casual", occasion: "vacation", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Cream Ecru", "Sage Green"] },
  { name: "Performance Stretch Golf Polo with UPF50+", type: "polo", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 1899, baseNew: 1149, sizes: ["S","M","L","XL","XXL"], colors: ["Sky Blue", "Heather Grey"] },
  { name: "Retro Colorblock Striped Collar Polo Shirt", type: "polo", season: "summer", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1099, sizes: ["S","M","L","XL"], colors: ["Navy/White/Red", "Olive/Cream"] },
  { name: "Washed Cotton Vintage Slub Polo Shirt", type: "polo", season: "summer", style: "casual", occasion: "daily", baseOld: 1599, baseNew: 949, sizes: ["S","M","L","XL"], colors: ["Dusty Olive", "Rust Brown"] },
  { name: "Long Sleeve Thermal Waffle Knit Polo Shirt", type: "polo", season: "winter", style: "casual", occasion: "office", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL"], colors: ["Charcoal", "Mocha", "Navy"] },
  { name: "Fine Stripe Melange Cotton Everyday Polo", type: "polo", season: "summer", style: "casual", occasion: "office", baseOld: 1699, baseNew: 999, sizes: ["S","M","L","XL"], colors: ["Blue Stripe", "Grey Stripe"] },
  { name: "Open Camp Collar Knitted Silk Blend Polo", type: "polo", season: "summer", style: "partywear", occasion: "party", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Onyx Black", "Sand Gold"] },
  { name: "Subtle Jacquard Pattern Tailored Fit Polo", type: "polo", season: "summer", style: "casual", occasion: "office", baseOld: 1899, baseNew: 1149, sizes: ["S","M","L","XL"], colors: ["Burgundy", "Deep Navy"] },
  { name: "Organic Pima Cotton Luxury Pocket Polo", type: "polo", season: "summer", style: "casual", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL","XXL"], colors: ["Pure White", "Forest Green"] },

  // 133-142: Shorts (10 products)
  { name: "French Terry Lightweight Drawstring Sweat Shorts", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 1399, baseNew: 799, sizes: ["S","M","L","XL"], colors: ["Heather Grey", "Black", "Navy"] },
  { name: "Stretch Cotton Tailored Chino Shorts", type: "shorts", season: "summer", style: "casual", occasion: "vacation", baseOld: 1699, baseNew: 999, sizes: ["30","32","34","36"], colors: ["British Tan", "Sage Green", "Navy"] },
  { name: "Utility 6-Pocket Heavy Duty Cargo Shorts", type: "shorts", season: "summer", style: "streetwear", occasion: "outdoor", baseOld: 1899, baseNew: 1099, sizes: ["30","32","34","36"], colors: ["Army Olive", "Desert Sand", "Black"] },
  { name: "Pure Linen Relaxed Fit Beach Shorts", type: "shorts", season: "summer", style: "casual", occasion: "vacation", baseOld: 1799, baseNew: 1049, sizes: ["S","M","L","XL"], colors: ["Natural Cream", "Sky Blue"] },
  { name: "Distressed Denim Cut-Off Retro Jean Shorts", type: "shorts", season: "summer", style: "streetwear", occasion: "party", baseOld: 1699, baseNew: 999, sizes: ["30","32","34","36"], colors: ["Light Stonewash", "Washed Black"] },
  { name: "Quick-Dry 2-in-1 Running Athletic Shorts", type: "shorts", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 1599, baseNew: 899, sizes: ["S","M","L","XL"], colors: ["Charcoal/Volt", "Jet Black"] },
  { name: "Waffle Knit Lounge Comfort Casual Shorts", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 1499, baseNew: 849, sizes: ["S","M","L","XL"], colors: ["Oatmeal", "Dusty Blue"] },
  { name: "Tropical Floral Printed Poolside Boardshorts", type: "shorts", season: "summer", style: "casual", occasion: "vacation", baseOld: 1599, baseNew: 949, sizes: ["S","M","L","XL"], colors: ["Navy Flora", "Teal Palm"] },
  { name: "Heavyweight Double Knit Skate Cargo Shorts", type: "shorts", season: "summer", style: "streetwear", occasion: "daily", baseOld: 1799, baseNew: 1099, sizes: ["M","L","XL"], colors: ["Pitch Black", "Gunmetal"] },
  { name: "Drawstring Elastic Waist Vintage Chino Shorts", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 1499, baseNew: 899, sizes: ["S","M","L","XL"], colors: ["Olive", "Camel Tan"] },

  // 143-150: Ethnic Wear (8 products)
  { name: "Handloom Pure Cotton Mandarin Collar Short Kurta", type: "kurti", season: "summer", style: "ethnic", occasion: "festive", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL","XXL"], colors: ["Mustard Yellow", "Royal Blue", "Maroon"] },
  { name: "Silk Blend Asymmetric Hem Designer Kurta", type: "kurti", season: "all-season", style: "ethnic", occasion: "party", baseOld: 2799, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Emerald Green", "Wine Red"] },
  { name: "Embroidered Chikankari Festive Long Kurta", type: "kurti", season: "summer", style: "ethnic", occasion: "festive", baseOld: 2999, baseNew: 1799, sizes: ["S","M","L","XL","XXL"], colors: ["Pure White", "Pastel Mint", "Pale Peach"] },
  { name: "Jacquard Woven Traditional Sleeveless Nehru Jacket", type: "jacket", season: "winter", style: "ethnic", occasion: "festive", baseOld: 2999, baseNew: 1849, sizes: ["38","40","42","44"], colors: ["Gold/Black", "Maroon/Gold"] },
  { name: "Linen Cotton Casual Daily Wear Kurta Shirt", type: "kurti", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1799, baseNew: 1099, sizes: ["S","M","L","XL"], colors: ["Natural Cream", "Sky Blue"] },
  { name: "Printed Bandhani Pattern Festive Cotton Kurta", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2199, baseNew: 1349, sizes: ["S","M","L","XL"], colors: ["Ruby Red", "Indigo Blue"] },
  { name: "Matka Silk Textured Straight Cut Kurta", type: "kurti", season: "winter", style: "ethnic", occasion: "party", baseOld: 2699, baseNew: 1649, sizes: ["S","M","L","XL"], colors: ["Deep Navy", "Olive Gold"] },
  { name: "Pathani Style Roll-Up Sleeve Festive Kurta", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL","XXL"], colors: ["Jet Black", "Charcoal Grey"] }
];

// Raw product definitions for 150 Women products
const WOMEN_DEFINITIONS = [
  // 1-28: Dresses & Gowns (28 products)
  { name: "Floral Wrap Tiered Midi Summer Dress", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 2599, baseNew: 1499, sizes: ["XS","S","M","L","XL"], colors: ["Lavender Floral", "Sunflower Yellow", "Sage Green"] },
  { name: "Satin Silk Bias Cut Elegant Slip Dress", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 3299, baseNew: 1999, sizes: ["XS","S","M","L"], colors: ["Champagne Gold", "Emerald Green", "Classic Black"] },
  { name: "Smocked Puff Sleeve Cottagecore Midi Dress", type: "dress", season: "summer", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["XS","S","M","L","XL"], colors: ["Blush Pink", "Sky Blue Gingham", "Ivory"] },
  { name: "Floor-Length Pleated Velvet Evening Gown", type: "gown", season: "winter", style: "partywear", occasion: "party", baseOld: 4999, baseNew: 2999, sizes: ["S","M","L","XL"], colors: ["Deep Wine", "Midnight Navy", "Royal Emerald"] },
  { name: "Bohemian Embroidered Tiered Maxi Dress", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 3199, baseNew: 1899, sizes: ["S","M","L","XL"], colors: ["Off-White", "Terracotta Coral"] },
  { name: "Tailored Belted Linen Blend Shirt Dress", type: "dress", season: "summer", style: "casual", occasion: "office", baseOld: 2899, baseNew: 1749, sizes: ["XS","S","M","L","XL"], colors: ["Olive Khaki", "Sand Beige", "Navy"] },
  { name: "Ribbed Knit Long Sleeve Bodycon Midi Dress", type: "dress", season: "winter", style: "casual", occasion: "daily", baseOld: 2499, baseNew: 1499, sizes: ["XS","S","M","L"], colors: ["Mocha Brown", "Charcoal Melange", "Black"] },
  { name: "Off-Shoulder Ruffle Flounce Cocktail Dress", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 3499, baseNew: 2149, sizes: ["XS","S","M","L"], colors: ["Scarlet Red", "Jet Black"] },
  { name: "Polka Dot Retro Fit and Flare Sundress", type: "dress", season: "summer", style: "casual", occasion: "daily", baseOld: 2299, baseNew: 1349, sizes: ["XS","S","M","L","XL"], colors: ["Black/White Dots", "Red/White Dots"] },
  { name: "Sequined Sparkle Cutout Bodycon Party Dress", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 4299, baseNew: 2699, sizes: ["XS","S","M","L"], colors: ["Rose Gold", "Silver Metallic", "Onyx Black"] },
  { name: "Denim Button-Front Fitted Dungaree Dress", type: "dress", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2699, baseNew: 1599, sizes: ["XS","S","M","L"], colors: ["Medium Indigo", "Washed Black"] },
  { name: "Chiffon Layered Flutter Sleeve A-Line Dress", type: "dress", season: "summer", style: "casual", occasion: "party", baseOld: 2899, baseNew: 1799, sizes: ["S","M","L","XL"], colors: ["Dusty Rose", "Mint Green"] },
  { name: "Halter Neck Backless Satin Maxi Dress", type: "dress", season: "summer", style: "partywear", occasion: "vacation", baseOld: 3599, baseNew: 2299, sizes: ["XS","S","M","L"], colors: ["Cobalt Blue", "Terracotta"] },
  { name: "Sweater Knit Turtleneck Winter Jumper Dress", type: "dress", season: "winter", style: "casual", occasion: "daily", baseOld: 2999, baseNew: 1849, sizes: ["S","M","L","XL"], colors: ["Oatmeal Heather", "Forest Green"] },
  { name: "Eyelet Lace White Cotton Romantic Midi Dress", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 3199, baseNew: 1949, sizes: ["XS","S","M","L"], colors: ["Pure White", "Buttercup Yellow"] },
  { name: "Asymmetric High-Low Hem Party Wrap Dress", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 3299, baseNew: 1999, sizes: ["XS","S","M","L"], colors: ["Royal Plum", "Navy Blue"] },
  { name: "Floral Jacquard Structured Mini Dress", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 3399, baseNew: 2099, sizes: ["XS","S","M","L"], colors: ["Pastel Blossom", "Gold/Black"] },
  { name: "Casual Striped French Terry T-Shirt Dress", type: "dress", season: "summer", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1099, sizes: ["XS","S","M","L","XL"], colors: ["Navy/White Stripe", "Olive Stripe"] },
  { name: "Sweetheart Neckline Floral Georgette Gown", type: "gown", season: "all-season", style: "partywear", occasion: "festive", baseOld: 4699, baseNew: 2899, sizes: ["S","M","L","XL"], colors: ["Blush Peach", "Powder Blue"] },
  { name: "Tiered Ruffle Organza Sleeveless Party Dress", type: "dress", season: "summer", style: "partywear", occasion: "party", baseOld: 3799, baseNew: 2399, sizes: ["XS","S","M","L"], colors: ["Lilac Purple", "Pearl Ivory"] },
  { name: "Classic Trench Style Double-Breasted Dress", type: "dress", season: "winter", style: "formal", occasion: "office", baseOld: 3899, baseNew: 2449, sizes: ["S","M","L","XL"], colors: ["Camel Tan", "Charcoal"] },
  { name: "Abstract Watercolor Pleated Halter Maxi Dress", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 3499, baseNew: 2199, sizes: ["S","M","L","XL"], colors: ["Sunset Multicolor", "Ocean Blue"] },
  { name: "Ruched Mesh Long Sleeve Sexy Club Dress", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 2799, baseNew: 1749, sizes: ["XS","S","M","L"], colors: ["Wine Red", "Pitch Black"] },
  { name: "Pure Cotton Handblock Print Midi Flared Dress", type: "dress", season: "summer", style: "ethnic", occasion: "daily", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL","XXL"], colors: ["Indigo Dabu", "Madder Red"] },
  { name: "Linen Babydoll Square Neck Mini Dress", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 2199, baseNew: 1299, sizes: ["XS","S","M","L"], colors: ["Sage", "Coral", "White"] },
  { name: "Embroidered Mirror Work Festive Anarkali Gown", type: "gown", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 5299, baseNew: 3299, sizes: ["S","M","L","XL"], colors: ["Teal Green", "Deep Magenta"] },
  { name: "Corset Waist Tiered Skirt Romantic Midi Dress", type: "dress", season: "summer", style: "casual", occasion: "party", baseOld: 3399, baseNew: 2099, sizes: ["XS","S","M","L"], colors: ["Baby Blue", "Mocha Rose"] },
  { name: "One-Shoulder Drape Satin Grecian Maxi Gown", type: "gown", season: "all-season", style: "partywear", occasion: "party", baseOld: 4499, baseNew: 2799, sizes: ["XS","S","M","L"], colors: ["Emerald", "Champagne"] },

  // 29-54: Tops & Blouses (26 products)
  { name: "Silk Satin Cowl Neck Sleeveless Blouse", type: "top", season: "all-season", style: "partywear", occasion: "party", baseOld: 1999, baseNew: 1199, sizes: ["XS","S","M","L","XL"], colors: ["Champagne", "Burgundy", "Black"] },
  { name: "Floral Print Chiffon Tie-Neck Office Blouse", type: "blouse", season: "all-season", style: "formal", occasion: "office", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Blush Floral", "Navy Polka"] },
  { name: "Ruffled Flutter Sleeve Peplum Cotton Top", type: "top", season: "summer", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1049, sizes: ["XS","S","M","L","XL"], colors: ["Pastel Yellow", "Sky Blue", "White"] },
  { name: "Organza Sheer Statement Puff Sleeve Blouse", type: "blouse", season: "all-season", style: "partywear", occasion: "party", baseOld: 2599, baseNew: 1599, sizes: ["XS","S","M","L"], colors: ["Ivory White", "Onyx Black"] },
  { name: "Smocked Bodice Square Neck Cotton Peplum Top", type: "top", season: "summer", style: "casual", occasion: "vacation", baseOld: 1899, baseNew: 1149, sizes: ["XS","S","M","L"], colors: ["Gingham Sage", "Dusty Pink"] },
  { name: "Embroidered Chikankari Work Cotton Tunic Top", type: "top", season: "summer", style: "ethnic", occasion: "daily", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL","XXL"], colors: ["White", "Powder Blue", "Peach"] },
  { name: "Ribbed Sweetheart Neck Long Sleeve Fitted Top", type: "top", season: "winter", style: "casual", occasion: "daily", baseOld: 1699, baseNew: 999, sizes: ["XS","S","M","L"], colors: ["Mocha", "Black", "Ivory"] },
  { name: "Wrap Front Surplice Draped Satin Blouse", type: "blouse", season: "all-season", style: "formal", occasion: "office", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL"], colors: ["Emerald Green", "Wine Red", "Navy"] },
  { name: "Lace Trim V-Neck Boho Chiffon Blouse", type: "blouse", season: "summer", style: "casual", occasion: "vacation", baseOld: 2099, baseNew: 1249, sizes: ["S","M","L","XL"], colors: ["Off-White", "Terracotta"] },
  { name: "Button-Down Linen Blend Relaxed Work Shirt", type: "shirt", season: "summer", style: "casual", occasion: "office", baseOld: 2299, baseNew: 1399, sizes: ["XS","S","M","L","XL"], colors: ["Sand Beige", "Olive", "White"] },
  { name: "Cropped Ribbed Tank with Lettuce Edge Trim", type: "top", season: "summer", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["XS","S","M","L"], colors: ["Baby Pink", "Sage Green", "White"] },
  { name: "Sequined Metallic Halter Party Crop Top", type: "top", season: "all-season", style: "partywear", occasion: "party", baseOld: 2299, baseNew: 1399, sizes: ["XS","S","M","L"], colors: ["Silver", "Rose Gold", "Black"] },
  { name: "Eyelet Embroidered Balloon Sleeve Peplum Top", type: "top", season: "summer", style: "casual", occasion: "daily", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Pure White", "Lilac"] },
  { name: "Corset Style Boned Structured Bustier Top", type: "top", season: "all-season", style: "partywear", occasion: "party", baseOld: 2499, baseNew: 1549, sizes: ["XS","S","M","L"], colors: ["Black Satin", "Ruby Red"] },
  { name: "Asymmetric One-Shoulder Ribbed Stretch Top", type: "top", season: "all-season", style: "partywear", occasion: "party", baseOld: 1599, baseNew: 949, sizes: ["XS","S","M","L"], colors: ["Cocoa Brown", "Off-White"] },
  { name: "Georgette Floral Flutter Sleeve Wrap Blouse", type: "blouse", season: "summer", style: "casual", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL"], colors: ["Pink Blossom", "Navy Flora"] },
  { name: "Mesh Ruched Long Sleeve Graphic Print Top", type: "top", season: "all-season", style: "streetwear", occasion: "party", baseOld: 1799, baseNew: 1049, sizes: ["XS","S","M","L"], colors: ["Abstract Blue", "Monochrome"] },
  { name: "Mandarin Collar Handblock Printed Cotton Kurti Top", type: "top", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1699, baseNew: 999, sizes: ["S","M","L","XL","XXL"], colors: ["Indigo Blue", "Turmeric Yellow"] },
  { name: "High-Neck Sleeveless Ribbed Knit Top", type: "top", season: "all-season", style: "casual", occasion: "office", baseOld: 1499, baseNew: 899, sizes: ["XS","S","M","L"], colors: ["Charcoal", "Caramel", "Black"] },
  { name: "Keyhole Back Pearl Button Chiffon Blouse", type: "blouse", season: "all-season", style: "formal", occasion: "office", baseOld: 2199, baseNew: 1349, sizes: ["S","M","L","XL"], colors: ["Ivory", "Mauve"] },
  { name: "Off-Shoulder Bardot Ruffled Smocked Crop Top", type: "top", season: "summer", style: "casual", occasion: "vacation", baseOld: 1699, baseNew: 999, sizes: ["XS","S","M","L"], colors: ["Floral Multi", "White"] },
  { name: "Linen Blend Knot Front Vacation Crop Top", type: "top", season: "summer", style: "casual", occasion: "vacation", baseOld: 1599, baseNew: 949, sizes: ["XS","S","M","L"], colors: ["Terracotta", "Olive"] },
  { name: "Pleated Velvet Cap Sleeve Winter Party Top", type: "top", season: "winter", style: "partywear", occasion: "party", baseOld: 2399, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Emerald", "Wine"] },
  { name: "Fringe Hem Bohemian Embroidered Festival Top", type: "top", season: "summer", style: "casual", occasion: "vacation", baseOld: 2099, baseNew: 1249, sizes: ["S","M","L"], colors: ["Cream", "Black"] },
  { name: "Poplin Big Bow Collar Statement Shirt", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 2499, baseNew: 1549, sizes: ["S","M","L","XL"], colors: ["Crisp White", "French Blue"] },
  { name: "Drawstring Cinched Front Y2K Baby Tee Top", type: "top", season: "summer", style: "streetwear", occasion: "daily", baseOld: 1299, baseNew: 749, sizes: ["XS","S","M","L"], colors: ["Baby Pink", "Lavender"] },

  // 55-70: T-Shirts & Graphic Tees (16 products)
  { name: "Organic Cotton Boxy Oversized Vintage Tee", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1299, baseNew: 749, sizes: ["XS","S","M","L","XL"], colors: ["Washed Charcoal", "Off-White", "Sage"] },
  { name: "Floral Botanical Aesthetic Graphic T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1199, baseNew: 699, sizes: ["S","M","L","XL"], colors: ["Vanilla Cream", "Dusty Pink"] },
  { name: "French Stripe Breton Cotton Long Sleeve Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1499, baseNew: 899, sizes: ["XS","S","M","L"], colors: ["Navy/White", "Black/Beige"] },
  { name: "Ribbed Crew Neck Fitted Everyday Essential Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["XS","S","M","L","XL"], colors: ["Black", "White", "Heather Grey"] },
  { name: "Retro Sunset Beach Palm Graphic Crop Tee", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1199, baseNew: 699, sizes: ["XS","S","M","L"], colors: ["Coral Sunset", "Faded Teal"] },
  { name: "Celestial Moon & Star Foil Print Black Tee", type: "tshirt", season: "all-season", style: "streetwear", occasion: "party", baseOld: 1399, baseNew: 799, sizes: ["S","M","L","XL"], colors: ["Black Gold", "Black Silver"] },
  { name: "Distressed Acid Wash Rock Band Oversized Tee", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1599, baseNew: 949, sizes: ["S","M","L","XL"], colors: ["Acid Slate", "Washed Olive"] },
  { name: "Tie-Dye Pastel Swirl Summer Festival Tee", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1299, baseNew: 749, sizes: ["XS","S","M","L"], colors: ["Pastel Rainbow", "Cotton Candy"] },
  { name: "Deep V-Neck Slub Cotton Relaxed T-Shirt", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1099, baseNew: 599, sizes: ["S","M","L","XL"], colors: ["White", "Olive", "Navy"] },
  { name: "Embroidered Daisy Flower Pocket Cotton Tee", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1299, baseNew: 749, sizes: ["XS","S","M","L"], colors: ["Butter Yellow", "Sky Blue"] },
  { name: "Typography Minimal Self-Love Graphic Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1199, baseNew: 649, sizes: ["S","M","L","XL"], colors: ["Eggshell White", "Mocha"] },
  { name: "Raw Cut Muscle Armhole Workout Tank Tee", type: "tshirt", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 1099, baseNew: 599, sizes: ["XS","S","M","L"], colors: ["Lilac", "Steel Grey"] },
  { name: "Vintage 70s Ringer Contrast Trim Baby Tee", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1199, baseNew: 699, sizes: ["XS","S","M","L"], colors: ["White/Red", "Cream/Green"] },
  { name: "Waffle Knit Thermal Long Sleeve Henley Tee", type: "tshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1499, baseNew: 899, sizes: ["S","M","L","XL"], colors: ["Oatmeal", "Dusty Rose"] },
  { name: "Art Deco Abstract Line Face Graphic T-Shirt", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1399, baseNew: 799, sizes: ["S","M","L","XL"], colors: ["White/Black Line", "Terracotta"] },
  { name: "Pima Cotton High-Neck Fitted Luxury Tee", type: "tshirt", season: "all-season", style: "casual", occasion: "office", baseOld: 1399, baseNew: 799, sizes: ["XS","S","M","L"], colors: ["Pure Black", "Pure White"] },

  // 71-86: Jeans & Denim (16 products)
  { name: "High-Rise Wide Leg Rigid Retro Denim Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 3199, baseNew: 1899, sizes: ["26","28","30","32","34"], colors: ["Vintage Light Blue", "Washed Indigo"] },
  { name: "Classic Straight Leg Ankle Crop Stretch Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "office", baseOld: 2799, baseNew: 1699, sizes: ["26","28","30","32","34"], colors: ["Dark Blue", "Jet Black"] },
  { name: "High-Waisted Vintage Mom Fit Comfort Denim", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2899, baseNew: 1749, sizes: ["26","28","30","32","34"], colors: ["Mid Blue Stonewash", "Faded Grey"] },
  { name: "Flared Bootcut High-Rise 70s Indigo Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "party", baseOld: 3299, baseNew: 1999, sizes: ["26","28","30","32"], colors: ["Deep Indigo", "Classic Blue"] },
  { name: "Distressed Ripped Knee Boyfriend Baggy Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 3399, baseNew: 2099, sizes: ["26","28","30","32"], colors: ["Bleached Ice", "Washed Charcoal"] },
  { name: "Clean White High-Rise Straight Summer Jeans", type: "jeans", season: "summer", style: "casual", occasion: "vacation", baseOld: 2699, baseNew: 1599, sizes: ["26","28","30","32"], colors: ["Crisp White", "Ecru Cream"] },
  { name: "Super Skinny Sculpting High-Waist Black Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2599, baseNew: 1499, sizes: ["26","28","30","32","34"], colors: ["Carbon Black"] },
  { name: "Cargo Denim Multi-Pocket Relaxed Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 3499, baseNew: 2199, sizes: ["26","28","30","32"], colors: ["Tinted Indigo", "Army Denim"] },
  { name: "Slit Hem Flare Ankle Length Stretch Denim", type: "jeans", season: "all-season", style: "partywear", occasion: "party", baseOld: 2999, baseNew: 1799, sizes: ["26","28","30","32"], colors: ["Dark Wash", "Black"] },
  { name: "Acid Wash 80s Tapered Peg Leg Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2999, baseNew: 1799, sizes: ["26","28","30","32"], colors: ["Acid Blue", "Acid Grey"] },
  { name: "Paperbag Waist Tie-Belt Denim Jeans", type: "jeans", season: "summer", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1649, sizes: ["26","28","30","32"], colors: ["Light Wash", "Medium Wash"] },
  { name: "Two-Tone Split Colorblock Wide Leg Jeans", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 3599, baseNew: 2299, sizes: ["26","28","30","32"], colors: ["Light/Dark Denim"] },
  { name: "Raw Hem Cropped Kick Flare Denim Jeans", type: "jeans", season: "summer", style: "casual", occasion: "vacation", baseOld: 2899, baseNew: 1699, sizes: ["26","28","30","32"], colors: ["Vintage Mid-Rise", "White"] },
  { name: "Fleece Lined Winter Thermal Skinny Jeans", type: "jeans", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3299, baseNew: 1999, sizes: ["26","28","30","32","34"], colors: ["Black Denim", "Dark Blue"] },
  { name: "Embroidered Floral Pocket Straight Jeans", type: "jeans", season: "summer", style: "casual", occasion: "daily", baseOld: 3199, baseNew: 1899, sizes: ["26","28","30","32"], colors: ["Light Blue Floral"] },
  { name: "Elastic Back High-Rise Comfort Mom Jeans", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 2699, baseNew: 1599, sizes: ["26","28","30","32","34"], colors: ["Medium Indigo", "Charcoal"] },

  // 87-102: Trousers & Pants (16 products)
  { name: "High-Waisted Wide Leg Tailored Palazzo Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 2999, baseNew: 1799, sizes: ["26","28","30","32","34"], colors: ["Cream Ivory", "Classic Black", "Camel Tan"] },
  { name: "Pleated Linen Blend Summer Cigarette Pants", type: "trouser", season: "summer", style: "casual", occasion: "office", baseOld: 2599, baseNew: 1549, sizes: ["26","28","30","32"], colors: ["Sand Beige", "Olive Green", "White"] },
  { name: "Paperbag Tie Waist Tapered Stretch Pants", type: "trouser", season: "all-season", style: "casual", occasion: "daily", baseOld: 2399, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Dusty Pink", "Navy Blue", "Khaki"] },
  { name: "Satin Silk High-Waist Flowy Lounge Trousers", type: "trouser", season: "all-season", style: "partywear", occasion: "party", baseOld: 2899, baseNew: 1749, sizes: ["XS","S","M","L"], colors: ["Champagne Gold", "Emerald", "Black"] },
  { name: "Streetwear 8-Pocket Utility Cargo Jogger Pants", type: "trouser", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["XS","S","M","L"], colors: ["Army Green", "Stealth Black", "Beige"] },
  { name: "Ankle Slit Tailored Modern Formal Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 2899, baseNew: 1699, sizes: ["26","28","30","32"], colors: ["Charcoal Grey", "Midnight Blue"] },
  { name: "Ribbed Flared Hem Cozy Winter Knit Pants", type: "trouser", season: "winter", style: "casual", occasion: "daily", baseOld: 2299, baseNew: 1349, sizes: ["S","M","L","XL"], colors: ["Oatmeal Heather", "Mocha Brown"] },
  { name: "Pinstripe Executive High-Rise Suit Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 3199, baseNew: 1899, sizes: ["26","28","30","32"], colors: ["Black/White Stripe", "Navy/White Stripe"] },
  { name: "Smocked Waist Cotton Gauze Beach Pants", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Terracotta", "White", "Sky Blue"] },
  { name: "Side Stripe Track Joggers Streetwear Pants", type: "trouser", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 2299, baseNew: 1399, sizes: ["XS","S","M","L"], colors: ["Black/White", "Navy/Red"] },
  { name: "Corduroy Straight Leg High-Waist Autumn Pants", type: "trouser", season: "winter", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["26","28","30","32"], colors: ["Rust Orange", "Forest Olive"] },
  { name: "Faux Leather High-Rise Straight Ankle Pants", type: "trouser", season: "winter", style: "partywear", occasion: "party", baseOld: 3499, baseNew: 2199, sizes: ["26","28","30","32"], colors: ["Matte Black", "Deep Burgundy"] },
  { name: "Pleated Houndstooth Wool Blend Winter Trousers", type: "trouser", season: "winter", style: "formal", occasion: "office", baseOld: 3299, baseNew: 1999, sizes: ["26","28","30","32"], colors: ["Black/White Houndstooth"] },
  { name: "Drawstring Wide Leg Linen Culottes Pants", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 2499, baseNew: 1449, sizes: ["S","M","L","XL"], colors: ["Sage Green", "Cream"] },
  { name: "Scuba Knit High-Stretch Slim Cigarette Trousers", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 2699, baseNew: 1599, sizes: ["S","M","L","XL"], colors: ["Navy", "Black", "Taupe"] },
  { name: "Printed Bohemian Rayon Harem Palazzo Pants", type: "trouser", season: "summer", style: "ethnic", occasion: "vacation", baseOld: 1999, baseNew: 1149, sizes: ["Free Size", "S","M","L","XL"], colors: ["Mandala Blue", "Paisley Multi"] },

  // 103-118: Kurtis & Ethnic Wear (16 products)
  { name: "Chikankari Hand Embroidered Pure Cotton Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "daily", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL","XXL"], colors: ["Pastel Mint", "Lilac", "Powder Blue", "Pure White"] },
  { name: "Anarkali Flared Floor-Length Georgette Kurta", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 3499, baseNew: 2199, sizes: ["S","M","L","XL"], colors: ["Ruby Red", "Royal Teal", "Mustard"] },
  { name: "Straight Cut Rayon Daily Wear Office Kurta", type: "kurti", season: "all-season", style: "ethnic", occasion: "office", baseOld: 1799, baseNew: 999, sizes: ["S","M","L","XL","XXL"], colors: ["Navy Blue", "Olive", "Maroon"] },
  { name: "Handblock Bagru Printed A-Line Cotton Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["S","M","L","XL"], colors: ["Indigo Dabu", "Madder Black"] },
  { name: "Mirror Work Festive Chanderi Silk Kurta Set", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 4299, baseNew: 2699, sizes: ["S","M","L","XL"], colors: ["Emerald Gold", "Wine Zari"] },
  { name: "Asymmetric High-Low Hem Designer Tunic Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "party", baseOld: 2299, baseNew: 1399, sizes: ["S","M","L","XL"], colors: ["Coral Peach", "Teal"] },
  { name: "Angrakha Style Tie-Up Flared Cotton Kurta", type: "kurti", season: "summer", style: "ethnic", occasion: "festive", baseOld: 2799, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Turmeric Yellow", "Dusty Pink"] },
  { name: "Foil Printed Festive Rayon Kurta with Palazzo Set", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 3299, baseNew: 1999, sizes: ["S","M","L","XL","XXL"], colors: ["Midnight Blue Gold", "Bottle Green Gold"] },
  { name: "Linen Blend Mandarin Collar Casual Shirt Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "office", baseOld: 2199, baseNew: 1299, sizes: ["S","M","L","XL"], colors: ["Oatmeal", "Sky Blue"] },
  { name: "Bandhani Print Rajasthani Cotton Ghera Kurti", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL"], colors: ["Red/Yellow", "Pink/Orange"] },
  { name: "Velvet Embroidered Winter Kurta with Zari Border", type: "kurti", season: "winter", style: "ethnic", occasion: "party", baseOld: 3999, baseNew: 2499, sizes: ["S","M","L","XL"], colors: ["Deep Wine", "Peacock Blue"] },
  { name: "Kalamkari Printed Cotton Straight Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["S","M","L","XL","XXL"], colors: ["Earth Brown", "Rust Beige"] },
  { name: "Zari Threadwork Organza Festive Dupatta Set", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 4599, baseNew: 2899, sizes: ["S","M","L","XL"], colors: ["Blush Gold", "Sage Gold"] },
  { name: "Khadi Cotton Minimalist Button Front Short Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1699, baseNew: 949, sizes: ["S","M","L","XL"], colors: ["Natural Khadi", "Sage"] },
  { name: "Tiered Gota Patti Work Festive Anarkali", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 3699, baseNew: 2299, sizes: ["S","M","L","XL"], colors: ["Marigold Yellow", "Rani Pink"] },
  { name: "Sleeveless Floral Georgette Summer Kurti", type: "kurti", season: "summer", style: "ethnic", occasion: "vacation", baseOld: 1799, baseNew: 1049, sizes: ["S","M","L","XL"], colors: ["Pastel Blossom", "Aqua"] },

  // 119-128: Skirts (10 products)
  { name: "Pleated Satin High-Waist Flowy Midi Skirt", type: "skirt", season: "all-season", style: "partywear", occasion: "party", baseOld: 2499, baseNew: 1499, sizes: ["XS","S","M","L"], colors: ["Champagne", "Emerald Green", "Jet Black"] },
  { name: "Tiered Floral Print Bohemian Maxi Skirt", type: "skirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 2299, baseNew: 1349, sizes: ["S","M","L","XL"], colors: ["Sunflower Yellow", "Sage Green"] },
  { name: "Denim Button-Front High-Rise A-Line Mini Skirt", type: "skirt", season: "summer", style: "streetwear", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["XS","S","M","L"], colors: ["Light Stonewash", "Washed Black"] },
  { name: "Tailored High-Waisted Plaid Pencil Office Skirt", type: "skirt", season: "all-season", style: "formal", occasion: "office", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL"], colors: ["Grey Houndstooth", "Navy Check"] },
  { name: "Ribbed Knit Side Slit Winter Midi Skirt", type: "skirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2199, baseNew: 1299, sizes: ["XS","S","M","L"], colors: ["Oatmeal Heather", "Mocha Brown"] },
  { name: "Tulle Layered Tutu Romantic Prom Skirt", type: "skirt", season: "all-season", style: "partywear", occasion: "party", baseOld: 2999, baseNew: 1799, sizes: ["S","M","L"], colors: ["Dusty Pink", "Pearl Grey"] },
  { name: "Linen Blend Button-Down Front Summer Midi Skirt", type: "skirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 2299, baseNew: 1399, sizes: ["XS","S","M","L"], colors: ["Terracotta", "Olive"] },
  { name: "Faux Leather Pleated Asymmetric Mini Skirt", type: "skirt", season: "winter", style: "partywear", occasion: "party", baseOld: 2699, baseNew: 1599, sizes: ["XS","S","M","L"], colors: ["Glossy Black", "Burgundy"] },
  { name: "Polka Dot Smocked Waist Tiered Ruffle Skirt", type: "skirt", season: "summer", style: "casual", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["XS","S","M","L"], colors: ["Black/White Dots", "Red/White Dots"] },
  { name: "Wrap Around Bohemian Tie-Waist Beach Skirt", type: "skirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1799, baseNew: 999, sizes: ["Free Size", "S","M","L"], colors: ["Mandala Teal", "Sunset Floral"] },

  // 129-138: Jackets & Outerwear (10 products)
  { name: "Cropped Trucker Distressed Denim Jacket", type: "jacket", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 3299, baseNew: 1999, sizes: ["XS","S","M","L","XL"], colors: ["Vintage Mid Blue", "Washed Charcoal"] },
  { name: "Faux Leather Moto Biker Zip Jacket", type: "jacket", season: "winter", style: "partywear", occasion: "party", baseOld: 3999, baseNew: 2499, sizes: ["XS","S","M","L"], colors: ["Jet Black", "Cognac Tan"] },
  { name: "Double-Breasted Classic Belted Trench Coat", type: "jacket", season: "winter", style: "formal", occasion: "office", baseOld: 4999, baseNew: 2999, sizes: ["S","M","L","XL"], colors: ["Camel Khaki", "Stone Beige", "Black"] },
  { name: "Boucle Tweed Parisian Structured Crop Jacket", type: "blazer", season: "winter", style: "formal", occasion: "office", baseOld: 4299, baseNew: 2699, sizes: ["XS","S","M","L"], colors: ["Cream/Gold Button", "Black/White Tweed"] },
  { name: "Quilted Puffer Warm Winter Jacket with Hood", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3799, baseNew: 2299, sizes: ["S","M","L","XL"], colors: ["Matte Olive", "Black", "Pearl White"] },
  { name: "Oversized Relaxed Boyfriend Wool Blazer", type: "blazer", season: "all-season", style: "formal", occasion: "office", baseOld: 4499, baseNew: 2799, sizes: ["S","M","L","XL"], colors: ["Charcoal Check", "Camel", "Black"] },
  { name: "Sherpa Fleece Lined Corduroy Winter Jacket", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 3899, baseNew: 2399, sizes: ["S","M","L","XL"], colors: ["Caramel Tan", "Forest Green"] },
  { name: "Faux Fur Fluffy Glamour Cropped Evening Jacket", type: "jacket", season: "winter", style: "partywear", occasion: "party", baseOld: 4599, baseNew: 2799, sizes: ["XS","S","M","L"], colors: ["Snow White", "Dusty Pink", "Black"] },
  { name: "Lightweight Hooded Pastel Windbreaker Jacket", type: "jacket", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 2799, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Lilac/Mint", "Peach/White"] },
  { name: "Water-Resistant Parka with Drawstring Waist", type: "jacket", season: "winter", style: "casual", occasion: "outdoor", baseOld: 4499, baseNew: 2749, sizes: ["S","M","L","XL"], colors: ["Army Green", "Midnight Navy"] },

  // 139-150: Hoodies & Sweaters (12 products)
  { name: "Cable Knit Chunky Oversized Crewneck Sweater", type: "sweater", season: "winter", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["XS","S","M","L","XL"], colors: ["Cream Ivory", "Forest Green", "Mustard"] },
  { name: "Cropped Fleece Raw Hem Relaxed Pullover Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 2399, baseNew: 1449, sizes: ["XS","S","M","L"], colors: ["Heather Grey", "Baby Blue", "Black"] },
  { name: "Cashmere-Feel Ribbed Turtleneck Winter Sweater", type: "sweater", season: "winter", style: "formal", occasion: "office", baseOld: 3199, baseNew: 1949, sizes: ["S","M","L","XL"], colors: ["Oatmeal Heather", "Deep Wine", "Black"] },
  { name: "Button-Up V-Neck Knit Cardigan Sweater", type: "sweater", season: "all-season", style: "casual", occasion: "daily", baseOld: 2499, baseNew: 1499, sizes: ["XS","S","M","L"], colors: ["Sage Green", "Dusty Rose", "Ivory"] },
  { name: "Embroidered Floral Graphic Oversized Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "party", baseOld: 2699, baseNew: 1649, sizes: ["S","M","L","XL"], colors: ["Vanilla Cream", "Washed Charcoal"] },
  { name: "Colorblock Pastel Fleece Longline Hoodie", type: "hoodie", season: "winter", style: "casual", occasion: "daily", baseOld: 2599, baseNew: 1549, sizes: ["S","M","L","XL"], colors: ["Pink/Lilac/Mint", "Teal/Grey"] },
  { name: "Off-Shoulder Slouchy Mohair Knit Pullover", type: "sweater", season: "winter", style: "casual", occasion: "party", baseOld: 2899, baseNew: 1749, sizes: ["XS","S","M","L"], colors: ["Lavender", "Blush Pink"] },
  { name: "Zip-Front Boucle Knit Cozy Winter Hoodie", type: "hoodie", season: "winter", style: "casual", occasion: "daily", baseOld: 2799, baseNew: 1699, sizes: ["S","M","L","XL"], colors: ["Mocha", "Sand"] },
  { name: "Striped Drop-Shoulder Relaxed Knit Sweater", type: "sweater", season: "winter", style: "casual", occasion: "daily", baseOld: 2399, baseNew: 1449, sizes: ["S","M","L","XL"], colors: ["Black/White Stripe", "Beige/Navy Stripe"] },
  { name: "Balloon Sleeve Open-Front Chunky Long Cardigan", type: "sweater", season: "winter", style: "casual", occasion: "daily", baseOld: 3299, baseNew: 1999, sizes: ["S","M","L","XL"], colors: ["Taupe", "Rust Brown"] },
  { name: "Graphic Butterfly Print Oversized Fleece Hoodie", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 2599, baseNew: 1599, sizes: ["S","M","L","XL"], colors: ["Sky Blue", "Black"] },
  { name: "Fleece Lined Half-Zip Thermal Pullover Sweater", type: "sweater", season: "winter", style: "athletic", occasion: "outdoor", baseOld: 2499, baseNew: 1499, sizes: ["S","M","L","XL"], colors: ["Teal Green", "Heather Grey"] }
];

// Raw product definitions for 150 Kids products
const KIDS_DEFINITIONS = [
  // 1-35: T-Shirts & Tops (35 products)
  { name: "Dinosaur Kingdom Printed Pure Cotton Kids Tee (2-6Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 799, baseNew: 449, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Dino Green", "Ocean Blue", "Sunny Yellow"] },
  { name: "Safari Adventure Animal Graphic Tee (4-8Y)", type: "tshirt", season: "summer", style: "casual", occasion: "outdoor", baseOld: 849, baseNew: 499, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Safari Khaki", "Lion Orange"] },
  { name: "Unicorn Rainbow Magic Glitter Cotton Tee (2-6Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 899, baseNew: 499, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Cotton Candy Pink", "Lilac"] },
  { name: "Space Explorer Rocket Galaxy Tee (6-12Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 949, baseNew: 549, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Midnight Navy", "Cosmic Black"] },
  { name: "Colorblock Striped Crewneck Soft Cotton Tee (4-10Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 799, baseNew: 449, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Red/Navy/White", "Yellow/Teal"] },
  { name: "Floral Butterfly Ruffle Sleeve Cotton Top (2-8Y)", type: "top", season: "summer", style: "casual", occasion: "party", baseOld: 899, baseNew: 499, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Blush Peach", "Mint Blossom"] },
  { name: "Superhero Shield Power Graphic T-Shirt (6-12Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 999, baseNew: 599, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Hero Red", "Royal Blue"] },
  { name: "Cute Teddy Bear Embroidered Pocket Tee (2-5Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 799, baseNew: 449, sizes: ["2-3Y","4-5Y"], colors: ["Beige Tan", "Sky Blue"] },
  { name: "Skater Monster Graphic Heavyweight Tee (8-14Y)", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1099, baseNew: 649, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Washed Black", "Olive"] },
  { name: "Nautical Breton Striped Long Sleeve Tee (4-10Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "vacation", baseOld: 999, baseNew: 549, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Navy/White", "Red/White"] },
  { name: "Glow in the Dark Cosmic Alien Graphic Tee (6-12Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "party", baseOld: 999, baseNew: 599, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Jet Black", "Electric Green"] },
  { name: "Floral Daisy Print Smocked Peplum Baby Top (2-6Y)", type: "top", season: "summer", style: "casual", occasion: "vacation", baseOld: 899, baseNew: 499, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Butter Yellow", "Powder Pink"] },
  { name: "Active Moisture-Wicking Sports Play Tee (6-14Y)", type: "tshirt", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 899, baseNew: 499, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Neon Orange", "Cobalt Blue"] },
  { name: "Tie-Dye Swirl Funky Festival Cotton Tee (4-12Y)", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 949, baseNew: 549, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Pastel Rainbow", "Aqua Blast"] },
  { name: "Animal Print Tiger Roar Jungle T-Shirt (2-8Y)", type: "tshirt", season: "summer", style: "casual", occasion: "outdoor", baseOld: 849, baseNew: 479, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Tiger Orange", "Jungle Khaki"] },
  { name: "Heart Sequin Reversible Magic Graphic Tee (4-10Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "party", baseOld: 1049, baseNew: 599, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Rose Pink", "Lilac"] },
  { name: "Vintage Racing Car Retro Graphic Tee (6-14Y)", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 999, baseNew: 579, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Off-White", "Charcoal"] },
  { name: "Pure Organic Cotton 3-Button Polo Tee (4-12Y)", type: "polo", season: "summer", style: "casual", occasion: "office", baseOld: 1199, baseNew: 699, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Navy Blue", "Crisp White", "Burgundy"] },
  { name: "Ice Cream Cone Pastel Summer Graphic Tee (2-6Y)", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 799, baseNew: 449, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Strawberry Pink", "Vanilla Mint"] },
  { name: "Gaming Controller Pixel Level Up Tee (8-14Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 999, baseNew: 599, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Stealth Black", "Navy"] },
  { name: "Sweet Strawberry Print Frill Collar Baby Top (2-5Y)", type: "top", season: "summer", style: "casual", occasion: "daily", baseOld: 849, baseNew: 479, sizes: ["2-3Y","4-5Y"], colors: ["Berry Red", "Cream"] },
  { name: "Construction Trucks & Diggers Graphic Tee (2-6Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 799, baseNew: 449, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Digger Yellow", "Royal Blue"] },
  { name: "Typography Cool Kid Graphic Oversized Tee (6-12Y)", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 949, baseNew: 549, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Sand Tan", "Olive"] },
  { name: "Mermaid Scale Shimmer Foil Party Top (4-10Y)", type: "top", season: "summer", style: "partywear", occasion: "party", baseOld: 999, baseNew: 599, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Aqua Shimmer", "Purple Pearl"] },
  { name: "Camp Fire Adventure Mountain Graphic Tee (6-14Y)", type: "tshirt", season: "summer", style: "casual", occasion: "outdoor", baseOld: 899, baseNew: 499, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Pine Green", "Rust Orange"] },
  { name: "Ribbed Stretch Lettuce Edge Cotton Baby Tee (2-8Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 799, baseNew: 429, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Lavender", "Sage", "White"] },
  { name: "Soccer Champion Star Number Graphic Tee (6-14Y)", type: "tshirt", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 899, baseNew: 499, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Brazil Yellow", "Navy Gold"] },
  { name: "Cherry Blossom Embroidered Cotton Top (4-10Y)", type: "top", season: "summer", style: "casual", occasion: "daily", baseOld: 949, baseNew: 549, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Blush Pink", "White"] },
  { name: "Vintage Comic Superhero Action Scene Tee (6-12Y)", type: "tshirt", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1049, baseNew: 599, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Multi Comic", "Vintage White"] },
  { name: "Waffle Knit Long Sleeve Thermal Base Tee (4-12Y)", type: "tshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Oatmeal Heather", "Charcoal"] },
  { name: "Panda Bamboo Tree Forest Graphic Tee (2-6Y)", type: "tshirt", season: "summer", style: "casual", occasion: "daily", baseOld: 799, baseNew: 449, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Bamboo Mint", "Cream"] },
  { name: "Cute Kitten Whisker Cat Pocket Graphic Top (2-8Y)", type: "top", season: "summer", style: "casual", occasion: "daily", baseOld: 849, baseNew: 479, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Powder Pink", "Sky Blue"] },
  { name: "Rock & Roll Guitar Music Festival Tee (8-14Y)", type: "tshirt", season: "all-season", style: "streetwear", occasion: "party", baseOld: 1049, baseNew: 599, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Acid Black", "Heather Grey"] },
  { name: "Sunshine Yellow Smiling Sun Happy Tee (2-6Y)", type: "tshirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 749, baseNew: 399, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Bright Sun Yellow", "Coral"] },
  { name: "Essential Pack of Plain Pure Cotton Basics (4-12Y)", type: "tshirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 899, baseNew: 499, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Pure White", "Jet Black", "Navy"] },

  // 36-60: Dresses & Frocks (25 products)
  { name: "Floral Twirl Flared Cotton Birthday Party Dress (2-8Y)", type: "dress", season: "summer", style: "partywear", occasion: "party", baseOld: 1799, baseNew: 999, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Blush Pink Floral", "Aqua Blossom"] },
  { name: "Sparkle Sequined Tulle Birthday Princess Gown (4-10Y)", type: "gown", season: "all-season", style: "partywear", occasion: "party", baseOld: 2499, baseNew: 1499, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Rose Gold", "Lilac Fairy", "Silver Pearl"] },
  { name: "Polka Dot Smocked Bodice Vintage Summer Dress (2-6Y)", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 1499, baseNew: 849, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Red/White Dots", "Navy/White Dots"] },
  { name: "Denim Pinafore Overall Dress with Pocket (4-10Y)", type: "dress", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Medium Indigo", "Light Tint"] },
  { name: "Gingham Check Ruffled Holiday Sundress (2-8Y)", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 1599, baseNew: 899, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Sky Blue Gingham", "Yellow Gingham"] },
  { name: "Lace Tiered Elegant Flower Girl Gown (6-12Y)", type: "gown", season: "all-season", style: "partywear", occasion: "festive", baseOld: 2799, baseNew: 1699, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Snow White", "Champagne"] },
  { name: "Cute Strawberry Print Cotton A-Line Frock (2-5Y)", type: "dress", season: "summer", style: "casual", occasion: "daily", baseOld: 1299, baseNew: 749, sizes: ["2-3Y","4-5Y"], colors: ["Strawberry Red", "Vanilla Cream"] },
  { name: "Velvet Bow Winter Holiday Party Dress (4-10Y)", type: "dress", season: "winter", style: "partywear", occasion: "party", baseOld: 2299, baseNew: 1399, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Ruby Red", "Emerald Green", "Navy"] },
  { name: "Chiffon Butterfly Print Flutter Sleeve Dress (4-12Y)", type: "dress", season: "summer", style: "casual", occasion: "party", baseOld: 1799, baseNew: 1049, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Pastel Multi", "Lavender"] },
  { name: "Pure Linen Button-Down Summer Shirt Dress (6-12Y)", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 1999, baseNew: 1199, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Sage Olive", "Natural Sand"] },
  { name: "Rainbow Tulle Layered Unicorn Tutu Dress (2-7Y)", type: "dress", season: "summer", style: "partywear", occasion: "party", baseOld: 1899, baseNew: 1099, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Pastel Rainbow", "Bright Rainbow"] },
  { name: "Tiered Eyelet Cotton Ruffle Frock (2-6Y)", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 1699, baseNew: 999, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Pure White", "Lemon Yellow"] },
  { name: "Ribbed Knit Long Sleeve Winter Jumper Dress (6-12Y)", type: "dress", season: "winter", style: "casual", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Mocha", "Dusty Pink"] },
  { name: "Bohemian Paisley Print Tiered Maxi Dress (8-14Y)", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 2199, baseNew: 1299, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Turquoise Teal", "Coral"] },
  { name: "Embroidered Peter Pan Collar Sweet Dress (2-6Y)", type: "dress", season: "all-season", style: "casual", occasion: "party", baseOld: 1699, baseNew: 999, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Baby Blue", "Dusty Rose"] },
  { name: "Pleated Tartan Plaid Schoolgirl Winter Dress (6-12Y)", type: "dress", season: "winter", style: "casual", occasion: "office", baseOld: 1899, baseNew: 1099, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Red Tartan", "Navy/Green Plaid"] },
  { name: "Daisy Floral Print Tie-Shoulder Beach Sundress (4-10Y)", type: "dress", season: "summer", style: "casual", occasion: "vacation", baseOld: 1499, baseNew: 849, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Buttercup Yellow", "Lilac"] },
  { name: "Satin Shimmer Birthday Party Fit & Flare Dress (4-12Y)", type: "dress", season: "all-season", style: "partywear", occasion: "party", baseOld: 2399, baseNew: 1449, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Royal Blue", "Magenta Pink"] },
  { name: "Animal Leopard Print Fun Casual Shirt Dress (6-14Y)", type: "dress", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1799, baseNew: 1049, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Tan Leopard", "Monochrome"] },
  { name: "Ombre Sunset Gradient Chiffon Party Gown (8-14Y)", type: "gown", season: "summer", style: "partywear", occasion: "party", baseOld: 2699, baseNew: 1599, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Sunset Pink/Orange", "Ocean Blue/Teal"] },
  { name: "Soft Muslin Cotton Handblock Print Baby Frock (2-5Y)", type: "dress", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1399, baseNew: 799, sizes: ["2-3Y","4-5Y"], colors: ["Indigo Blue", "Turmeric"] },
  { name: "Metallic Star Foil Mesh Tiered Ballgown (4-10Y)", type: "gown", season: "all-season", style: "partywear", occasion: "party", baseOld: 2599, baseNew: 1549, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Midnight Gold Stars", "Silver Pink Stars"] },
  { name: "Corduroy Button-Front Winter Overall Dress (2-8Y)", type: "dress", season: "winter", style: "casual", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Mustard Tan", "Olive Green"] },
  { name: "Striped French Terry Hooded Sporty Dress (6-12Y)", type: "dress", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 1599, baseNew: 949, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Navy/White", "Grey/Pink"] },
  { name: "Smocked Bodice Chiffon Flounce Party Frock (2-7Y)", type: "dress", season: "summer", style: "partywear", occasion: "party", baseOld: 1699, baseNew: 999, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Candy Coral", "Sky Mint"] },

  // 61-80: Shirts (20 products)
  { name: "Classic Plaid Checkered Flannel Button Shirt (4-12Y)", type: "shirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1499, baseNew: 899, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Red/Navy Plaid", "Green/Black Plaid"] },
  { name: "Crisp Oxford Cotton Formal Party Shirt (4-14Y)", type: "shirt", season: "all-season", style: "formal", occasion: "party", baseOld: 1699, baseNew: 999, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Pure White", "Sky Blue", "Pale Pink"] },
  { name: "Linen Blend Mandarin Collar Casual Shirt (2-10Y)", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1599, baseNew: 949, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Natural Cream", "Sage Olive"] },
  { name: "Denim Snap-Button Western Workwear Shirt (4-12Y)", type: "shirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1099, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Medium Stonewash", "Dark Indigo"] },
  { name: "Tropical Island Palm Leaf Camp Collar Shirt (4-12Y)", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1399, baseNew: 799, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Navy Palm", "Olive Palm"] },
  { name: "Gingham Check Button-Down School Shirt (4-12Y)", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 1499, baseNew: 849, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Navy Gingham", "Black Gingham"] },
  { name: "Fine Corduroy Warm Casual Winter Overshirt (4-14Y)", type: "shirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1899, baseNew: 1149, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Tobacco Tan", "Forest Green"] },
  { name: "Dino Cartoon Print Short Sleeve Summer Shirt (2-6Y)", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1299, baseNew: 749, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Sky Blue", "Soft Yellow"] },
  { name: "Chambray Casual Roll-Up Sleeve Shirt (6-14Y)", type: "shirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1599, baseNew: 949, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Light Chambray", "Mid Chambray"] },
  { name: "Tuxedo Pleated Bib Formal Party Shirt with Bowtie (4-12Y)", type: "shirt", season: "all-season", style: "formal", occasion: "festive", baseOld: 2199, baseNew: 1299, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["White with Black Bow"] },
  { name: "Aztec Pattern Heavy Cotton Tribal Overshirt (8-14Y)", type: "shirt", season: "winter", style: "streetwear", occasion: "party", baseOld: 1999, baseNew: 1199, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Sand/Black", "Rust/Navy"] },
  { name: "Seersucker Striped Breathable Resort Shirt (4-10Y)", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1499, baseNew: 899, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Sky Stripe", "Navy Stripe"] },
  { name: "Micro Houndstooth Smart Button-Down Shirt (6-14Y)", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 1699, baseNew: 999, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Black/White", "Navy/Blue"] },
  { name: "Abstract Splash Paint Graphic Party Shirt (8-14Y)", type: "shirt", season: "summer", style: "streetwear", occasion: "party", baseOld: 1599, baseNew: 949, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Multi Splash", "Monochrome"] },
  { name: "Dual Cargo Pocket Utility Outdoor Shirt (6-12Y)", type: "shirt", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 1699, baseNew: 999, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Army Khaki", "Desert Tan"] },
  { name: "Floral Botanical Vintage Camp Shirt (4-12Y)", type: "shirt", season: "summer", style: "casual", occasion: "vacation", baseOld: 1399, baseNew: 799, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Cream Floral", "Teal Palm"] },
  { name: "Garment Washed Soft Twill Everyday Shirt (2-8Y)", type: "shirt", season: "all-season", style: "casual", occasion: "daily", baseOld: 1399, baseNew: 849, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Olive", "Dusty Coral"] },
  { name: "Windowpane Check Slim Smart Shirt (6-14Y)", type: "shirt", season: "all-season", style: "formal", occasion: "office", baseOld: 1599, baseNew: 949, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Navy Windowpane", "Grey Check"] },
  { name: "Heavy Twill Flannel Plaid Lumberjack Shirt (8-14Y)", type: "shirt", season: "winter", style: "casual", occasion: "outdoor", baseOld: 1899, baseNew: 1149, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Buffalo Red", "Buffalo Yellow"] },
  { name: "Festive Satin Gold Trim Band Collar Shirt (4-12Y)", type: "shirt", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 1799, baseNew: 1099, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Royal Maroon", "Emerald Green"] },

  // 81-105: Jeans & Trousers (25 products)
  { name: "Elastic Waistband Comfort Denim Play Joggers (2-8Y)", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 1599, baseNew: 899, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Mid Stonewash", "Dark Indigo"] },
  { name: "Reinforced Double Knee Tough Play Jeans (4-12Y)", type: "jeans", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 1799, baseNew: 1049, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Classic Blue", "Black Denim"] },
  { name: "Kids Stretch Twill Slim Chino Pants (4-14Y)", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 1699, baseNew: 999, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["British Khaki", "Navy Blue", "Olive"] },
  { name: "Fleece Lined Winter Thermal Track Joggers (4-12Y)", type: "trouser", season: "winter", style: "casual", occasion: "daily", baseOld: 1499, baseNew: 849, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Heather Grey", "Charcoal", "Black"] },
  { name: "Multi-Pocket Tactical Cargo Utility Pants (6-14Y)", type: "trouser", season: "all-season", style: "streetwear", occasion: "outdoor", baseOld: 1899, baseNew: 1149, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Army Olive", "Desert Sand", "Black"] },
  { name: "Ripped Knee Distressed Streetwear Denim (8-14Y)", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 1999, baseNew: 1199, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Washed Grey", "Bleach Light Blue"] },
  { name: "Soft Cotton Drawstring Casual Lounge Pants (2-8Y)", type: "trouser", season: "all-season", style: "casual", occasion: "daily", baseOld: 1199, baseNew: 649, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Sky Blue", "Navy", "Teal"] },
  { name: "Wide Leg 90s Skate Baggy Denim Jeans (8-14Y)", type: "jeans", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 2199, baseNew: 1299, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Vintage Light Blue", "Washed Black"] },
  { name: "Girls Floral Embroidered Stretch Skinny Jeans (4-12Y)", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1049, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Mid Blue Floral"] },
  { name: "Linen Blend Breathable Summer Beach Trousers (4-12Y)", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 1699, baseNew: 999, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Sand Beige", "White"] },
  { name: "Corduroy Warm Ribbed Winter Trousers (2-10Y)", type: "trouser", season: "winter", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1099, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Mustard Tan", "Forest Olive"] },
  { name: "Athletic Side Stripe Performance Track Pants (6-14Y)", type: "trouser", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 1599, baseNew: 899, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Black/White Stripe", "Navy/Red Stripe"] },
  { name: "Clean Dark Rinse Slim Fit Formal Denim (6-14Y)", type: "jeans", season: "all-season", style: "formal", occasion: "party", baseOld: 1899, baseNew: 1099, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Dark Blue", "Jet Black"] },
  { name: "Cotton Knit Stretch Daily Play Leggings (2-8Y)", type: "trouser", season: "all-season", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Dusty Pink", "Navy", "Heather Grey"] },
  { name: "Acid Wash Retro Straight Cut Kids Jeans (6-12Y)", type: "jeans", season: "all-season", style: "streetwear", occasion: "party", baseOld: 1899, baseNew: 1149, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Acid Blue", "Acid Grey"] },
  { name: "Tailored Pleated Formal Suit Trousers (6-14Y)", type: "trouser", season: "all-season", style: "formal", occasion: "party", baseOld: 1999, baseNew: 1199, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Charcoal Grey", "Navy"] },
  { name: "Camo Print Outdoor Adventure Cargo Pants (6-14Y)", type: "trouser", season: "all-season", style: "casual", occasion: "outdoor", baseOld: 1799, baseNew: 1049, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Woodland Camo", "Desert Camo"] },
  { name: "Paperbag Frill High-Waist Girls Denim (4-12Y)", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Light Wash", "Medium Wash"] },
  { name: "Heavy Canvas Carpenter Utility Pants (8-14Y)", type: "trouser", season: "all-season", style: "streetwear", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Caramel Tan", "Olive"] },
  { name: "Soft French Terry Rib Cuffed Sweatpants (2-6Y)", type: "trouser", season: "all-season", style: "casual", occasion: "daily", baseOld: 1299, baseNew: 699, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Sage Green", "Oatmeal"] },
  { name: "Whiskered Stretch Denim Bootcut Jeans (6-14Y)", type: "jeans", season: "all-season", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 1049, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Medium Indigo"] },
  { name: "Water-Resistant Outdoor Adventure Pants (6-14Y)", type: "trouser", season: "all-season", style: "athletic", occasion: "outdoor", baseOld: 1899, baseNew: 1149, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Black", "Graphite"] },
  { name: "Floral Print Cotton Gauze Summer Culottes (4-10Y)", type: "trouser", season: "summer", style: "casual", occasion: "vacation", baseOld: 1499, baseNew: 849, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Blush Floral", "Navy Floral"] },
  { name: "Relaxed Fit Cotton Khaki Uniform Pants (4-14Y)", type: "trouser", season: "all-season", style: "formal", occasion: "office", baseOld: 1599, baseNew: 899, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["School Khaki", "Navy"] },
  { name: "Colorblock Knee Panel Active Play Joggers (4-12Y)", type: "trouser", season: "all-season", style: "athletic", occasion: "daily", baseOld: 1499, baseNew: 849, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Navy/Orange", "Grey/Lime"] },

  // 106-125: Hoodies & Sweatshirts (20 products)
  { name: "Dino Ear 3D Hooded Heavy Fleece Winter Jacket (2-6Y)", type: "hoodie", season: "winter", style: "casual", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Dino Green", "Ocean Blue", "Mustard"] },
  { name: "Colorblock Retro 90s Kangaroo Pocket Hoodie (6-14Y)", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Navy/Red/Yellow", "Teal/Black"] },
  { name: "Sherpa Borg Ultra-Fluffy Teddy Bear Hoodie (2-8Y)", type: "hoodie", season: "winter", style: "casual", occasion: "outdoor", baseOld: 2199, baseNew: 1299, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Teddy Tan", "Snow White", "Mocha"] },
  { name: "Unicorn Magical Wings Embroidered Girls Hoodie (4-10Y)", type: "hoodie", season: "winter", style: "casual", occasion: "party", baseOld: 1999, baseNew: 1149, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Pastel Lilac", "Cotton Candy Pink"] },
  { name: "Classic French Terry Raglan Crewneck Sweatshirt (4-14Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1599, baseNew: 899, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Heather Grey", "Navy", "Maroon"] },
  { name: "Full Zip-Up Thermal Fleece Lined Winter Hoodie (4-14Y)", type: "hoodie", season: "winter", style: "casual", occasion: "outdoor", baseOld: 2199, baseNew: 1299, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Charcoal", "Army Green", "Black"] },
  { name: "Superhero Comic Action Graphic Pullover Sweatshirt (6-12Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1699, baseNew: 999, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Hero Red", "Royal Blue"] },
  { name: "Glow in Dark Star Print Celestial Fleece Hoodie (4-12Y)", type: "hoodie", season: "winter", style: "casual", occasion: "party", baseOld: 1999, baseNew: 1149, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Midnight Navy", "Black"] },
  { name: "Tie-Dye Swirl Funky Heavyweight Fleece Hoodie (6-14Y)", type: "hoodie", season: "winter", style: "streetwear", occasion: "party", baseOld: 1899, baseNew: 1099, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Rainbow Swirl", "Blue Galaxy"] },
  { name: "Varsity Letterman Patch Snap Button Cardigan (6-14Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 2299, baseNew: 1399, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Navy/Cream", "Burgundy/White"] },
  { name: "Cute Animal Face Ears Plush Winter Sweatshirt (2-6Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1699, baseNew: 949, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Panda White", "Bunny Pink"] },
  { name: "Skate Club Streetwear Oversized Graphic Hoodie (8-14Y)", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 1999, baseNew: 1199, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Acid Black", "Oatmeal"] },
  { name: "Pastel Colorblock Half-Zip Fleece Pullover (4-12Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "vacation", baseOld: 1799, baseNew: 1049, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Mint/Peach", "Lilac/Grey"] },
  { name: "Reversible Sequin Flip Graphic Winter Sweatshirt (4-10Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "party", baseOld: 1899, baseNew: 1099, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Navy/Silver", "Pink/Gold"] },
  { name: "Camo Print Heavyweight Kangaroo Pocket Hoodie (6-14Y)", type: "hoodie", season: "winter", style: "casual", occasion: "outdoor", baseOld: 1999, baseNew: 1149, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Green Camo", "Snow Camo"] },
  { name: "Cropped Ribbed Hem Girls Streetwear Hoodie (8-14Y)", type: "hoodie", season: "winter", style: "streetwear", occasion: "daily", baseOld: 1799, baseNew: 1049, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Dusty Pink", "Washed Black"] },
  { name: "Waffle Knit Mock Neck Thermal Lounge Sweater (4-12Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "daily", baseOld: 1599, baseNew: 899, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Sand Tan", "Olive"] },
  { name: "Vintage Gaming 8-Bit Pixel Character Hoodie (6-14Y)", type: "hoodie", season: "winter", style: "casual", occasion: "daily", baseOld: 1899, baseNew: 1099, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Charcoal", "Royal Blue"] },
  { name: "Heart Embroidered Fluffy Fleece Pullover (2-8Y)", type: "sweatshirt", season: "winter", style: "casual", occasion: "party", baseOld: 1699, baseNew: 999, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Berry Red", "Blush Cream"] },
  { name: "Performance Running Thermal Sports Zip Hoodie (8-14Y)", type: "hoodie", season: "winter", style: "athletic", occasion: "outdoor", baseOld: 2099, baseNew: 1249, sizes: ["8-9Y","10-11Y","12-13Y"], colors: ["Jet Black", "Electric Volt"] },

  // 126-140: Shorts & Sets (15 products)
  { name: "French Terry Cotton Drawstring Play Shorts (2-8Y)", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Heather Grey", "Navy", "Yellow"] },
  { name: "Denim Bermuda Roll-Up Hem Jean Shorts (4-12Y)", type: "shorts", season: "summer", style: "casual", occasion: "vacation", baseOld: 1399, baseNew: 799, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Medium Indigo", "Light Tint"] },
  { name: "Active Mesh Breathable Sports Basketball Shorts (6-14Y)", type: "shorts", season: "summer", style: "athletic", occasion: "outdoor", baseOld: 1099, baseNew: 599, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Red/White", "Royal Blue", "Black"] },
  { name: "Utility 4-Pocket Cotton Twill Cargo Shorts (4-12Y)", type: "shorts", season: "summer", style: "streetwear", occasion: "outdoor", baseOld: 1299, baseNew: 749, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Army Khaki", "Desert Sand"] },
  { name: "Cute Ruffle Hem Floral Summer Cotton Shorts (2-7Y)", type: "shorts", season: "summer", style: "casual", occasion: "vacation", baseOld: 949, baseNew: 499, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Sunflower Yellow", "Pink Floral"] },
  { name: "2-Piece Tropical Shirt and Chino Shorts Summer Set (2-8Y)", type: "co-ord", season: "summer", style: "casual", occasion: "vacation", baseOld: 2299, baseNew: 1299, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Palm Teal/Sand", "Coral/Navy"] },
  { name: "Quick-Dry Boardshorts Swimming Trunks (4-12Y)", type: "shorts", season: "summer", style: "athletic", occasion: "vacation", baseOld: 1199, baseNew: 649, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Shark Blue", "Neon Palm"] },
  { name: "Pure Linen Drawstring Beach Play Shorts (4-10Y)", type: "shorts", season: "summer", style: "casual", occasion: "vacation", baseOld: 1399, baseNew: 799, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Natural Cream", "Sage"] },
  { name: "Distressed Knee Ripped Denim Jean Shorts (6-14Y)", type: "shorts", season: "summer", style: "streetwear", occasion: "party", baseOld: 1499, baseNew: 849, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Light Wash", "Black Wash"] },
  { name: "2-Piece Tie-Dye Crop Top and Biker Shorts Set (6-14Y)", type: "co-ord", season: "summer", style: "streetwear", occasion: "daily", baseOld: 1999, baseNew: 1149, sizes: ["6-7Y","8-9Y","10-11Y"], colors: ["Pastel Pink/Mint", "Rainbow"] },
  { name: "Colorblock French Terry Lounge Shorts (4-12Y)", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 1099, baseNew: 599, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Navy/Teal", "Grey/Orange"] },
  { name: "Pleated Gingham Check Cotton Skort Shorts (4-10Y)", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 1299, baseNew: 749, sizes: ["4-5Y","6-7Y","8-9Y"], colors: ["Sky Blue Check", "Red Check"] },
  { name: "2-Piece Dino T-Shirt and Jogger Shorts Set (2-6Y)", type: "co-ord", season: "summer", style: "casual", occasion: "daily", baseOld: 1799, baseNew: 999, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Dino Green/Navy", "Orange/Grey"] },
  { name: "Waffle Knit Drawstring Play Shorts (2-8Y)", type: "shorts", season: "summer", style: "casual", occasion: "daily", baseOld: 999, baseNew: 549, sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Oatmeal", "Dusty Coral"] },
  { name: "Elastic Chino Smart Casual Khaki Shorts (4-14Y)", type: "shorts", season: "summer", style: "formal", occasion: "office", baseOld: 1299, baseNew: 749, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Khaki Tan", "Dark Navy"] },

  // 141-150: Ethnic Wear (10 products)
  { name: "Boys Silk Blend Kurta with Churidar Pyjama Set (2-12Y)", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2799, baseNew: 1599, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Royal Blue", "Maroon Gold", "Mustard"] },
  { name: "Girls Embroidered Silk Lehenga Choli Set with Dupatta (4-12Y)", type: "dress", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 3499, baseNew: 2099, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Rani Pink", "Peacock Teal", "Yellow Gold"] },
  { name: "Printed Cotton Nehru Jacket with Kurta Set (4-12Y)", type: "jacket", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2999, baseNew: 1799, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Floral Cream/Navy", "Gold/Maroon"] },
  { name: "Girls Anarkali Flared Gota Patti Kurti Set (2-10Y)", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2599, baseNew: 1499, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Marigold Yellow", "Blush Pink"] },
  { name: "Boys Mandarin Collar Handloom Cotton Short Kurta (2-10Y)", type: "kurti", season: "summer", style: "ethnic", occasion: "daily", baseOld: 1499, baseNew: 849, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Turmeric Yellow", "Indigo Blue"] },
  { name: "Girls Mirror Work Festive Sharara Suit Set (4-12Y)", type: "dress", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 3199, baseNew: 1899, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Mint Green", "Magenta"] },
  { name: "Boys Asymmetric Pathani Kurta with Salwar (6-14Y)", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2699, baseNew: 1599, sizes: ["6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Jet Black", "Ivory White"] },
  { name: "Girls Chikankari Embroidered Festive Frock (2-8Y)", type: "dress", season: "summer", style: "ethnic", occasion: "festive", baseOld: 2199, baseNew: 1299, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Pastel Peach", "Powder Blue"] },
  { name: "Boys Jacquard Woven Traditional Kurta Pyjama (4-12Y)", type: "kurti", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2899, baseNew: 1699, sizes: ["4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Wine Red", "Emerald Green"] },
  { name: "Girls Bandhani Print Chaniya Choli Navratri Set (2-10Y)", type: "dress", season: "all-season", style: "ethnic", occasion: "festive", baseOld: 2499, baseNew: 1449, sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], colors: ["Red/Yellow Bandhani", "Royal Blue Bandhani"] }
];

function generateDescription(item, category) {
  const genderTerm = category === "men" ? "men's" : category === "women" ? "women's" : "kids'";
  const fitText = item.name.toLowerCase().includes("oversized") ? "a contemporary oversized silhouette" : item.name.toLowerCase().includes("slim") ? "a sharp tailored slim profile" : "a comfortable relaxed everyday fit";
  const occText = item.occasion === "office" ? "professional work environments and formal occasions" : item.occasion === "party" ? "evening celebrations, parties, and festive gatherings" : item.occasion === "vacation" ? "travel, holidays, and sunny weekend outings" : item.occasion === "festive" ? "traditional celebrations, weddings, and cultural festivals" : "versatile daily wear and casual styling";
  const careText = "Machine wash cold with similar colors. Line dry inside-out to preserve color vibrancy and fabric softness.";

  return `Crafted with premium materials, this ${genderTerm} ${item.name.toLowerCase()} delivers exceptional comfort and long-lasting durability. Designed with ${fitText}, it pairs effortlessly with modern wardrobe essentials for ${occText}. Soft to the touch and breathable for all-day wear. ${careText}`;
}

function buildCatalog() {
  const products = [];
  let currentId = 1001; // Start at 1001 to avoid any collision with local mock IDs (13-320)
  const skuSet = new Set();
  const slugSet = new Set();
  const nameSet = new Set();

  // Process MEN (150 items)
  MEN_DEFINITIONS.forEach((def, index) => {
    const sku = `WW-MEN-${def.type.substring(0, 2).toUpperCase()}-${String(index + 1).padStart(4, '0')}`;
    const slug = slugify(def.name);
    const img1 = MEN_IMAGES[index % MEN_IMAGES.length];
    const img2 = MEN_IMAGES[(index + 3) % MEN_IMAGES.length];
    const img3 = MEN_IMAGES[(index + 7) % MEN_IMAGES.length];

    if (skuSet.has(sku)) throw new Error(`Duplicate SKU: ${sku}`);
    if (slugSet.has(slug)) throw new Error(`Duplicate Slug: ${slug}`);
    if (nameSet.has(def.name)) throw new Error(`Duplicate Name: ${def.name}`);

    skuSet.add(sku);
    slugSet.add(slug);
    nameSet.add(def.name);

    products.push({
      id: currentId++,
      name: def.name,
      slug: slug,
      sku: sku,
      category: "men",
      gender: "men",
      type: def.type,
      season: def.season,
      style: def.style,
      occasion: def.occasion,
      description: generateDescription(def, "men"),
      new_price: def.baseNew,
      old_price: def.baseOld,
      brand: "Wink & Wear",
      stock: 15 + ((index * 7) % 115),
      sizes: def.sizes,
      colors: def.colors,
      image: img1,
      images: img1,
      gallery: [img1, img2, img3],
      available: true,
      date: new Date(Date.now() - index * 86400000 * 2).toISOString()
    });
  });

  // Process WOMEN (150 items)
  WOMEN_DEFINITIONS.forEach((def, index) => {
    const sku = `WW-WOM-${def.type.substring(0, 2).toUpperCase()}-${String(index + 1).padStart(4, '0')}`;
    const slug = slugify(def.name);
    const img1 = WOMEN_IMAGES[index % WOMEN_IMAGES.length];
    const img2 = WOMEN_IMAGES[(index + 3) % WOMEN_IMAGES.length];
    const img3 = WOMEN_IMAGES[(index + 7) % WOMEN_IMAGES.length];

    if (skuSet.has(sku)) throw new Error(`Duplicate SKU: ${sku}`);
    if (slugSet.has(slug)) throw new Error(`Duplicate Slug: ${slug}`);
    if (nameSet.has(def.name)) throw new Error(`Duplicate Name: ${def.name}`);

    skuSet.add(sku);
    slugSet.add(slug);
    nameSet.add(def.name);

    products.push({
      id: currentId++,
      name: def.name,
      slug: slug,
      sku: sku,
      category: "women",
      gender: "women",
      type: def.type,
      season: def.season,
      style: def.style,
      occasion: def.occasion,
      description: generateDescription(def, "women"),
      new_price: def.baseNew,
      old_price: def.baseOld,
      brand: "Wink & Wear",
      stock: 18 + ((index * 9) % 110),
      sizes: def.sizes,
      colors: def.colors,
      image: img1,
      images: img1,
      gallery: [img1, img2, img3],
      available: true,
      date: new Date(Date.now() - index * 86400000 * 2).toISOString()
    });
  });

  // Process KIDS (150 items)
  KIDS_DEFINITIONS.forEach((def, index) => {
    const sku = `WW-KID-${def.type.substring(0, 2).toUpperCase()}-${String(index + 1).padStart(4, '0')}`;
    const slug = slugify(def.name);
    const img1 = KIDS_IMAGES[index % KIDS_IMAGES.length];
    const img2 = KIDS_IMAGES[(index + 3) % KIDS_IMAGES.length];
    const img3 = KIDS_IMAGES[(index + 7) % KIDS_IMAGES.length];

    if (skuSet.has(sku)) throw new Error(`Duplicate SKU: ${sku}`);
    if (slugSet.has(slug)) throw new Error(`Duplicate Slug: ${slug}`);
    if (nameSet.has(def.name)) throw new Error(`Duplicate Name: ${def.name}`);

    skuSet.add(sku);
    slugSet.add(slug);
    nameSet.add(def.name);

    products.push({
      id: currentId++,
      name: def.name,
      slug: slug,
      sku: sku,
      category: "kids",
      gender: "kids",
      type: def.type,
      season: def.season,
      style: def.style,
      occasion: def.occasion,
      description: generateDescription(def, "kids"),
      new_price: def.baseNew,
      old_price: def.baseOld,
      brand: "Wink & Wear",
      stock: 20 + ((index * 11) % 100),
      sizes: def.sizes,
      colors: def.colors,
      image: img1,
      images: img1,
      gallery: [img1, img2, img3],
      available: true,
      date: new Date(Date.now() - index * 86400000 * 2).toISOString()
    });
  });

  return products;
}

const products = buildCatalog();
const outputPath = path.join(__dirname, '..', 'data', 'products.seed.json');

fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf8');

console.log('✅ Generated', products.length, 'products successfully.');
console.log('   Men:', products.filter(p => p.category === 'men').length);
console.log('   Women:', products.filter(p => p.category === 'women').length);
console.log('   Kids:', products.filter(p => p.category === 'kids').length);
console.log('📁 Saved to:', outputPath);
