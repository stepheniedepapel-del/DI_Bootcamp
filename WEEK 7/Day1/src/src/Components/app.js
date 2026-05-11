import React, { useState } from 'react';

function App() {
  // 1. Initialize the state with the array of language objects
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  // 2. Function to increase votes
  // We pass the 'index' so we know exactly which button was clicked
  const handleVote = (index) => {
    // Create a copy of the current languages array (we never modify state directly)
    const updatedLanguages = [...languages];

    // Increment the votes for the specific language at the clicked index
    updatedLanguages[index].votes += 1;

    // Update the state with the new array
    setLanguages(updatedLanguages);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Vote for your favorite language!</h1>
      
      <div className="container">
        {/* 3. Loop through the array to create a card for each language */}
        {languages.map((language, index) => (
          <div 
            key={index} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '20px', 
              margin: '10px', 
              display: 'inline-block',
              borderRadius: '8px',
              width: '150px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {/* Display Language Name */}
            <h2>{language.name}</h2>
            
            {/* Display Current Votes */}
            <p>Votes: {language.votes}</p>
            
            {/* Vote Button */}
            {/* When clicked, it calls handleVote and passes the current index */}
            <button 
              onClick={() => handleVote(index)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Vote Here
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;