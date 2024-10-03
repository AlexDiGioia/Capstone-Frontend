import React from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Portfolio Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <img
                src={user.avatar}
                alt="user avatar"
                className="rounded-circle"
                width="40"
                height="40"
              />{' '}
              {user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/user">User Page</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;