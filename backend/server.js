// server.js

const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Import route files
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use route files
app.use('/products', productRoutes); // Handles product-related endpoints
app.use('/users', userRoutes);       // Handles user-related endpoints
app.use('/orders', orderRoutes);     // Handles order-related analytics

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Ecommerce Chatbot Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
