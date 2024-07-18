const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const salt = bcrypt.genSaltSync(10);
const secret = "fajnfoawnvnoWFQPIFNQ3O";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userdoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userdoc);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userdoc = await User.findOne({ email });
    if (!userdoc) return res.status(400).json("User not found");
    const isMatch = await bcrypt.compare(password, userdoc.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");
    const token = jwt.sign({ id: userdoc._id }, secret, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    res.json({ token, userdoc });
  } catch (e) {
    res.status(500).json(e.message);
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.json("User logged out");
  } catch (e) {
    res.status(500).json(e.message);
  }
};
