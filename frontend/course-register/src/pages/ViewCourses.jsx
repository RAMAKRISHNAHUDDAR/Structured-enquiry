import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/courses/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(res.data);
      } catch {
        alert("Failed to load courses");
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="university-title">KLE Technological University</h1>
        <h2 className="dashboard-heading">My Courses</h2>

        {courses.length === 0 ? (
          <p>No courses registered</p>
        ) : (
          <div className="summary-container">
            {courses.map((course) => (
              <div className="summary-box" key={course._id}>
                <h3>{course.courseCode}</h3>
                <p style={{ fontSize: "14px", color: "#333" }}>
                  {course.courseName}
                </p>
                <p style={{ fontSize: "16px", color: "#0d6efd" }}>
                  Credits: {course.credits}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          className="dashboard-btn"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ViewCourses;
