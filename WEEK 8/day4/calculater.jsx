import React, { useState } from 'react';

export default function Calculator() {
  // State for the two inputs, chosen operation, and the final output
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculateResult = (e) => {
    e.preventDefault();

    // Convert string input values to float numbers
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    // Validate inputs to ensure they are valid numbers
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Error: Please enter valid numbers');
      return;
    }

    let calculatedValue;

    // Switch case handling the dropdown selection
    switch (operation) {
      case 'add':
        calculatedValue = n1 + n2;
        break;
      case 'subtract':
        calculatedValue = n1 - n2;
        break;
      case 'multiply':
        calculatedValue = n1 * n2;
        break;
      case 'divide':
        if (n2 === 0) {
          setResult('Error: Cannot divide by zero');
          return;
        }
        calculatedValue = n1 / n2;
        break;
      default:
        return;
    }

    // Update result state, rounding up to 4 decimal places to prevent float overflows
    setResult(Number(calculatedValue.toFixed(4)));
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>React Calculator</h2>
      
      <form onSubmit={calculateResult} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Input Number 1 */}
        <input
          type="number"
          step="any"
          placeholder="First Number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
          required
        />

        {/* Bonus: Dropdown Selection for Operations */}
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
        >
          <option value="add">➕ Add (+)</option>
          <option value="subtract">➖ Subtract (-)</option>
          <option value="multiply">✖️ Multiply (×)</option>
          <option value="divide">➗ Divide (÷)</option>
        </select>

        {/* Input Number 2 */}
        <input
          type="number"
          step="any"
          placeholder="Second Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
          required
        />

        {/* Submit Action Button */}
        <button
          type="submit"
          style={{
            padding: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#3498db',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Calculate
        </button>
      </form>

      {/* Result Display Box */}
      {result !== null && (
        <div style={{
          marginTop: '25px',
          padding: '15px',
          borderRadius: '6px',
          backgroundColor: typeof result === 'string' ? '#fde8e8' : '#eaf2f8',
          color: typeof result === 'string' ? '#e74c3c' : '#2980b9',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          {typeof result === 'number' ? `Result: ${result}` : result}
        </div>
      )}
    </div>
  );
}
