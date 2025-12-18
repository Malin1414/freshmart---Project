# freshmart-backend

Small Express backend scaffold for the Freshmart React frontend.

Run locally:

1. cd backend
2. npm install
3. copy `.env.example` → `.env` and update if needed
4. npm run dev

MongoDB (optional)

1. Install and start MongoDB locally, or use a cloud provider (MongoDB Atlas).
2. Set `MONGODB_URI` in `.env` (example: `mongodb://localhost:27017/freshmart`).
3. Run the seed script to populate sample data: `npm run seed`.
4. Start the server (`npm run dev`). The server will attempt to connect to MongoDB on boot.

When MongoDB is connected the API will use the database for products, categories, users and newsletter subscriptions. If `MONGODB_URI` is not provided the server falls back to an in-memory store for development.

Default server: http://localhost:5000

Endpoints (examples):

- GET /api/products
- GET /api/products/:id
- GET /api/categories
- POST /api/newsletter (body: { email })
- POST /api/auth/signup
- POST /api/auth/login

Add new routes in `src/routes` and controllers in `src/controllers`.
