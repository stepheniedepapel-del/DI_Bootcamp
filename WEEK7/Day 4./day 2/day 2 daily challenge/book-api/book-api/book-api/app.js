require('dotenv').config();
const express = require('express');
const bookRoutes = require('./server/routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Book API server running on http://localhost:${PORT}`);
});