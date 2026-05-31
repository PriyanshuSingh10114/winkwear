const axios = require('axios');
const baseUrl = 'http://localhost:4000';

async function testAll() {
  console.log("Testing Backend Endpoints...\n");

  // Test 1: Health
  try {
    const res = await axios.get(`${baseUrl}/health`);
    console.log("✅ GET /health =>", res.data);
  } catch (err) {
    console.error("❌ GET /health Failed", err.message);
  }

  // Test 2: Add Product
  try {
    const res = await axios.post(`${baseUrl}/addproduct`, {
      name: "Test Shirt",
      category: "men",
      new_price: 50,
      old_price: 100
    });
    console.log("✅ POST /addproduct =>", res.data);
  } catch (err) {
    console.error("❌ POST /addproduct Failed", err.message);
  }

  // Test 3: All Products
  try {
    const res = await axios.get(`${baseUrl}/allproducts`);
    console.log(`✅ GET /allproducts => Array of length: ${res.data.length}, first product: ${res.data[0]?.name}`);
  } catch (err) {
    console.error("❌ GET /allproducts Failed", err.message);
  }

  // Test 4: Register User
  let token = null;
  const testEmail = `test_${Date.now()}@example.com`;
  try {
    const res = await axios.post(`${baseUrl}/signup`, {
      name: "Test User",
      email: testEmail,
      password: "password123"
    });
    token = res.data.token;
    console.log("✅ POST /signup => Success! Token received");
  } catch (err) {
    console.error("❌ POST /signup Failed", err.message);
  }

  // Test 5: Get Profile
  if (token) {
    try {
      const res = await axios.get(`${baseUrl}/user/profile`, {
        headers: { 'auth-token': token }
      });
      console.log("✅ GET /user/profile => Success! User name:", res.data.user.name);
    } catch (err) {
      console.error("❌ GET /user/profile Failed", err.response?.data || err.message);
    }
  }

}

testAll();
