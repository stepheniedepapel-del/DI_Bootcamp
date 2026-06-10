import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
  index: number;
}

const BookCard: React.FC<<BookCardProps> = ({ book, onDelete, index }) => {
  return (
    <div className="book-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="book-icon">📚</div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        {book.genre && <span className="book-genre">{book.genre}</span>}
        {book.year && <span className="book-year">{book.year}</span>}
      </div>
      <button 
        className="delete-btn"
        onClick={() => onDelete(book.id)}
        aria-label={`Delete ${book.title}`}
      >
        ✕
      </button>
    </div>
  );
};

export default BookCard;