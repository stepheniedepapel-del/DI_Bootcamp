import React from 'react';
import { useTheme } from './ThemeContext';

function ThemeSwitcher() {
  const { themeMode, currentTheme, toggleTheme } = useTheme();

  return (
    <div style={{
      backgroundColor: currentTheme.background,
      color: currentTheme.color,
      padding: '40px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    }}>
      <h2>Current Theme: {themeMode.toUpperCase()}</h2>
      <button 
        onClick={toggleTheme}
        style={{
          backgroundColor: currentTheme.buttonBg,
          color: currentTheme.color,
          padding: '10px 20px',
          border: '1px solid currentColor',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeSwitcher;
