const express = require("express");
const {
  authenticate,
  authorizeRole,
  authorizeApproved,
} = require("../middleware/auth");
const {
  getStudentApplications,
  createApplication,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const router = express.Router();

// Student applications
router.get(
  "/student/:studentId",
  authenticate,
  authorizeApproved,
  getStudentApplications,
);
router.post(
  "/",
  authenticate,
  authorizeRole("student"),
  authorizeApproved,
  createApplication,
);

// Admin view all applications
router.get("/", authenticate, authorizeRole("admin"), getAllApplications);
router.put(
  "/:applicationId",
  authenticate,
  authorizeRole("admin"),
  updateApplicationStatus,
);

module.exports = router;
