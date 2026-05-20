import React, { useState } from 'react';
import Garage from './Garage';

function Car(props) {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h3>This car is {color} {props.carinfo.model}</h3>
      <Garage size="small" />
    </div>
  );
}

export default Car;