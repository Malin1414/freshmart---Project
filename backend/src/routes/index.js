const express = require('express');
const router = express.Router();

const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const authRouter = require('./auth');
const newsletterRouter = require('./newsletter');
const adminRouter = require('./admin');

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/newsletter', newsletterRouter);
router.use('/admin', adminRouter);

router.get('/', (req, res) => res.json({ ok: true, msg: 'API root' }));

module.exports = router;
