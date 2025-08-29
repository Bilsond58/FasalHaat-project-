// sevice.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/contactDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB: contactDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// 2. Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  userType: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// 3. API route
app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving form", error });
  }
});

// 4. Start server
app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000")
);
