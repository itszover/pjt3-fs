import { useState } from 'react';
import SearchResult from './SearchResult';
import Input from './Input';
import Login from './Login';

function App() {
    let [searchResults, setSearchResults] = useState([]);
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [token, setToken] = useState(null); // State to store the token

    function insertCard(card) {
        fetch('http://localhost:3000/api/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
             },
            body: JSON.stringify(card)
        });
    }

    async function searchCards(name) {
        let response = await fetch(`http://localhost:3000/api/select?name=${name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
             }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar cartas');
        }

        let data = await response.json();
        setSearchResults(data);
    }

    const handleLogin = (token) => {
        setToken(token);
        setIsLoggedIn(true);
    };

    return (
        <div className="container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Input onInsertCard={insertCard} />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => searchCards(e.target.value)}
          />
          <SearchResult results={searchResults} />
        </>
      )}
    </div>
    );
}

export default App;