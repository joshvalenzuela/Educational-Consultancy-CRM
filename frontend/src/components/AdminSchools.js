import React, { useState, useEffect } from "react";
import { Card, Button, Table, Container, Form, Alert } from "react-bootstrap";
import api from "../utils/api";

function AdminSchools({ token }) {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact_person: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const data = await api.getAllSchools(token);
      setSchools(data);
    } catch (err) {
      console.error("Error fetching schools:", err);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSchool = await api.createSchool(token, formData);
      setSchools([...schools, newSchool]);
      setFormData({
        name: "",
        location: "",
        contact_person: "",
        email: "",
        phone: "",
        description: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating school:", err);
    }
  };

  const handleDelete = async (schoolId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.deleteSchool(token, schoolId);
        setSchools(schools.filter((s) => s.id !== schoolId));
      } catch (err) {
        console.error("Error deleting school:", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Schools Management</h3>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add School"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>School Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Person</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Create School
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td>{school.name}</td>
              <td>{school.location}</td>
              <td>{school.contact_person}</td>
              <td>{school.email}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(school.id)}
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

export default AdminSchools;
