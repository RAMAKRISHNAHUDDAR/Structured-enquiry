import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudentName(res.data.name);
      } catch {
        alert("Failed to load student info");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">KLE University</h2>

        <button onClick={() => navigate("/profile")}>My Profile</button>
        <button onClick={() => navigate("/my-courses")}>My Courses</button>
        <button onClick={() => navigate("/register-courses")}>
          Register Courses
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <h1 className="dashboard-heading">
          Welcome{studentName && `, ${studentName}`} 👋
        </h1>

        <p className="dashboard-info">
          This is your student dashboard. From here, you can:
        </p>

        <ul className="dashboard-list">
          <li>View and manage your registered courses</li>
          <li>Register new courses for the semester</li>
          <li>View your academic profile and details</li>
        </ul>

        <p className="dashboard-note">
          Please ensure your course registrations are completed before the
          semester deadline.
        </p>
      </main>

    </div>
  );
}

export default Dashboard;
