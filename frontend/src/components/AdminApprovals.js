import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Badge,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import api from "../utils/api";

function AdminApprovals({ token }) {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [pendingConsultants, setPendingConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    setLoading(true);
    try {
      const students = await api.getUnapprovedStudents(token);
      const consultants = await api.getUnapprovedConsultants(token);
      setPendingStudents(students);
      setPendingConsultants(consultants);
    } catch (err) {
      console.error("Error fetching pending approvals:", err);
    }
    setLoading(false);
  };

  const handleApproveStudent = async (studentId) => {
    try {
      await api.approveStudent(token, studentId);
      setPendingStudents(pendingStudents.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error("Error approving student:", err);
    }
  };

  const handleRejectStudent = async (studentId) => {
    try {
      await api.rejectStudent(token, studentId);
      setPendingStudents(pendingStudents.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error("Error rejecting student:", err);
    }
  };

  const handleApproveConsultant = async (consultantId) => {
    try {
      await api.approveConsultant(token, consultantId);
      setPendingConsultants(
        pendingConsultants.filter((c) => c.id !== consultantId),
      );
    } catch (err) {
      console.error("Error approving consultant:", err);
    }
  };

  const handleRejectConsultant = async (consultantId) => {
    try {
      await api.rejectConsultant(token, consultantId);
      setPendingConsultants(
        pendingConsultants.filter((c) => c.id !== consultantId),
      );
    } catch (err) {
      console.error("Error rejecting consultant:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h3 className="mb-4">Pending Approvals</h3>

      <Tabs defaultActiveKey="students" className="mb-3">
        <Tab eventKey="students" title="Students">
          {pendingStudents.length === 0 ? (
            <p className="text-muted">No pending student approvals</p>
          ) : (
            <Row>
              {pendingStudents.map((student) => (
                <Col key={student.id} md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{student.full_name}</Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {student.email}
                        <br />
                        <strong>Phone:</strong> {student.phone || "N/A"}
                        <br />
                        <strong>Registered:</strong>{" "}
                        {new Date(student.created_at).toLocaleDateString()}
                      </Card.Text>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApproveStudent(student.id)}
                        className="me-2"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRejectStudent(student.id)}
                      >
                        Reject
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="consultants" title="Consultants">
          {pendingConsultants.length === 0 ? (
            <p className="text-muted">No pending consultant approvals</p>
          ) : (
            <Row>
              {pendingConsultants.map((consultant) => (
                <Col key={consultant.id} md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{consultant.full_name}</Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {consultant.email}
                        <br />
                        <strong>School:</strong>{" "}
                        {consultant.school_name || "N/A"}
                        <br />
                        <strong>Specialization:</strong>{" "}
                        {consultant.specialization || "N/A"}
                        <br />
                        <strong>Registered:</strong>{" "}
                        {new Date(consultant.created_at).toLocaleDateString()}
                      </Card.Text>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApproveConsultant(consultant.id)}
                        className="me-2"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRejectConsultant(consultant.id)}
                      >
                        Reject
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminApprovals;
