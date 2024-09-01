const API_URL = 'http://localhost:3000/api';

export async function fetchCards(query, token) {
    const response = await fetch(`${API_URL}/select?name=${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar cartas');
    }

    return await response.json();
}

export async function insertCard(card, token) {
    const response = await fetch(`${API_URL}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(card)
    });

    if (!response.ok) {
        throw new Error('Erro ao inserir carta');
    }

    return await response.json();
}