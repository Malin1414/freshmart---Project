const db = require('../data/db');

function subscribe(req, res, next) {
  try {
    const { email } = req.body;
    const exists = db.newsletter.find((e) => e === email);
    if (exists) return res.status(400).json({ ok: false, error: 'Email already subscribed' });
    db.newsletter.push(email);
    res.status(201).json({ ok: true, data: { email } });
  } catch (err) {
    next(err);
  }
}

module.exports = { subscribe };
