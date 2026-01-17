// A middleware in Express.js is simply a function that sits between the request and the response. 
// // When a client sends a request to your server, that request flows through a chain of middleware functions before it finally reaches the route handler.

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ SAFE PLACE (DO NOT USE req.body)
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
