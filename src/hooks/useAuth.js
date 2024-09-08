import { useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../services/auth';

const API_URL = 'http://localhost:3000/api';

function useAuth() {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [token, setToken] = useState(null);
    let [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let savedToken = getToken();
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage); // Show dialog message
            clearToken();
            setToken(null);
            setIsLoggedIn(false);
        }
    }, [errorMessage]);

    function login(token) {
        saveToken(token);
        setToken(token);
        setIsLoggedIn(true);
    };

    function logout() {
        clearToken();
        setToken(null);
        setIsLoggedIn(false);
    };

    async function checkTokenValidity() {
        try {
            let response = await fetch(`${API_URL}/check-token`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                let data = await response.json();
                if (data.code === "TOKEN_EXPIRED" || data.code === "TOKEN_INVALID") {
                    setErrorMessage(data.message);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function logout() {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            clearToken();
            setToken(null);
            setIsLoggedIn(false);
        }
    }

    return { isLoggedIn, token, login, logout, checkTokenValidity };
}

export default useAuth;