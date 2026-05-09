import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Hide navbar on auth pages
  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <BootstrapNavbar
      className="app-navbar"
      expand="lg"
      sticky="top"
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
          <span className="brand-logo" aria-hidden>
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <rect x="2" y="6" width="20" height="12" rx="3" fill="#6366F1" />
              <rect
                x="6"
                y="8"
                width="12"
                height="2"
                rx="1"
                fill="#fff"
                opacity="0.9"
              />
            </svg>
          </span>
          <span>Educational CRM</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link disabled className="text-white">
                  Welcome, {user.full_name || user.name || "User"}
                </Nav.Link>
                <Nav.Link onClick={onLogout} className="text-danger">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
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
