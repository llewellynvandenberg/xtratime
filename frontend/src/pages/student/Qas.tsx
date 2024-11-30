import { useState, useEffect } from "react";
import Qas from "../../components/student/Qas";
import "../../styles/Global.css";
import SideNav from "../../components/student/SideNav";

// Define your user context
interface qasProps {
  time: EpochTimeStamp;
  link: string;
  question: string;
  answer?: string;
  student_name: string;
}

function StudentQasView() {
  const postID = sessionStorage.getItem("selectedPostID");
  const [qas, setQas] = useState<qasProps[]>([]);

  const getPostQas = async () => {
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

      console.log("qas data", result.postQas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPostQas().then(() => {
      console.log("Qas fetched");
    });
  }, []);
  console.log("qas", qas);
  return (
    <>
      <SideNav 
        title="Q and A's" 
        view="student"
        action={() => {}}
      />

      <div className="shifted">
        <br />
        {qas &&
          qas.map((qa, index) => {
            if (qa.answer) {
              return (
                <Qas
                  name={qa.student_name}
                  question={qa.question}
                  answer={qa.answer ? qa.answer : ""}
                  link={qa.link ? qa.link : ""}
                />
              );
            }
          })}
      </div>
    </>
  );
}
export default StudentQasView;
