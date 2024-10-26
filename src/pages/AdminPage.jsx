import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    fetch('/api/disegni/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <Container className="my-5">
      <h2>Carica un Nuovo Disegno</h2>
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