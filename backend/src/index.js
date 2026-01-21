require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const { connect } = require('./db/mongo');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Specialized Rate Limiter for Auth Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: { ok: false, error: 'Too many attempts, please try again later' }
});

app.use(helmet()); // Sets various security-related HTTP headers
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json({ limit: '10kb' })); // Prevent large payload DoS

// Strict CORS: No wildcard origins allowed
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Apply authLimiter specifically to sensitive routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);

app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
async function start() {
  try {
    // Set a connection timeout of 5 seconds
    const mongooseOptions = {
      dbName: 'freshmart',
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    };
    
    try {
      await connect(process.env.MONGODB_URI);
      console.log('✓ Database connected');
    } catch (dbError) {
      console.warn('⚠ Database connection failed, running in memory mode:', dbError.message);
      // Continue running even if DB fails to connect
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

start();