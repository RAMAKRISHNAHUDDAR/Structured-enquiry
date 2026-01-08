import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    srn: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/students/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid SRN or password");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT WHITE SIDE */}
      <div className="login-left">
        <img src="/kle-logo.jpeg" alt="KLE Logo" className="login-logo" />
        
      </div>

      {/* RIGHT BLUE SIDE */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Student Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              className="login-input"
              placeholder="SRN"
              name="srn"
              maxLength={12}
              value={form.srn}
              onChange={handleChange}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <p className="login-link">
            Not registered?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
