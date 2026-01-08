import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="dashboard-sidebar">
      <h2 className="sidebar-title">KLE University</h2>

      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/profile")}>My Profile</button>
      <button onClick={() => navigate("/my-courses")}>My Courses</button>
      <button onClick={() => navigate("/register-courses")}>
        Register Courses
      </button>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
