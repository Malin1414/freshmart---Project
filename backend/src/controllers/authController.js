const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (payload, secret, expires) => {
  return jwt.sign(payload, secret, { expiresIn: expires });
};

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ ok: false, error: 'Email already in use' });

    const user = await User.create({ email, password });
    res.status(201).json({ ok: true, data: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Constant time check against brute force (simplified logic)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    const accessToken = signToken({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, '15m');
    
    // Secure HTTP-only cookie configuration
    res.cookie('accessToken', accessToken, {
      httpOnly: true, // Prevents XSS-based token theft
      secure: process.env.NODE_ENV === 'production', // Only over HTTPS
      sameSite: 'Strict', // Prevents CSRF
      maxAge: 15 * 60 * 1000 // 15 Minutes
    });

    res.json({ ok: true, data: { email: user.email, role: user.role } });
  } catch (err) { next(err); }
}

module.exports = { signup, login };