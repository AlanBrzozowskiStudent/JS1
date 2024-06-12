import React, { useState } from 'react';
import axios from 'axios';
import { useHistory,Link } from 'react-router-dom';
import {  Nav, Form, Button, Card, Alert, Container } from 'react-bootstrap';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            // Wysyłanie żądania logowania
            await axios.post('api/auth/signin', credentials, {
                withCredentials: true // Włączenie wysyłania ciasteczek z żądaniem
            });
            localStorage.setItem('username', credentials.username); // Zapisanie nazwy użytkownika dla potrzeb UI
            history.push('/'); // Przekierowanie na stronę główną po udanym logowaniu
            window.location.reload(); // Odświeżenie strony, aby zastosować zmiany w UI
        } catch (error) {
            setError('Login failed: ' + error.response.data.message); // Wyświetlenie błędu logowania
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={credentials.username} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
                        </Form.Group>
                        <Button className="mt-3 w-100" type="submit">Login</Button>
                    </Form>
                    <Button variant='secondary' className="mt-3 w-100"><Nav.Link as={Link} to="/signup" className="me-3">Signup</Nav.Link>
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
