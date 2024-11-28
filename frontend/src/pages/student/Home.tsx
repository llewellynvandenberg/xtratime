import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

const StudentHome = () => {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const user = JSON.parse(storedUser as string);
  const [announcements, setAnnouncements] = useState<announcementsProps[]>([]);
  const classrooms = user.classes;

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

  useEffect(() => {
    fetchAnnouncements().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  return (
    <>
      <SideNav title="My classes" />
      <div className="shifted">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {classrooms.map(
                (
                  classroom: {
                    name: string;
                    teacher: string;
                    id: string;
                  },
                  index: number
                ) => (
                  <div className="col-md-4" key={index}>
                    <Link
                      to={`/student/topics`}
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        sessionStorage.setItem("selectedClassID", classroom.id);
                      }}
                    >
                      <Card title={classroom.name} classN="classroom-card">
                        <p>{classroom.teacher}</p>
                      </Card>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-md-4 announcements-section">
            <h2 className="title">Announcements</h2>
            {announcements.map((announcement, index) => {
              return (
                <Announcement
                  title={announcement.title}
                  content={announcement.content}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
