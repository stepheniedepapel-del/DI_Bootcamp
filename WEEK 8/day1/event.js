import React, { useState } from 'react';

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  // Part I: clickMe function
  const clickMe = () => {
    alert('I was clicked');
  };

  // Part II: handleKeyDown function
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`The input entered is: "${e.target.value}"`);
    }
  };

  // Part III: toggle function
  const toggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      {/* Part I: Button with onClick */}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={clickMe}>Click Me</button>
      </div>

      {/* Part II: Input with onKeyDown */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          onKeyDown={handleKeyDown} 
          placeholder="Type something and press Enter"
          style={{ padding: '5px', width: '250px' }}
        />
      </div>

      {/* Part III: Toggle button */}
      <div>
        <button onClick={toggle}>
          {isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}

export default Events;