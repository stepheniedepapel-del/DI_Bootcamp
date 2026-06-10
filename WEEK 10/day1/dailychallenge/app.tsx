// App.tsx
import React from 'react';
import BookApp from './components/BookApp';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <BookApp />
    </div>
  );
};

export default App;