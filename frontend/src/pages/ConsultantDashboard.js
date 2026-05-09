import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Nav, Container, Row, Col, Alert } from "react-bootstrap";
import ConsultantAppointments from "../components/ConsultantAppointments";

function ConsultantDashboard({ token, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to first consultant page when arriving at base/dashboard
  useEffect(() => {
    if (
      location.pathname === "/consultant" ||
      location.pathname === "/consultant/" ||
      location.pathname === "/consultant/dashboard"
    ) {
      navigate("/consultant/appointments", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <Container fluid className="mt-2">
      <div className="mb-4">
        <Alert variant="info" className="dashboard-alert">
          <h5>Welcome, {user?.full_name}!</h5>
          <p>
            Your account has been approved. You can now manage your
            appointments.
          </p>
        </Alert>
      </div>

      <Row>
        <Col md={3}>
          <Nav className="flex-column sidebar">
            <div className="dashboard-section-title">Consultant</div>
            <Nav.Link
              as={Link}
              to="/consultant/appointments"
              className="text-dark"
            >
              My Appointments
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <div className="content-panel">
            <Routes>
              <Route
                path="/appointments"
                element={
                  <ConsultantAppointments token={token} userId={user?.id} />
                }
              />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ConsultantDashboard;
