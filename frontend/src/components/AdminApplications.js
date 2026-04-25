import React, { useState, useEffect } from "react";
import { Table, Button, Container, Badge, Form } from "react-bootstrap";
import api from "../utils/api";

function AdminApplications({ token }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await api.getApplications(token);
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
    setLoading(false);
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await api.updateApplication(token, appId, { status: newStatus });
      setApplications(
        applications.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h3 className="mb-4">Applications Management</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student</th>
            <th>School</th>
            <th>Program</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.student_name}</td>
              <td>{app.school_name}</td>
              <td>{app.program_name}</td>
              <td>
                <Badge
                  bg={
                    app.status === "accepted"
                      ? "success"
                      : app.status === "rejected"
                        ? "danger"
                        : "info"
                  }
                >
                  {app.status}
                </Badge>
              </td>
              <td>{new Date(app.submission_date).toLocaleDateString()}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminApplications;
