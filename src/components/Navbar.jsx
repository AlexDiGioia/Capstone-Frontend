import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../slices/authSlice';
import logo from "../img/erwin logo.png";
import styles from '../styles/Navbar.module.scss';

function AppNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <Navbar className={styles.navbar} expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className={styles['navbar-brand']}>
          <img src={logo} alt="Erwin Logo" className={styles['logo']} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={styles['nav-link']}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/gallery" className={styles['nav-link']}>
              Galleria
            </Nav.Link>
            <Nav.Link as={NavLink} to="/requests" className={styles['nav-link']}>
              Richieste
            </Nav.Link>
            {user?.role === 'ADMIN' && (
              <Nav.Link as={NavLink} to="/admin" className={styles['nav-link']}>
                Amministratore
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/user" className={styles['nav-link']}>
                  Info
                </Nav.Link>
                <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className={styles['nav-link']}>
                  Login
                </Nav.Link>
                <Button as={NavLink} to="/register" className={styles['register-btn']}>
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
