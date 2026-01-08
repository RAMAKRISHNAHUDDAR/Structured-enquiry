const Course = require("../models/Course");
const Student = require("../models/Student");

// CREATE COURSE
const createCourse = async (req, res) => {
  try {
    const { courseCode, courseName, credits } = req.body;

    if (!courseCode || !courseName || credits === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Course.findOne({ courseCode });
    if (exists) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const course = await Course.create({
      courseCode,
      courseName,
      credits,
      semester: req.student.semester,
      department: req.student.department,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET AVAILABLE COURSES
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      department: req.student.department,
      semester: req.student.semester,
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// REGISTER COURSE
const registerCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const student = await Student.findById(req.student._id);

    if (student.courses.includes(courseId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    student.courses.push(courseId);
    await student.save();

    res.json({ message: "Course registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// MY COURSES
const getMyCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id)
      .populate("courses");

    res.json(student.courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DASHBOARD SUMMARY
const getDashboardSummary = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id)
      .populate("courses");

    const totalCourses = student.courses.length;
    const totalCredits = student.courses.reduce(
      (sum, c) => sum + c.credits,
      0
    );

    res.json({ totalCourses, totalCredits });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  registerCourse,
  getMyCourses,
  getDashboardSummary,
};
