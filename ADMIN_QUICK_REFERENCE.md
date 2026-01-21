# FreshMart Admin System - Quick Reference

## 🚀 Quickstart (5 minutes)

### Step 1: Start Backend
```bash
cd backend
npm install
npm start
```
✅ Backend running on `http://localhost:5000`

### Step 2: Start Frontend
```bash
npm install
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### Step 3: Create Admin Account
Insert into MongoDB:
```javascript
{
  email: "admin@freshmart.com",
  password: "AdminPassword123",
  role: "admin"
}
```

### Step 4: Login
Go to: `http://localhost:5173/admin/login`
- Email: `admin@freshmart.com`
- Password: `AdminPassword123`

✅ Admin dashboard loaded!

---

## 📍 Admin Routes

| Path | Page | Purpose |
|------|------|---------|
| `/admin/login` | AdminLogin | Admin authentication |
| `/admin/dashboard` | AdminDashboard | Main statistics & overview |
| `/admin/products` | AdminProducts | Product management |
| `/admin/orders` | AdminOrders | Order management |
| `/admin/users` | AdminUsers | User management |

---

## 🎛️ Dashboard Features

### Stats Cards
- Total Users count
- Total Products count
- Total Orders count

### Charts
- Top Products (Bar chart)
- Order Status Distribution (Pie chart)

### Quick Actions
- Manage Users
- Manage Products
- Manage Orders
- Analytics

---

## 📦 Product Management

### Actions
```
Add Product    → Click "Add Product" → Fill form → Create
Edit Product   → Click "Edit" → Update → Save
Delete Product → Click "Delete" → Confirm
Search         → Type in search bar
```

### Product Fields
- Name (required)
- Category (required)
- Price (required)
- Quantity (required)
- Original Price (optional)
- Rating (optional)

---

## 📋 Order Management

### View Orders
1. Go to `/admin/orders`
2. Click order to expand
3. View full details

### Update Status
Click status button:
- Processing
- In Transit
- Delivered
- Cancelled

### Details Shown
- Order ID & Date
- Total amount
- Delivery address
- Payment method
- Items list

---

## 👥 User Management

### View Users
1. Go to `/admin/users`
2. See all registered users
3. Click "View" for details

### User Information
- Email
- User ID
- Join date
- Order history
- Role

---

## 🔐 API Endpoints

### Authentication
```bash
POST /api/admin/login
{
  "email": "admin@freshmart.com",
  "password": "AdminPassword123"
}
```

### Dashboard
```bash
GET /api/admin/dashboard/stats
```

### Products
```bash
POST   /api/admin/products           # Create
PUT    /api/admin/products/:id       # Update
DELETE /api/admin/products/:id       # Delete
```

### Orders
```bash
GET    /api/admin/orders             # List all
PUT    /api/admin/orders/:id/status  # Update status
```

### Users
```bash
GET    /api/admin/users              # List all
GET    /api/admin/users/:id          # Get details
```

---

## 🔑 Environment Variables

### Minimum Required
```env
MONGODB_URI=mongodb://localhost:27017/freshmart
JWT_ACCESS_SECRET=your_32_char_secret_key
JWT_ADMIN_SECRET=your_32_char_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=5000
```

---

## 📂 Files Created

```
Backend (3 files + 2 updates)
├── adminController.js       ✨ Admin logic
├── adminAuth.js            ✨ Authentication middleware
├── routes/admin.js         ✨ Admin routes
└── Updated: routes/index.js, index.js

Frontend (5 pages + 1 update)
├── AdminLogin.tsx          ✨ Login page
├── AdminDashboard.tsx      ✨ Dashboard
├── AdminProducts.tsx       ✨ Products
├── AdminOrders.tsx         ✨ Orders
├── AdminUsers.tsx          ✨ Users
└── Updated: App.tsx

Documentation (4 files)
├── ADMIN_SETUP.md
├── ADMIN_DOCUMENTATION.md
├── ADMIN_ENV_SETUP.md
└── ADMIN_VERIFICATION.md
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Can't login | Create admin user in DB with `role: 'admin'` |
| Dashboard blank | Check localStorage for token |
| API errors | Verify backend is running on :5000 |
| CORS errors | Check `FRONTEND_URL` in .env |
| Can't add product | Verify admin token is valid |

---

## 🔒 Security

- ✅ Role-based access control
- ✅ JWT authentication (1-hour expiry)
- ✅ Bcrypt password hashing
- ✅ Rate limiting (10 attempts/15min)
- ✅ CORS protection
- ✅ HTTP-only cookies

---

## 📚 Documentation

- **Setup Guide:** `ADMIN_SETUP.md`
- **Full Features:** `ADMIN_DOCUMENTATION.md`
- **Environment:** `ADMIN_ENV_SETUP.md`
- **Verification:** `ADMIN_VERIFICATION.md`

---

## ⚡ Performance Tips

- Use search to filter large datasets
- Expand only orders you need to view
- Use specific status filters
- Keep browser cache clear

---

## 🎯 Next Steps

1. ✅ Start servers
2. ✅ Create admin account
3. ✅ Test admin login
4. ✅ Try each feature
5. ✅ Customize as needed
6. ✅ Deploy to production

---

## 💬 Quick Syntax

### Create Product
```javascript
POST /api/admin/products
{
  "name": "Apple",
  "category": "Fruits",
  "price": 2.99,
  "availableQuantity": 100,
  "rating": 4.5
}
```

### Update Order Status
```javascript
PUT /api/admin/orders/{id}/status
{
  "status": "In Transit"
}
```

---

## 🎓 Key Concepts

### Admin Role
- Must have `role: 'admin'` in User model
- Different from regular users
- Separate authentication token

### JWT Tokens
- 1-hour expiration
- Stored in httpOnly cookies
- Also in localStorage for frontend

### Rate Limiting
- 10 attempts per 15 minutes
- Per-IP basis
- Prevents brute force attacks

---

## 🚀 Production Checklist

- [ ] Change default admin password
- [ ] Set strong JWT secrets
- [ ] Use HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB
- [ ] Update `FRONTEND_URL`
- [ ] Enable `COOKIE_SECURE=true`
- [ ] Monitor logs
- [ ] Backup database

---

**Status:** ✅ Ready to Use
**Last Updated:** January 2026

For detailed docs, see the markdown files in the project root.
