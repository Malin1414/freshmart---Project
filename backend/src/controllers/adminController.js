const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Admin authentication
const signAdminToken = (payload, secret, expires) => {
  return jwt.sign(payload, secret, { expiresIn: expires });
};

async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    
    // Find user and verify they have admin role
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
      return res.status(403).json({ ok: false, error: 'Access denied. Admin privileges required' });
    }

    // Generate admin token
    const adminToken = signAdminToken(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_ADMIN_SECRET || process.env.JWT_ACCESS_SECRET,
      '1h'
    );

    // Set secure cookie
    res.cookie('adminToken', adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({
      ok: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        token: adminToken
      }
    });
  } catch (err) {
    next(err);
  }
}

// Dashboard statistics
async function getDashboardStats(req, res, next) {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get top products
    const topProducts = await Product.find()
      .sort({ rating: -1 })
      .limit(5)
      .lean();

    res.json({
      ok: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        recentOrders,
        topProducts
      }
    });
  } catch (err) {
    next(err);
  }
}

// Get all users (admin only)
async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .lean();

    res.json({ ok: true, data: users });
  } catch (err) {
    next(err);
  }
}

// Create product (admin only)
async function createProduct(req, res, next) {
  try {
    const { name, category, price, originalPrice, rating, reviews, image, badge, availableQuantity, description } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      originalPrice,
      rating,
      reviews,
      image,
      badge,
      availableQuantity,
      description
    });

    res.status(201).json({ ok: true, data: product });
  } catch (err) {
    next(err);
  }
}

// Update product (admin only)
async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }

    res.json({ ok: true, data: product });
  } catch (err) {
    next(err);
  }
}

// Delete product (admin only)
async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }

    res.json({ ok: true, message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
}

// Get all orders (admin only)
async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({ ok: true, data: orders });
  } catch (err) {
    next(err);
  }
}

// Update order status (admin only)
async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Processing', 'In Transit', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ ok: false, error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ ok: false, error: 'Order not found' });
    }

    res.json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
}

// Get user details (admin only)
async function getUserDetails(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }

    const userOrders = await Order.find({ userId: id }).lean();

    res.json({
      ok: true,
      data: {
        user,
        orders: userOrders
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getUserDetails
};
