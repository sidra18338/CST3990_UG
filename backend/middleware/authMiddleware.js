const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Extract token from the Authorization header
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

  console.log("Token extracted:", token); // Log the token to check

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret here
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
