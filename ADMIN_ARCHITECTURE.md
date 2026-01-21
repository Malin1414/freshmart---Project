# FreshMart Admin System - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FreshMart Admin System                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐          │
│  │ AdminLogin   │  │ AdminDashboard│  │AdminProducts │          │
│  │   Page       │  │     Page      │  │    Page      │          │
│  └──────────────┘  └───────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────┐  ┌───────────────┐                            │
│  │ AdminOrders  │  │ AdminUsers    │                            │
│  │    Page      │  │    Page       │                            │
│  └──────────────┘  └───────────────┘                            │
│                                                                  │
│  All pages use React Router for navigation                      │
│  All data fetches to Backend API                               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ▲
                              │ HTTP Requests
                              │ with JWT Token
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                   API Gateway & Middleware                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │              Rate Limiter (10/15min)                 │       │
│  └──────────────────────────────────────────────────────┘       │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────┐       │
│  │        CORS & Security Headers (Helmet)             │       │
│  └──────────────────────────────────────────────────────┘       │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────┐       │
│  │    Auth Limiter on /api/admin/login                 │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                   Backend Routes (/api)                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │                 Admin Routes                         │       │
│  │  ┌────────────────────────────────────────────────┐ │       │
│  │  │ POST   /admin/login                            │ │       │
│  │  │ GET    /admin/dashboard/stats                  │ │       │
│  │  │ POST   /admin/products                         │ │       │
│  │  │ PUT    /admin/products/:id                     │ │       │
│  │  │ DELETE /admin/products/:id                     │ │       │
│  │  │ GET    /admin/orders                           │ │       │
│  │  │ PUT    /admin/orders/:id/status                │ │       │
│  │  │ GET    /admin/users                            │ │       │
│  │  │ GET    /admin/users/:id                        │ │       │
│  │  └────────────────────────────────────────────────┘ │       │
│  │                    ▼                                 │       │
│  │            Admin Auth Middleware                     │       │
│  │      (Verify Token & Role: 'admin')                 │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │              Other Routes                           │       │
│  │  (Products, Auth, Categories, Newsletter)           │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Controllers Layer                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │              adminController.js                      │       │
│  │  ├─ adminLogin()                                    │       │
│  │  ├─ getDashboardStats()                             │       │
│  │  ├─ createProduct()                                 │       │
│  │  ├─ updateProduct()                                 │       │
│  │  ├─ deleteProduct()                                 │       │
│  │  ├─ getAllOrders()                                  │       │
│  │  ├─ updateOrderStatus()                             │       │
│  │  ├─ getAllUsers()                                   │       │
│  │  └─ getUserDetails()                                │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │           Other Controllers                          │       │
│  │  (authController, productsController, etc)          │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Models & Database                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │                Mongoose Models                       │       │
│  │  ├─ User (with role field: user/staff/admin)       │       │
│  │  ├─ Product                                         │       │
│  │  ├─ Order                                           │       │
│  │  ├─ Category                                        │       │
│  │  └─ Newsletter                                      │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                  MongoDB Database                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Collections:                                                   │
│  ├─ users (with admin role)                                    │
│  ├─ products                                                    │
│  ├─ orders                                                      │
│  ├─ categories                                                  │
│  └─ newsletters                                                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│          Admin Login Authentication Flow                    │
└─────────────────────────────────────────────────────────────┘

Frontend (AdminLogin.tsx)
    │
    │ 1. User enters credentials
    │    (email & password)
    │
    ├─────────────────────────────────────────────────────────────►
    │                                                            │
    │                                                    Backend (POST /admin/login)
    │                                                            │
    │                                                  1. Find user by email
    │                                                  2. Verify password
    │                                                  3. Check role === 'admin'
    │                                                  4. Generate JWT token
    │                                                  5. Set secure cookie
    │                                                            │
    │                                                            ├─ Response: { token, email, role }
    │◄──────────────────────────────────────────────────────────┤
    │
    │ 2. Store token in localStorage
    │ 3. Redirect to /admin/dashboard
    │
    └─────────────────────────────────────────────────────────────┘

Subsequent Requests:
    │
    │ Each request includes:
    │ - Authorization: Bearer <token>
    │ - Cookie: adminToken=<token>
    │
    ├─────────────────────────────────────────────────────────────►
    │
    │                                  Backend (Protected Route)
    │                                            │
    │                                  1. Verify token in headers/cookies
    │                                  2. Decode JWT
    │                                  3. Check role === 'admin'
    │                                  4. Attach user to request
    │                                  5. Continue to controller
    │
    │◄──────────────────────────────────────────────────────────────
    │
    │ Response with data
    │
    └─────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Add Product Example

```
User Interface (AdminProducts.tsx)
    │
    │ User fills form and clicks "Create Product"
    │
    ▼
Form Validation (Zod Schema)
    │
    │ Validates:
    │ - Product name
    │ - Category
    │ - Price
    │ - Quantity
    │
    ├─ Error? Show to user
    │
    ▼ (if valid)
API Request
    │
    │ POST /api/admin/products
    │ Headers: Authorization: Bearer <token>
    │ Body: { name, category, price, quantity, ... }
    │
    ├───────────────────────────────────────────────────┐
    │                                                   │
    ▼                                                   │
Backend Request Handler                                 │
    │                                                   │
    │ 1. Admin Auth Middleware                         │
    │    - Verify token                                │
    │    - Check role === 'admin'                      │
    │                                                   │
    ├─ Not admin? Return 403                          │
    │                                                   │
    ▼ (if authorized)                                  │
Create Product Controller                              │
    │                                                   │
    │ 1. Validate input                                │
    │ 2. Create product document                       │
    │ 3. Save to MongoDB                               │
    │ 4. Return created product                        │
    │                                                   │
    │                                                   │
    │ Response: 201 Created                            │
    │ Body: { _id, name, category, price, ... }       │
    │                                                   │
    │◄──────────────────────────────────────────────────┤
    │
    │ Response received
    │
    ▼
Update UI
    │
    │ 1. Show success toast
    │ 2. Add product to list
    │ 3. Clear form
    │ 4. Close add product panel
    │
    ▼
User sees new product in list

```

---

## Security Layers

```
┌────────────────────────────────────────────────────────────┐
│            Security Implementation Layers                  │
└────────────────────────────────────────────────────────────┘

Layer 1: Network Security
├─ HTTPS (recommended in production)
├─ CORS - whitelist specific origins
└─ Security Headers (Helmet.js)

Layer 2: Authentication
├─ Email/Password verification
├─ JWT token generation
├─ Token expiration (1 hour)
└─ Role verification (admin)

Layer 3: Authorization
├─ Admin middleware on all protected routes
├─ Role check in middleware
├─ Per-endpoint permissions
└─ User ownership verification

Layer 4: Data Protection
├─ Password hashing (bcrypt, salt 12)
├─ Input validation (Zod schema)
├─ SQL injection prevention
└─ XSS protection

Layer 5: Rate Limiting
├─ 10 attempts per 15 minutes
├─ Per-IP rate limiting
├─ Prevent brute force attacks
└─ DDoS mitigation

Layer 6: Cookie Security
├─ HttpOnly flag (XSS protection)
├─ Secure flag (HTTPS only)
├─ SameSite attribute (CSRF protection)
└─ Proper expiration
```

---

## Component Hierarchy

```
App.tsx
│
├─ BrowserRouter
│  │
│  ├─ Route: /admin/login
│  │  └─ AdminLogin.tsx
│  │     ├─ useNavigate()
│  │     ├─ useToast()
│  │     └─ Form validation (Zod)
│  │
│  ├─ Route: /admin/dashboard
│  │  └─ AdminDashboard.tsx
│  │     ├─ useNavigate()
│  │     ├─ useToast()
│  │     ├─ useEffect (fetch stats)
│  │     ├─ BarChart (Recharts)
│  │     └─ PieChart (Recharts)
│  │
│  ├─ Route: /admin/products
│  │  └─ AdminProducts.tsx
│  │     ├─ useState (products, form)
│  │     ├─ useEffect (fetch)
│  │     ├─ Product table
│  │     ├─ Add/Edit form
│  │     └─ Search functionality
│  │
│  ├─ Route: /admin/orders
│  │  └─ AdminOrders.tsx
│  │     ├─ useState (orders, expanded)
│  │     ├─ useEffect (fetch)
│  │     ├─ Order list
│  │     ├─ Expandable details
│  │     └─ Status buttons
│  │
│  └─ Route: /admin/users
│     └─ AdminUsers.tsx
│        ├─ useState (users, selected)
│        ├─ useEffect (fetch)
│        ├─ User list table
│        └─ User details view
│
└─ QueryClientProvider
   └─ ShopProvider (global state)
```

---

## File Dependencies

```
Frontend Dependencies:
│
AdminLogin.tsx
├─ components/ui/button.tsx
├─ components/ui/input.tsx
├─ components/ui/label.tsx
├─ hooks/use-toast.ts
└─ lucide-react (icons)

AdminDashboard.tsx
├─ recharts (charts)
├─ components/ui/button.tsx
├─ hooks/use-toast.ts
└─ lucide-react (icons)

AdminProducts.tsx
├─ components/ui/button.tsx
├─ components/ui/input.tsx
├─ components/ui/label.tsx
├─ hooks/use-toast.ts
└─ lucide-react (icons)

AdminOrders.tsx
├─ components/ui/button.tsx
├─ components/ui/label.tsx
├─ hooks/use-toast.ts
└─ lucide-react (icons)

AdminUsers.tsx
├─ components/ui/button.tsx
├─ components/ui/input.tsx
├─ hooks/use-toast.ts
└─ lucide-react (icons)

Backend Dependencies:
│
adminController.js
├─ ../models/User.js
├─ ../models/Product.js
├─ ../models/Order.js
└─ jsonwebtoken

admin.js
├─ ../controllers/adminController.js
├─ ../middleware/adminAuth.js
└─ express

adminAuth.js
├─ jsonwebtoken
└─ Direct middleware
```

---

## Database Schema

```
┌─────────────────────────────────────────────────────────┐
│                   Users Collection                      │
├─────────────────────────────────────────────────────────┤
│ _id          : ObjectId                                 │
│ email        : String (unique, indexed)                │
│ password     : String (hashed with bcrypt)             │
│ role         : String (enum: user|staff|admin)         │
│ loginAttempts: Number (default: 0)                     │
│ lockUntil    : Number (optional)                       │
│ createdAt    : Date (auto)                             │
│ updatedAt    : Date (auto)                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 Products Collection                     │
├─────────────────────────────────────────────────────────┤
│ _id               : ObjectId                            │
│ name              : String                              │
│ category          : String                              │
│ price             : Number                              │
│ originalPrice     : Number (optional)                  │
│ rating            : Number (0-5)                       │
│ reviews           : Number                              │
│ image             : String (URL)                        │
│ badge             : String (optional)                  │
│ availableQuantity : Number                              │
│ description       : String                              │
│ createdAt         : Date (auto)                        │
│ updatedAt         : Date (auto)                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Orders Collection                      │
├─────────────────────────────────────────────────────────┤
│ _id      : ObjectId                                     │
│ userId   : ObjectId (ref: User)                        │
│ date     : Date                                         │
│ total    : Number                                       │
│ status   : String (Processing|In Transit|Delivered)    │
│ items    : [String] (product names)                    │
│ address  : String                                       │
│ payment  : String                                       │
│ createdAt: Date (auto)                                 │
│ updatedAt: Date (auto)                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Environment Configuration Diagram

```
┌─────────────────────────────────────────────────────────┐
│         Environment Variables Configuration            │
└─────────────────────────────────────────────────────────┘

Development Environment
├─ MONGODB_URI: mongodb://localhost:27017
├─ JWT_ACCESS_SECRET: dev_secret
├─ JWT_ADMIN_SECRET: dev_admin_secret
├─ NODE_ENV: development
├─ FRONTEND_URL: http://localhost:5173
├─ PORT: 5000
├─ COOKIE_SECURE: false
└─ COOKIE_SAME_SITE: Strict

Production Environment
├─ MONGODB_URI: mongodb+srv://user:pass@cluster
├─ JWT_ACCESS_SECRET: (strong random)
├─ JWT_ADMIN_SECRET: (strong random)
├─ NODE_ENV: production
├─ FRONTEND_URL: https://yourdomain.com
├─ PORT: 443
├─ COOKIE_SECURE: true
└─ COOKIE_SAME_SITE: Strict

Local Testing Environment
├─ MONGODB_URI: mongodb://localhost:27017
├─ JWT_ACCESS_SECRET: test_key_123456789
├─ NODE_ENV: development
├─ FRONTEND_URL: http://localhost:3000
└─ PORT: 5000
```

---

This architecture provides:
✅ **Scalability** - Modular design
✅ **Security** - Multiple protection layers
✅ **Maintainability** - Clear separation of concerns
✅ **Performance** - Optimized data flow
✅ **Reliability** - Error handling throughout

---

**Last Updated:** January 2026
**Architecture Version:** 1.0
