const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  getStudentProfile,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

// Register student
router.post("/register", registerStudent);

// Login student
router.post("/login", loginStudent);

// Get student profile (Protected)
router.get("/profile", protect, getStudentProfile);

module.exports = router;
