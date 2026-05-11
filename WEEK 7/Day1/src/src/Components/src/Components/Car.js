import React, { useState } from 'react';
import Garage from './Garage';

function Car(props) {
  // Part II: Use the useState hook to add a color variable to the state
  // We initialize it with a default color, for example, "red"
  const [color, setColor] = useState("red");

  return (
    <div>
      {/* Part I & II: Render the color state and the model from props */}
      <h1>This car is a {color} {props.carinfo.model}</h1>
      
      {/* Part III: Use the Garage component and pass the size attribute */}
      <Garage size="small" />
    </div>
  );
}

export default Car;