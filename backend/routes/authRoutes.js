const express = require("express");
const {
  adminLogin,
  studentRegister,
  studentLogin,
  consultantRegister,
  consultantLogin,
  getPublicSchools,
} = require("../controllers/authController");
const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.post("/consultant/register", consultantRegister);
router.post("/consultant/login", consultantLogin);
router.get("/schools", getPublicSchools);

module.exports = router;
