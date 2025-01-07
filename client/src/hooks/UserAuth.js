import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Neplatný token:', error);
                setIsAuthenticated(false);
            }
        }
        
    }, []);

    return { user, isAuthenticated };
};

export default UserAuth;