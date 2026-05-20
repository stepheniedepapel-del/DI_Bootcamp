import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import CharacterCounter from './CharacterCounter';

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <ThemeSwitcher />
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CharacterCounter />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
