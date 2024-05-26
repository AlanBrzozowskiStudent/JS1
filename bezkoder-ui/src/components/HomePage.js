import Button from 'react-bootstrap/Button';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const isLoggedIn = !!localStorage.getItem('project-js-session');

    return (
        <div>
            <h1>Witaj na stronie głównej</h1>
            {isLoggedIn ? (
                <div>
                    <Link to="/user-profile">
                        <Button >Profil użytkownika</Button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">
                    <Button >Zaloguj</Button>
                    </Link>
                    <Link to="/signup">
                    <Button >Rejestracja
                        
                    </Button>
                    </Link>
                </div>
                
            )}
        </div>
    );
}

export default HomePage;
