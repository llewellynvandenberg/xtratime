import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import SideNav from "../../components/student/SideNav";
import { useNavigate } from "react-router-dom";
import "../../styles/teacher/ClassView.css";
import "../../styles/teacher/Dashboard.css";
// Define your user context
interface classDataProps {
  class_name: string;
  topics: Array<object>;
  teacher: string;
  students?: Array<{ id: string; name: string; email: string }>;
}

// Dummy data for testing
const DUMMY_STUDENTS = [
  { id: "1", name: "Alex Johnson", email: "alex.j@school.edu", avatar: "AJ" },
  { id: "2", name: "Sarah Miller", email: "sarah.m@school.edu", avatar: "SM" },
  { id: "3", name: "James Wilson", email: "james.w@school.edu", avatar: "JW" },
  { id: "4", name: "Emma Davis", email: "emma.d@school.edu", avatar: "ED" },
];

function TeacherClassView() {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const userObj = JSON.parse(storedUser as string);

  const classID = sessionStorage.getItem("selectedClassID");
  const [classData, setClassData] = useState<classDataProps | null>(null);
  const navigate = useNavigate();
  const [students, setStudents] = useState(DUMMY_STUDENTS);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:3001/classInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: classID }),
      });
      const result = await response.json();
      setClassData(result.classInfo);

      console.log("classrooms data", result.classInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteClass = async () => {
    try {
      const response = await fetch("http://localhost:3001/deleteClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class_id: classID, teacher_id: userObj._id }),
      });
      const result = await response.json();
      setClassData(result.classInfo);

      console.log("classrooms data", result.classInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handelDeleteClass = () => {
    deleteClass();
    navigate("/teacher");
  };

  useEffect(() => {
    fetchClasses().then(() => {
      console.log("Classroom info fetched");
    });
    setStudents(DUMMY_STUDENTS);
  }, []);

  return (
    <div className="dashboard-container">
      <SideNav
        title={classData ? classData.class_name : ""}
        view="class"
        action={handelDeleteClass}
        backLink="/teacher"
      />
      {classData !== null && (
        <div className="dashboard-content shifted">
          <div className="topics-container">
            <div className="topics-grid">
              {classData.topics &&
                classData.topics.map((topic: any, index: number) => (
                  <Link
                    to={`/teacher/posts`}
                    className="topic-card-link"
                    key={index}
                    onClick={() => sessionStorage.setItem("selectedTopicID", topic.id)}
                  >
                    <Card title={topic.name} classN="topic-card">
                      <div className="topic-card-content">
                        <p className="topic-description">{topic.description}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              
              <Link to={`/teacher/new-topic`} className="topic-card-link">
                <Card title={"New Topic"} classN="topic-card new-topic">
                  <div className="add-topic-content">
                    <div className="add-topic-icon">+</div>
                    <p className="add-topic-text">Create a new topic</p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          <aside className="students-panel">
            <div className="students-header">
              <div>
                <h2>Students</h2>
                <span className="student-count">{students.length} enrolled</span>
              </div>
              <button className="add-student-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                Add
              </button>
            </div>
            
            <div className="students-list">
              {students.map((student) => (
                <div key={student.id} className="student-item">
                  <div className="student-avatar">{student.avatar}</div>
                  <div className="student-info">
                    <span className="student-name">{student.name}</span>
                    <span className="student-email">{student.email}</span>
                  </div>
                  <button className="remove-student-btn" title="Remove student">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
export default TeacherClassView;
