import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const role = localStorage.getItem("role");

  return (
    <BootstrapNavbar bg="dark" expand="lg" sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold text-white">
          📚 Educational Consultancy CRM
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link disabled className="text-light">
                  Welcome, {user.full_name || user.name || "User"}
                </Nav.Link>
                <Nav.Link onClick={onLogout} className="text-danger">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
