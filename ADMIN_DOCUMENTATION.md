# FreshMart Admin Features Documentation

## Overview

The admin system has been fully integrated into the FreshMart project with a separate admin login and comprehensive management dashboard. Admins can manage products, users, orders, and view analytics.

## Admin Features

### 1. **Admin Login** (`/admin/login`)
- Separate admin portal with restricted access
- Email and password authentication
- Validates admin role before granting access
- Secure JWT token generation for admin sessions
- Rate-limited to prevent brute force attacks

### 2. **Admin Dashboard** (`/admin/dashboard`)
- Overview of key metrics:
  - Total Users
  - Total Products
  - Total Orders
- Visual charts showing:
  - Top Products by Rating (Bar Chart)
  - Order Status Distribution (Pie Chart)
- Quick action buttons for managing resources
- Admin session management (logout, settings)

### 3. **Product Management** (`/admin/products`)
- **View Products**: Browse all products in an organized table
- **Create Products**: Add new products with details:
  - Product Name
  - Category
  - Price & Original Price
  - Available Quantity
  - Rating
  - Description
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from inventory
- **Search**: Filter products by name or category

### 4. **Order Management** (`/admin/orders`)
- **View All Orders**: List all customer orders with details
- **Order Details**: Expand orders to view:
  - Delivery Address
  - Payment Method
  - Items in Order
  - Order Date & Total
- **Update Order Status**: Change order status:
  - Processing
  - In Transit
  - Delivered
  - Cancelled
- **Search**: Find orders by Order ID or User ID
- **Status Tracking**: Visual status indicators with color coding

### 5. **User Management** (`/admin/users`)
- **View All Users**: Browse registered customers
- **User Details**: Click to view:
  - User Email & ID
  - Join Date
  - User Role
  - Order History
- **Order History**: See all orders placed by each user
- **Search**: Filter users by email or user ID

### 6. **Authentication & Security**

#### Backend Security:
- Admin-specific JWT tokens with 1-hour expiration
- Role-based authorization middleware (`verifyAdminToken`)
- Admin routes require authentication
- Password hashing with bcrypt
- Rate limiting on login endpoints
- HTTP-only secure cookies
- CORS protection

#### Frontend Security:
- Admin token stored in localStorage
- Route protection with token verification
- Automatic redirect to login if token expires
- Session management

## Backend Implementation

### New Controllers
- **adminController.js** - Handles all admin operations:
  - `adminLogin()` - Admin authentication
  - `getDashboardStats()` - Dashboard metrics
  - `getAllUsers()` - Fetch user list
  - `createProduct()` - Add new product
  - `updateProduct()` - Modify product
  - `deleteProduct()` - Remove product
  - `getAllOrders()` - Fetch all orders
  - `updateOrderStatus()` - Change order status
  - `getUserDetails()` - Get user info and orders

### New Middleware
- **adminAuth.js** - Verifies admin token and role

### New Routes
- **admin.js** - Admin API endpoints:
  ```
  POST   /admin/login                 - Admin login
  GET    /admin/dashboard/stats       - Dashboard statistics
  GET    /admin/users                 - List all users
  GET    /admin/users/:id             - User details
  GET    /admin/orders                - List all orders
  PUT    /admin/orders/:id/status     - Update order status
  POST   /admin/products              - Create product
  PUT    /admin/products/:id          - Update product
  DELETE /admin/products/:id          - Delete product
  ```

## Frontend Implementation

### New Pages
1. **AdminLogin.tsx** - Admin login interface
2. **AdminDashboard.tsx** - Main admin dashboard
3. **AdminProducts.tsx** - Product management interface
4. **AdminOrders.tsx** - Order management interface
5. **AdminUsers.tsx** - User management interface

### Updated Files
- **App.tsx** - Added admin routes

## Database Schema Updates

### User Model
Already includes:
- `role` field: `['user', 'staff', 'admin']`
- Password hashing and comparison methods
- Timestamps

### Admin-Specific Fields
- Admin tokens have extended properties:
  - `id` - Admin ID
  - `role` - 'admin'
  - `email` - Admin email

## How to Use

### For Admins:

1. **Access Admin Portal**
   - Navigate to `/admin/login`
   - Enter admin email and password
   - Click "Access Admin Panel"

2. **View Dashboard**
   - See key metrics and charts
   - Click quick action buttons to manage resources

3. **Manage Products**
   - Go to "Manage Products"
   - Add, edit, or delete products
   - Search for specific products

4. **Manage Orders**
   - Go to "Manage Orders"
   - View order details by expanding
   - Update order status as needed
   - Track delivery progress

5. **Manage Users**
   - Go to "Manage Users"
   - Search for users
   - Click "View" to see user details and order history

6. **Logout**
   - Click "Logout" in dashboard header
   - Session will be cleared

### Creating Test Admin Account

To create an admin account in the database:

```javascript
const User = require('./models/User');

const adminUser = await User.create({
  email: 'admin@freshmart.com',
  password: 'AdminPassword123',
  role: 'admin'
});
```

## API Endpoints

### Admin Authentication
```
POST /api/admin/login
Body: { email, password }
Response: { ok: true, data: { id, email, role, token } }
```

### Admin Dashboard
```
GET /api/admin/dashboard/stats
Headers: Authorization: Bearer <adminToken>
Response: { ok: true, data: { totalUsers, totalProducts, totalOrders, recentOrders, topProducts } }
```

### Products Management
```
POST   /api/admin/products          - Create product
PUT    /api/admin/products/:id      - Update product
DELETE /api/admin/products/:id      - Delete product
```

### Orders Management
```
GET    /api/admin/orders            - List all orders
PUT    /api/admin/orders/:id/status - Update order status
Body: { status: "Processing|In Transit|Delivered|Cancelled" }
```

### Users Management
```
GET    /api/admin/users             - List all users
GET    /api/admin/users/:id         - Get user details with orders
```

## Security Best Practices Implemented

✅ Role-based authorization
✅ JWT token-based authentication
✅ Password hashing with bcrypt
✅ Rate limiting on sensitive endpoints
✅ HTTP-only secure cookies
✅ CORS protection
✅ Input validation
✅ Error handling
✅ Protected admin routes

## Future Enhancements

- [ ] Admin activity logging
- [ ] Two-factor authentication (2FA)
- [ ] Admin role permissions (Super Admin, Manager, etc.)
- [ ] Product bulk operations
- [ ] Advanced analytics and reporting
- [ ] Email notifications for admins
- [ ] Admin settings/preferences
- [ ] Audit trail for all admin actions
- [ ] Inventory alerts
- [ ] Sales reports and insights

## Troubleshooting

### Admin Login Not Working
- Verify admin account exists in database with `role: 'admin'`
- Check that email and password are correct
- Ensure backend server is running on port 5000
- Check CORS configuration in backend

### Dashboard Not Loading
- Verify admin token is stored in localStorage
- Check network tab for API errors
- Ensure admin is authenticated before accessing

### Can't Update Products
- Verify admin has proper permissions
- Check backend logs for errors
- Ensure product ID is valid

## Support

For issues or questions about the admin system, check:
1. Backend error logs
2. Browser console for frontend errors
3. Network tab in browser DevTools
4. Database connection status
