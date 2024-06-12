import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Row, Col, Image } from 'react-bootstrap';

function AddAdPage() {
    const initialAdState = {
        title: '',
        description: '',
        location: '',
        phoneNumber: '',
        price: '',
        creator: localStorage.getItem('username'),
        published: false
    };
    const initialImagesState = {
        mainImage: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null
    };
    const initialPreviewState = {
        mainImagePreview: '',
        image2Preview: '',
        image3Preview: '',
        image4Preview: '',
        image5Preview: ''
    };

    const [ad, setAd] = useState(initialAdState);
    const [images, setImages] = useState(initialImagesState);
    const [previews, setPreviews] = useState(initialPreviewState);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAd({ ...ad, [name]: value });
    };

    const handleImageChange = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [`${key}Preview`]: reader.result }));
            };
            reader.readAsDataURL(file);
            setImages(prev => ({ ...prev, [key]: file }));
        }
    };

    const handleRemoveImage = (key) => {
        setImages(prev => ({ ...prev, [key]: null }));
        setPreviews(prev => ({ ...prev, [`${key}Preview`]: '' }));
        document.getElementById(`${key}-input`).value = '';  // Reset file input
    };

    const resetForm = () => {
        setAd(initialAdState);
        setImages(initialImagesState);
        setPreviews(initialPreviewState);
        document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(ad).forEach(key => formData.append(key, ad[key]));
        Object.keys(images).forEach((key, index) => {
            if (images[key]) {
                formData.append('images', images[key], `image${index + 1}.jpg`);
            }
        });

        try {
            const response = await axios.post('api/ads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Ad added successfully!');
            resetForm();
        } catch (error) {
            setMessage(`Failed to add ad. Error: ${error.response.data.message || error.message}`);
            console.error('Error adding ad:', error);
        }
    };

    const handleToggle = (e) => {
        setAd({ ...ad, published: e.target.checked });
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
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phoneNumber" value={ad.phoneNumber} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={ad.price} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Main Image (Required)</Form.Label>
                    <Form.Control
                        type="file"
                        id="mainImage-input"
                        onChange={(e) => handleImageChange(e, 'mainImage')}
                        required
                    />
                    {previews.mainImagePreview && (
                        <div className="mt-2">
                            <Image src={previews.mainImagePreview} thumbnail style={{ width: '100px', height: 'auto' }} />
                            <Button
                                variant="danger"
                                className="ms-2"
                                onClick={() => handleRemoveImage('mainImage')}
                                style={{ display: 'inline-block' }}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </Form.Group>
                <Row>
                    {[2, 3, 4, 5].map(i => (
                        <Col md={6} key={`image${i}`}>
                            <Form.Group className="mb-3">
                                <Form.Label>Image {i}</Form.Label>
                                <Form.Control
                                    type="file"
                                    id={`image${i}-input`}
                                    onChange={(e) => handleImageChange(e, `image${i}`)}
                                />
                                {previews[`image${i}Preview`] && (
                                    <div className="mt-2">
                                        <Image src={previews[`image${i}Preview`]} thumbnail style={{ width: '100px', height: 'auto' }} />
                                        <Button
                                            variant="danger"
                                            className="ms-2"
                                            onClick={() => handleRemoveImage(`image${i}`)}
                                            style={{ display: 'inline-block' }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col className="mb-3">
                        <Form.Group>
                            <Form.Check
                                type="switch"
                                id="published-switch"
                                label={ad.published ? "Ad is published" : "Ad is a draft"}
                                checked={ad.published}
                                onChange={handleToggle}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <Button className="mb-4" variant="primary" type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default AddAdPage;
