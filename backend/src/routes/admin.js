const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getUserDetails
} = require('../controllers/adminController');
const { verifyAdminToken } = require('../middleware/adminAuth');

// Admin login (no token required)
router.post('/login', adminLogin);

// All routes below require admin authentication
router.use(verifyAdminToken);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Products management
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Users management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);

// Orders management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
