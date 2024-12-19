const mongoose = require("mongoose");

// Schema for admin
const adminSchema = new mongoose.Schema({
  office: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  permissions: { type: String, default: "admin" },
  days: { type: Number, default: 0 },
  addedDate: { type: String, required: true },
});

// Schema for user
const userSchema = new mongoose.Schema({
  office: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  permissions: { type: String, default: "admin" },
  addedDate: { type: String, required: true },
});

module.exports = {
  Admin: mongoose.model("Admin", adminSchema),
  User: userSchema,
};
