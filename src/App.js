/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);   // Will handle network errors
  const searchInputRef = useRef();  // Gives back a ref object

  const handleSubmit = event => {
    event.preventDefault();     // Prevents the page from reloading
    getResults();
  }

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } 
    catch (err) {
      setError(err)
    }
    setLoading(false);
  }

  useEffect(() => {
    getResults();
  }, []); // adding and empty array makes sure the component only updates once when component mounts and not on every update when setting new state (if not it becomes a loop).

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();   // .current.value() would give back the value, .current.focus will give us the focus of our search word in this case so that we can perform a new search after clearing up.
  }

  return (
    <div className="container max-w-xl mx-auto p-4 m-2 bg-purple-200 shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12" />
      <h1 className="text-grey-900 text-4xl font-thin">Hooks News</h1>
      <form onSubmit={handleSubmit} className="mb-4">  {/* För att få Enterknappen att starta sökningen!!! */}
        <input 
          type='text' 
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="boder p-1 rounded"
        />
        <button type="submit" className="bg-orange-500 rounded m-1 p-1">Search</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal-500 text-white p-1 rounded">Clear</button>  {/* Setting type to "button" makes this button not form part of the submit in this form. It will therefore not make any action onSubmit. */}
      </form>
      {loading ? (
        <div className="font-bold text-orange-dark">
          Loading results...
        </div>
      ) : (
        <ul className="list-reset leading-normal">
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url} className="text-indigo-700 hover:text-indigo-900">{result.title}</a>
          </li>
        ))}
      </ul>
      )}
      {error && <div className="text-red font-bolder">{error.message}</div>}     {/* if ... then return ... */}
    </div>
  );
}

export default App;
