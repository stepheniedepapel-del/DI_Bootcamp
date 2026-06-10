import React, { useState } from 'react';

type LastAction = 'increment' | 'decrement' | 'none';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<LastAction>('none');

  const increment = () => {
    setCount((prev) => prev + 1);
    setLastAction('increment');
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
    setLastAction('decrement');
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>Last action: {lastAction}</p>
    </div>
  );
};

export default Counter;
