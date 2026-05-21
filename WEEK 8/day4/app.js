import React, { useState, useEffect } from 'react';

// Sample data structure based on the provided instructions
const quotesData = [
  { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { quote: "Get busy living or get busy dying.", author: "Stephen King" },
  { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" }
];

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];

export default function App() {
  const [currentQuote, setCurrentQuote] = useState({});
  const [currentColor, setCurrentColor] = useState('#2c3e50');
  const [usedIndices, setUsedIndices] = useState([]);

  // Get a random item from any array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getNewQuote = () => {
    // Reset pool if all quotes have been viewed once
    let currentPool = [...usedIndices];
    if (currentPool.length === quotesData.length) {
      currentPool = [];
    }

    // Find indices that haven't been used yet
    const availableIndices = quotesData
      .map((_, index) => index)
      .filter(index => !currentPool.includes(index));

    // Select a random index from available pool
    const randomIndex = getRandomItem(availableIndices);
    
    // Update states
    setCurrentQuote(quotesData[randomIndex]);
    setCurrentColor(getRandomItem(colors));
    setUsedIndices([...currentPool, randomIndex]);
  };

  // Load initial quote on mount
  useEffect(() => {
    getNewQuote();
  }, []);

  // Inline styling for dynamic theme shifts
  const themeStyle = { color: currentColor, transition: 'all 0.5s ease' };
  const backgroundStyle = { backgroundColor: currentColor, transition: 'all 0.5s ease' };

  return (
    <div style={{ ...backgroundStyle, minHeight: '100vh', display: 'flex', justifyContent: 'center', Alignment: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', maxWidth: '500px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ ...themeStyle, fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
          "{currentQuote.quote}"
        </h1>
        
        <p style={{ ...themeStyle, textAlign: 'right', fontStyle: 'italic', marginBottom: '30px', fontWeight: 'bold' }}>
          - {currentQuote.author}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={getNewQuote} 
            style={{ ...backgroundStyle, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
          >
            New Quote
          </button>
        </div>

      </div>
    </div>
  );
}
