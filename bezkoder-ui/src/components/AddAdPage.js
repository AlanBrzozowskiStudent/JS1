import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AddAdPage() {
    const [ad, setAd] = useState({
        title: '',
        description: '',
        location: '',
        phoneNumber: '',
        price: '',
        images: []
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAd({ ...ad, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = event => {
                    resolve(event.target.result);
                };
                reader.onerror = err => {
                    reject(err);
                };
                reader.readAsDataURL(file);
            });
        }))
        .then(images => {
            setAd({ ...ad, images: images });
        })
        .catch(err => {
            console.error('Error reading files', err);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/ads', JSON.stringify(ad), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Ad added successfully!');
        } catch (error) {
            setMessage('Failed to add ad.');
            console.error('Error adding ad:', error);
        }
    };

    return (
        <Container>
            <h1>Add New Ad</h1>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={ad.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={ad.description} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="location" value={ad.location} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phoneNumber" value={ad.phoneNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={ad.price} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
}

export default AddAdPage;
