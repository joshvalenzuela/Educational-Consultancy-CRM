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
  Badge,
} from "react-bootstrap";
import api from "../utils/api";

function ConsultantAppointments({ token, userId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [rejectNotes, setRejectNotes] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await api.getConsultantAppointments(token, userId);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
    setLoading(false);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleAccept = async () => {
    if (!meetingLink) {
      alert("Please provide a meeting link");
      return;
    }
    try {
      const updated = await api.acceptAppointment(
        token,
        selectedAppointment.id,
        meetingLink,
      );
      setAppointments(
        appointments.map((a) =>
          a.id === selectedAppointment.id ? updated : a,
        ),
      );
      setShowModal(false);
      setMeetingLink("");
      alert("Appointment accepted!");
    } catch (err) {
      console.error("Error accepting appointment:", err);
    }
  };

  const handleReject = async () => {
    if (!rejectNotes) {
      alert("Please provide rejection notes");
      return;
    }
    try {
      const updated = await api.denyAppointment(
        token,
        selectedAppointment.id,
        rejectNotes,
      );
      setAppointments(
        appointments.map((a) =>
          a.id === selectedAppointment.id ? updated : a,
        ),
      );
      setShowModal(false);
      setRejectNotes("");
      setShowRejectForm(false);
      alert("Appointment rejected!");
    } catch (err) {
      console.error("Error rejecting appointment:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending",
  );
  const otherAppointments = appointments.filter((a) => a.status !== "pending");

  return (
    <Container>
      <h3 className="mb-4">My Appointments</h3>

      {pendingAppointments.length > 0 && (
        <>
          <h5 className="mt-4">⏳ Pending Appointments</h5>
          <Row>
            {pendingAppointments.map((apt) => (
              <Col key={apt.id} md={6} className="mb-3">
                <Card border="warning">
                  <Card.Body>
                    <Card.Title>{apt.student_name}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {apt.student_email}
                      <br />
                      <strong>Date:</strong>{" "}
                      {new Date(apt.appointment_date).toLocaleString()}
                      <br />
                      {apt.notes && (
                        <>
                          <strong>Student Notes:</strong> {apt.notes}
                        </>
                      )}
                    </Card.Text>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewDetails(apt)}
                      className="me-2"
                    >
                      Accept/Reject
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {otherAppointments.length > 0 && (
        <>
          <h5 className="mt-4">✅ All Appointments</h5>
          <Row>
            {otherAppointments.map((apt) => (
              <Col key={apt.id} md={6} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{apt.student_name}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong>{" "}
                      {new Date(apt.appointment_date).toLocaleString()}
                      <br />
                      <strong>Status:</strong>{" "}
                      <Badge
                        bg={apt.status === "accepted" ? "success" : "danger"}
                      >
                        {apt.status}
                      </Badge>
                      <br />
                      {apt.meeting_link && (
                        <>
                          <strong>Meeting Link:</strong>{" "}
                          <a
                            href={apt.meeting_link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {apt.meeting_link}
                          </a>
                        </>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {appointments.length === 0 && (
        <Alert variant="info">No appointments yet</Alert>
      )}

      {selectedAppointment && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Appointment from {selectedAppointment.student_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Student Email:</strong>{" "}
              {selectedAppointment.student_email}
            </p>
            <p>
              <strong>Requested Date:</strong>{" "}
              {new Date(selectedAppointment.appointment_date).toLocaleString()}
            </p>
            <p>
              <strong>Student Notes:</strong>{" "}
              {selectedAppointment.notes || "None"}
            </p>

            {selectedAppointment.status === "pending" && (
              <>
                <hr />
                <h6>Accept Appointment</h6>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Meeting Link (Zoom, Google Meet, etc.)
                  </Form.Label>
                  <Form.Control
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                  />
                </Form.Group>

                <hr />
                <h6>Or Reject Appointment</h6>
                {!showRejectForm ? (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowRejectForm(true)}
                  >
                    Reject
                  </Button>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Label>Rejection Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={rejectNotes}
                      onChange={(e) => setRejectNotes(e.target.value)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={handleReject}
                    >
                      Confirm Rejection
                    </Button>
                  </Form.Group>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedAppointment.status === "pending" && (
              <Button
                variant="success"
                onClick={handleAccept}
                disabled={!meetingLink}
              >
                Accept
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ConsultantAppointments;
