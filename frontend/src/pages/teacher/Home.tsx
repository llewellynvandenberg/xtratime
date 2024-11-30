import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/teacher/Home.css";
import Card from "../../components/Card";
import { useAnnouncements } from '../../hooks/useAnnouncements';
import Announcement from "../../components/teacher/Announcement";
import SideNav from "../../components/student/SideNav";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const TeacherHome = () => {
  const [user, setUser] = useState<any>({});
  const { announcements, loading, error } = useAnnouncements();

  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const userObj = JSON.parse(storedUser as string);

  const role = sessionStorage.getItem("role")
    ? sessionStorage.getItem("role")
    : "student";

  const fetchUser = async () => {
    try {
      if (role === "student") {
        const response = await fetch("http://localhost:3001/student-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userObj.username,
            password: userObj.password,
          }),
        });
        const result = await response.json();

        sessionStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
      } else {
        const response = await fetch("http://localhost:3001/teacher-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userObj.username,
            password: userObj.password,
          }),
        });
        const result = await response.json();

        sessionStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUser().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  return (
    <div className="dashboard-container">
      <SideNav 
        title="My classes"
        view="classes"
        action={() => {}}
      />
      
      <div className="dashboard-content shifted">
        <div className="main-content">
          <div className="classes-grid">
            {user.classes &&
              user.classes.map((classroom: { name: string; teacher: string; id: string }, index: number) => (
                <Link
                  to={`/teacher/topics`}
                  className="class-card-link"
                  key={index}
                  onClick={() => sessionStorage.setItem("selectedClassID", classroom.id)}
                >
                  <Card title={classroom.name} classN="class-card">
                    <div className="class-card-content">
                      <span className="class-card-students">24 Students</span>
                      <span className="class-card-topics">5 Topics</span>
                    </div>
                  </Card>
                </Link>
              ))}
            <Link to={`new-class`} className="class-card-link">
              <Card title={"Add new class"} classN="class-card new-class">
                <div className="add-class-icon">+</div>
              </Card>
            </Link>
          </div>
        </div>

        <div className="announcements-panel">
          <h2 className="announcements-title">Recent Announcements</h2>
          <div className="announcements-list">
            {loading ? (
              <div className="announcements-loading">
                <AiOutlineLoading3Quarters className="loading-icon spin" />
                <span>Loading announcements...</span>
              </div>
            ) : error ? (
              <div className="announcements-error">
                {error}
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <Announcement
                  key={index}
                  title={announcement.title}
                  content={announcement.content}
                  createdAt={new Date(announcement.createdAt)}
                  author={announcement.author}
                  link={announcement.link}
                  image={announcement.image}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
