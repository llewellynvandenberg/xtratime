import { useState, useEffect } from "react";
import Qas from "../../components/teacher/Qas";
import SideNav from "../../components/student/SideNav";

// Define your user context
interface qasProps {
  _id: string;
  time: EpochTimeStamp;
  link: string;
  question: string;
  answer?: string;
  student_name: string;
  isFAQ?: boolean;
}

function TeacherQasView() {
  const postID = sessionStorage.getItem("selectedPostID");
  const [qas, setQas] = useState<qasProps[]>([]);

  const fetchQas = async () => {
    try {
      const response = await fetch("http://localhost:3001/postQas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postID?.toString() ?? "" }),
      });
      const result = await response.json();
      setQas(result.postQas);

      console.log("qas data", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchQas().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  return (
    <>
      <SideNav title="Q and A's" />

      <div className="row shifted">
        <div className="col-md-6">
          <h2 className="title">Unanswered</h2>
          {qas &&
            qas.map(
              (qa, index) =>
                !qa.answer &&
                !qa.isFAQ && (
                  <Qas
                    qas_id={qa._id}
                    name={qa.student_name}
                    question={qa.question}
                    answer={qa.answer}
                    link={qa.link ? qa.link : ""}
                    refresh={fetchQas}
                  ></Qas>
                )
            )}
        </div>
        <div className="col-md-6">
          <h2 className="title">Answered</h2>
          {qas &&
            qas.map(
              (qa, index) =>
                (qa.answer || qa.isFAQ) && (
                  <Qas
                    qas_id={qa._id}
                    name={qa.student_name}
                    question={qa.question}
                    answer={qa.answer}
                    link={qa.link ? qa.link : ""}
                    replieable={false}
                    isFAQ={qa.isFAQ}
                    refresh={fetchQas}
                  ></Qas>
                )
            )}
        </div>
      </div>
    </>
  );
}
export default TeacherQasView;
