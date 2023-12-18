import style from "./Dashboard.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [exam, setExam] = useState([{}]);
  const [question, setQuestion] = useState("Updating...");
  const [user, setUser] = useState("Updating...");

  useEffect(() => {
    async function getAllExam() {
      let value = await axios.get("http://localhost:3333/exam");
      setExam(value.data);
    }
    getAllExam();

    async function getAllQuestions() {
      let value = await axios.get("http://localhost:3333/question");
      setQuestion("We have total " + value.data.length + " question");
    }
    getAllQuestions();

    async function getAllUsers() {
      let value = await axios.get("http://localhost:3333/user");
      setUser("We have total " + value.data.length + " user");
    }
    getAllUsers();
  }, []);

  let history = useNavigate();

  function showExam() {
    history("/AdminDashboard/Exam");
  }

  function showQuestions() {
    history("/AdminDashboard/Question");
  }

  function showUsers() {
    history("/AdminDashboard/StudentList");
  }

  return (
    <>
      {/* <div id={style.displayHeadingBox}>
        
      </div> */}
      <h1 align="center">Exam View</h1>
      <div className="m-5">
        {/* <p id={style.countOfExam}>{exam}</p> */}
        <div className="container d-flex justify-content-center">
          <div className="d-flex justify-content-around">
            {exam.map((data, i) => {
              return (
                <div
                  key={i}
                  className="col-md-3 border p-4 m-4 border border-dark d-flex justify-content-center"
                >
                  <div className="row">
                    <p className="fw-bolder">{data.exam_name}</p>
                    <p className="fst-italic">{data.exam_date}</p>
                    <div className="mt-3 d-flex justify-content-center">
                      <button className="fw-bold border p-3 border border-secondary text-light" style={{backgroundColor:"#00204a"}}>
                        View Exam
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

// align-items-center
