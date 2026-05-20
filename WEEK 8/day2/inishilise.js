const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors()); // Prevents CORS errors between client and server ports
app.use(express.json()); // Parses incoming application/json request bodies

// Part I: GET route
app.get('/api/hello', (req, res) => {
  res.send('Hello From Express');
});

// Part II: POST route
app.post('/api/world', (req, res) => {
  console.log('Received body:', req.body); // Displays the body in your terminal node console
  const inputValue = req.body.value || '';
  res.send(`I received your POST request. This is what you sent me: ${inputValue}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
