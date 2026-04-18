const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const guestId = req.headers["x-guest-id"];

  // ✅ PRIORITY: Logged-in user
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { userId: decoded.userId || decoded.id };
      req.isGuest = false;

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  // ✅ Only use guest if NO token
  if (!authHeader && guestId) {
    req.user = { userId: guestId };
    req.isGuest = true;

    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = authMiddleware;