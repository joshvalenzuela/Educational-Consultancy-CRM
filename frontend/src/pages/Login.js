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

function Login({ setUser, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("admin");
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "student") navigate("/student/dashboard");
      else if (role === "consultant") navigate("/consultant/dashboard");
    }
  }, [navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.adminLogin(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.admin));
        localStorage.setItem("role", "admin");
        setToken(response.token);
        setUser(response.admin);
        navigate("/admin/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("Login error: " + err.message);
    }
    setLoading(false);
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.studentLogin(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.student));
        localStorage.setItem("role", "student");
        setToken(response.token);
        setUser(response.student);
        navigate("/student/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("Login error: " + err.message);
    }
    setLoading(false);
  };

  const handleConsultantLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.consultantLogin(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.consultant));
        localStorage.setItem("role", "consultant");
        setToken(response.token);
        setUser(response.consultant);
        navigate("/consultant/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("Login error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5 hide-navbar-padding">
      <Card className="mx-auto auth-card">
        <Card.Body>
          <Card.Title className="text-center mb-4 auth-title">
            🔐 Login
          </Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}

          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-3"
          >
            <Tab eventKey="admin" title="Admin">
              <Form onSubmit={handleAdminLogin}>
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
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Admin Login"}
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="student" title="Student">
              <Form onSubmit={handleStudentLogin}>
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
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Student Login"}
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="consultant" title="Consultant">
              <Form onSubmit={handleConsultantLogin}>
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
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Consultant Login"}
                </Button>
              </Form>
            </Tab>
          </Tabs>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">Don't have an account?</p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/register")}
              className="mt-2"
            >
              Register Here
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
