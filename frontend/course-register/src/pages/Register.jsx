import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    srn: "",
    semester: "",
    year: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (form.srn.length !== 12) {
      alert("SRN must be exactly 12 characters");
      return false;
    }

    const sem = Number(form.semester);
    if (sem < 1 || sem > 8) {
      alert("Semester must be between 1 and 8");
      return false;
    }

    const yr = Number(form.year);
    if (yr < 1 || yr > 4) {
      alert("Year must be between 1 and 4");
      return false;
    }

    if (!form.department.trim()) {
      alert("Department is required");
      return false;
    }

    // Basic password rules
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    if (!/[A-Z]/i.test(form.password) || !/[0-9]/.test(form.password)) {
      alert("Password must contain letters and numbers");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await API.post("/students/register", {
        name: form.name,
        srn: form.srn,
        semester: Number(form.semester),
        year: Number(form.year),
        department: form.department,
        password: form.password,
      });

      alert("Registration successful! Please login.");
      navigate("/");

    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="university-title">KLE Technological University</h1>
        <h2 className="auth-heading">Student Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            placeholder="SRN "
            name="srn"
            maxLength={12}
            value={form.srn}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            placeholder="Semester "
            type="number"
            name="semester"
            value={form.semester}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            placeholder="Year "
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            placeholder="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="auth-btn" type="submit">
            Register
          </button>
        </form>

        <p className="auth-switch">
          Already registered?{" "}
          <Link to="/" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
