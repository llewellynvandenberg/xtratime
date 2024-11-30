import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/SideNav.css";

interface SideNavProps {
  title: string;
  view: string;
  action: () => void;
  onBack?: () => void;
  backLink?: string;
}

const SideNav: React.FC<SideNavProps> = ({ title, view, action, onBack, backLink }) => {
  const role = sessionStorage.getItem("role");
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const menuItems = {
    student: [
      { path: "/student", label: "My classes", icon: "📚" },
      { path: "/student/join-class", label: "Join new class", icon: "➕" },
      { path: "/student/events", label: "Events", icon: "📅" },
      { path: "/student/todos", label: "To do's", icon: "✓" },
      { path: "/student/profile", label: "Profile", icon: "👤" },
      { path: "/student/settings", label: "Settings", icon: "⚙️" },
    ],
    teacher: [
      { path: "/teacher", label: "My classes", icon: "📚" },
      { path: "/teacher/new-class", label: "Create new class", icon: "➕" },
      { path: "/teacher/events", label: "Events", icon: "📅" },
      { path: "/teacher/todos", label: "To do's", icon: "✓" },
      { path: "/teacher/profile", label: "Profile", icon: "👤" },
      { path: "/teacher/settings", label: "Settings", icon: "⚙️" },
    ],
  };

  const items = role === "student" ? menuItems.student : menuItems.teacher;

  return (
    <div className="sidebar open">
      <div className="sidebar-header">
        <h3 className="page-title">{title}</h3>
        <div className="user-info">
          <div className="user-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="user-name">{user.name || "User"}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="item-icon">{item.icon}</span>
            <span className="item-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        {view === "class" && role === "teacher" && (
          <button
            className="sidebar-action delete"
            onClick={() => action && action()}
          >
            <span className="item-icon">🗑️</span>
            <span className="item-label">Delete Class</span>
          </button>
        )}

        {view === "topic" && role === "teacher" && (
          <button
            className="sidebar-action delete"
            onClick={() => action && action()}
          >
            <span className="item-icon">🗑️</span>
            <span className="item-label">Delete Topic</span>
          </button>
        )}

        {onBack && backLink && (
          <Link to={backLink} className="sidebar-action back">
            <span className="item-icon">←</span>
            <span className="item-label">Go Back</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideNav;
