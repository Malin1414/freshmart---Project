# Admin System Environment Configuration

## Backend .env Setup

Add these variables to your `.env` file in the `backend/` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/freshmart
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freshmart

# JWT Secrets
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_ADMIN_SECRET=your_super_secret_admin_key_min_32_chars

# Environment
NODE_ENV=development
# Use 'production' in production environment

# CORS Configuration
FRONTEND_URL=http://localhost:5173
# Use your production frontend URL in production

# Server Configuration
PORT=5000
# Use 80 or 443 in production

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10

# Optional: Cookie Configuration
COOKIE_SECURE=false
# Set to true in production (requires HTTPS)

COOKIE_SAME_SITE=Strict
# Options: Strict, Lax, None
```

## Frontend .env Setup (if needed)

Create `.env` file in root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_LOGIN_URL=http://localhost:5000/api/admin/login
```

Or update directly in components (current implementation uses hardcoded URLs).

## Environment Variables Explanation

### JWT Secrets
- **JWT_ACCESS_SECRET**: Secret key for regular user tokens
- **JWT_ADMIN_SECRET**: Secret key for admin tokens (can be same as ACCESS_SECRET)
- Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Database
- **MONGODB_URI**: Connection string to MongoDB
  - Local: `mongodb://localhost:27017/freshmart`
  - Cloud (Atlas): `mongodb+srv://user:pass@cluster.mongodb.net/freshmart`

### CORS
- **FRONTEND_URL**: Frontend domain for CORS policy
  - Development: `http://localhost:5173` or `http://localhost:3000`
  - Production: `https://yourdomain.com`

### Node Environment
- **NODE_ENV**: 
  - `development` - debug mode, cookies not secure
  - `production` - production mode, requires HTTPS

## Development Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Copy .env.example or create .env
cp .env.example .env
# or create manually with variables above

# 3. Install dependencies
npm install

# 4. Start development server
npm start
```

## Production Setup

Update `.env` for production:

```env
# Production environment
NODE_ENV=production

# Secure secrets (use strong, random values)
JWT_ACCESS_SECRET=<generate-random-32-char-string>
JWT_ADMIN_SECRET=<generate-random-32-char-string>

# Production database (MongoDB Atlas recommended)
MONGODB_URI=mongodb+srv://produser:prodpass@prod-cluster.mongodb.net/freshmart

# Production frontend URL
FRONTEND_URL=https://yourdomain.com

# Production server port
PORT=443

# Enable secure cookies
COOKIE_SECURE=true
COOKIE_SAME_SITE=Strict
```

## Generating Secure Secrets

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using Python
python -c "import secrets; print(secrets.token_hex(32))"
```

## Verification Checklist

After setting up environment variables:

- [ ] `.env` file exists in `backend/` directory
- [ ] `MONGODB_URI` is correct and database is accessible
- [ ] `JWT_ACCESS_SECRET` is at least 32 characters
- [ ] `JWT_ADMIN_SECRET` is set
- [ ] `FRONTEND_URL` matches your frontend domain
- [ ] `NODE_ENV` matches your environment (development/production)
- [ ] No sensitive data is committed to git

## Common Issues

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running locally or connection string is correct

### JWT Errors
```
Error: secret not provided
```
**Solution:** Check `JWT_ACCESS_SECRET` and `JWT_ADMIN_SECRET` are set

### CORS Errors
```
Cross-Origin Request Blocked
```
**Solution:** Update `FRONTEND_URL` to match your frontend domain

### Cookie Not Set
```
adminToken cookie not found
```
**Solution:** Ensure `NODE_ENV=development` (for localhost testing) or enable `COOKIE_SECURE=true` with HTTPS

## Example .env File

```env
# Database
MONGODB_URI=mongodb://localhost:27017/freshmart

# JWT
JWT_ACCESS_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
JWT_ADMIN_SECRET=z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0

# Environment
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=5000

# Cookies
COOKIE_SECURE=false
COOKIE_SAME_SITE=Strict

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

## Security Notes

🔒 **Important for Production:**
1. Never commit `.env` to git repository
2. Use strong, unique secrets (minimum 32 characters)
3. Rotate secrets periodically
4. Use HTTPS with `COOKIE_SECURE=true`
5. Monitor and log suspicious login attempts
6. Keep dependencies updated
7. Use environment-specific secrets

## Deployment

When deploying to production:

1. Use your hosting provider's environment variable management
2. Example platforms:
   - Heroku: Config Vars
   - AWS: Systems Manager Parameter Store / Secrets Manager
   - Azure: Key Vault
   - DigitalOcean: Environment Variables
   - Railway/Render: Environment Variables

3. Never store secrets in code or git history
4. Use different secrets for each environment
5. Implement secret rotation policies

---

For more information, see [ADMIN_SETUP.md](./ADMIN_SETUP.md) and [ADMIN_DOCUMENTATION.md](./ADMIN_DOCUMENTATION.md)
