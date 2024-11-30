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
  title: string;
  time: EpochTimeStamp;
  content: string;
  topic_code: string;
  link?: string;
  isTodo: boolean;
  deadline?: Date;
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isTodo, setIsTodo] = useState(false);
  const [deadline, setDeadline] = useState<Date>();

  const [title, setTitle] = useState("");

  const createPost = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          link: link,
          topic_id: topicID,
          isTodo: isTodo,
          deadline: deadline,
        }),
      });
      const result = await response.json();
      setMessage("Post created successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    createPost().then(() => {
      setContent("");
      setLink("");
      setTitle("");
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
          title: title,
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

  // Update the edit post section
  const editPostSection = (
    <div className="edit-post-container">
      <div className="edit-post-header">
        <h2>Edit Post</h2>
        <button
          onClick={handleCancelEditPost}
          className="close-edit-btn"
          title="Cancel"
        >
          ×
        </button>
      </div>
      <div className="edit-post-content">
        <div className="input-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Post content"
            className="edit-post-input"
            value={editedContent}
            onChange={(event) => setEditedContent(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="link">Link (optional)</label>
          <input
            id="link"
            type="text"
            placeholder="Add a link"
            className="edit-post-input"
            value={editedLink}
            onChange={(event) => setEditedLink(event.target.value)}
          />
        </div>
      </div>
      <div className="edit-post-actions">
        <button
          onClick={handleUpdatePost}
          className="btn-update"
          disabled={!editedContent.trim()}
        >
          Update Post
        </button>
        <button
          onClick={handleDeletePost}
          className="btn-delete"
        >
          Delete Post
        </button>
      </div>
    </div>
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    setDeadline(localDate);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <SideNav 
        title="Posts" 
        view="topic" 
        action={handleDeleteTopic} 
        onBack={handleBack} 
      />
      <div className="topic-body">
        <div className="topic-content">
          <div className="row">
            <div className="col-md-6">
              <div className="section-header">
                <h2>Recent Posts</h2>
                <span className="post-count">{posts.length} posts</span>
              </div>
              
              {posts.length === 0 ? (
                <div className="empty-state">
                  <p>No posts yet. Create your first post!</p>
                </div>
              ) : (
                posts.slice().reverse().map((post) => (
                  <Post
                    key={post._id}
                    title={post.title}
                    content={post.content}
                    link={post.link || ""}
                    post_id={post._id}
                    isTodo={post.isTodo}
                    deadline={post.deadline}
                    setEditPost={setEditPost}
                    setEditedContent={setEditedContent}
                    setEditedLink={setEditedLink}
                    setEditedPostID={setSelectedPostID}
                  >
                    {post.qas && (
                      <Link
                        to={`/teacher/qas`}
                        style={{ textDecoration: 'none' }}
                        onClick={() => sessionStorage.setItem("selectedPostID", post._id)}
                      >
                        <Qas
                          qas_id={post.qas._id}
                          name={post.qas.student_name}
                          question={post.qas.question}
                          answer={post.qas.answer}
                          link={post.qas.link || ""}
                          replieable={false}
                          timestamp={new Date(post.time)}
                        />
                      </Link>
                    )}
                  </Post>
                ))
              )}
            </div>

            <div className="col-md-6">
              <div className="section-header">
                <h2>{editPost ? 'Edit Post' : 'Create New Post'}</h2>
              </div>
              
              {editPost ? (
                editPostSection
              ) : (
                <div className="post create-post">
                  <div className="post-content">
                    <input
                      placeholder="Post title"
                      className="new-post-title-input"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                      placeholder="What would you like to share?"
                      className="new-post-content-input"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                    <div className="input-group">
                      <input
                        placeholder="Add a link (optional)"
                        className="link-input"
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
                      />
                    </div>
                    
                    <div className="todo-section">
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          id="isTodo"
                          checked={isTodo}
                          onChange={(e) => setIsTodo(e.target.checked)}
                        />
                        <label htmlFor="isTodo">Make this a todo</label>
                      </div>
                      
                      {isTodo && (
                        <div className="deadline-picker">
                          <label>Deadline:</label>
                          <input
                            type="date"
                            value={deadline ? deadline.toISOString().split('T')[0] : ''}
                            onChange={handleDateChange}
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div className="post-actions">
                      <button
                        onClick={handleCreatePost}
                        type="button"
                        className="submit-btn"
                        disabled={loading || !content.trim() || (isTodo && !deadline)}
                      >
                        {loading ? (
                          <span className="loading-spinner">Submitting...</span>
                        ) : (
                          'Create Post'
                        )}
                      </button>
                    </div>
                    {message && (
                      <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                        {message}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherTopicView;
