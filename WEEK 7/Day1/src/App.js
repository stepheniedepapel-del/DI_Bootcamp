import React from 'react';
import Car from './Components/Car';

function App() {
  // Part I: Create the carinfo object
  const carinfo = {name: "Ford", model: "Mustang"};

  return (
    <div className="App">
      {/* Pass the carinfo object as a prop to the Car component */}
      <Car carinfo={carinfo} />
    </div>
  );
}

export default App;