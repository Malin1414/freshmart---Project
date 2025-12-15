const db = require('../data/db');

function getAllCategories(req, res, next) {
  try {
    res.json({ ok: true, data: db.categories });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllCategories };
