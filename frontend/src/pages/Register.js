import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "student") navigate("/student/dashboard");
      else if (role === "consultant") navigate("/consultant/dashboard");
    }
  }, [navigate]);

  // Student specific
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  // Consultant specific
  const [schoolId, setSchoolId] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [bio, setBio] = useState("");

  React.useEffect(() => {
    // Fetch schools for consultant registration (public endpoint, no auth needed)
    api.getPublicSchools().then((data) => setSchools(data));
  }, []);

  const handleStudentRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.studentRegister(
        fullName,
        email,
        password,
        dateOfBirth,
        phone,
      );
      if (response.message) {
        setSuccess(response.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError("Registration error: " + err.message);
    }
    setLoading(false);
  };

  const handleConsultantRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.consultantRegister(
        fullName,
        email,
        password,
        schoolId,
        specialization,
        bio,
      );
      if (response.message) {
        setSuccess(response.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError("Registration error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">📝 Register</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-3"
          >
            <Tab eventKey="student" title="Student Register">
              <Form onSubmit={handleStudentRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register as Student"}
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="consultant" title="Consultant Register">
              <Form onSubmit={handleConsultantRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>School</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search for a school..."
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                    className="mb-2"
                  />
                  {schoolSearch && (
                    <div
                      className="border rounded p-2"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
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
                            className="p-2 cursor-pointer border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSchoolId(school.id);
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
                  {schoolId && (
                    <div className="mt-2">
                      <small className="text-success">
                        ✓ Selected:{" "}
                        {schools.find((s) => s.id === parseInt(schoolId))
                          ?.name || ""}
                      </small>
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g., Business School, Medicine"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register as Consultant"}
                </Button>
              </Form>
            </Tab>
          </Tabs>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">Already have an account?</p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/login")}
              className="mt-2"
            >
              Back to Login
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
