import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import SideNav from "../../components/student/SideNav";
import { useNavigate } from "react-router-dom";

// Define your user context
interface classDataProps {
  class_name: string;
  topics: Array<object>;
  teacher: string;
}

function TeacherClassView() {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const userObj = JSON.parse(storedUser as string);

  const classID = sessionStorage.getItem("selectedClassID");
  const [classData, setClassData] = useState<classDataProps | null>(null);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:3001/classInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: classID }),
      });
      const result = await response.json();
      setClassData(result.classInfo);

      console.log("classrooms data", result.classInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteClass = async () => {
    try {
      const response = await fetch("http://localhost:3001/deleteClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class_id: classID, teacher_id: userObj._id }),
      });
      const result = await response.json();
      setClassData(result.classInfo);

      console.log("classrooms data", result.classInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handelDeleteClass = () => {
    deleteClass();
    navigate("/teacher");
  };

  useEffect(() => {
    fetchClasses().then(() => {
      console.log("Classroom info fetched");
    });
  }, []);

  return (
    <>
      <SideNav
        title={classData ? classData.class_name : ""}
        view="class"
        action={handelDeleteClass}
        backLink="/teacher"
      />
      {classData !== null && (
        <>
          <div className="row shifted">
            {classData.topics &&
              classData.topics.map((topic: any, index: number) => (
                <>
                  <div className="col-md-4" key={index}>
                    <Link
                      to={`/teacher/posts`}
                      style={{ textDecoration: "none" }}
                      onClick={() =>
                        sessionStorage.setItem("selectedTopicID", topic.id)
                      }
                    >
                      <Card title={topic.name} classN={""}>
                        <p>{topic.description}</p>
                      </Card>
                    </Link>
                  </div>
                </>
              ))}
            <div className="col-md-4">
              <Link
                to={`/teacher/new-topic`}
                style={{ textDecoration: "none" }}
              >
                <Card title={"New Topic"} classN={""}>
                  <p>Create a new topic</p>
                </Card>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default TeacherClassView;
