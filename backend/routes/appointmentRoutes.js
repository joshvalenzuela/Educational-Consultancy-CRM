const express = require("express");
const {
  authenticate,
  authorizeRole,
  authorizeApproved,
} = require("../middleware/auth");
const {
  scheduleAppointment,
  getStudentAppointments,
  getConsultantAppointments,
  acceptAppointment,
  denyAppointment,
  getAllConsultants,
} = require("../controllers/appointmentController");

const router = express.Router();

// Get all consultants
router.get("/consultants", authenticate, authorizeApproved, getAllConsultants);

// Student schedule and view appointments
router.post(
  "/",
  authenticate,
  authorizeRole("student"),
  authorizeApproved,
  scheduleAppointment,
);
router.get(
  "/student/:studentId",
  authenticate,
  authorizeApproved,
  getStudentAppointments,
);

// Consultant view appointments
router.get(
  "/consultant/:consultantId",
  authenticate,
  authorizeRole("consultant"),
  authorizeApproved,
  getConsultantAppointments,
);

// Consultant accept/deny appointments
router.put(
  "/:appointmentId/accept",
  authenticate,
  authorizeRole("consultant"),
  authorizeApproved,
  acceptAppointment,
);
router.put(
  "/:appointmentId/deny",
  authenticate,
  authorizeRole("consultant"),
  authorizeApproved,
  denyAppointment,
);

module.exports = router;
