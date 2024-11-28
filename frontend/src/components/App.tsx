import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import StudentHome from "../pages/student/Home";
import StudentClassView from "../pages/student/ClassView";

import StudentTopicView from "../pages/student/TopicView";
import StudentQasView from "../pages/student/Qas";

import JoinClass from "../pages/student/JoinClass";

import TeacherHome from "../pages/teacher/Home";

import TeacherTopicView from "../pages/teacher/TopicView";
import TeacherQasView from "../pages/teacher/Qas";
import TeacherClassView from "../pages/teacher/ClassView";

import NewClassView from "../pages/teacher/NewClass";
import NewTopicView from "../pages/teacher/NewTopic";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="body-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/student" element={<StudentHome />} />
            <Route path="/student/topics" element={<StudentClassView />} />
            <Route path="/student/posts" element={<StudentTopicView />} />
            <Route path="/student/qas" element={<StudentQasView />} />
            <Route path="/student/join-class" element={<JoinClass />} />
            <Route path="/teacher" element={<TeacherHome />} />
            <Route path="/teacher/topics" element={<TeacherClassView />} />
            <Route path="/teacher/posts" element={<TeacherTopicView />} />
            <Route path="/teacher/qas" element={<TeacherQasView />} />
            <Route path="/teacher/new-class" element={<NewClassView />} />
            <Route path="/teacher/new-topic" element={<NewTopicView />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
