import { useState } from 'react';
import Input from '../components/Input';
import SearchResult from '../components/SearchResult';
import { fetchCards, insertCard } from '../services/api';

function Home({ token, onLogout }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    async function handleSearch() {
        try {
            const results = await fetchCards(searchQuery, token);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <button onClick={onLogout}>Logout</button>
            <Input onInsertCard={(card) => insertCard(card, token)} />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <SearchResult results={searchResults} />
        </div>
    );
}

export default Home;