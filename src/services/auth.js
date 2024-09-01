const API_URL = 'http://localhost:3000/api';

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Erro ao fazer login');
    }

    const data = await response.json();

    if (!data.token) {
        throw new Error('Token not found');
    }

    return data.token;
}

export function saveToken(token) {
    localStorage.setItem('authToken', token);
}

export function getToken() {
    return localStorage.getItem('authToken');
}

export function clearToken() {
    localStorage.removeItem('authToken');
}