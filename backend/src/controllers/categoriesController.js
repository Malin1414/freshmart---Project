const db = require('../data/db');
const { connected } = require('../db/mongo');
const Category = require('../models/Category');

async function getAllCategories(req, res, next) {
  try {
    if (connected()) {
      const categories = await Category.find().lean();
      return res.json({ ok: true, data: categories });
    }
    res.json({ ok: true, data: db.categories });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllCategories };
