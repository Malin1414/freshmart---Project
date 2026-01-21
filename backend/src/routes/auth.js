const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;


const jwt = require('jsonwebtoken');

// Middleware to protect routes via JWT in HTTP-only cookies
const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ ok: false, error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).json({ ok: false, error: 'Invalid or expired token.' });
  }
};

// RBAC Middleware: Restrict access to specific roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ ok: false, error: 'Forbidden: Insufficient permissions.' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };