import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api'; // Assicurati di usare fetchWithAuth
import config from '../config';

function Gallery() {
  const [disegni, setDisegni] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisegni = async () => {
      try {
        const data = await fetchWithAuth(`${config.apiBaseUrl}/disegni`); 
        setDisegni(data);
      } catch (err) {
        setError('Errore nel recupero dei disegni. Per favore riprova.');
        console.error(err);
      }
    };

    fetchDisegni();
  }, []);

  return (
    <Container>
      {error && <p>{error}</p>}
      <Row>
        {Array.isArray(disegni) && disegni.map((disegno) => (
          <Col key={disegno.idDisegno} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={disegno.imageUrl} />
              <Card.Body>
                <Card.Title>{disegno.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Gallery;
