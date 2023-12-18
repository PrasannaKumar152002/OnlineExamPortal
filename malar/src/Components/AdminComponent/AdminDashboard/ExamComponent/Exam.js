import { useState, useEffect } from "react";
import axios from "axios";

import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

import Table from "react-bootstrap/Table";
import ExamTopicMapping from "./ExamTopicMapping/ExamTopicMapping";

function Exam({ total }) {
  //  ---------------------- add Exam & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleAddExam() {
    setDisplay({ display: "block" });
  }

  function handleCloseExam(e) {
    e.preventDefault();
    setDisplay({ display: "none" });
  }

  // --------------- Fetching all Exam from db.json file-------------------------

  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExam();
  }, []);

  // --------------------Adding Exam And re-render Exam component-----------------

  const fetchExam = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchExamMasterEvent",
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.ExamMaster;
      setExams([...list]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(exams);
  var date = new Date();
  var d =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [exam, setExam] = useState({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: d + " " + t,
  });

  // function handleInput(e) {
  //   setExam({
  //     ...exam,
  //     [e.target.name]: e.target.value,
  //   });
  //   //  console.log(exam);
  // }

  // async function handleAddNewExam() {
  //   await axios.post("http://localhost:3333/Exam", exam);
  //   setStatus(true);
  // }

  // const [status, setStatus] = useState();

  // ----------------------------Deleting Exam-----------------------------------------------

  const [questions, setQuestions] = useState([]);

  useEffect(() => {}, []);

  const [statusDeleteExam, setStatusDeleteExam] = useState();

  // async function deleteExam(id) {
  //    console.log(id);

  //   for (let i = 0; i < questions.length; i++) {
  //     if (parseInt(questions[i].exam_id) === parseInt(id)) {
  //       // console.log(questions[i].id);
  //       await axios.delete(`http://localhost:3333/question/${questions[i].id}`);
  //     }
  //   }
  //   await axios.delete(`http://localhost:3333/exam/${id}`);
  //   setStatusDeleteExam(true);
  // }

  // if (status) return <Exam total={exam.exam_totalQuestion} />;

  // if (statusDeleteExam) return <Exam />;

  const submitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("exam");
    const formData = new FormData(form);
    const data_map = {
      // examId: formData.get("examId"),
      examName: formData.get("examName"),
      description: formData.get("description"),
      creationDate: formData.get("creationDate"),
      expirationDate: formData.get("expirationDate"),
      noOfQuestions: formData.get("noOfQuestions"),
      durationMinutes: formData.get("durationMinutes"),
      passPercentage: formData.get("passPercentage"),
      questionsRandomized: formData.get("questionsRandomized"),
      answersMust: formData.get("answersMust"),
      enableNegativeMark: formData.get("enableNegativeMark"),
      negativeMarkValue: formData.get("negativeMarkValue"),
    };
    if (data_map.examName === "") {
      document.getElementById("examnameerr").style.display = "block";
    } else {
      document.getElementById("examnameerr").style.display = "none";
    }
    if (data_map.description === "") {
      document.getElementById("descriptionerr").style.display = "block";
    } else {
      document.getElementById("descriptionerr").style.display = "none";
    }
    if (data_map.creationDate === "") {
      document.getElementById("creationdateerr").style.display = "block";
    } else {
      document.getElementById("creationdateerr").style.display = "none";
    }
    if (data_map.expirationDate === "") {
      document.getElementById("expirationdateerr").style.display = "block";
    } else {
      document.getElementById("expirationdateerr").style.display = "none";
    }
    if (data_map.noOfQuestions === "") {
      document.getElementById("noofquestionserr").style.display = "block";
    } else {
      document.getElementById("noofquestionserr").style.display = "none";
    }
    if (data_map.passPercentage === "") {
      document.getElementById("passpercentageerr").style.display = "block";
    } else {
      document.getElementById("passpercentageerr").style.display = "none";
    }
    if (data_map.questionsRandomized === "") {
      document.getElementById("questionsrandomizederr").style.display = "block";
    } else {
      document.getElementById("questionsrandomizederr").style.display = "none";
    }
    if (data_map.answersMust === "") {
      document.getElementById("answersmusterr").style.display = "block";
    } else {
      document.getElementById("answersmusterr").style.display = "none";
    }
    if (data_map.durationMinutes === "") {
      document.getElementById("durationminuteserr").style.display = "block";
    } else {
      document.getElementById("durationminuteserr").style.display = "none";
    }
    if (data_map.negativeMarkValue === "") {
      document.getElementById("negativemarkvalueerr").style.display = "block";
    } else {
      document.getElementById("negativemarkvalueerr").style.display = "none";
    }
    if (data_map.enableNegativeMark === "") {
      document.getElementById("enablenegativemarkerr").style.display = "block";
    } else {
      document.getElementById("enablenegativemarkerr").style.display = "none";
    }
    if (
      !(
        data_map.examName === "" ||
        data_map.description === "" ||
        data_map.creationDate === "" ||
        data_map.expirationDate === "" ||
        data_map.noOfQuestions === "" ||
        data_map.passPercentage === "" ||
        data_map.questionsRandomized === "" ||
        data_map.answersMust === "" ||
        data_map.durationMinutes === "" ||
        data_map.negativeMarkValue === "" ||
        data_map.enableNegativeMark === ""
      )
    ) {
      // FETCH
      fetch("https://localhost:8443/onlineexam/control/IExamMasterEvent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data_map),
      })
        .then((response) => {
          return response.json(); //  converts the response object to JSON to info
        })
        .then((fetch_data) => {
          console.log(fetch_data);
        });
    }
  };

  return (
    <>
      <div>
        <h2 align="center">Exam List</h2>
      </div>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Exam Desc</th>
              <th>Exam Name</th>
              <th>No Of Questions</th>
              <th>Duration Mins</th>
              <th>Created Time</th>
              <th>Expired Time</th>
              <th>Answers Must</th>
              <th>Questions Randomized</th>
              <th>Pass Percentage</th>
              <th>Enable Negative Mark</th>
              <th>Negative Mark</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => {
              return (
                <tr key={i}>
                  <td>{exam.examId}</td>
                  <td>{exam.description}</td>
                  <td>{exam.examName}</td>
                  <td>{exam.noOfQuestions}</td>
                  <td>{exam.durationMinutes}</td>
                  <td>{exam.creationDate}</td>
                  <td>{exam.expirationDate}</td>
                  <td>{exam.answersMust}</td>
                  <td>{exam.questionsRandomized}</td>
                  <td>{exam.passPercentage}</td>
                  <td>{exam.enableNegativeMark}</td>
                  <td>{exam.negativeMarkValue}</td>
                  <td>
                    {/* <Link exact to={`/AdminDashboard/Exam/Details/${data.id}`}>
                      <button>Details</button>
                    </Link> */}

                    {/* <Link exact to={`/AdminDashboard/Exam/ViewQuestion/${data.id}/${total}`}>
                                                 <button>View Question</button>  
                                               </Link> 

                                             <Link exact to={`/AdminDashboard/Exam/AddQuestion/${data.id}/${total}`}>
                                                 <button>Add Question</button>  
                                               </Link>  */}

                    <button
                    // onClick={() => deleteExam(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="text-center">
        <button
          onClick={handleAddExam}
          style={{ fontWeight: "bolder" }}
          className="border border-success rounded-pill p-3 mt-4 mb-2 bg-success text-white"
        >
          Add Exam
        </button>

        <Link
          exact
          to="/ExamComponent/ExamTopicMapping"
          style={{ textDecoration: "none", fontWeight: "bolder" }}
          className="border border-success ms-3 rounded-pill p-3 mt-4 mb-2 bg-success text-white"
        >
          Create QuestionPaper
        </Link>
      </div>
      <div style={display}>
        <div className="d-flex align-items-center justify-content-center min-vh-100 text-black">
          <form
            onSubmit={submitHandler}
            className="rounded-1 row mt-3 p-5 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "rgb(203, 195, 227)" }}
            id="exam"
          >
            <div className="container">
              <div className="row">
                {/* <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="examId"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Exam ID
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="examId"
                      className="form-control mx-sm-5"
                    />
                  </div>
                </div> */}
                <div className="col-6 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="description"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Description
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="description"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="descriptionerr"
                    >
                      Please Enter Description
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="examName"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Exam Name
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="examName"
                      className="form-control mx-sm-5"
                    />
                    <div className="invalid-feedback mx-sm-5" id="examnameerr">
                      Please Enter Exam Name
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="creationDate"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Creation Date
                  </label>
                  <div className="col col-sm-7">
                    <input
                      type="datetime-local"
                      name="creationDate"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="creationdateerr"
                    >
                      Please Choose Creation Date
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="expirationDate"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Expiration Date
                  </label>
                  <div className="col col-sm-7">
                    <input
                      type="datetime-local"
                      name="expirationDate"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="expirationdateerr"
                    >
                      Please Choose Expiration Date
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="noOfQuestions"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    No Of Questions
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="noOfQuestions"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="noofquestionserr"
                    >
                      Please Enter No Of Questions
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="durationMinutes"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Duration Minutes
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="durationMinutes"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="durationminuteserr"
                    >
                      Please Enter Duration Minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="passPercentage"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Pass Percentage
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="passPercentage"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="passpercentageerr"
                    >
                      Please Enter Pass Percentage
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="questionsRandomized"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Questions Randomized
                  </label>
                  <div className="col-auto">
                    {/* <input
                      type="text"
                      name="questionsRandomized"
                      className="form-control mx-sm-5"
                    /> */}
                    <div className="form-check form-check-inline mx-sm-5">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="questionsRandomized"
                        id="option1"
                        value="y"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="questionsRandomized"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline mx-sm-5">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="questionsRandomized"
                        id="option2"
                        value="n"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="questionsRandomized"
                      >
                        No
                      </label>
                      <div
                        className="invalid-feedback mx-sm-5"
                        id="questionsrandomizederr"
                      >
                        Please Choose Questions Randomized
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row"></div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="enableNegativeMark"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Enable Negative Mark
                  </label>
                  <div className="col-auto">
                    <div className="col-auto">
                      <div className="form-check form-check-inline mx-sm-5">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="enableNegativeMark"
                          id="option1"
                          value="y"
                          defaultChecked
                        />
                        <div
                          className="invalid-feedback mx-sm-5"
                          id="enablenegativemarkerr"
                        >
                          Please Choose Negative Mark
                        </div>
                        <label
                          className="form-check-label"
                          htmlFor="answersMust"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline mx-sm-5">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="enableNegativeMark"
                          id="option2"
                          value="n"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="answersMust"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="answersMust"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Answers Must
                  </label>
                  <div className="col-auto">
                    <div className="form-check form-check-inline mx-sm-5">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="answersMust"
                        id="option1"
                        value="y"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="answersMust">
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline mx-sm-5">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="answersMust"
                        id="option2"
                        value="n"
                      />
                      <label className="form-check-label" htmlFor="answersMust">
                        No
                      </label>
                    </div>
                    <div
                      className="invalid-feedback ms-5"
                      id="answersmusterr"
                      style={{ display: "none" }}
                    >
                      Please Choose Answers Must
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="negativeMarkValue"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Negative Mark Value
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="negativeMarkValue"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="negativemarkvalueerr"
                    >
                      Please Enter Negative Mark Value
                    </div>
                  </div>
                </div>
                <div className="row mx-auto d-flex" style={{ width: "300px" }}>
                  <input
                    type="submit"
                    name="submit"
                    value="CREATE"
                    className="col-6 border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
                    style={{ fontWeight: "bolder" }}
                  />
                  <input
                    type="button"
                    value="CLOSE"
                    className="col-6 border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
                    onClick={handleCloseExam}
                    style={{ fontWeight: "bolder" }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hide-sm pt-3"></div>
    </>
  );
}
Exam.defaultProps = {
  total: 0,
};

export default Exam;
