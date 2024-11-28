import React from "react";
import "../../styles/students/Post.css";
import { AiOutlineLink, AiOutlineComment } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface PostProps {
  content: string;
  link: string;
  children?: React.ReactNode;
  post_id: string;
  setEditPost?: Function;
  setEditedContent?: Function;
  setEditedLink?: Function;
  setEditedPostID?: Function;
}

const Post: React.FC<PostProps> = ({
  content,
  link,
  children,
  post_id,
  setEditPost,
  setEditedContent,
  setEditedLink,
  setEditedPostID,
}) => {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const userObj = JSON.parse(storedUser as string);
  const [newQuestionClicked, setNewQuestionClicked] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const handleNewQuestionClick = () => {
    setNewQuestionClicked(!newQuestionClicked);
  };

  const handleQuestionInput = (event: any) => {
    setNewQuestion(event.target.value);
  };

  const handleEditPost = () => {
    if (setEditPost && setEditedContent && setEditedLink && setEditedPostID) {
      setEditPost(true);
      setEditedContent(content);
      setEditedLink(link);
      setEditedPostID(post_id);
    }
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
            user: userObj.name,
            post_id: post_id,
            isFAQ: true,
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
                  to={`/teacher/qas`}
                  style={{ textDecoration: "none" }}
                  onClick={() =>
                    sessionStorage.setItem("selectedPostID", post_id)
                  }
                >
                  <FaRegComments />
                </Link>
              </div>
              <div className="post-button">
                <FiEdit onClick={handleEditPost} />
              </div>
              <div className="post-button">
                <AiOutlineComment onClick={handleNewQuestionClick} />
              </div>
            </div>
          </div>

          {children ? children : <></>}
          {newQuestionClicked ? (
            <>
              <div className="announcement">
                <div className="forum-post-header">
                  <span className="forum-post-username">Add FAQ</span>
                  <span className="forum-post-date">{"20/03/2024"}</span>
                </div>
                <div className="announcement-content">
                  <div className="announcement-header">
                    <textarea
                      placeholder="Add answer to FAQ for this post..."
                      value={newQuestion}
                      onChange={handleQuestionInput}
                      className="new-question-input"
                      maxLength={500}
                    />
                    <input className="link-input" placeholder="Link" />
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
