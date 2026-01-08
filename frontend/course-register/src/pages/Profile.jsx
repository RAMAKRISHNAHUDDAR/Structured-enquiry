import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Profile() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndSummary = async () => {
      try {
        const [profileRes, summaryRes] = await Promise.all([
          API.get("/students/profile"),
          API.get("/courses/summary"),
        ]);

        setStudent({
          ...profileRes.data,
          totalCourses: summaryRes.data.totalCourses,
          totalCredits: summaryRes.data.totalCredits,
        });
      } catch {
        alert("Failed to load profile");
      }
    };

    fetchProfileAndSummary();
  }, []);

  if (!student) return null;

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">KLE University</h2>

        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
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

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <div className="profile-wrapper">

          <h1 className="dashboard-heading">My Profile</h1>

          <div className="profile-grid">
            <div className="profile-box">
              <h4>Name</h4>
              <p>{student.name}</p>
            </div>

            <div className="profile-box">
              <h4>SRN</h4>
              <p>{student.srn}</p>
            </div>

            <div className="profile-box">
              <h4>Semester</h4>
              <p>{student.semester}</p>
            </div>

            <div className="profile-box">
              <h4>Year</h4>
              <p>{student.year}</p>
            </div>

            <div className="profile-box">
              <h4>Department</h4>
              <p>{student.department}</p>
            </div>

            <div className="profile-box">
              <h4>Total Courses</h4>
              <p>{student.totalCourses}</p>
            </div>

            <div className="profile-box">
              <h4>Total Credits</h4>
              <p>{student.totalCredits}</p>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default Profile;
