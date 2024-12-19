const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Admin, User } = require("../Models/usersSchema");

const router = express.Router();

// POST: Create a new office and admin
router.post("/register", async (req, res) => {
  try {
    const { office, fName, lName, role, email, phone, password } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add extra fields
    const addedDate = new Date().toLocaleString("en-GB", { hour12: false });

    // Save to "admins" collection
    const newAdmin = new Admin({
      office,
      fName,
      lName,
      role,
      email,
      phone,
      password: hashedPassword,
      addedDate,
    });

    const savedAdmin = await newAdmin.save();

    // Create a new database for the office
    const officeDB = mongoose.connection.useDb(savedAdmin._id.toString());

    // Create "users" collection and insert the same admin as the first user
    const UserModel = officeDB.model("User", User);
    await UserModel.create({
      office,
      fName,
      lName,
      role,
      email,
      phone,
      password: hashedPassword,
      addedDate,
    });

    res.status(201).json({
      message: "Office and admin created successfully",
      admin: savedAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve user and office details
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "User not found" });

    if (admin.days === 0) {
      return res.status(403).json({ error: "Office is not active" });
    }

    // Get the user's office database
    const officeDB = mongoose.connection.useDb(admin._id.toString());
    const UserModel = officeDB.model("User", User);

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ error: "User not found in office database" });

    res.status(200).json({ admin, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update user details
router.put("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updates = req.body;

    // Update user in "admins" collection
    const admin = await Admin.findOneAndUpdate({ email }, updates, {
      new: true,
    });
    if (!admin) return res.status(404).json({ error: "User not found" });

    // Update user in the office database
    const officeDB = mongoose.connection.useDb(admin._id.toString());
    const UserModel = officeDB.model("User", User);
    const updatedUser = await UserModel.findOneAndUpdate({ email }, updates, {
      new: true,
    });

    res.status(200).json({ admin, updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
