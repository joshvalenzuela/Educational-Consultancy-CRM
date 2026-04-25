const pool = require("../config/database");

// Schedule appointment
const scheduleAppointment = async (req, res) => {
  const { student_id, consultant_id, appointment_date, notes, meeting_link } =
    req.body;

  try {
    const result = await pool.query(
      "INSERT INTO appointments (student_id, consultant_id, appointment_date, notes, meeting_link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [student_id, consultant_id, appointment_date, notes, meeting_link],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student's appointments
const getStudentAppointments = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(
      "SELECT a.*, c.full_name as consultant_name, c.email as consultant_email, c.specialization FROM appointments a JOIN consultants c ON a.consultant_id = c.id WHERE a.student_id = $1 ORDER BY a.appointment_date DESC",
      [studentId],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get consultant's pending appointments
const getConsultantAppointments = async (req, res) => {
  const { consultantId } = req.params;

  try {
    const result = await pool.query(
      "SELECT a.*, s.full_name as student_name, s.email as student_email FROM appointments a JOIN students s ON a.student_id = s.id WHERE a.consultant_id = $1 ORDER BY a.appointment_date DESC",
      [consultantId],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept appointment
const acceptAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { meeting_link } = req.body;

  try {
    const result = await pool.query(
      "UPDATE appointments SET status = $1, meeting_link = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      ["accepted", meeting_link, appointmentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deny appointment
const denyAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { notes } = req.body;

  try {
    const result = await pool.query(
      "UPDATE appointments SET status = $1, notes = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      ["rejected", notes, appointmentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all consultants (for student to select from)
const getAllConsultants = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT c.id, c.full_name, c.specialization, c.bio, s.name as school_name FROM consultants c LEFT JOIN schools s ON c.school_id = s.id WHERE c.is_approved = true ORDER BY c.full_name",
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  scheduleAppointment,
  getStudentAppointments,
  getConsultantAppointments,
  acceptAppointment,
  denyAppointment,
  getAllConsultants,
};
