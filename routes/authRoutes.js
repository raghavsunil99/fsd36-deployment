const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");


// 🔹 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.json({
      message: "User registered"
    });

  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});


// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Wrong password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});


// 🔹 PROTECTED ROUTE
router.get("/dashboard", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      message: "Welcome to Dashboard",
      user: decoded
    });

  } catch (error) {
    res.json({ message: "Invalid token" });
  }
});

module.exports = router;