import React, { useState } from "react";
import "../../styles/students/Qas.css";
import { AiOutlineLink } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

interface QasProps {
  qas_id: string;
  name: string;
  question: string;
  answer?: string;
  link?: string;
  replieable?: boolean;
  isFAQ?: boolean;
  refresh?: Function;
}

const Qas: React.FC<QasProps> = ({
  qas_id,
  name,
  question,
  answer,
  link,
  isFAQ,
  refresh,
  replieable = true,
}) => {
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyLink, setReplyLink] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);
  const [editedLink, setEditedLink] = useState(link);

  const answerQuestion = async () => {
    try {
      const response = await fetch("http://localhost:3001/replyQas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qas_id: qas_id,
          answer: replyContent,
          link: replyLink,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteQuestion = async () => {
    try {
      const response = await fetch("http://localhost:3001/deleteQas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qas_id: qas_id,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateAnswer = async () => {
    try {
      const response = await fetch("http://localhost:3001/updateAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qas_id: qas_id,
          answer: editedAnswer,
          ...(link && { link: editedLink }),
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAnswer = () => {
    answerQuestion().then(() => {
      setReplyMode(false);
      setReplyContent("");
      setReplyLink("");
      if (refresh) refresh();
    });
  };

  const handleDelete = () => {
    deleteQuestion().then(() => {
      setEditMode(false);
      if (refresh) refresh();
    });
  };

  const handleUpdateAnswerSubmit = () => {
    updateAnswer().then(() => {
      setEditMode(false);
      if (refresh) refresh();
    });
  };

  return (
    <div className={`forum-post`}>
      <div className="question-section">
        <div className="forum-post-header">
          <span className="forum-post-username">
            {isFAQ ? "You (FAQ)" : name}
          </span>

          <span className="forum-post-date">{"20/03/2024"}</span>
          {!answer && !isFAQ && (
            <div className="answer-button">
              <BsReply
                onClick={() => {
                  setReplyMode(!replyMode);
                }}
              />
            </div>
          )}
          {isFAQ && (
            <div className="answer-button">
              <FiEdit />
            </div>
          )}
        </div>
        <div className="forum-post-content">{question}</div>
      </div>
      {replyMode && (
        <div className="announcement">
          <div className="forum-post-header">
            <span className="forum-post-username">Reply</span>
            <span className="forum-post-date">{"20/03/2024"}</span>
          </div>
          <div className="announcement-content">
            <div className="announcement-header">
              <textarea
                placeholder="Add an answer to this question to make it visible for all students."
                value={replyContent}
                onChange={(event) => {
                  setReplyContent(event.target.value);
                }}
                className="edit-answer-input"
                maxLength={500}
              />
              <input
                className="link-input"
                placeholder="Link (optional)"
                value={replyLink}
                onChange={(e) => setReplyLink(e.target.value)}
              />
              <button
                onClick={() => {
                  handleAnswer();
                }}
                type="button"
                className="btn btn-light"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  handleAnswer();
                }}
                type="button"
                className="btn btn-light"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {answer && (
        <div className="answer-section">
          <div className="forum-post-header">
            <span className="forum-post-username">{"Answer"}</span>
            <span className="forum-post-date">{"20/03/2024"}</span>
          </div>

          {!editMode ? (
            <div className="forum-post-content">{answer}</div>
          ) : (
            <div className="forum-post-content">
              <textarea
                value={editedAnswer}
                onChange={(e) => {
                  setEditedAnswer(e.target.value);
                }}
                className="edit-answer-input"
              />
              <input
                className="link-input"
                placeholder="Link (optional)"
                value={editedLink}
                onChange={(e) => setEditedLink(e.target.value)}
              />
            </div>
          )}
          <div className="button-group">
            {!editMode ? (
              <>
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
                <div className="answer-button">
                  <FiEdit
                    onClick={() => {
                      setEditMode(!editMode);
                      setEditedAnswer(answer);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-light submit-edit-btn"
                  onClick={() => handleUpdateAnswerSubmit()}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-light submit-edit-btn"
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-light submit-edit-btn"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Qas;
