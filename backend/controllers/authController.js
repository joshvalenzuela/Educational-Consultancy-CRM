const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin", email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
    );

    res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student Register
const studentRegister = async (req, res) => {
  const { full_name, email, password, date_of_birth, phone } = req.body;

  try {
    const existingStudent = await pool.query(
      "SELECT * FROM students WHERE email = $1",
      [email],
    );
    if (existingStudent.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO students (full_name, email, password, date_of_birth, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [full_name, email, hashedPassword, date_of_birth, phone],
    );

    res.status(201).json({
      message: "Student registered successfully. Awaiting admin approval.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student Login
const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM students WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const student = result.rows[0];
    if (!student.is_approved) {
      return res
        .status(403)
        .json({ message: "Your account is not yet approved by admin" });
    }

    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: student.id,
        role: "student",
        email: student.email,
        is_approved: student.is_approved,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
    );

    res.json({
      token,
      student: {
        id: student.id,
        full_name: student.full_name,
        email: student.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consultant Register
const consultantRegister = async (req, res) => {
  const { full_name, email, password, school_id, specialization, bio } =
    req.body;

  try {
    const existingConsultant = await pool.query(
      "SELECT * FROM consultants WHERE email = $1",
      [email],
    );
    if (existingConsultant.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO consultants (school_id, full_name, email, password, specialization, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [school_id, full_name, email, hashedPassword, specialization, bio],
    );

    res.status(201).json({
      message: "Consultant registered successfully. Awaiting admin approval.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consultant Login
const consultantLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM consultants WHERE email = $1",
      [email],
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const consultant = result.rows[0];
    if (!consultant.is_approved) {
      return res
        .status(403)
        .json({ message: "Your account is not yet approved by admin" });
    }

    const validPassword = await bcrypt.compare(password, consultant.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: consultant.id,
        role: "consultant",
        email: consultant.email,
        is_approved: consultant.is_approved,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
    );

    res.json({
      token,
      consultant: {
        id: consultant.id,
        full_name: consultant.full_name,
        email: consultant.email,
        specialization: consultant.specialization,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all schools (public endpoint - no auth required)
const getPublicSchools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  adminLogin,
  studentRegister,
  studentLogin,
  consultantRegister,
  consultantLogin,
  getPublicSchools,
};
