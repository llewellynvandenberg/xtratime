import React from "react";
import "../../styles/students/Qas.css";
import { RiReplyFill } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import { BsReply } from "react-icons/bs";

interface QasProps {
  name: string;
  question: string;
  answer?: string;
  link?: string;
  replieable?: boolean;
}

const Qas: React.FC<QasProps> = ({
  name,
  question,
  answer,
  link,
  replieable = true,
}) => {
  return (
    <div className={`forum-post`}>
      <div className="question-section">
        <div className="forum-post-header">
          <span className="forum-post-username">{name}</span>
          <span className="forum-post-date">{"20/03/2024"}</span>
        </div>
        <div className="forum-post-content">{question}</div>
      </div>
      {answer && (
        <div className="answer-section">
          <div className="forum-post-header">
            <span className="forum-post-username">{"Answer"}</span>
            <span className="forum-post-date">{"20/03/2024"}</span>
          </div>
          <div className="forum-post-content">{answer}</div>
          <div className="button-group">
            {link && (
              <a
                href={link}
                title="External Link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                className="answer-button"
              >
                <AiOutlineLink />
              </a>
            )}
            {replieable && (
              <div className="answer-button">
                <BsReply />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Qas;
