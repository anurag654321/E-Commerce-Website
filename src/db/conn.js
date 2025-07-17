const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected successfully.");
}).catch((err) => {
  console.log("❌ MongoDB connection failed.");
  console.log(err);
});
