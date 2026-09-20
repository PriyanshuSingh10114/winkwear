require("dotenv").config({ path: require("path").join(process.cwd(), ".env") });
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../src/models/Product");

const isDryRun = process.argv.includes("--dry-run");

async function runSeed() {
  console.log("==================================================");
  console.log("       WINK & WEAR — PRODUCT CATALOG SEEDER       ");
  console.log("==================================================");
  console.log(`MODE: ${isDryRun ? "🔍 DRY RUN (Simulating, no database modifications)" : "⚡ LIVE INSERTION"}`);

  const env = require("../src/config/env");
  const mongoUri = env.MONGODB_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("❌ ERROR: MONGODB_URI environment variable is missing.");
    process.exit(1);
  }

  // 1. Connect to MongoDB with retries
  let connected = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`📡 Connecting to MongoDB (Attempt ${attempt}/3)...`);
      await mongoose.connect(mongoUri, {
        maxPoolSize: 20,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
      });
      console.log(`DATABASE: ${mongoose.connection.name || "winkwear"}`);
      console.log("✅ MongoDB Connection Successful.");
      connected = true;
      break;
    } catch (err) {
      console.warn(`⚠️ Connection attempt ${attempt} failed: ${err.message}`);
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, 2000));
      } else if (!isDryRun) {
        console.error("❌ Fatal: Could not connect to MongoDB for live insertion.");
        process.exit(1);
      }
    }
  }

  // 2. Load Seed JSON
  const seedFilePath = path.join(__dirname, "..", "data", "products.seed.json");
  if (!fs.existsSync(seedFilePath)) {

    console.error(`❌ Seed file not found at: ${seedFilePath}`);
    console.error("Please run: node scripts/generate-catalog.js first.");
    process.exit(1);
  }

  const rawData = fs.readFileSync(seedFilePath, "utf8");
  let seedProducts;
  try {
    seedProducts = JSON.parse(rawData);
  } catch (err) {
    console.error("❌ Invalid JSON in seed file:", err.message);
    process.exit(1);
  }

  console.log(`\n📦 Seed File Products Loaded: ${seedProducts.length}`);

  // 3. Fetch Existing Products from Database
  const existingProducts = connected ? await Product.find({}).lean() : [];
  console.log(`📊 Existing Products in MongoDB: ${existingProducts.length}`);


  // Track existing SKUs, Slugs, Normalized Names, IDs
  const existingSkus = new Set();
  const existingSlugs = new Set();
  const existingNames = new Set();
  const existingIds = new Set();
  let maxId = 0;

  existingProducts.forEach((p) => {
    if (p.sku) existingSkus.add(String(p.sku).trim().toUpperCase());
    if (p.slug) existingSlugs.add(String(p.slug).trim().toLowerCase());
    if (p.name) existingNames.add(String(p.name).trim().toLowerCase());
    if (typeof p.id === "number") {
      existingIds.add(p.id);
      if (p.id > maxId) maxId = p.id;
    }
  });

  let nextId = Math.max(maxId + 1, 1001);

  // 4. Validate & Deduplicate
  const toInsert = [];
  let skippedSku = 0;
  let skippedSlug = 0;
  let skippedName = 0;
  let skippedInvalid = 0;

  const categoryStats = {};
  const genderStats = { men: 0, women: 0, kids: 0 };

  for (const item of seedProducts) {
    // Validation
    if (!item.name || !item.category || typeof item.new_price !== "number" || item.new_price <= 0) {
      skippedInvalid++;
      continue;
    }

    const normName = String(item.name).trim().toLowerCase();
    const normSku = item.sku ? String(item.sku).trim().toUpperCase() : null;
    const normSlug = item.slug ? String(item.slug).trim().toLowerCase() : null;

    if (normSku && existingSkus.has(normSku)) {
      skippedSku++;
      continue;
    }
    if (normSlug && existingSlugs.has(normSlug)) {
      skippedSlug++;
      continue;
    }
    if (existingNames.has(normName)) {
      skippedName++;
      continue;
    }

    // Ensure Unique ID
    let assignedId = item.id && !existingIds.has(item.id) ? item.id : nextId++;
    existingIds.add(assignedId);

    // Register in existing sets to prevent internal duplicates within the seed batch
    if (normSku) existingSkus.add(normSku);
    if (normSlug) existingSlugs.add(normSlug);
    existingNames.add(normName);

    const doc = {
      id: assignedId,
      name: item.name.trim(),
      slug: item.slug || String(item.name).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: item.sku || `WW-${item.category.toUpperCase()}-${assignedId}`,
      category: item.category.toLowerCase(),
      gender: (item.gender || item.category).toLowerCase(),
      type: item.type || "clothing",
      season: item.season || "all-season",
      style: item.style || "casual",
      occasion: item.occasion || "daily",
      description: item.description || `High-quality ${item.name} from Wink & Wear.`,
      new_price: Number(item.new_price),
      old_price: item.old_price ? Number(item.old_price) : Number(item.new_price) * 1.5,
      brand: item.brand || "Wink & Wear",
      stock: item.stock !== undefined ? Number(item.stock) : 50,
      sizes: Array.isArray(item.sizes) ? item.sizes : ["S", "M", "L", "XL"],
      colors: Array.isArray(item.colors) ? item.colors : ["Default"],
      image: item.image || item.images || "",
      images: item.images || item.image || "",
      gallery: Array.isArray(item.gallery) ? item.gallery : [item.image || ""],
      available: item.available !== false,
      date: item.date ? new Date(item.date) : new Date()
    };

    toInsert.push(doc);

    // Track statistics
    genderStats[doc.category] = (genderStats[doc.category] || 0) + 1;
    const catKey = `${doc.category.toUpperCase()} -> ${doc.type}`;
    categoryStats[catKey] = (categoryStats[catKey] || 0) + 1;
  }

  console.log("\n==================================================");
  console.log("             DEDUPLICATION & VALIDATION           ");
  console.log("==================================================");
  console.log(`Skipped Duplicate SKU:  ${skippedSku}`);
  console.log(`Skipped Duplicate Slug: ${skippedSlug}`);
  console.log(`Skipped Duplicate Name: ${skippedName}`);
  console.log(`Skipped Invalid Docs:   ${skippedInvalid}`);
  console.log(`New Products to Insert: ${toInsert.length}`);

  console.log("\n==================================================");
  console.log("             GENDER DISTRIBUTION REPORT           ");
  console.log("==================================================");
  console.log(`MEN:   ${genderStats.men || 0}`);
  console.log(`WOMEN: ${genderStats.women || 0}`);
  console.log(`KIDS:  ${genderStats.kids || 0}`);
  console.log(`TOTAL: ${toInsert.length}`);

  console.log("\n==================================================");
  console.log("            CATEGORY BREAKDOWN SUMMARY            ");
  console.log("==================================================");
  Object.keys(categoryStats).sort().forEach(cat => {
    console.log(`  • ${cat.padEnd(28)} : ${categoryStats[cat]}`);
  });

  // 5. Execute Insertion if not dry run
  if (isDryRun) {
    console.log("\n==================================================");
    console.log("✅ DRY RUN COMPLETE. No data was written to MongoDB.");
    console.log("To perform real insertion, run: npm run seed:products");
    console.log("==================================================");
    if (connected) await mongoose.disconnect();
    process.exit(0);
  }

  if (toInsert.length === 0) {
    console.log("\n⚠️ No new unique products to insert.");
    if (connected) await mongoose.disconnect();
    process.exit(0);
  }

  console.log(`\n⏳ Inserting ${toInsert.length} products into MongoDB...`);
  const inserted = await Product.insertMany(toInsert, { ordered: false });
  console.log(`🎉 SUCCESS: Successfully inserted ${inserted.length} products into MongoDB!`);

  const totalInDb = await Product.countDocuments();
  console.log(`📈 Total Products in MongoDB Now: ${totalInDb}`);

  if (connected) await mongoose.disconnect();
  console.log("🔒 MongoDB connection closed cleanly.");
  process.exit(0);

}

runSeed().catch((err) => {
  console.error("❌ Unhandled Seeder Error:", err);
  process.exit(1);
});
