import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Container, Row, Col, Button, Card, Alert, Modal, Form } from 'react-bootstrap';

function MyOffers() {
    const [myAds, setMyAds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get('api/ads');
                const ads = response.data.filter(ad => ad.creator === username);
                setMyAds(ads);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };

        fetchAds();
    }, []);

    const deleteAd = async (id) => {
        try {
            await axios.delete(`api/ads/${id}`);
            setMyAds(prev => prev.filter(ad => ad.id !== id));
            setMessage('Ad deleted successfully!');
        } catch (error) {
            setMessage('Failed to delete ad.');
            console.error('Error deleting ad:', error);
        }
    };

    const openModal = (ad) => {
        setSelectedAd(ad);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAd(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedAd(prev => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();




        const formData = new FormData();
        Object.keys(selectedAd).forEach(key => {
            if (key !== 'images') { // Append all non-image data normally
                formData.append(key, selectedAd[key]);
            }
        });

        // Append images, checking whether they're new files or unchanged base64 strings

        try {
            await axios.put(`api/ads/${selectedAd.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Ad updated successfully! This windows will be close in 2 sek.');
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            setMessage(`Failed to update ad. Error: ${error.response?.data?.message || error.message}`);
            console.error('Error updating ad:', error);
        }
    };

    return (
        <Container>
            <h1>My Offers</h1>

            <Row>
                {myAds.map(ad => (
                    <Col md={4} key={ad.id}>
                        <Card>
                            <Card.Img variant="top" src={ad.images[0] || ''} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{ad.title}</Card.Title>
                                <Card.Text>
                                    Location: {ad.location}
                                    <br />
                                    Price: ${ad.price.toFixed(2)}
                                </Card.Text>
                                <Button variant="danger" className="m-2" onClick={() => deleteAd(ad.id)}>Delete</Button>
                                <Button variant="secondary" className="m-2" onClick={() => openModal(ad)}>Edit</Button>                                
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedAd && (
                <Modal show={showModal} onHide={closeModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Ad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Carousel>
                            {selectedAd.images.map((img, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={img}
                                        alt={`Slide ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={selectedAd.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={selectedAd.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={selectedAd.location}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={selectedAd.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={selectedAd.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    id="published-switch"
                                    label={selectedAd.published ? "Ad is published" : "Ad is a draft"}
                                    checked={selectedAd.published}
                                    onChange={e => handleChange({ target: { name: 'published', value: e.target.checked } })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </Form>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                        {message && <Alert variant="info">{message}</Alert>}
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default MyOffers;
