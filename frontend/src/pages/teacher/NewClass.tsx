import { useState, useEffect } from "react";

import Select from "react-select";

import "../../styles/students/Home.css";

import SideNav from "../../components/student/SideNav";
import styles from "../../styles/CreateClass.module.css";

interface studentOptionsProps {
  value: string;
  label: string;
}

interface studentProps {
  fullname: string;
  id: string;
}

const NewClassView = () => {
  const storedUser = sessionStorage.getItem("user")
    ? sessionStorage.getItem("user")
    : "";
  const user = JSON.parse(storedUser as string);
  const [className, setClassName] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedStudentID, setSelectedStudentID] = useState("");
  const [addedStudents, setAddedStudents] = useState<studentProps[]>([]);
  const [studentsOptions, setStudentsOptions] = useState<studentOptionsProps[]>(
    []
  );
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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

  const handleClassNameChange = (event: any) => {
    setClassName(event.target.value);
  };

  const handleStudentChange = (event: any) => {
    setSelectedStudentName(event.label);
    setSelectedStudentID(event.value);
  };

  const addStudent = () => {
    if (!selectedStudentID) {
      alert("Please select a student");
      return;
    }
    const newStudent = {
      fullname: selectedStudentName,
      id: selectedStudentID,
    };
    setAddedStudents([...addedStudents, newStudent]);
    setStudentsOptions(
      studentsOptions.filter((student) => student.value !== selectedStudentID)
    );
    setSelectedStudentID("");
    setSelectedStudentName("");
  };

  const createClass = async () => {
    if (!className) {
      alert("Please enter a class name");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/createClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_name: className,
          teacher: user.name + " " + user.surname,
          student_ids: addedStudents.map((student) => student.id),
          teacher_id: user._id,
          grade: selectedGrade,
          subject: selectedSubject,
        }),
      });
      const result = await response.json();
      console.log("students data", result.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStudentOptions = async () => {
    try {
      const response = await fetch("http://localhost:3001/getStudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ school_code: user.school_code }),
      });
      const result = await response.json();
      const studentOptions = result.students.map((student: any) => ({
        value: student._id,
        label: `${student.name} ${student.surname}`,
      }));
      setStudentsOptions(studentOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateClass = () => {
    createClass();
    fetchStudentOptions();
    setClassName("");
    setAddedStudents([]);
  };

  useEffect(() => {
    fetchStudentOptions();
  }, []);

  return (
    <>
      <SideNav title="New class" />
      <br />
      <div className="shifted">
        <input
          placeholder="Class name"
          value={className}
          onChange={handleClassNameChange}
          className={styles.name}
        />
        <Select
          options={gradeOptions}
          onChange={(e) => setSelectedGrade(e?.value || "")}
          placeholder="Select grade"
        />
        <Select
          options={subjectOptions}
          onChange={(e) => setSelectedSubject(e?.value || "")}
          placeholder="Select subject"
        />

        <Select
          options={studentsOptions}
          value={{ label: selectedStudentName, value: selectedStudentID }}
          onChange={handleStudentChange}
          className={styles.select}
        />
        <button
          onClick={addStudent}
          type="button"
          className={`btn btn-light ${styles.btn}`}
        >
          Add student
        </button>

        <div className="added_students_list">
          <hr style={{ width: "90%" }} />
          {addedStudents.map((student: studentProps, index: number) => (
            <div key={student.id}>
              <p>{student.fullname}</p>
              <hr style={{ width: "90%" }} />
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateClass}
          type="button"
          className={`btn btn-light ${styles.btn}`}
        >
          Create Class
        </button>
      </div>
    </>
  );
};

export default NewClassView;
