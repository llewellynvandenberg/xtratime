import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import RoleToggle from "../components/RoleToggle";
import Card from "../components/Card";
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
      <form>
        <label>
          Username:
          <input
            type="text"
            className="form-control"
            placeholder="john@hotel.com"
            aria-label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            placeholder="********"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <RoleToggle role={role} setRole={setRole} />
        <br />
        <button
          type="button"
          onClick={changeClicks}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
