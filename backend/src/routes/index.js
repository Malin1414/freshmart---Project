const express = require('express');
const router = express.Router();

const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const authRouter = require('./auth');
const newsletterRouter = require('./newsletter');

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/newsletter', newsletterRouter);

router.get('/', (req, res) => res.json({ ok: true, msg: 'API root' }));

module.exports = router;
