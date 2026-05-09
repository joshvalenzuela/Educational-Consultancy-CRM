import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";
import AdminApprovals from "../components/AdminApprovals";
import AdminSchools from "../components/AdminSchools";
import AdminStudents from "../components/AdminStudents";
import AdminConsultants from "../components/AdminConsultants";
import AdminApplications from "../components/AdminApplications";

function AdminDashboard({ token }) {
  const location = useLocation();
  const navigate = useNavigate();

  // If user lands on base admin path or /admin/dashboard, redirect to first nav link
  useEffect(() => {
    if (
      location.pathname === "/admin" ||
      location.pathname === "/admin/" ||
      location.pathname === "/admin/dashboard"
    ) {
      navigate("/admin/approvals", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <Container fluid className="mt-2">
      <Row>
        <Col md={3}>
          <Nav className="flex-column sidebar">
            <div className="dashboard-section-title">Admin</div>
            <Nav.Link as={Link} to="/admin/approvals" className="text-dark">
              Pending Approvals
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/schools" className="text-dark">
              Manage Schools
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/students" className="text-dark">
              Manage Students
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/consultants" className="text-dark">
              Manage Consultants
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/applications" className="text-dark">
              Applications
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <div className="content-panel">
            <Routes>
              <Route
                path="/approvals"
                element={<AdminApprovals token={token} />}
              />
              <Route path="/schools" element={<AdminSchools token={token} />} />
              <Route
                path="/students"
                element={<AdminStudents token={token} />}
              />
              <Route
                path="/consultants"
                element={<AdminConsultants token={token} />}
              />
              <Route
                path="/applications"
                element={<AdminApplications token={token} />}
              />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
