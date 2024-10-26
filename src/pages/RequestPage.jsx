import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function RequestPage() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [background, setBackground] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/richieste/crea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descrizione: description, tipoDisegno: type, sfondo: background })
    });
  };

  return (
    <Container className="my-5">
      <h2>Effettua una Richiesta</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo di Disegno</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Seleziona un tipo</option>
            <option value="HALF_BODY_LINEART">Half Body Lineart</option>
            <option value="FULL_BODY_LINEART">Full Body Lineart</option>
            <option value="HALF_BODY_FULL_COLOR">Half Body Full Color</option>
            <option value="FULL_BODY_FULL_COLOR">Full Body Full Color</option>
            <option value="ILLUSTRAZIONE_COMPLETA">Illustrazione Completa</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Includere Sfondo"
            checked={background}
            onChange={(e) => setBackground(e.target.checked)}
          />
        </Form.Group>
        <Button type="submit">Invia Richiesta</Button>
      </Form>
    </Container>
  );
}

export default RequestPage;