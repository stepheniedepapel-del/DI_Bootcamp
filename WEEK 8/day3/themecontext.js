import React, { createContext, useState, useContext } from 'react';

// Define context
const ThemeContext = createContext();

// Theme styling configurations
export const themes = {
  light: {
    background: '#ffffff',
    color: '#000000',
    buttonBg: '#f0f0f0'
  },
  dark: {
    background: '#222222',
    color: '#ffffff',
    buttonBg: '#444444'
  }
};

// Provider component
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = themes[themeMode];

  return (
    <ThemeContext.Provider value={{ themeMode, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consumption
export const useTheme = () => useContext(ThemeContext);
