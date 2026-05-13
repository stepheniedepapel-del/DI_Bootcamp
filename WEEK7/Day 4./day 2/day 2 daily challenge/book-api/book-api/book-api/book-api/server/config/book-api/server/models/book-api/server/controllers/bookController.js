const BookModel = require('../models/bookModel');

const BookController = {
  // GET /api/books - Get all books
  getAllBooks: async (req, res, next) => {
    try {
      const books = await BookModel.getAll();
      res.status(200).json({
        message: 'Books retrieved successfully',
        books: books
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/books/:bookId - Get single book
  getBookById: async (req, res, next) => {
    try {
      const { bookId } = req.params;
      const book = await BookModel.getById(bookId);

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.status(200).json({
        message: 'Book retrieved successfully',
        book: book
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/books - Create book
  createBook: async (req, res, next) => {
    try {
      const { title, author, publishedYear } = req.body;

      if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
      }

      const newBook = await BookModel.create({ 
        title, 
        author, 
        publishedYear: publishedYear || null 
      });

      res.status(201).json({
        message: 'Book created successfully',
        book: newBook[0]
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/books/:bookId - Update book
  updateBook: async (req, res, next) => {
    try {
      const { bookId } = req.params;
      const { title, author, publishedYear } = req.body;

      const existingBook = await BookModel.getById(bookId);
      if (!existingBook) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const updateData = {};
      if (title) updateData.title = title;
      if (author) updateData.author = author;
      if (publishedYear !== undefined) updateData.publishedYear = publishedYear;

      const updatedBook = await BookModel.update(bookId, updateData);

      res.status(200).json({
        message: 'Book updated successfully',
        book: updatedBook[0]
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/books/:bookId - Delete book
  deleteBook: async (req, res, next) => {
    try {
      const { bookId } = req.params;

      const existingBook = await BookModel.getById(bookId);
      if (!existingBook) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const deletedBook = await BookModel.delete(bookId);

      res.status(200).json({
        message: 'Book deleted successfully',
        book: deletedBook[0]
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = BookController;