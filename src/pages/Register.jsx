import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.scss";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nome: "",
    cognome: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registrazione fallita. Riprova.");
      }

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className={`my-5 ${styles.requestPageContainer}`}>
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className={styles.submitButton} type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
