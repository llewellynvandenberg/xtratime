import React from "react";
// import "../../styles/students/Post.css";
import { AiOutlineLink, AiOutlineComment } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PostProps {
  content: string;
  link: string;
  post_id: string;
  children?: React.ReactNode;
}

const Post: React.FC<PostProps> = ({ content, link, children, post_id }) => {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const user = JSON.parse(storedUser as string);
  const [newQuestionClicked, setNewQuestionClicked] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const handleNewQuestionClick = () => {
    setNewQuestionClicked(!newQuestionClicked);
  };

  const handleQuestionInput = (event: any) => {
    setNewQuestion(event.target.value);
  };

  const submitQuestion = async () => {
    setNewQuestionClicked(false);
    setNewQuestion("");
    if (newQuestion !== "") {
      try {
        const response = await fetch("http://localhost:3001/submitQuestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: newQuestion,
            user: user.name,
            post_id: post_id,
          }),
        });
        const result = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <div className="post">
        <div className="post-content">
          <div className="post-header">{content}</div>

          <div className="post-button-section">
            <div className="button-group">
              {link && (
                <a
                  href={link}
                  title="External Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  className="post-button"
                >
                  <AiOutlineLink />
                </a>
              )}
              <div className="post-button">
                <Link
                  to={`/student/qas`}
                  style={{ textDecoration: "none" }}
                  onClick={() =>
                    sessionStorage.setItem("selectedPostID", post_id)
                  }
                >
                  <FaRegComments />
                </Link>
              </div>
              <div className="post-button">
                <AiOutlineComment onClick={handleNewQuestionClick} />
              </div>
            </div>
          </div>

          {children ? <div className="post-children">{children}</div> : <></>}
          {newQuestionClicked ? (
            <>
              <div className="announcement">
                <div className="forum-post-header">
                  <span className="forum-post-username">New Question</span>
                  <span className="forum-post-date">{"20/03/2024"}</span>
                </div>
                <div className="announcement-content">
                  <div className="announcement-header">
                    <textarea
                      placeholder="Ask a question about the post..."
                      value={newQuestion}
                      onChange={handleQuestionInput}
                      className="new-question-input"
                      maxLength={500}
                    />
                    <button
                      onClick={submitQuestion}
                      type="button"
                      className="btn btn-light"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
