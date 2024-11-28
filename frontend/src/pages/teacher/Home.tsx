import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/students/Home.css";
import Card from "../../components/Card";
import Announcement from "../../components/student/Announcement";
import "../../styles/Global.css";
import SideNav from "../../components/student/SideNav";

interface announcementsProps {
  title: string;
  content: string;
  time: string;
}

const TeacherHome = () => {
  const [user, setUser] = useState<any>({});

  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const userObj = JSON.parse(storedUser as string);

  const role = sessionStorage.getItem("role")
    ? sessionStorage.getItem("role")
    : "student";

  const [announcements, setAnnouncements] = useState<announcementsProps[]>([]);

  const fetchAnnouncements = async (offset: number = 0) => {
    try {
      const response = await fetch("http://localhost:3001/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offset: offset }),
      });
      const result = await response.json();
      setAnnouncements(result.announcements);

      console.log("announcements data", result.announcements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    fetchAnnouncements().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  useEffect(() => {
    fetchUser().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  return (
    <>
      <SideNav title="My classes" />
      <div className="row shifted">
        <div className="col-md-8">
          <div className="row">
            {user.classes &&
              user.classes.map(
                (
                  classroom: { name: string; teacher: string; id: string },
                  index: number
                ) => (
                  <div className="col-md-4" key={index}>
                    <Link
                      to={`/teacher/topics`}
                      style={{ textDecoration: "none" }}
                      onClick={() =>
                        sessionStorage.setItem("selectedClassID", classroom.id)
                      }
                    >
                      <Card title={classroom.name} classN="classroom-card">
                        <></>
                      </Card>
                    </Link>
                  </div>
                )
              )}
            <div className="col-md-4">
              <Link to={`new-class`} style={{ textDecoration: "none" }}>
                <Card title={"Add new class"} classN="classroom-card">
                  <></>
                </Card>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 announcements-section">
          <h2 className="title">Announcements</h2>
          {announcements &&
            announcements.map((announcement, index) => {
              return (
                <Announcement
                  title={announcement.title}
                  content={announcement.content}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TeacherHome;
