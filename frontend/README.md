# Amazon Clone - E-Commerce Platform

A fully functional e-commerce web application that replicates Amazon's design and user experience.

## Live Demo
- **Frontend:** https://az-clone-delta.vercel.app
- **Backend API:** https://az-clone-backend.vercel.app

## GitHub Repository
https://github.com/DishaRani02/AZ-Clone

---

## Tech Stack

### Frontend
- React.js (Single Page Application)
- CSS3 with Responsive Design
- EmailJS (Email Notifications)

### Backend
- Node.js
- Express.js
- REST API Architecture

### Database
- Supabase (PostgreSQL)

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: Supabase (South Asia - Mumbai)

---

## Features

### Core Features
- **Product Listing Page** — Grid layout with product cards showing image, name, price, and Add to Cart button
- **Search Functionality** — Search products by name in real time
- **Category Filter** — Filter products by Electronics, Fashion, Kitchen, Home, Sports
- **Product Detail Page** — Full product view with image, price, stock status, quantity selector
- **Shopping Cart** — Add, remove, and update product quantities with subtotal
- **Checkout Page** — Shipping address form with order summary
- **Order Confirmation** — Order ID generated on successful placement

### Bonus Features
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Order History** — View all past orders in navbar
- **Wishlist** — Save favourite products with heart icon
- **Email Notification** — Confirmation email sent on order placement via EmailJS

---

## Database Schema

### Tables

**users**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique user ID |
| name | VARCHAR | User full name |
| email | VARCHAR | User email (unique) |
| address | TEXT | User address |
| created_at | TIMESTAMP | Account creation time |

**categories**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique category ID |
| name | VARCHAR | Category name |
| slug | VARCHAR | URL-friendly name |

**products**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique product ID |
| category_id | INT FK | References categories |
| name | VARCHAR | Product name |
| description | TEXT | Product description |
| price | DECIMAL | Product price |
| stock | INT | Available stock |
| image | TEXT | Product image URL |
| created_at | TIMESTAMP | Product creation time |

**cart_items**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique cart item ID |
| user_id | INT FK | References users |
| product_id | INT FK | References products |
| quantity | INT | Item quantity |

**orders**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique order ID |
| user_id | INT FK | References users |
| total | DECIMAL | Order total amount |
| status | VARCHAR | Order status |
| shipping_address | TEXT | Delivery address |
| created_at | TIMESTAMP | Order placement time |

**order_items**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique order item ID |
| order_id | INT FK | References orders |
| product_id | INT FK | References products |
| quantity | INT | Item quantity |
| unit_price | DECIMAL | Price at time of purchase |

---

## Project Structure
```
amazon-clone/
├── frontend/                  # React.js Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js          # Top navigation bar
│       │   ├── ProductCard.js     # Product grid card
│       │   ├── ProductDetailPage.js # Product detail view
│       │   ├── CartPage.js        # Shopping cart
│       │   ├── CheckoutPage.js    # Checkout + email
│       │   └── OrderHistory.js    # Past orders
│       ├── App.js                 # Main app component
│       └── App.css                # Global styles
│
└── backend/                   # Node.js + Express Backend
    ├── data/
    │   └── products.js            # Sample product data
    ├── routes/
    │   ├── products.js            # Products API routes
    │   └── orders.js              # Orders API routes
    ├── .env                       # Environment variables
    └── server.js                  # Express server + Supabase
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products?search=query | Search products |
| GET | /api/products?category=Electronics | Filter by category |
| GET | /api/products/:id | Get single product |
| POST | /api/orders | Place new order |
| GET | /api/orders | Get all orders |

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or above)
- Git
- Supabase account
- EmailJS account

### 1. Clone the Repository
```bash
git clone https://github.com/DishaRani02/AZ-Clone.git
cd AZ-Clone
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

Run backend:
```bash
node server.js
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

### 4. Database Setup
- Create a Supabase project
- Run the SQL schema from `database/schema.sql`
- Add Supabase URL and Key to `.env` file

---

## Assumptions
- A default user is assumed to be logged in (no authentication required as per assignment)
- Products are seeded with sample data across 5 categories
- `unit_price` is stored in `order_items` to preserve price at time of purchase
- Orders are saved to Supabase database
- Email notifications are sent via EmailJS on order placement

---

## Sample Product Categories
- Electronics (Headphones, TV, iPhone)
- Fashion (Nike Shoes, Sunglasses)
- Kitchen (Mixer Grinder)
- Home (LED Bulbs)
- Sports (Yoga Mat)

---

## Developed By
**Disha Rani**
Scaler SDE Intern Assignment — Full Stack E-Commerce Platform