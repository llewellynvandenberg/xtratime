import React from "react";
import "../../styles/Announcement.css";
import "../../styles/SideNav.css";
import { Link } from "react-router-dom";
interface SideNavProps {
  title: string;
  view?: string;
  action?: Function;
  backLink?: string;
}

const SideNav: React.FC<SideNavProps> = ({ title, view, action, backLink }) => {
  const role = sessionStorage.getItem("role");
  return (
    <>
      {role === "student" && (
        <div className="sidebar open">
          <h3 className="page-title">{title}</h3>
          <Link
            className="sidebar-item"
            to={`/student`}
            style={{ textDecoration: "none" }}
          >
            My classes
          </Link>
          <Link
            className="sidebar-item"
            to={`/student/join-class`}
            style={{ textDecoration: "none" }}
          >
            Join new class
          </Link>
          <Link
            className="sidebar-item"
            to={`/student`}
            style={{ textDecoration: "none" }}
          >
            Events
          </Link>
          <Link
            className="sidebar-item"
            to={`/student`}
            style={{ textDecoration: "none" }}
          >
            To do's
          </Link>
          <Link
            className="sidebar-item"
            to={`/student`}
            style={{ textDecoration: "none" }}
          >
            Settings
          </Link>
          {backLink && (
            <Link
              className="sidebar-item"
              to={backLink}
              style={{ textDecoration: "none" }}
            >
              <hr />
              Go Back
            </Link>
          )}
        </div>
      )}
      {role === "teacher" && (
        <div className="sidebar open">
          <h3 className="page-title">{title}</h3>
          <Link
            className="sidebar-item"
            to={`/teacher`}
            style={{ textDecoration: "none" }}
          >
            My classes
          </Link>
          <Link
            className="sidebar-item"
            to={`/teacher/new-class`}
            style={{ textDecoration: "none" }}
          >
            Create new class
          </Link>
          <Link
            className="sidebar-item"
            to={`/teacher`}
            style={{ textDecoration: "none" }}
          >
            Events
          </Link>
          <Link
            className="sidebar-item"
            to={`/teacher`}
            style={{ textDecoration: "none" }}
          >
            To do's
          </Link>
          <Link
            className="sidebar-item"
            to={`/teacher`}
            style={{ textDecoration: "none" }}
          >
            Settings
          </Link>
          {view === "class" && (
            <div
              className="sidebar-item"
              onClick={() => {
                if (action) {
                  action();
                }
              }}
            >
              <hr />
              Delete Class
            </div>
          )}
          {view === "topic" && (
            <div
              className="sidebar-item"
              onClick={() => {
                if (action) {
                  action();
                }
              }}
            >
              <hr />
              Delete Topic
            </div>
          )}
          {backLink && (
            <Link
              className="sidebar-item"
              to={backLink}
              style={{ textDecoration: "none" }}
            >
              <hr />
              Go Back
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default SideNav;
