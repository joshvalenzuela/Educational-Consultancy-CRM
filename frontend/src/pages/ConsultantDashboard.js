import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Nav, Container, Row, Col, Alert } from "react-bootstrap";
import ConsultantAppointments from "../components/ConsultantAppointments";

function ConsultantDashboard({ token, user }) {
  return (
    <Container fluid className="mt-4">
      <div className="mb-4">
        <Alert variant="info">
          <h5>Welcome, {user?.full_name}!</h5>
          <p>
            Your account has been approved. You can now manage your
            appointments.
          </p>
        </Alert>
      </div>

      <Row>
        <Col md={3}>
          <Nav className="flex-column bg-light p-3 rounded">
            <Nav.Link
              as={Link}
              to="/consultant/appointments"
              className="text-dark"
            >
              📅 My Appointments
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <Routes>
            <Route
              path="/appointments"
              element={
                <ConsultantAppointments token={token} userId={user?.id} />
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default ConsultantDashboard;
