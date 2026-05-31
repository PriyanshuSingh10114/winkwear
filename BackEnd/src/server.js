const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start Server
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
};

startServer();
