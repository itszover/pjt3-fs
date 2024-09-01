import { useState } from 'react';
import { login, saveToken } from '../services/auth';

function Login({ onLogin }) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let token = await login(username, password);
            saveToken(token);
            onLogin(token);
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;