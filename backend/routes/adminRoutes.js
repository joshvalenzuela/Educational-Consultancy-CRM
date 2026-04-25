const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/auth");
const {
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
} = require("../controllers/adminController");

const router = express.Router();

// Protect all admin routes
router.use(authenticate, authorizeRole("admin"));

// Approval routes
router.get("/students/pending", getUnapprovedStudents);
router.post("/students/:studentId/approve", approveStudent);
router.post("/students/:studentId/reject", rejectStudent);

router.get("/consultants/pending", getUnapprovedConsultants);
router.post("/consultants/:consultantId/approve", approveConsultant);
router.post("/consultants/:consultantId/reject", rejectConsultant);

// School CRUD
router.get("/schools", getAllSchools);
router.post("/schools", createSchool);
router.put("/schools/:schoolId", updateSchool);
router.delete("/schools/:schoolId", deleteSchool);

// All students
router.get("/students", getAllStudents);
router.delete("/students/:studentId", deleteStudentByAdmin);

// All consultants
router.get("/consultants", getAllConsultants);
router.delete("/consultants/:consultantId", deleteConsultantByAdmin);

module.exports = router;
