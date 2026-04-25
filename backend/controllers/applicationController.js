const pool = require("../config/database");

// Get applications for a student
const getStudentApplications = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(
      "SELECT a.*, s.name as school_name FROM applications a JOIN schools s ON a.school_id = s.id WHERE a.student_id = $1 ORDER BY a.submission_date DESC",
      [studentId],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create application
const createApplication = async (req, res) => {
  const { student_id, school_id, program_name, notes } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO applications (student_id, school_id, program_name, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [student_id, school_id, program_name, notes],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all applications for admin
const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT a.*, s.name as school_name, st.full_name as student_name FROM applications a JOIN schools s ON a.school_id = s.id JOIN students st ON a.student_id = st.id ORDER BY a.submission_date DESC",
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status, notes } = req.body;

  try {
    const result = await pool.query(
      "UPDATE applications SET status = $1, notes = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [status, notes, applicationId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getStudentApplications,
  createApplication,
  getAllApplications,
  updateApplicationStatus,
};
