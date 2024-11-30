import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Qas from "../../components/student/Qas";
import Post from "../../components/student/Post";
import "../../styles/Global.css";
import SideNav from "../../components/student/SideNav";

interface postDataProps {
  _id: string;
  time: EpochTimeStamp;
  content: string;
  topic_code: string;
  link?: string;
  qas?: {
    student_name: string;
    question: string;
    answer: string;
    pinned?: boolean;
    link?: string;
  };
}

function StudentTopicView() {
  const topicID = sessionStorage.getItem("selectedTopicID");
  const [posts, setPosts] = useState<postDataProps[]>([]);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:3001/topicPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: topicID }),
      });
      const result = await response.json();
      console.log(topicID);
      setPosts(result.topicPosts);
      console.log("topics ", result.topicPosts);

      console.log("classrooms data", result.topicInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchClasses().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  return (
    <>
      <SideNav 
        title="Posts" 
        view="posts"
        action={() => {}}
      />
      <div className="shifted">
        <br />
        {posts ? (
          posts
            .slice()
            .reverse()
            .map((post, index) => (
              <>
                <Post
                  content={post.content}
                  link={post.link ? post.link : ""}
                  post_id={post._id}
                >
                  {post.qas && (
                    <>
                      <Link
                        to={`/student/qas`}
                        style={{ textDecoration: "none" }}
                        onClick={() =>
                          sessionStorage.setItem("selectedPostID", post._id)
                        }
                      >
                        <Qas
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
            ))
        ) : (
          <div>No posts yet</div>
        )}
      </div>
    </>
  );
}
export default StudentTopicView;
