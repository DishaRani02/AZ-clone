# Amazon Clone - E-Commerce Platform

## Live Demo
- Frontend: https://az-clone-delta.vercel.app
- Backend: https://az-clone-backend.vercel.app

## GitHub Repository
https://github.com/DishaRani02/AZ-Clone

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Deployment:** Vercel

## Features
- Product Listing with Search and Category Filter
- Product Detail Page with Add to Cart
- Shopping Cart (Add, Remove, Update Quantity)
- Checkout Page with Shipping Address Form
- Order Confirmation with Order ID

## Setup Instructions

### Run Locally

**Backend:**
```bash
cd backend
npm install
node server.js
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Database Schema
- **Products:** id, name, price, category, stock, image
- **Cart Items:** id, user_id, product_id, quantity
- **Orders:** id, user_id, total, status, shipping_address
- **Order Items:** id, order_id, product_id, quantity, unit_price

## Assumptions
- Default user is assumed to be logged in
- Products seeded across 5 categories
- Orders stored in memory