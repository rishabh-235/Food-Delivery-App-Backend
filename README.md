# Food-Delivery-App Backend

This is the backend for the Food-Delivery-App, built with Node.js, Express, and MongoDB. It provides RESTful APIs for managing users, orders, menu items, tables, chefs, and analytics for a restaurant food delivery and dine-in system.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Scheduled Tasks](#scheduled-tasks)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

- Menu item management (CRUD)
- Order placement, tracking, and analytics
- Table allocation and management
- Chef allocation and management
- Revenue and order analytics (daily, monthly, yearly)
- Automatic order status updates via cron job

---

## Project Structure

```
Backend/
  ├── app.js
  ├── db.config.js
  ├── index.js
  ├── package.json
  ├── controllers/
  │     ├── analytics.controller.js
  │     ├── chef.controller.js
  │     ├── item.controller.js
  │     ├── order.controller.js
  │     ├── table.controller.js
  │     └── user.controller.js
  ├── models/
  │     ├── analytics.model.js
  │     ├── chef.model.js
  │     ├── item.model.js
  │     ├── order.model.js
  │     ├── table.model.js
  │     └── user.model.js
  └── routes/
        ├── admin.route.js
        ├── order.route.js
        └── user.route.js
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (local or cloud)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd Backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `Backend/` directory with the following variables:

   ```
   PORT=8000
   MONGODB_URI=<your-mongodb-uri>
   CORS_ORIGIN=<frontend-url>
   ```

4. **Start the server:**
   ```sh
   npm start
   ```
   The server will run on the port specified in `.env` (default: 8000).

---

## Deployed URL (`https://food-delivery-app-backend-1w4l.onrender.com`)

## API Endpoints

### User Routes (`/api/v1/user`)

- `POST /add-user` — Add or update a user
- `GET /get-user` — Get user by phone

### Order Routes (`/api/v1/order`)

- `POST /getitemsbycategory` — Get menu items by category
- `POST /get-item` — Get a menu item by ID
- `POST /add-order` — Place a new order (with table and chef allocation)
- `GET /get-orders` — Get all orders
- `PUT /update-order` — Update order statuses (used by cron)

### Admin Routes (`/api/v1/admin`)

- `POST /add-table` — Add a new table
- `GET /get-tables` — Get all tables
- `DELETE /remove-table` — Remove a table
- `GET /get-analytics` — Get overall analytics
- `GET /get-chefs` — Get all chefs
- `GET /get-today-order-summary` — Get today's order summary
- `GET /get-monthly-order-summary` — Get monthly order summary
- `GET /get-yearly-order-summary` — Get yearly order summary
- `GET /get-weekly-revenue-summary` — Get weekly revenue summary
- `GET /get-monthly-revenue-summary` — Get monthly revenue summary
- `GET /get-yearly-revenue-summary` — Get yearly revenue summary

---

## Scheduled Tasks

- A cron job runs every 5 minutes to update order statuses and free up tables and chefs as needed.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- node-cron (for scheduled tasks)
- dotenv (for environment variables)
