import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/api/user/profile', { withCredentials: true });
                setIsLoggedIn(true);
                setUsername(response.data.username);
            } catch (error) {
                setIsLoggedIn(false);
                setUsername('');
            }
        };

        checkLoginStatus();
    }, []);

    const login = async (credentials) => {
        await axios.post('/api/auth/signin', credentials, { withCredentials: true });
        setIsLoggedIn(true);
        setUsername(credentials.username);
    };

    const logout = async () => {
        await axios.post('/api/auth/logout', {}, { withCredentials: true });
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
