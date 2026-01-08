import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function RegisterCourses() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    credits: "",
  });

  const [courseList, setCourseList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ADD or UPDATE course
  const addOrUpdateCourse = () => {
    if (
      course.courseCode.trim() === "" ||
      course.courseName.trim() === "" ||
      course.credits === "" ||
      Number(course.credits) <= 0
    ) {
      alert("Please enter valid course details");
      return;
    }

    const preparedCourse = {
      courseCode: course.courseCode.trim(),
      courseName: course.courseName.trim(),
      credits: Number(course.credits),
    };

    if (editIndex !== null) {
      const updatedList = [...courseList];
      updatedList[editIndex] = preparedCourse;
      setCourseList(updatedList);
      setEditIndex(null);
    } else {
      setCourseList([...courseList, preparedCourse]);
    }

    setCourse({ courseCode: "", courseName: "", credits: "" });
  };

  // EDIT course
  const editCourse = (index) => {
    setCourse(courseList[index]);
    setEditIndex(index);
  };

  // REMOVE course
  const removeCourse = (index) => {
    const updatedList = courseList.filter((_, i) => i !== index);
    setCourseList(updatedList);
  };

  // FINAL SUBMIT
  const submitRegistration = async () => {
    if (courseList.length === 0) {
      alert("Add at least one course before submitting");
      return;
    }

    try {
      for (let c of courseList) {
        const createRes = await API.post("/courses/create", {
          courseCode: c.courseCode,
          courseName: c.courseName,
          credits: c.credits,
        });

        await API.post("/courses/register", {
          courseId: createRes.data.course._id,
        });
      }

      alert("Courses registered successfully");
      navigate("/dashboard");
    } catch {
      alert("Error submitting courses");
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">KLE University</h2>

        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/profile")}>My Profile</button>
        <button onClick={() => navigate("/my-courses")}>My Courses</button>

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

      <main className="dashboard-main">
        <div className="courses-wrapper fade-in">
          <h1 className="dashboard-heading">Register Courses</h1>

          <div className="register-form">
            <input
              className="login-input"
              placeholder="Course Code"
              name="courseCode"
              value={course.courseCode}
              onChange={handleChange}
            />

            <input
              className="login-input"
              placeholder="Course Name"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
            />

            <input
              className="login-input"
              type="number"
              placeholder="Credits"
              name="credits"
              value={course.credits}
              onChange={handleChange}
            />

            <button className="login-btn" onClick={addOrUpdateCourse}>
              {editIndex !== null ? "Update Course" : "Add Course"}
            </button>
          </div>

          {courseList.length > 0 && (
            <div className="courses-table">
              <div className="courses-header">
                <span>Course Code</span>
                <span>Course Name</span>
                <span>Credits</span>
                <span>Actions</span>
              </div>

              {courseList.map((c, index) => (
                <div className="courses-row" key={index}>
                  <span>{c.courseCode}</span>
                  <span>{c.courseName}</span>
                  <span>{c.credits}</span>

                  <span>
                    <button
                      className="small-btn"
                      onClick={() => editCourse(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="small-btn danger"
                      onClick={() => removeCourse(index)}
                    >
                      Remove
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            className="login-btn"
            style={{ marginTop: "20px" }}
            onClick={submitRegistration}
          >
            Submit Registration
          </button>
        </div>
      </main>
    </div>
  );
}

export default RegisterCourses;
