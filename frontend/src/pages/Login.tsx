import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleToggle from "../components/RoleToggle";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nclicks, setClicks] = useState(0);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const navigate = useNavigate();

  let tmp_password = {};
  let success = 0;

  const fetchData = async () => {
    try {
      if (role === "student") {
        const response = await fetch("http://localhost:3001/student-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });
        const result = await response.json();

        sessionStorage.setItem("user", JSON.stringify(result.user));
        sessionStorage.setItem("role", "student");

        tmp_password = result.user.password;

        success = result.success;
        console.log("user", result.user);
      } else {
        const response = await fetch("http://localhost:3001/teacher-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });
        const result = await response.json();

        sessionStorage.setItem("user", JSON.stringify(result.user));
        sessionStorage.setItem("role", "teacher");

        tmp_password = result.user.password;
        success = result.success;
        console.log("user", result.user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogin = () => {
    if (success) {
      if (role === "student") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }
    }
  };

  const changeClicks = () => {
    setClicks(nclicks + 1);
  };

  useEffect(() => {
    fetchData().then(() => {
      if (tmp_password) {
        handleLogin();
      }
    });
  }, [nclicks]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please sign in to continue</p>
        
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <RoleToggle role={role} setRole={setRole} />

          <button
            type="button"
            onClick={changeClicks}
            className="login-button"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
