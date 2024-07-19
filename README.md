
# E-Commerce API

This is an e-commerce API built using Node.js, Express, and MongoDB. The API supports user registration and authentication, product management, shopping cart functionality, and UPI payment integration using Razorpay.

## Features

- User Registration and Authentication
- Product Management
- Shopping Cart Management
- UPI Payment Integration with Razorpay

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file at the root of the project and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLIENT_URL=your_client_url
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Routes

- **Register**
  ```
  POST /api/register
  ```
  Request Body:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Login**
  ```
  POST /api/login
  ```
  Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Logout**
  ```
  POST /api/logout
  ```

### Product Routes

- **Get All Products**
  ```
  GET /api/products
  ```

- **Get Product by ID**
  ```
  GET /api/products/:id
  ```

- **Add Product**
  ```
  POST /api/products
  ```
  Request Body:
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "image": "image_url",
    "description": "Product Description",
    "category": "Product Category"
  }
  ```

- **Edit Product**
  ```
  PUT /api/products/:id
  ```
  Request Body:
  ```json
  {
    "name": "Updated Product Name",
    "price": 150,
    "image": "updated_image_url",
    "description": "Updated Product Description",
    "category": "Updated Product Category"
  }
  ```

### Cart Routes

- **Add to Cart**
  ```
  POST /api/cart
  ```
  Request Body:
  ```json
  {
    "productId": "product_id",
    "quantity": 2,
    "price": 100
  }
  ```

- **Get Cart Items**
  ```
  GET /api/cart
  ```

### Payment Routes

- **Create UPI Order**
  ```
  POST /api/create-order
  ```

