const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/newsletterController');
const { validateNewsletter } = require('../middleware/validators');

router.post('/', validateNewsletter, subscribe);

module.exports = router;
