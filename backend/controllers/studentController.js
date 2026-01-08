const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

// @desc    Register new student
// @route   POST /api/students/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const { name, srn, semester, year, department, password } = req.body;

    if (!name || !srn || !semester || !year || !department || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const studentExists = await Student.findOne({ srn });
    if (studentExists) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const student = await Student.create({
      name,
      srn,
      semester,
      year,
      department,
      password,
    });

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: student._id,
        name: student.name,
        srn: student.srn,
        semester: student.semester,
        year: student.year,
        department: student.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login student
// @route   POST /api/students/login
// @access  Public
const loginStudent = async (req, res) => {
  try {
    const { srn, password } = req.body;

    if (!srn || !password) {
      return res.status(400).json({ message: "SRN and password are required" });
    }

    const student = await Student.findOne({ srn });
    if (!student) {
      return res.status(401).json({ message: "Invalid SRN or password" });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid SRN or password" });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        srn: student.srn,
        semester: student.semester,
        year: student.year,
        department: student.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private
const getStudentProfile = async (req, res) => {
  res.status(200).json(req.student);
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile,
};
