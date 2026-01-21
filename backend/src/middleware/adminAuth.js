const jwt = require('jsonwebtoken');

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ ok: false, error: 'Admin token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET || process.env.JWT_ACCESS_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ ok: false, error: 'Admin privileges required' });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ ok: false, error: 'Invalid or expired admin token' });
  }
};

module.exports = { verifyAdminToken };
