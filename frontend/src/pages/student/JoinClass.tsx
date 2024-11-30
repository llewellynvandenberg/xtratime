import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "../../styles/students/JoinClass.module.css";
import SideNav from "../../components/student/SideNav";
import Card from "../../components/Card";

const JoinClass = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [classOptions, setClassOptions] = useState<any[]>([]);

  const [teacherOptions, setTeacherOptions] = useState<any[]>([]);

  const gradeOptions = [
    { label: "Grade 8", value: "8" },
    { label: "Grade 9", value: "9" },
    { label: "Grade 10", value: "10" },
    { label: "Grade 11", value: "11" },
    { label: "Grade 12", value: "12" },
    { label: "All Grades", value: "all" },
  ];

  const subjectOptions = [
    { label: "Maths", value: "maths" },
    { label: "Geography", value: "geography" },
    { label: "Physical Sciences", value: "physical_sciences" },
    { label: "English", value: "english" },
    { label: "Afrikaans", value: "afrikaans" },
    { label: "Economics", value: "economics" },
    { label: "All Subjects", value: "all" },
  ];

  const searchClasses = async () => {
    try {
      const response = await fetch("http://localhost:3001/searchClasses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacher: selectedTeacher, // teacher id
          grade: selectedGrade, // grade numeric
          subject: selectedSubject, // subject id
          school: sessionStorage.getItem("school_code"),
        }),
      });
      const result = await response.json();
      //const = classOptions

      setClassOptions(result.classes);
      console.log("classes data", result.classes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTeachers = async () => {
    try {
      const response = await fetch("http://localhost:3001/getTeachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          school_code: sessionStorage.getItem("school_code"),
        }),
      });
      const result = await response.json();

      const teacherOptions = result.teachers.map((teacher: any) => ({
        value: teacher._id,
        label: `${teacher.name} ${teacher.surname}`,
      }));

      setTeacherOptions(teacherOptions);

      console.log("teachers data", result.teachers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const handleSearchClick = () => {
    searchClasses();
    console.log(selectedTeacher, selectedGrade, selectedSubject);
  };

  return (
    <>
      <SideNav 
        title="Join a Class" 
        view="student"
        action={() => "join"}
      />
      <div className={`shifted ${styles.page_content}`}>
        <div className={styles.search_section}>
          <br />
          <h2>Search by Teacher Name</h2>
          <Select
            options={teacherOptions}
            onChange={(e) => setSelectedTeacher(e?.value)}
            placeholder="Select a Teacher"
          />
          <br />
          <h2>Search by Subject</h2>
          <Select
            options={subjectOptions}
            onChange={(e) => setSelectedSubject(e?.value)}
            placeholder="Select a Subject"
          />
          <br />
          <h2>Search by Grade</h2>
          <Select
            options={gradeOptions}
            onChange={(e) => setSelectedGrade(e?.value)}
            placeholder="Select grade"
          />
          <button
            className={`btn btn-light ${styles.btn}`}
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {classOptions.map(
                (
                  classroom: {
                    class_name: string;
                    teacher: string;
                    id: string;
                    subject: string;
                    grade: string;
                  },
                  index: number
                ) => (
                  <div className="col-md-4" key={index}>
                    <Card title={classroom.class_name} classN="classroom-card">
                      <p>{classroom.teacher}</p>
                      <p>
                        {classroom.subject[0].toUpperCase() +
                          classroom.subject.slice(1)}
                      </p>
                      <p>Grade {classroom.grade}</p>
                    </Card>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinClass;
