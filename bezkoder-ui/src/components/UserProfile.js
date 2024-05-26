import React from 'react';
import { useHistory } from 'react-router-dom';

function UserProfile() {
    const history = useHistory();

    // Przykładowe dane użytkownika - normalnie należałoby je pobrać z serwera po zalogowaniu.
    const user = {
        username: localStorage.getItem('username'), // Zakładamy, że zapisujesz nazwę użytkownika w localStorage.
        email: localStorage.getItem('email'), // Zakładamy, że email również jest zapisany.
    };

    const handleLogout = () => {
        // Czyszczenie localStorage
        localStorage.removeItem('project-js-session');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        history.push('/login'); // Przekierowanie do logowania
    };

    if (!localStorage.getItem('project-js-session')) {
        history.push('/login'); // Przekierowanie do logowania, jeśli użytkownik nie jest zalogowany
    }

    return (
        <div>
            <h1>Profil Użytkownika</h1>
            <p>Nazwa użytkownika: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Wyloguj</button>
        </div>
    );
}

export default UserProfile;
