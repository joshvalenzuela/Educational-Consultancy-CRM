import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import api from "../utils/api";

function StudentApplications({ token, userId }) {
  const [applications, setApplications] = useState([]);
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    school_id: "",
    program_name: "",
    notes: "",
  });
  const [schoolSearch, setSchoolSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    fetchSchools();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await api.getStudentApplications(token, userId);
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
    setLoading(false);
  };

  const fetchSchools = async () => {
    try {
      // Students should use the public schools endpoint (no admin token required)
      const data = await api.getPublicSchools();
      // Normalize response: server might return { schools: [...] } or an array
      if (Array.isArray(data)) {
        setSchools(data);
      } else if (data && Array.isArray(data.schools)) {
        setSchools(data.schools);
      } else {
        console.error("Unexpected schools response:", data);
        setSchools([]);
      }
    } catch (err) {
      console.error("Error fetching schools:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newApp = await api.createApplication(token, {
        student_id: userId,
        ...formData,
      });
      setApplications([...applications, newApp]);
      setFormData({ school_id: "", program_name: "", notes: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating application:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Applications</h3>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Application"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>School</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search for a school..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  className="mb-2"
                  required
                />
                {schoolSearch && (
                  <div
                    className="border rounded p-2"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 50,
                      background: "#fff",
                    }}
                  >
                    {schools
                      .filter((school) =>
                        school.name
                          .toLowerCase()
                          .includes(schoolSearch.toLowerCase()),
                      )
                      .map((school) => (
                        <div
                          key={school.id}
                          className="p-2 border-bottom"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setFormData({ ...formData, school_id: school.id });
                            setSchoolSearch(school.name);
                          }}
                        >
                          <strong>{school.name}</strong>
                          <br />
                          <small className="text-muted">
                            {school.location}
                          </small>
                        </div>
                      ))}
                    {schools.filter((school) =>
                      school.name
                        .toLowerCase()
                        .includes(schoolSearch.toLowerCase()),
                    ).length === 0 && (
                      <div className="p-2 text-muted">No schools found</div>
                    )}
                  </div>
                )}
                {formData.school_id && (
                  <div className="mt-2">
                    <small className="text-success">
                      ✓ Selected:{" "}
                      {schools.find(
                        (s) => s.id === parseInt(formData.school_id),
                      )?.name || ""}
                    </small>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Program Name</Form.Label>
                <Form.Control
                  type="text"
                  name="program_name"
                  value={formData.program_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Bachelor of Science in Business"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit Application
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {applications.length === 0 ? (
        <Alert variant="info">No applications yet</Alert>
      ) : (
        <Row>
          {applications.map((app) => (
            <Col key={app.id} md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{app.school_name}</Card.Title>
                  <Card.Text>
                    <strong>Program:</strong> {app.program_name}
                    <br />
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge bg-${app.status === "accepted" ? "success" : app.status === "rejected" ? "danger" : "info"}`}
                    >
                      {app.status}
                    </span>
                    <br />
                    <strong>Submitted:</strong>{" "}
                    {new Date(app.submission_date).toLocaleDateString()}
                    <br />
                    {app.notes && (
                      <>
                        <strong>Notes:</strong> {app.notes}
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default StudentApplications;
