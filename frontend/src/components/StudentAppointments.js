import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import api from "../utils/api";

function StudentAppointments({ token, userId }) {
  const [appointments, setAppointments] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    consultant_id: "",
    appointment_date: "",
    notes: "",
    meeting_link: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchConsultants();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await api.getStudentAppointments(token, userId);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
    setLoading(false);
  };

  const fetchConsultants = async () => {
    try {
      const data = await api.getConsultants(token);
      setConsultants(data);
    } catch (err) {
      console.error("Error fetching consultants:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAppointment = await api.scheduleAppointment(token, {
        student_id: userId,
        ...formData,
      });
      setAppointments([...appointments, newAppointment]);
      setFormData({
        consultant_id: "",
        appointment_date: "",
        notes: "",
        meeting_link: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error scheduling appointment:", err);
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Appointments</h3>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Schedule Appointment"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Consultant</Form.Label>
                <Form.Select
                  name="consultant_id"
                  value={formData.consultant_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Consultant</option>
                  {consultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.id}>
                      {consultant.full_name} - {consultant.specialization} (
                      {consultant.school_name})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Appointment Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleInputChange}
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
                Schedule Appointment
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {appointments.length === 0 ? (
        <Alert variant="info">No appointments yet</Alert>
      ) : (
        <Row>
          {appointments.map((apt) => (
            <Col key={apt.id} md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{apt.consultant_name}</Card.Title>
                  <Card.Text>
                    <strong>Specialization:</strong> {apt.specialization}
                    <br />
                    <strong>Date:</strong>{" "}
                    {new Date(apt.appointment_date).toLocaleString()}
                    <br />
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge bg-${apt.status === "accepted" ? "success" : apt.status === "rejected" ? "danger" : "warning"}`}
                    >
                      {apt.status}
                    </span>
                  </Card.Text>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(apt)}
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedAppointment && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Appointment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Consultant:</strong> {selectedAppointment.consultant_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedAppointment.consultant_email}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedAppointment.appointment_date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppointment.status}
            </p>
            {selectedAppointment.meeting_link && (
              <p>
                <strong>Meeting Link:</strong>{" "}
                <a
                  href={selectedAppointment.meeting_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedAppointment.meeting_link}
                </a>
              </p>
            )}
            {selectedAppointment.notes && (
              <p>
                <strong>Notes:</strong> {selectedAppointment.notes}
              </p>
            )}
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}

export default StudentAppointments;
