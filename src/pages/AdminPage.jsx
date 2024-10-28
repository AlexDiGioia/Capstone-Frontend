import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const response = await fetchWithAuth('/disegni/upload', {
        method: 'POST',
        body: formData,
      });

      if (response) {
        setSuccessMessage('Disegno caricato con successo!');
        setTitle('');
        setFile(null);
      }
    } catch (error) {
      setErrorMessage('Errore durante il caricamento del disegno. Riprova.');
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <h2>Carica un Nuovo Disegno</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>File Immagine</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>
        <Button type="submit">Carica Disegno</Button>
      </Form>
    </Container>
  );
}

export default AdminPage;
