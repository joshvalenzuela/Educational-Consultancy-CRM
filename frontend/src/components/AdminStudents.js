import React, { useState, useEffect } from "react";
import { Table, Button, Container, Badge } from "react-bootstrap";
import api from "../utils/api";

function AdminStudents({ token }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await api.getAllStudents(token);
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.deleteStudent(token, studentId);
        setStudents(students.filter((s) => s.id !== studentId));
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h3 className="mb-4">Students Management</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Approved</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.full_name}</td>
              <td>{student.email}</td>
              <td>{student.phone || "N/A"}</td>
              <td>
                {student.is_approved ? (
                  <Badge bg="success">Yes</Badge>
                ) : (
                  <Badge bg="warning">No</Badge>
                )}
              </td>
              <td>{new Date(student.created_at).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(student.id)}
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

export default AdminStudents;
