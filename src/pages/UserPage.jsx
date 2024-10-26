import React, { useEffect, useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithAuth('/utenti/me');
        setUser(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container className="my-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {user && (
        <Card>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
            <Card.Text>Nome: {user.nome}</Card.Text>
            <Card.Text>Cognome: {user.cognome}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default UserPage;
