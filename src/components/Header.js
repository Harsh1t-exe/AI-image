import React, { useContext } from 'react';
import { ThemeContext } from '../App';

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1rem 2rem',
      }}
    >
      <h1 style={{ margin: 0, flexGrow: 1, textAlign: 'center' }}>
        AI Image Generator
      </h1>

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle dark/light mode"
        style={{
          position: 'absolute',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
        }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default Header;
