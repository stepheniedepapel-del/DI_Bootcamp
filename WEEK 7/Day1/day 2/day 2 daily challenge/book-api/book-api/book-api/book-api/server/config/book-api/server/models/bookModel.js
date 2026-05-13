const db = require('../config/db');

const BookModel = {
  // Get all books
  getAll: () => {
    return db('books').select('*');
  },

  // Get book by ID
  getById: (id) => {
    return db('books').where({ id }).first();
  },

  // Create new book
  create: (bookData) => {
    return db('books')
      .insert(bookData)
      .returning('*');
  },

  // Update book
  update: (id, bookData) => {
    return db('books')
      .where({ id })
      .update(bookData)
      .returning('*');
  },

  // Delete book
  delete: (id) => {
    return db('books')
      .where({ id })
      .del()
      .returning('*');
  }
};

module.exports = BookModel;