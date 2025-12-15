const db = require('../data/db');

function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ ok: false, error: 'Missing email or password' });
    const exists = db.users.find((u) => u.email === email);
    if (exists) return res.status(400).json({ ok: false, error: 'User already exists' });
    const user = { id: db.nextId(), email, password: String(password) };
    db.users.push(user);
    res.status(201).json({ ok: true, data: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = db.users.find((u) => u.email === email && u.password === String(password));
    if (!user) return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    res.json({ ok: true, data: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login };
