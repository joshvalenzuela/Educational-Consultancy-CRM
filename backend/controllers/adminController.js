const pool = require("../config/database");

// Get all unapproved students
const getUnapprovedStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, phone, created_at FROM students WHERE is_approved = false",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve student
const approveStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE students SET is_approved = true, approval_date = NOW() WHERE id = $1 RETURNING *",
      [studentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student approved successfully",
      student: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject student
const rejectStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING id",
      [studentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student rejected and removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all unapproved consultants
const getUnapprovedConsultants = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT c.id, c.full_name, c.email, c.specialization, c.created_at, s.name as school_name FROM consultants c LEFT JOIN schools s ON c.school_id = s.id WHERE c.is_approved = false",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve consultant
const approveConsultant = async (req, res) => {
  const { consultantId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE consultants SET is_approved = true, approval_date = NOW() WHERE id = $1 RETURNING *",
      [consultantId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.json({
      message: "Consultant approved successfully",
      consultant: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject consultant
const rejectConsultant = async (req, res) => {
  const { consultantId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM consultants WHERE id = $1 RETURNING id",
      [consultantId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.json({ message: "Consultant rejected and removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CRUD for Schools
const getAllSchools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSchool = async (req, res) => {
  const { name, location, contact_person, email, phone, description } =
    req.body;

  try {
    const result = await pool.query(
      "INSERT INTO schools (name, location, contact_person, email, phone, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, location, contact_person, email, phone, description],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSchool = async (req, res) => {
  const { schoolId } = req.params;
  const { name, location, contact_person, email, phone, description } =
    req.body;

  try {
    const result = await pool.query(
      "UPDATE schools SET name = $1, location = $2, contact_person = $3, email = $4, phone = $5, description = $6, updated_at = NOW() WHERE id = $7 RETURNING *",
      [name, location, contact_person, email, phone, description, schoolId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "School not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSchool = async (req, res) => {
  const { schoolId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM schools WHERE id = $1 RETURNING id",
      [schoolId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "School not found" });
    }

    res.json({ message: "School deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CRUD for Students
const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, phone, is_approved, created_at FROM students ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteStudentByAdmin = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING id",
      [studentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CRUD for Consultants
const getAllConsultants = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT c.id, c.full_name, c.email, c.specialization, c.is_approved, c.created_at, s.name as school_name FROM consultants c LEFT JOIN schools s ON c.school_id = s.id ORDER BY c.created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteConsultantByAdmin = async (req, res) => {
  const { consultantId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM consultants WHERE id = $1 RETURNING id",
      [consultantId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.json({ message: "Consultant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUnapprovedStudents,
  approveStudent,
  rejectStudent,
  getUnapprovedConsultants,
  approveConsultant,
  rejectConsultant,
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  getAllStudents,
  deleteStudentByAdmin,
  getAllConsultants,
  deleteConsultantByAdmin,
};
