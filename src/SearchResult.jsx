import React from 'react';

function SearchResult({ results }) {
  return (
    <div className="search-results">
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
            <img src={result.image} alt={result.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;