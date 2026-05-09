import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Nav, Container, Row, Col, Alert } from "react-bootstrap";
import StudentApplications from "../components/StudentApplications";
import StudentAppointments from "../components/StudentAppointments";

function StudentDashboard({ token, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to first student page when arriving at base/dashboard
  useEffect(() => {
    if (
      location.pathname === "/student" ||
      location.pathname === "/student/" ||
      location.pathname === "/student/dashboard"
    ) {
      navigate("/student/applications", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <Container fluid className="mt-2">
      <div className="mb-4">
        <Alert variant="info" className="dashboard-alert">
          <h5>Welcome, {user?.full_name}!</h5>
          <p>
            Your account has been approved. You can now schedule appointments
            with consultants.
          </p>
        </Alert>
      </div>

      <Row>
        <Col md={3}>
          <Nav className="flex-column sidebar">
            <div className="dashboard-section-title">Student</div>
            <Nav.Link
              as={Link}
              to="/student/applications"
              className="text-dark"
            >
              My Applications
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/student/appointments"
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
                path="/applications"
                element={
                  <StudentApplications token={token} userId={user?.id} />
                }
              />
              <Route
                path="/appointments"
                element={
                  <StudentAppointments token={token} userId={user?.id} />
                }
              />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDashboard;
