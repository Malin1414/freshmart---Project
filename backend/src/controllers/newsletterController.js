const db = require('../data/db');
const { connected } = require('../db/mongo');
const Newsletter = require('../models/Newsletter');

async function subscribe(req, res, next) {
  try {
    const { email } = req.body;
    if (connected()) {
      const exists = await Newsletter.findOne({ email });
      if (exists) return res.status(400).json({ ok: false, error: 'Email already subscribed' });
      await Newsletter.create({ email });
      return res.status(201).json({ ok: true, data: { email } });
    }
    const exists = db.newsletter.find((e) => e === email);
    if (exists) return res.status(400).json({ ok: false, error: 'Email already subscribed' });
    db.newsletter.push(email);
    res.status(201).json({ ok: true, data: { email } });
  } catch (err) {
    next(err);
  }
}

module.exports = { subscribe };
