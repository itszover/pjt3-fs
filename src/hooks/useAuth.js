import { useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../services/auth';

function useAuth() {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [token, setToken] = useState(null);

    useEffect(() => {
        let savedToken = getToken();
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    }, []);

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

    return { isLoggedIn, token, login, logout };
}

export default useAuth;