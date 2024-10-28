import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

function RequestPage() {
  const [descrizione, setDescrizione] = useState('');
  const [tipoDisegno, setTipoDisegno] = useState('');
  const [sfondo, setSfondo] = useState(false);
  const [richieste, setRichieste] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchRichieste = async () => {
    try {
      const data = await fetchWithAuth('/richieste');
      setRichieste(data);
    } catch (error) {
      setErrorMessage('Errore nel recupero delle richieste. Per favore riprova.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRichieste();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const richiestaData = {
      descrizione,
      tipoDisegno,
      sfondo,
    };

    try {
      await fetchWithAuth('/richieste/crea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(richiestaData),
      });

      setSuccessMessage('Richiesta creata con successo!');
      setDescrizione('');
      setTipoDisegno('');
      setSfondo(false);
      fetchRichieste(); // Ricarica le richieste dopo averne aggiunta una nuova
    } catch (error) {
      setErrorMessage('Errore durante la creazione della richiesta. Riprova.');
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <h2>Effettua una Nuova Richiesta</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="text"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo Disegno</Form.Label>
          <Form.Control
            as="select"
            value={tipoDisegno}
            onChange={(e) => setTipoDisegno(e.target.value)}
            required
          >
            <option value="">Seleziona un tipo di disegno</option>
            <option value="HALF_BODY_LINEART">Half Body Lineart</option>
            <option value="FULL_BODY_LINEART">Full Body Lineart</option>
            <option value="HALF_BODY_FULL_COLOR">Half Body Full Color</option>
            <option value="FULL_BODY_FULL_COLOR">Full Body Full Color</option>
            <option value="ILLUSTRAZIONE_COMPLETA">Illustrazione Completa</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Includi sfondo"
            checked={sfondo}
            onChange={(e) => setSfondo(e.target.checked)}
          />
        </Form.Group>
        <Button type="submit">Crea Richiesta</Button>
      </Form>
      <hr />
      <h2>Le tue Richieste</h2>
      <ListGroup>
        {richieste.map((richiesta) => (
          <ListGroup.Item key={richiesta.idRichiesta}>
            <strong>{richiesta.descrizione}</strong> - {richiesta.tipoDisegno}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default RequestPage;
