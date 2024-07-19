const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "falsdfhofn104indnQIDBqd";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).json("Access denied");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};

module.exports = authMiddleware;
