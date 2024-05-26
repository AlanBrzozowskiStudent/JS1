import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function Header() {
    const isLoggedIn = !!localStorage.getItem('project-js-session');
    const username = localStorage.getItem('username');  // Zakładamy, że nazwa użytkownika jest przechowywana w localStorage
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('project-js-session');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.reload(); // Odświeża stronę po wylogowaniu
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Bezkoder UI</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/account-settings" className="me-3">
                                    Account
                                </Nav.Link>
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
