# Mini eCommerce Flow

A 3-page mini eCommerce demo built with Next.js (React, Tailwind), Express, SQLite, and Mailtrap.io.

## Features
- Landing Page: Product selection, variant/quantity, Buy Now
- Checkout Page: Dynamic form, order summary, schema-based validation, transaction simulation
- Thank You Page: Order summary, customer info, confirmation, order number
- Email notifications (Mailtrap)
- SQLite database with sample products/variants

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, SQLite, Nodemailer
- **Email:** Mailtrap.io (sandbox)

## Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd e-commerce
```

### 2. Backend Setup
```bash
cd backend
npm install
# Copy .env and add your Mailtrap credentials
cp .env .env.local # or edit .env directly
```

#### Backend Environment Variables (.env)
```
BASE_URL=http://localhost:4000
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
PORT=4000
```
- Get your Mailtrap credentials from https://mailtrap.io/ (see below)

#### Start the backend server
```bash
node src/index.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
# Add backend URL to .env.local
```

#### Frontend Environment Variables (frontend/.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

#### Start the frontend
```bash
npm run dev
```

### 4. Mailtrap Setup
1. Sign up at [mailtrap.io](https://mailtrap.io/)
2. Create or use a Demo Inbox
3. Copy SMTP credentials into your backend `.env` as shown above
4. All order confirmation/failure emails will appear in your Mailtrap inbox

### 5. Usage
- Visit [http://localhost:3000](http://localhost:3000)
- Go through the product selection, checkout, and thank you flow
- Simulate payment status in the checkout popup (Success, Failure, Gateway Error)

### 6. Validation
- The checkout form uses a schema-based validation utility (`frontend/src/lib/validateCheckout.ts`) for clean, maintainable rules.
- All validation rules/messages are defined in one place and easy to update.

### 7. Deployment
- Frontend: Deploy to Vercel/Netlify
- Backend: Deploy to Railway/Render

## API Endpoints
- `GET /api/products` — List all products (with search & pagination)
- `GET /api/products/:id/variant/:variantId` — Get product with selected variant
- `POST /api/orders` — Place order
- `GET /api/orders/:orderId` — Get order summary

## License
MIT 