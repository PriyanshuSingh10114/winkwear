# Wink & Wear — Product Catalog Seeding & Management Documentation

## 1. Catalog Overview & File Locations
- **Seed JSON Dataset:** `BackEnd/data/products.seed.json`
- **Catalog Generator Script:** `BackEnd/scripts/generate-catalog.js`
- **Database Seeder Script:** `BackEnd/scripts/seed-products.js`
- **Product Mongoose Model:** `BackEnd/src/models/Product.js`

The dataset contains **450 realistic, high-quality fashion products** tailored for the Indian ecommerce market in INR:
- **Men:** 150 Products
- **Women:** 150 Products
- **Kids:** 150 Products

---

## 2. Product Schema & Metadata Fields

Each product is formatted in strict accordance with the Wink & Wear MERN architecture:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `Number` | Unique numeric identifier (seeded starting at 1001 to prevent conflicts) |
| `name` | `String` | Descriptive, unique ecommerce product name |
| `slug` | `String` | SEO-friendly URL slug (e.g. `classic-regular-fit-oxford-cotton-shirt`) |
| `sku` | `String` | Unique SKU identifier (e.g. `WW-MEN-SH-0001`, `WW-WOM-DR-0001`) |
| `category` | `String` | Core department category: `men`, `women`, `kids` |
| `gender` | `String` | Department gender: `men`, `women`, `kids` |
| `type` | `String` | Clothing subcategory: `tshirt`, `shirt`, `jeans`, `trouser`, `hoodie`, `jacket`, `dress`, `top`, `kurti`, `skirt`, `shorts`, `polo`, `sweatshirt`, `sweater`, `blazer`, `co-ord` |
| `season` | `String` | Seasonal tag for frontend filters: `summer`, `winter`, `all-season` |
| `style` | `String` | Style classification: `casual`, `formal`, `partywear`, `streetwear`, `athletic`, `ethnic` |
| `occasion` | `String` | Occasion filter: `daily`, `office`, `party`, `vacation`, `festive`, `outdoor` |
| `description` | `String` | Unique 2-4 sentence narrative mentioning fit, material, styling, occasions & care |
| `new_price` | `Number` | Current selling price in INR (e.g. ₹399–₹3,799) |
| `old_price` | `Number` | Strikethrough / original MRP in INR |
| `stock` | `Number` | Inventory count (ranges from 15 to 130 units) |
| `sizes` | `Array[String]` | Indian standard fashion sizes (`["S", "M", "L", "XL", "XXL"]`, `["26", "28", "30", "32"]`, `["2-3Y", "4-5Y", "6-7Y"]`) |
| `colors` | `Array[String]` | 2–4 relevant product colorways |
| `brand` | `String` | `"Wink & Wear"` |
| `image` & `images` | `String` | High-resolution photography URL from Unsplash CDN |
| `gallery` | `Array[String]` | 3 gallery perspective image URLs |
| `available` | `Boolean` | `true` |
| `date` | `Date` | Timestamp for new collection sorting |

---

## 3. Duplicate Prevention & Safety Controls

The seeder guarantees **100% non-destructive and idempotent operation**:
1. **Never Clears Data:** No `deleteMany()`, `drop()`, or destructive methods are ever invoked.
2. **Deduplication by SKU:** Ensures no duplicate inventory SKUs are ever entered into MongoDB.
3. **Deduplication by Slug:** Protects SEO URL integrity.
4. **Deduplication by Name:** Protects against duplicate product titles.
5. **ID Allocation:** Auto-increments sequentially beyond existing IDs in the database.

---

## 4. How to Run Catalog Commands

From the `BackEnd` directory:

### A. Re-generate Catalog Dataset (Optional)
```bash
npm run generate:catalog
```

### B. Perform Dry-Run Validation (Safe Simulation)
Validates all products, connects to MongoDB, calculates deduplication stats, and outputs distribution metrics **without writing any data**:
```bash
npm run seed:products:dry
```

### C. Perform Live Insertion
Inserts all new unique products into MongoDB:
```bash
npm run seed:products
```

---

## 5. How to Add Another Product Batch in the Future

1. Open `BackEnd/scripts/generate-catalog.js`.
2. Append your new product definitions to `MEN_DEFINITIONS`, `WOMEN_DEFINITIONS`, or `KIDS_DEFINITIONS` with appropriate types, sizes, and colors.
3. Run `npm run generate:catalog`.
4. Run `npm run seed:products:dry` to verify no conflicts.
5. Run `npm run seed:products` to insert the new batch. Existing products will be safely preserved.

---

## 6. Verification and Testing

You can verify the database state at any time by running:
```bash
# Verify product count via API
curl http://localhost:5000/allproducts
```
Or check the Wink & Wear frontend category pages:
- Men: `http://localhost:5173/mens`
- Women: `http://localhost:5173/womens`
- Kids: `http://localhost:5173/kids`
- All Products: `http://localhost:5173/products`
