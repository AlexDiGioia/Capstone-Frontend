import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import config from "../config";
import styles from "../styles/Register.module.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login fallito. Controlla le credenziali.");
      }

      const data = await response.json();
      // Salva il token nel localStorage
      localStorage.setItem("token", data.AccessToken);
      dispatch(setUser({ email: data.email, role: data.role }));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className={`my-5 ${styles.requestPageContainer}`}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className={styles.submitButton} type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
