import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ListGroup, Modal } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

const tipoDisegni = [
  { value: 'HALF_BODY_LINEART', label: 'Half Body Lineart - €35', price: 35 },
  { value: 'FULL_BODY_LINEART', label: 'Full Body Lineart - €70', price: 70 },
  { value: 'HALF_BODY_FULL_COLOR', label: 'Half Body Full Color - €90', price: 90 },
  { value: 'FULL_BODY_FULL_COLOR', label: 'Full Body Full Color - €140', price: 140 },
  { value: 'ILLUSTRAZIONE_COMPLETA', label: 'Illustrazione Completa - €230', price: 230 },
];

function RequestPage() {
  const [descrizione, setDescrizione] = useState('');
  const [tipoDisegno, setTipoDisegno] = useState('');
  const [sfondo, setSfondo] = useState(false);
  const [richieste, setRichieste] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchRichieste = async () => {
    try {
      
      const data = await fetchWithAuth('/utenti/me/richieste');
      setRichieste(data); 
    } catch (error) {
      setErrorMessage('Errore nel recupero delle richieste. Per favore riprova.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRichieste();
  }, []);

  const calculatePrice = () => {
    const selectedTipoDisegno = tipoDisegni.find((tipo) => tipo.value === tipoDisegno);
    const basePrice = selectedTipoDisegno ? selectedTipoDisegno.price : 0;
    return basePrice + (sfondo ? 40 : 0);
  };

  const handleSubmit = async () => {
    if (descrizione.length < 10 || descrizione.length > 255) {
      setValidationError('La descrizione deve essere compresa tra 10 e 255 caratteri.');
      return;
    } else {
      setValidationError('');
    }

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
      fetchRichieste();
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
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      <Form onSubmit={(e) => { e.preventDefault(); setShowModal(true); }}>
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
            {tipoDisegni.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label={`Includi sfondo (+ €40)`}
            checked={sfondo}
            onChange={(e) => setSfondo(e.target.checked)}
          />
        </Form.Group>
        <Button type="submit">Crea Richiesta</Button>
      </Form>

      {/* Modale di conferma */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Richiesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sei sicuro di voler creare questa richiesta con le seguenti informazioni?</p>
          <ul>
            <li>Descrizione: {descrizione}</li>
            <li>Tipo Disegno: {tipoDisegno}</li>
            <li>Sfondo: {sfondo ? 'Sì' : 'No'}</li>
            <li>Prezzo Totale: €{calculatePrice()}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={() => { setShowModal(false); handleSubmit(); }}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      <hr />
      <h2>Le tue Richieste</h2>
      <ListGroup>
        {richieste.map((richiesta) => (
          <ListGroup.Item key={richiesta.idRichiesta}>
            <strong>{richiesta.descrizione}</strong> - {richiesta.tipoDisegno} - €{richiesta.prezzo} - {richiesta.sfondoIncluso ? 'Con sfondo' : 'Senza sfondo'}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default RequestPage;
