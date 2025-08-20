import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setImages, setLoading, setError }) {
  const [query, setQuery] = useState('');
  const [improvedQuery, setImprovedQuery] = useState('');
  const [improving, setImproving] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = improvedQuery || query;
    if (!searchText.trim()) return;

    setLoading(true);
    setError('');
    
    axios.post('/api/search', { query: searchText })
      .then(res => {
        setImages(res.data.results);
      })
      .catch(err => {
        setError(
          err.response?.data?.error || 'Failed to fetch images.'
        );
        console.error('Search error:', err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleImprovePrompt = () => {
    if (!query.trim()) return;

    setImproving(true);
    setError('');

    axios.post('/api/improve', { query })
      .then(res => {
        const improved = res.data.improvedQuery;
        setImprovedQuery(improved);
        setQuery(improved);  // Update input field with improved prompt
      })
      .catch(err => {
        setError(
          err.response?.data?.error || 'Failed to improve prompt.'
        );
        console.error('Improve error:', err.response?.data || err.message);
      })
      .finally(() => setImproving(false));
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter keywords..."
          value={improvedQuery || query}
          onChange={e => {
            setQuery(e.target.value);
            setImprovedQuery('');  // Clear improved if user edits input
          }}
          aria-label="Search images"
        />
        <button type="submit">Search</button>
        <button
          type="button"
          style={{ marginLeft: '0.5rem' }}
          onClick={handleImprovePrompt}
          disabled={improving}
        >
          {improving ? 'Improving...' : 'Improve Prompt'}
        </button>
      </form>

      {/* Optional: Display error if any */}
      {setError && typeof setError === 'string' && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>{setError}</p>
      )}
    </div>
  );
}

export default SearchBar;
