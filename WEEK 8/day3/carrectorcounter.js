import React, { useRef, useState } from 'react';

function CharacterCounter() {
  // Create a reference to the text input element
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  // Listen for changes in the text input using the ref reference
  const handleInputChange = () => {
    if (inputRef.current) {
      setCount(inputRef.current.value.length);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Character Counter (useRef)</h3>
      <input
        ref={inputRef}
        type="text"
        onInput={handleInputChange}
        placeholder="Type something here..."
        style={{ padding: '8px', width: '300px', fontSize: '16px' }}
      />
      <p style={{ marginTop: '10px', fontSize: '18px' }}>
        Character Count: <strong>{count}</strong>
      </p>
    </div>
  );
}

export default CharacterCounter;
