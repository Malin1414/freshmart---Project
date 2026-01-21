# Admin System Setup Guide

## Quick Start

### 1. Backend Setup

The admin backend is already integrated. Just ensure your `.env` file has:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ADMIN_SECRET=your_admin_jwt_secret (optional, defaults to JWT_ACCESS_SECRET)
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### 2. Create Admin Account

You can create an admin account using the seed script or directly in MongoDB:

**Option A: Using MongoDB Compass or Shell**
```javascript
db.users.insertOne({
  email: "admin@freshmart.com",
  password: "$2a$12$...", // Use bcrypt hash
  role: "admin",
  loginAttempts: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Option B: Modify seed.js**
Add to `backend/src/scripts/seed.js`:
```javascript
const adminUser = await User.create({
  email: 'admin@freshmart.com',
  password: 'AdminPassword123', // Will be hashed automatically
  role: 'admin'
});
console.log('✓ Admin created:', adminUser.email);
```

Then run:
```bash
cd backend
npm run seed
```

### 3. Start Backend Server

```bash
cd backend
npm install
npm start
```

Server should start on `http://localhost:5000`

### 4. Start Frontend

```bash
npm install
npm run dev
```

Frontend should be available at `http://localhost:5173`

### 5. Access Admin Portal

1. Navigate to `http://localhost:5173/admin/login`
2. Enter admin credentials:
   - Email: `admin@freshmart.com`
   - Password: `AdminPassword123` (or your custom password)
3. Click "Access Admin Panel"
4. You'll be redirected to the dashboard

## Admin Credentials

**Default Test Credentials:**
- Email: `admin@freshmart.com`
- Password: `AdminPassword123`

> **Important:** Change these credentials in production!

## Admin Dashboard Features

Once logged in, you can access:

### Dashboard Home
- View key metrics (Users, Products, Orders)
- See visual charts and statistics
- Access quick action buttons

### Product Management
- **Add Products**: Create new products with pricing and inventory
- **Edit Products**: Modify existing product details
- **Delete Products**: Remove products from catalog
- **Search**: Find products by name or category

### Order Management
- **View Orders**: See all customer orders
- **Expand Orders**: View full order details
- **Update Status**: Change order status:
  - Processing → In Transit → Delivered
  - Cancel orders if needed
- **Search**: Find orders by ID or user

### User Management
- **View Users**: Browse all registered users
- **User Details**: Check user information and history
- **Order History**: See user's past orders
- **Search**: Find users by email

## Common Tasks

### Add a New Product
1. Go to `/admin/products`
2. Click "Add Product" button
3. Fill in product details:
   - Name
   - Category
   - Price
   - Quantity
   - Rating
4. Click "Create Product"

### Update Order Status
1. Go to `/admin/orders`
2. Click on an order to expand it
3. In the status section, click the desired status button
4. Status updates in real-time

### View User Details
1. Go to `/admin/users`
2. Search for user (optional)
3. Click "View" button
4. See user info and their order history

### Logout
- Click "Logout" button in top right corner
- You'll be redirected to admin login page

## Troubleshooting

### "Admin credentials required" error
- Verify the user account has `role: "admin"` in database
- Check email and password are correct

### Dashboard not loading
- Check browser console for errors
- Ensure backend server is running
- Verify MongoDB connection

### Can't add products
- Check backend logs for validation errors
- Ensure all required fields are filled
- Verify admin token is valid

### API endpoints not working
- Confirm `/api/admin` routes are registered in backend
- Check CORS settings in backend
- Verify token is in localStorage

## File Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── adminController.js      (NEW)
│   ├── middleware/
│   │   └── adminAuth.js            (NEW)
│   ├── routes/
│   │   ├── admin.js                (NEW)
│   │   └── index.js                (UPDATED)
│   └── models/
│       └── User.js                 (Already has role field)

src/
├── pages/
│   ├── AdminLogin.tsx              (NEW)
│   ├── AdminDashboard.tsx          (NEW)
│   ├── AdminProducts.tsx           (NEW)
│   ├── AdminOrders.tsx             (NEW)
│   └── AdminUsers.tsx              (NEW)
└── App.tsx                         (UPDATED)
```

## API Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/login` | POST | Admin authentication |
| `/api/admin/dashboard/stats` | GET | Dashboard metrics |
| `/api/admin/users` | GET | List users |
| `/api/admin/users/:id` | GET | User details |
| `/api/admin/products` | POST | Create product |
| `/api/admin/products/:id` | PUT | Update product |
| `/api/admin/products/:id` | DELETE | Delete product |
| `/api/admin/orders` | GET | List orders |
| `/api/admin/orders/:id/status` | PUT | Update order status |

## Security Notes

✅ All admin routes require authentication
✅ Admin tokens expire after 1 hour
✅ Passwords are hashed with bcrypt
✅ Rate limiting on login endpoints
✅ CORS restricted to frontend URL
✅ Admin actions are authorized at middleware level

## Next Steps

1. ✅ Create admin account
2. ✅ Start backend and frontend servers
3. ✅ Login to admin panel
4. ✅ Add test products
5. ✅ View and manage orders
6. ✅ Manage user accounts

Enjoy your admin dashboard! 🎉
