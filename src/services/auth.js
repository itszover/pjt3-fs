const API_URL = 'http://localhost:3000/api';

export async function login(username, password) {
    let response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Erro ao fazer login');
    }

    let data = await response.json();

    if (!data.token) {
        throw new Error('Token not found');
    }

    saveToken(data.token);
    return data.token;
}

export function getToken() {
    return sessionStorage.getItem('authToken');
}

export function saveToken(token) {
    sessionStorage.setItem('authToken', token);
}

export function clearToken() {
    sessionStorage.removeItem('authToken');
}