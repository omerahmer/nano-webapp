import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './index.css';

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary font-link">
      <Container>
        <Navbar.Brand href="/">Nanotech Lab</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/People">People</Nav.Link>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Biosensing">Biosensing</NavDropdown.Item>
              <NavDropdown.Item href="/EnergyStorage">Energy Storage</NavDropdown.Item>
              <NavDropdown.Item href="/EBeam">Electron-beam Lithography</NavDropdown.Item>
              <NavDropdown.Item href="/Biosensor">Biosensor</NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Col xs="auto">
            <Button type="submit" style={{ backgroundColor: "#9f23c4" }} href="/Login">Login</Button>
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;