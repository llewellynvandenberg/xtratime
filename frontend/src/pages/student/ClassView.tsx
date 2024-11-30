import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card";
import "../../styles/Global.css";
import SideNav from "../../components/student/SideNav";

// Define your user context
interface classDataProps {
  class_name: string;
  topics: Array<object>;
  teacher: string;
}

function StudentClassView() {
  const classID = sessionStorage.getItem("selectedClassID");
  const [classData, setClassData] = useState<classDataProps | null>(null);

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
        action={() => {}}
      />
      <div className="shifted">
        {classData !== null && (
          <>
            <div className="row">
              {classData.topics ? (
                classData.topics.map((topic: any, index: number) => (
                  <>
                    <div className="col-md-4" key={index}>
                      <Link
                        to={`/student/posts`}
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          sessionStorage.setItem("selectedTopicID", topic.id);
                        }}
                      >
                        <Card title={topic.name} classN={""}>
                          <p>{topic.description}</p>
                        </Card>
                      </Link>
                    </div>
                  </>
                ))
              ) : (
                <div>No topics found</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default StudentClassView;
