const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

const authorizeApproved = (req, res, next) => {
  if (req.user.is_approved === false) {
    return res
      .status(403)
      .json({ message: "Your account is not yet approved by admin" });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeRole,
  authorizeApproved,
};
