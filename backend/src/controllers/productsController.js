const db = require('../data/db');
const { connected } = require('../db/mongo');
const Product = require('../models/Product');

async function getAllProducts(req, res, next) {
  try {
    if (connected()) {
      const products = await Product.find().lean();
      return res.json({ ok: true, data: products });
    }
    return res.json({ ok: true, data: db.products });
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    if (connected()) {
      const product = await Product.findById(id).lean();
      if (!product) return res.status(404).json({ ok: false, error: 'Product not found' });
      return res.json({ ok: true, data: product });
    }
    const product = db.products.find((p) => String(p.id) === String(id));
    if (!product) return res.status(404).json({ ok: false, error: 'Product not found' });
    res.json({ ok: true, data: product });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, getProductById };
