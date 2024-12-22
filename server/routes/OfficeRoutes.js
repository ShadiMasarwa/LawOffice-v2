const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Office, User } = require("../Models/OfficeSchema");

const router = express.Router();
router.use(cookieParser());

//Register Route
router.post("/register", async (req, res) => {
  try {
    const { office, user } = req.body;

    const db = mongoose.connection.useDb("offices");

    const OfficeModel = db.model("Office", Office.schema);
    const newOffice = new OfficeModel({ ...office });
    const savedOffice = await newOffice.save();

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const UserModel = db.model("User", User.schema);
    const newUser = new UserModel({
      ...user,
      office_id: savedOffice._id,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Failed to save data." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = mongoose.connection.useDb("offices");
    const UserModel = db.model("User", User.schema);
    const OfficeModel = db.model("Office", Office.schema);

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "דואר אלקטרוני או סיסמה לא תקינים" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "דואר אלקטרוני או סיסמה לא תקינים" });
    }

    // Check if the user is active
    if (!user.active) {
      return res.status(403).json({ success: false, message: "משתמש לא פעיל" });
    }

    // Check if the associated office exists and is active
    const office = await OfficeModel.findById(user.office_id);
    if (!office || !office.active) {
      return res.status(403).json({ success: false, message: "משרד לא פעיל" });
    }

    // Check the days field
    if (office.days === 0) {
      return res
        .status(403)
        .json({ success: false, message: "תקופת השימוש באתר הסתיימה" });
    }

    // Generate Access Token
    const accessToken = jwt.sign(
      { userId: user._id, permissions: user.permissions },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production with HTTPS
      sameSite: "Strict",
    });

    // Send response with user and office info
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        permissions: user.permissions,
      },
      office: {
        _id: office._id,
        name: office.name,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "שגיאת שרת" });
  }
});

router.post("/token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ success: true, message: "התנתקת בהצלחה" });
});

module.exports = router;
