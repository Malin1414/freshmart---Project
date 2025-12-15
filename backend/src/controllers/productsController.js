const db = require('../data/db');

function getAllProducts(req, res, next) {
  try {
    res.json({ ok: true, data: db.products });
  } catch (err) {
    next(err);
  }
}

function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = db.products.find((p) => String(p.id) === String(id));
    if (!product) return res.status(404).json({ ok: false, error: 'Product not found' });
    res.json({ ok: true, data: product });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, getProductById };
