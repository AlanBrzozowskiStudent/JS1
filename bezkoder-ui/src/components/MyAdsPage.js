import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

function MyAdsPage() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetchMyAds();
    }, []);

    const fetchMyAds = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ads/myads', {
                headers: {
                    // Authentication header may be required
                }
            });
            setAds(response.data);
        } catch (error) {
            console.error('Error fetching my ads:', error);
        }
    };

    const handleDelete = async (adId) => {
        try {
            await axios.delete(`http://localhost:5000/api/ads/${adId}`);
            fetchMyAds(); // Refresh the ads list after deletion
        } catch (error) {
            console.error('Error deleting ad:', error);
        }
    };

    return (
        <Container>
            <h1>My Ads</h1>
            {ads.map(ad => (
                <Card key={ad.id}>
                    <Card.Body>
                        <Card.Title>{ad.title}</Card.Title>
                        <Card.Text>
                            {ad.description}
                            <br />
                            Location: {ad.location}
                            <br />
                            Price: ${ad.price.toFixed(2)}
                        </Card.Text>
                        <Button variant="danger" onClick={() => handleDelete(ad.id)}>Delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default MyAdsPage;
