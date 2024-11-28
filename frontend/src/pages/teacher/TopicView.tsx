import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Qas from "../../components/teacher/Qas";
import Post from "../../components/teacher/Post";
import "../../styles/NewPost.css";
import "../../styles/TopicView.css";
import SideNav from "../../components/student/SideNav";
import { useNavigate } from "react-router-dom";

// Define your user context
interface topicsDataProps {
  time: EpochTimeStamp;
  link: string;
  content: string;
}

interface postDataProps {
  _id: string;
  time: EpochTimeStamp;
  content: string;
  topic_code: string;
  link?: string;
  qas?: {
    _id: string;
    student_name: string;
    question: string;
    answer: string;
    pinned?: boolean;
    link?: string;
  };
}

function TeacherTopicView() {
  const topicID = sessionStorage.getItem("selectedTopicID");
  const classID = sessionStorage.getItem("selectedClassID");
  const [posts, setPosts] = useState<postDataProps[]>([]);
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const [editPost, setEditPost] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedLink, setEditedLink] = useState("");

  const navigate = useNavigate();

  const createPost = async () => {
    try {
      const response = await fetch("http://localhost:3001/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          link: link,
          topic_id: topicID,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlenCreatePost = () => {
    createPost().then(() => {
      setContent("");
      setLink("");
      fetchPosts();
    });
  };

  const deleteTopic = async () => {
    try {
      const response = await fetch("http://localhost:3001/deleteTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: classID,
          topic_id: topicID,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteTopic = () => {
    deleteTopic();
    sessionStorage.setItem("selectedTopicID", "");
    navigate("/teacher/topics");
  };

  const updatePost = async () => {
    try {
      const response = await fetch("http://localhost:3001/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
          link: editedLink,
          post_id: selectedPostID,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdatePost = () => {
    updatePost().then(() => {
      console.log("Post updated");
      setEditPost(false);
      setEditedContent("");
      setEditedLink("");
      setSelectedPostID("");
      fetchPosts();
    });
  };

  const deletePost = async () => {
    try {
      const response = await fetch("http://localhost:3001/deletePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: selectedPostID,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeletePost = async () => {
    deletePost().then(() => {
      setEditPost(false);
      setEditedContent("");
      setEditedLink("");
      setSelectedPostID("");
      fetchPosts();
    });
  };

  const handleCancelEditPost = () => {
    setEditPost(false);
    setEditedContent("");
    setEditedLink("");
    setSelectedPostID("");
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/topicPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: topicID }),
      });
      const result = await response.json();
      setPosts(result.topicPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <SideNav title="Posts" view="topic" action={handleDeleteTopic} />
      <div className="row shifted topic-body">
        <div className="col-md-6">
          {posts &&
            posts
              .slice()
              .reverse()
              .map((post, index) => (
                <>
                  <Post
                    content={post.content}
                    link={post.link ? post.link : ""}
                    post_id={post._id}
                    setEditPost={setEditPost}
                    setEditedContent={setEditedContent}
                    setEditedLink={setEditedLink}
                    setEditedPostID={setSelectedPostID}
                  >
                    {post.qas && (
                      <>
                        <Link
                          to={`/teacher/qas`}
                          style={{ textDecoration: "none" }}
                          onClick={() =>
                            sessionStorage.setItem("selectedPostID", post._id)
                          }
                        >
                          <Qas
                            qas_id={post.qas._id}
                            name={post.qas.student_name}
                            question={post.qas.question}
                            answer={post.qas.answer}
                            link={post.qas.link ? post.qas.link : ""}
                            replieable={false}
                          />
                        </Link>
                      </>
                    )}
                  </Post>
                </>
              ))}
        </div>
        <div className="col-md-6">
          <div className="post">
            <div className="post-content">
              <div className="post-header">
                {editPost ? (
                  <>
                    <h6>Edit Post</h6>
                    <textarea
                      placeholder="Content"
                      className="new-post-content-input"
                      value={editedContent}
                      onChange={(event) => setEditedContent(event.target.value)}
                    />
                    <br />
                    <input
                      placeholder="Link"
                      className="link-input"
                      value={editedLink}
                      onChange={(event) => setEditedLink(event.target.value)}
                    />
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <button
                          onClick={handleUpdatePost}
                          type="button"
                          className="btn btn-primary"
                        >
                          Submit Update
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          onClick={handleDeletePost}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete Post
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          onClick={handleCancelEditPost}
                          type="button"
                          className="btn btn-warning"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h6>Add new post</h6>
                    <textarea
                      placeholder="Content"
                      className="new-post-content-input"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                    <br />
                    <input
                      placeholder="Link"
                      className="link-input"
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                    />
                    <br />
                    <button
                      onClick={handlenCreatePost}
                      type="button"
                      className="btn btn-light"
                    >
                      Submit Post
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherTopicView;
