import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import SideNav from "../../components/student/SideNav";

import "../../styles/students/Home.css";
import Card from "../../components/Card";

import Announcement from "../../components/student/Announcement";

interface studentOptionsProps {
  value: string;
  label: string;
}

interface studentProps {
  fullname: string;
  id: string;
}

const NewTopicView = () => {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const user = JSON.parse(storedUser as string);
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const handleTopicNameChange = (event: any) => {
    setTopicName(event.target.value);
  };

  const createTopic = async () => {
    if (!topicName) {
      alert("Please enter a topic name");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/createTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: sessionStorage.getItem("selectedClassID"),
          name: topicName,
          description: topicDescription,
        }),
      });
      const result = await response.json();
      const studentOptions = result.students.map((student: any) => ({
        value: student._id,
        label: `${student.name} ${student.surname}`,
      }));

      console.log("students data", result.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.log("Topic created");
  };

  const handleSubmitClicked = () => {
    createTopic();
    setTopicName("");
    setTopicDescription("");
  };

  return (
    <>
      <SideNav title="New class" />
      <div className="shifted">
        <br />
        <h2>Add a new topic:</h2>

        <input
          placeholder="Topic name..."
          value={topicName}
          onChange={handleTopicNameChange}
        />
        <br />

        <input
          placeholder="Topic description..."
          value={topicDescription}
          onChange={(event) => setTopicDescription(event.target.value)}
        />
        <br />
        <button
          onClick={handleSubmitClicked}
          type="button"
          className="btn btn-light"
        >
          Create Topic
        </button>
      </div>
    </>
  );
};

export default NewTopicView;
