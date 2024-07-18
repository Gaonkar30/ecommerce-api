const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const saltRounds = 10;
const secret = process.env.JWT_SECRET || "falsdfhofn104indnQIDBqd";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userdoc = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(userdoc);
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json("Email already registered");
    } else {
      res.status(500).json("Server error");
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    const userdoc = await User.findOne({ email });
    if (!userdoc) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, userdoc.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign({ id: userdoc._id }, secret, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.json({ token, user: userdoc });
  } catch (e) {
    res.status(500).json("Server error");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.json("User logged out");
  } catch (e) {
    res.status(500).json("Server error");
  }
};

module.exports = { register, login, logout };
