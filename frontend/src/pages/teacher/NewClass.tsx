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
    if (!event) return;
    
    if (addedStudents.some(student => student.id === event.value)) {
      return;
    }
    
    const newStudent = {
      fullname: event.label,
      id: event.value,
    };
    
    setAddedStudents([...addedStudents, newStudent]);
    setStudentsOptions(prevOptions => 
      prevOptions.filter(student => student.value !== event.value)
    );
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

  const handleRemoveStudent = (studentToRemove: studentProps) => {
    setAddedStudents(prevStudents => 
      prevStudents.filter(student => student.id !== studentToRemove.id)
    );
    
    if (!studentsOptions.some(option => option.value === studentToRemove.id)) {
      setStudentsOptions(prevOptions => [
        ...prevOptions,
        { value: studentToRemove.id, label: studentToRemove.fullname }
      ]);
    }
  };

  useEffect(() => {
    fetchStudentOptions();
  }, []);

  return (
    <>
      <SideNav 
        title="New class" 
        view="teacher"
        action={() => {}}
      />
      <main style={{ marginLeft: "250px", paddingTop: "2rem" }}>
        <div className={styles.container}>
          <div className={styles.formSection}>
            <div className={styles.header}>
              <h1>Create New Class</h1>
              <p>Fill in the details below to create a new class</p>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Class Name</label>
              <input
                placeholder="Enter class name"
                value={className}
                onChange={handleClassNameChange}
                className={styles.name}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Grade Level</label>
              <Select
                options={gradeOptions}
                onChange={(e) => setSelectedGrade(e?.value || "")}
                placeholder="Select grade"
                className={styles.select}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Subject</label>
              <Select
                options={subjectOptions}
                onChange={(e) => setSelectedSubject(e?.value || "")}
                placeholder="Select subject"
                className={styles.select}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Add Students</label>
              <Select
                options={studentsOptions}
                onChange={handleStudentChange}
                placeholder="Select student"
                className={styles.select}
                value={null}
              />
            </div>

            {addedStudents.length > 0 && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>Added Students</label>
                <div className={styles.studentsList}>
                  {addedStudents.map((student: studentProps) => (
                    <div key={student.id} className={styles.studentItem}>
                      <span>{student.fullname}</span>
                      <button 
                        onClick={() => handleRemoveStudent(student)}
                        className={styles.removeBtn}
                        type="button"
                        aria-label={`Remove ${student.fullname}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleCreateClass}
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Create Class
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewClassView;
