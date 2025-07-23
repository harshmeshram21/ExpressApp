const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const authRoute = express.Router();


// Login route
authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User doesn't exist" });

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token);
    // Send token in response (no cookie here, just simple JSON)
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout route (null response)
authRoute.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = authRoute;
