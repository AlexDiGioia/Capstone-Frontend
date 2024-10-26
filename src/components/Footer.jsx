import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} Vetrina di Erwin Hidalgo. Tutti i diritti riservati.</p>
      </Container>
    </footer>
  );
}

export default Footer;