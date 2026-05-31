require("dotenv").config({ path: require("path").join(process.cwd(), ".env") });
const mongoose = require("mongoose");

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    const products = await mongoose.connection.db.collection("products").find({}).toArray();
    console.log(`Found ${products.length} products.`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

testDB();
