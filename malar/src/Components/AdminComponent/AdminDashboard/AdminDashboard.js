import style from "./AdminDashboard.module.css";

import { useNavigate } from "react-router-dom";

import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

import pic4 from "../../../images/logo.png";

import Dashboard from "./Dashboard/Dashboard";
import Subject from "./SubjectComponent/Subject";
import Exam from "./ExamComponent/Exam";
import Question from "./QuestionComponent/Question";
import Result from "./ResultComponent/Result";
import StudentList from "./StudentList/StudentList";
import Student from "./StudentList/Student/Student";

import Details from "./ExamComponent/DetailComponent/Details";
import ViewQuestion from "./ExamComponent/ViewQuestion/ViewQuestion";
import AddQuestion from "./ExamComponent/AddQuestion/AddQuestion";

function AdminDashboard() {
  // let history = useNavigate();

  // function goToAdminLogin() {
  //     history("/AdminLogin");
  // }

  return (
    <>
      <BrowserRouter>
        <div>
          <div>
            <h3>Online Exam System</h3>
          </div>
        </div>

        <div className="">
          <div className="d-flex justify-content-center">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid d-md-flex justify-content-center d-sm-block mw-100 mt-1 position-sticky ">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="d-flex justify-content-center">
                  <ul className="navbar-nav d-sm-block d-md-flex position-relative mw-100">
                    <Link exact to="/AdminDashboard/Subject">
                      <li className="nav-item">
                        {" "}
                        <span className="nav-link ">Topic </span>
                      </li>
                    </Link>
                    <Link exact to="/AdminDashboard/Exam">
                      <li className="nav-item">
                        {" "}
                        <span className="nav-link ">Exam </span>
                      </li>
                    </Link>
                    <Link exact to="/AdminDashboard/Question">
                      <li className="nav-item">
                        {" "}
                        <span className="nav-link "> Question </span>
                      </li>
                    </Link>
                    <Link exact to="/AdminDashboard/Result">
                      <li className="nav-item">
                        {" "}
                        <span className="nav-link ">Result </span>
                      </li>
                    </Link>
                    <Link exact to="/AdminDashboard/StudentList">
                      <li className="nav-item">
                        {" "}
                        <span className="nav-link ">StudentList </span>
                      </li>
                    </Link>

                    <Link exact to="/AdminDashboard">
                      <li className="nav-item flex-column-reverse">
                        {" "}
                        <span className="nav-link"> Dashboard</span>{" "}
                      </li>
                    </Link>
                    <li className="nav-item flex-column-reverse">
                      <a>
                        {" "}
                        <span className="nav-link"> Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
                </div>
            </nav>
          </div>

          <div className="hide-sm pt-3">
            <Routes>
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route
                exact
                path="/AdminDashboard"
                element={<Dashboard />}
              ></Route>

              <Route
                exact
                path="/AdminDashboard/Subject"
                element={<Subject />}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Exam"
                element={<Exam />}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Question"
                element={<Question />}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Result"
                element={<Result />}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/StudentList"
                element={<StudentList />}
              ></Route>

              <Route
                exact
                path="/AdminDashboard/Exam/Details/:id"
                element={<Details />}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Exam/ViewQuestion/:id"
                element={<ViewQuestion />}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Exam/AddQuestion/:id/:total"
                element={<AddQuestion />}
              ></Route>

              <Route
                exact
                path="/AdminDashboard/StudentList/Details/:id/:total"
                element={<Student />}
              ></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default AdminDashboard;
