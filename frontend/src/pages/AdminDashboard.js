import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";
import AdminApprovals from "../components/AdminApprovals";
import AdminSchools from "../components/AdminSchools";
import AdminStudents from "../components/AdminStudents";
import AdminConsultants from "../components/AdminConsultants";
import AdminApplications from "../components/AdminApplications";

function AdminDashboard({ token }) {
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3}>
          <Nav className="flex-column bg-light p-3 rounded">
            <Nav.Link as={Link} to="/admin/approvals" className="text-dark">
              🔔 Pending Approvals
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/schools" className="text-dark">
              🏫 Manage Schools
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/students" className="text-dark">
              👨‍🎓 Manage Students
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/consultants" className="text-dark">
              👨‍🏫 Manage Consultants
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/applications" className="text-dark">
              📋 Applications
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <Routes>
            <Route
              path="/approvals"
              element={<AdminApprovals token={token} />}
            />
            <Route path="/schools" element={<AdminSchools token={token} />} />
            <Route path="/students" element={<AdminStudents token={token} />} />
            <Route
              path="/consultants"
              element={<AdminConsultants token={token} />}
            />
            <Route
              path="/applications"
              element={<AdminApplications token={token} />}
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
