import React, { useState, useEffect } from "react";
import { Table, Button, Container, Badge } from "react-bootstrap";
import api from "../utils/api";

function AdminConsultants({ token }) {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    setLoading(true);
    try {
      const data = await api.getAllConsultants(token);
      setConsultants(data);
    } catch (err) {
      console.error("Error fetching consultants:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (consultantId) => {
    if (window.confirm("Are you sure you want to delete this consultant?")) {
      try {
        await api.deleteConsultant(token, consultantId);
        setConsultants(consultants.filter((c) => c.id !== consultantId));
      } catch (err) {
        console.error("Error deleting consultant:", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h3 className="mb-4">Consultants Management</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>School</th>
            <th>Specialization</th>
            <th>Approved</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant) => (
            <tr key={consultant.id}>
              <td>{consultant.full_name}</td>
              <td>{consultant.email}</td>
              <td>{consultant.school_name || "N/A"}</td>
              <td>{consultant.specialization || "N/A"}</td>
              <td>
                {consultant.is_approved ? (
                  <Badge bg="success">Yes</Badge>
                ) : (
                  <Badge bg="warning">No</Badge>
                )}
              </td>
              <td>{new Date(consultant.created_at).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(consultant.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminConsultants;
