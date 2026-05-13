const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

// GET /api/books - Get all books
router.get('/', BookController.getAllBooks);

// GET /api/books/:bookId - Get single book
router.get('/:bookId', BookController.getBookById);

// POST /api/books - Create book
router.post('/', BookController.createBook);

// PUT /api/books/:bookId - Update book
router.put('/:bookId', BookController.updateBook);

// DELETE /api/books/:bookId - Delete book
router.delete('/:bookId', BookController.deleteBook);

module.exports = router;