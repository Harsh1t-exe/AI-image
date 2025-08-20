import React, { useState, createContext } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import './App.css';

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${theme}`}>
        <Header />
        <main>
          <SearchBar setImages={setImages} setLoading={setLoading} setError={setError} />
          {loading && <div className="loader">Loading...</div>}
          {error && <div className="error">{error}</div>}
          <ImageGrid images={images} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
