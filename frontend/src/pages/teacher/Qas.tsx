import { useState, useEffect } from "react";
import Qas from "../../components/teacher/Qas";
import SideNav from "../../components/student/SideNav";

interface QAItem {
  _id: string;
  student_id: string;
  student_name: string;
  question: string;
  answer?: string;
  link?: string;
  timestamp: Date;
  isFAQ?: boolean;
}

function TeacherQasView() {
  const postID = sessionStorage.getItem("selectedPostID");
  const [qas, setQas] = useState<QAItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQas = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/postQas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postID }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Q&As');
      }

      const data = await response.json();
      setQas(data.postQas);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Q&As');
      console.error("Error fetching Q&As:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQas();
  }, [postID]);

  if (isLoading) {
    return (
      <div className="qas-container">
        <SideNav 
          title="Q and A's" 
          view="teacher"
          action={() => {}}
        />
        <div className="qas-content shifted">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="qas-container">
        <SideNav 
          title="Q and A's" 
          view="teacher"
          action={() => {}}
        />
        <div className="qas-content shifted">
          <div className="error-message">
            {error}
            <button onClick={fetchQas} className="retry-button">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  const unansweredQAs = qas?.filter(qa => !qa.answer && !qa.isFAQ) || [];
  const answeredQAs = qas?.filter(qa => qa.answer || qa.isFAQ) || [];

  return (
    <div className="qas-container">
      <SideNav 
        title="Q and A's" 
        view="teacher"
        action={() => {}}
      />
      
      <div className="qas-content shifted">
        <div className="qas-column unanswered-column">
          <div className="qas-header unanswered-header">
            <h2>Unanswered Questions</h2>
            <span className="qas-count badge badge-warning">
              {unansweredQAs.length} pending
            </span>
          </div>
          <div className="qas-list">
            {unansweredQAs.map((qa) => (
              <Qas
                key={qa._id}
                qas_id={qa._id}
                name={qa.student_name}
                question={qa.question}
                timestamp={qa.timestamp}
                refresh={fetchQas}
                className="unanswered-qa"
              />
            ))}
          </div>
        </div>

        <div className="qas-column answered-column">
          <div className="qas-header answered-header">
            <h2>Answered Questions</h2>
            <span className="qas-count badge badge-success">
              {answeredQAs.length} resolved
            </span>
          </div>
          <div className="qas-list">
            {answeredQAs.map((qa) => (
              <Qas
                key={qa._id}
                qas_id={qa._id}
                name={qa.student_name}
                question={qa.question}
                answer={qa.answer}
                link={qa.link}
                timestamp={qa.timestamp}
                replieable={false}
                isFAQ={qa.isFAQ}
                refresh={fetchQas}
                className="answered-qa"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherQasView;
