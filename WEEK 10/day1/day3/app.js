const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Built-in body parser (replaces body-parser)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;