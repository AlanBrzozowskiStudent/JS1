import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

function AdsList() {
    const [ads, setAds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const response = await axios.get('api/ads');
            setAds(response.data);
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`api/ads?search=${searchTerm}`);
            setAds(response.data);
        } catch (error) {
            console.error('Error searching ads:', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="mb-3" controlId="formBasicSearch">
                            <Form.Label>Search Ads</Form.Label>
                            <Form.Control type="text" placeholder="Search by title or location" onChange={e => setSearchTerm(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {ads.map(ad => (
                    <Col md={4} key={ad.id}>
                        <Card>
                            <Card.Img variant="top" src={`data:image/jpeg;base64,${ad.images[0] || ''}`} />
                            <Card.Body>
                                <Card.Title>{ad.title}</Card.Title>
                                <Card.Text>
                                    {ad.description}
                                    <br />
                                    Location: {ad.location}
                                    <br />
                                    Price: ${ad.price.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AdsList;
