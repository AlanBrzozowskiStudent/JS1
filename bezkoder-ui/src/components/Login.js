import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Form,Nav, Button, Card, Alert, Container } from 'react-bootstrap';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post('api/auth/signin', {
                username: credentials.username,
                password: credentials.password
            });
            localStorage.setItem('project-js-session', response.data.token);
            localStorage.setItem('username', credentials.username);
            history.push('/'); // Redirect to home page after successful login
            window.location.reload()            
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in
                    </h2>
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
                        <Button className="mt-3 w-100" type="submit">Login </Button>
                        <Button className="mt-3 w-100 btn btn-secondary"><Nav.Link as={Link} to="/signup">Singup</Nav.Link></Button> 
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
