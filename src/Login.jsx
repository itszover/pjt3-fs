import React, { useState } from 'react';

function Login({ onLogin }) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');

    async function handleLogin() {
        try {
            let response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            let data = await response.json();
            onLogin(data.token);
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;