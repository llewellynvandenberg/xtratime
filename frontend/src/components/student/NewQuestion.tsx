import React from "react";
import "../../styles/Announcement.css";
import { AiOutlineLink } from "react-icons/ai";

interface NewQuestionProps {
  name: string;
}

const NewQuestion: React.FC<NewQuestionProps> = ({ name }) => {
  return (
    <>
      <div className="announcement">
        <div className="forum-post-header">
          <span className="forum-post-username">{name}</span>
          <span className="forum-post-date">{"20/03/2024"}</span>
        </div>
        <div className="announcement-content">
          <div className="announcement-header">Type Question here...</div>
        </div>
      </div>
    </>
  );
};

export default NewQuestion;
