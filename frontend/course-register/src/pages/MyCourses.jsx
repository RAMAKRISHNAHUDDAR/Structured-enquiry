import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await API.get("/courses/my-courses");
        setCourses(res.data);
      } catch {
        alert("Failed to load courses");
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR (same as others) */}
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

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <div className="courses-wrapper fade-in">

          <h1 className="dashboard-heading">My Registered Courses</h1>

          {courses.length === 0 ? (
            <p>No courses registered yet.</p>
          ) : (
            <div className="courses-table">
              <div className="courses-header">
                <span>Course Code</span>
                <span>Course Name</span>
                <span>Credits</span>
              </div>

              {courses.map((course) => (
                <div className="courses-row" key={course._id}>
                  <span>{course.courseCode}</span>
                  <span>{course.courseName}</span>
                  <span>{course.credits}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

    </div>
  );
}

export default MyCourses;
