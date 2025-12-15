# freshmart-backend

Small Express backend scaffold for the Freshmart React frontend.

Run locally:

1. cd backend
2. npm install
3. copy `.env.example` → `.env` and update if needed
4. npm run dev

Default server: http://localhost:5000

Endpoints (examples):

- GET /api/products
- GET /api/products/:id
- GET /api/categories
- POST /api/newsletter (body: { email })
- POST /api/auth/signup
- POST /api/auth/login

Add new routes in `src/routes` and controllers in `src/controllers`.
