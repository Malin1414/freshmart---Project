require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { connect } = require('./db/mongo');

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });

app.use(helmet());
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));

app.use('/api', routes);

app.use(errorHandler);

  (async () => {
    if (process.env.MONGODB_URI) {
      try {
        await connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
      } catch (err) {
        console.warn('Could not connect to MongoDB:', err.message);
      }
    }

    app.listen(PORT, () => {
      console.log(`Freshmart backend running on http://localhost:${PORT}`);
    });
  })();
