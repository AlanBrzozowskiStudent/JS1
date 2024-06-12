import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button, Modal, Carousel } from 'react-bootstrap';

function AdsList() {
    const [allAds, setAllAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const response = await axios.get('api/ads/published');
            const publishedAds = response.data.filter(ad => ad.published);
            setAllAds(publishedAds);
            setFilteredAds(publishedAds);
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = allAds.filter(ad =>
            (ad.title.toLowerCase().includes(lowercasedSearch) ||
            ad.location.toLowerCase().includes(lowercasedSearch)) &&
            ad.published
        );
        setFilteredAds(filtered);
    };

    const openModal = (ad) => {
        setSelectedAd(ad);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAd(null);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="mb-3" controlId="formBasicSearch">
                            <Form.Label>Search Your new Home </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by title or location"
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mb-4"variant="primary" type="submit">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {filteredAds.map(ad => (
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
                                <Button variant="primary" onClick={() => openModal(ad)}>Show More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedAd && (
                <Modal show={showModal} onHide={closeModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedAd.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel>
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
                        <p>{selectedAd.description}</p>
                        <p>Location: {selectedAd.location}</p>
                        <p>Phone: {selectedAd.phoneNumber}</p>
                        <p>Price: ${selectedAd.price.toFixed(2)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default AdsList;
