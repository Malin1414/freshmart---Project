

  const app = express();

// Specialized Rate Limiter for Auth Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: { ok: false, error: 'Too many attempts, please try again later' }
});

app.use(helmet()); // Sets various security-related HTTP headers
app.use(cookieParser());
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