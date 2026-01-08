const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  registerCourse,
  getMyCourses,
  getDashboardSummary,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createCourse);
router.get("/", protect, getCourses);
router.post("/register", protect, registerCourse);
router.get("/my-courses", protect, getMyCourses);
router.get("/summary", protect, getDashboardSummary);

module.exports = router;
