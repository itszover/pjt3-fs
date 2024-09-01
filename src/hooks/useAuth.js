import { useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../services/auth';

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = getToken();
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token) => {
        saveToken(token);
        setToken(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        clearToken();
        setToken(null);
        setIsLoggedIn(false);
    };

    return { isLoggedIn, token, login, logout };
}

export default useAuth;