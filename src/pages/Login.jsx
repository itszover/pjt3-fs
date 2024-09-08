import { useState } from 'react';
import { login as loginService, saveToken } from '../services/auth';
import '../styles/login.css';

function Login({ onLogin }) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        if (!username || !password) {
            setError('Usuário e a senha são obrigatórios.');
            return;
        }

        try {
            let token = await loginService(username, password);
            saveToken(token);
            onLogin(token);
        } catch (error) {
            setError('Falha no login. Por favor, verifique suas credenciais e tente novamente.');
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome de usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;