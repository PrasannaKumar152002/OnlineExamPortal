//    import style from "./Question.module.css";
import Table from "react-bootstrap/Table";

// import axios from "axios";

import { useEffect, useState } from "react";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quesType, setQuesType] = useState("");
  const [topicChange, setTopicChange] = useState("");

  // const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchQuestions();
    fetchTopics();
  }, []);
  const fetchTopics = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchTopicMasterEvent",
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.TopicMaster;
      setTopics([...list]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(topics);

  const handleSelectQuesTypeChange = (e) => {
    setQuesType(e.target.value);
  };

  const handleSelectTopicChange = (e) => {
    setTopicChange(e.target.value);
  };

  // --------------------Adding Exam And re-render Exam component-----------------

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchQuestionMasterEvent",
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.QuestionMaster;
      setQuestions([...list]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(questions);

  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleAddQuestion() {
    setDisplay({ display: "block" });
  }

  function handleCloseQuestion(e) {
    e.preventDefault();
    setDisplay({ display: "none" });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("question");
    const formData = new FormData(form);
    const data_map = {
      questionDetail: formData.get("questionDetail"),
      optionA: formData.get("optionA"),
      optionB: formData.get("optionB"),
      optionC: formData.get("optionC"),
      optionD: formData.get("optionD"),
      optionE: formData.get("optionE"),
      answer: formData.get("answer"),
      numAnswers: formData.get("numAnswers"),
      questionType: formData.get("questionType"),
      difficultyLevel: formData.get("difficultyLevel"),
      answerValue: formData.get("answerValue"),
      topicId: formData.get("topicId"),
      negativeMarkValue: formData.get("negativeMarkValue"),
    };

    if (data_map.questionDetail === "") {
      document.getElementById("questiondetailerr").style.display = "block";
    } else {
      document.getElementById("questiondetailerr").style.display = "none";
    }
    if (data_map.optionA === "") {
      document.getElementById("optionaerr").style.display = "block";
    } else {
      document.getElementById("optionaerr").style.display = "none";
    }
    if (data_map.optionB === "") {
      document.getElementById("optionberr").style.display = "block";
    } else {
      document.getElementById("optionberr").style.display = "none";
    }
    if (data_map.optionC === "") {
      document.getElementById("optioncerr").style.display = "block";
    } else {
      document.getElementById("optioncerr").style.display = "none";
    }
    if (data_map.optionD === "") {
      document.getElementById("optionderr").style.display = "block";
    } else {
      document.getElementById("optionderr").style.display = "none";
    }
    if (data_map.optionE === "") {
      document.getElementById("optioneerr").style.display = "block";
    } else {
      document.getElementById("optioneerr").style.display = "none";
    }
    if (data_map.answer === "") {
      document.getElementById("answererr").style.display = "block";
    } else {
      document.getElementById("answererr").style.display = "none";
    }
    if (data_map.numAnswers === "") {
      document.getElementById("numanserr").style.display = "block";
    } else {
      document.getElementById("numanserr").style.display = "none";
    }
    if (data_map.questionType === "") {
      document.getElementById("questiontypeerr").style.display = "block";
    } else {
      document.getElementById("questiontypeerr").style.display = "none";
    }
    if (data_map.difficultyLevel === "") {
      document.getElementById("difficultylevelerr").style.display = "block";
    } else {
      document.getElementById("difficultylevelerr").style.display = "none";
    }
    if (data_map.answerValue === "") {
      document.getElementById("answervalueerr").style.display = "block";
    } else {
      document.getElementById("answervalueerr").style.display = "none";
    }
    if (data_map.topicId === "") {
      document.getElementById("topiciderr").style.display = "block";
    } else {
      document.getElementById("topiciderr").style.display = "none";
    }
    if (data_map.negativeMarkValue === "") {
      document.getElementById("negativemarkvalueeerr").style.display = "block";
    } else {
      document.getElementById("negativemarkvalueeerr").style.display = "none";
    }
    if (
      !(
        data_map.questionDetail === "" ||
        data_map.optionA === "" ||
        data_map.optionB === "" ||
        data_map.optionC === "" ||
        data_map.optionD === "" ||
        data_map.optionE === "" ||
        data_map.answer === "" ||
        data_map.numAnswers === "" ||
        data_map.questionType === "" ||
        data_map.difficultyLevel === "" ||
        data_map.answerValue === "" ||
        data_map.topicId === "" ||
        data_map.negativeMarkValue === ""
      )
    ) {
      try {
        // FETCH
        fetch(
          "https://localhost:8443/onlineexam/control/IQuestionMasterEvent",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data_map),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((fetch_data) => {
            console.log(fetch_data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div>
        <h2 align="center">Question List</h2>
        <form className="d-flex m-5" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Question ID</th>
              <th>Questions</th>
              <th>Topic ID</th>
              <th>Question Type</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>OptionE</th>
              <th>No.Of.Answers</th>
              <th>Difficulty Level</th>
              <th>Answer</th>
              <th>Negative Mark Value</th>
              <th>Answer Value</th>
              {/* <th scope="col">Subject Name</th> */}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, i) => {
              return (
                <tr key={i}>
                  <td>{question.questionId}</td>
                  <td>{question.questionDetail}</td>
                  <td>{question.topicId}</td>
                  <td>{question.questionType}</td>
                  <td>{question.optionA}</td>
                  <td>{question.optionB}</td>
                  <td>{question.optionC}</td>
                  <td>{question.optionD}</td>
                  <td>{question.optionE}</td>
                  <td>{question.numAnswers}</td>
                  <td>{question.difficultyLevel}</td>
                  <td>{question.answer}</td>
                  <td>{question.negativeMarkValue}</td>
                  <td>{question.answerValue}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="d-grid gap-2 col-3 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddQuestion}
            style={{ fontWeight: "bolder" }}
          >
            Add Question
          </button>
        </div>
      </div>
      <div style={display}>
        <div className="d-flex justify-content-center min-vh-2 text-black">
          <form
            onSubmit={submitHandler}
            className="min-vw-50 p-4 rounded-1"
            style={{ backgroundColor: "rgb(203, 195, 227)" }}
            id="question"
          >
            <div className="container">
              <div className="row">
                <div className="col-12 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="questionDetail"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Question Detail
                  </label>
                  <div className="col-12">
                    <textarea
                      name="questionDetail"
                      className="form-control"
                    ></textarea>
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="questiondetailerr"
                    >
                      Please Enter Question Detail
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="optionA"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Option A
                  </label>
                  <div className="col-auto">
                    <textarea
                      type="text"
                      name="optionA"
                      className="form-control mx-sm-5"
                    ></textarea>
                    <div className="invalid-feedback mx-sm-5" id="optionaerr">
                      Please Enter Option A
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 ms-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="optionB"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Option B
                  </label>
                  <div className="col-auto">
                    <textarea
                      type="text"
                      name="optionB"
                      className="form-control mx-sm-5"
                    ></textarea>
                    <div className="invalid-feedback mx-sm-5" id="optionberr">
                      Please Enter Option B
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="optionC"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Option C
                  </label>
                  <div className="col-auto">
                    <textarea
                      type="text"
                      name="optionC"
                      className="form-control mx-sm-5"
                    ></textarea>
                    <div className="invalid-feedback mx-sm-5" id="optioncerr">
                      Please Enter Option C
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 ms-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="optionD"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Option D
                  </label>
                  <div className="col-auto">
                    <textarea
                      type="text"
                      name="optionD"
                      className="form-control mx-sm-5"
                    ></textarea>
                    <div className="invalid-feedback mx-sm-5" id="optionderr">
                      Please Enter Option D
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="optionE"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Option E
                  </label>
                  <div className="col-auto">
                    <textarea
                      type="text"
                      name="optionE"
                      className="form-control mx-sm-5"
                    ></textarea>
                    <div className="invalid-feedback mx-sm-5" id="optioneerr">
                      Please Enter Option E
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 ms-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="answer"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Answer
                  </label>
                  <div className="col-auto">
                    <textarea
                      type="text"
                      name="answer"
                      className="form-control mx-sm-5"
                    ></textarea>
                    <div className="invalid-feedback mx-sm-5" id="answererr">
                      Please Enter Answer
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="numAnswers"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Num Of Answers
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="numAnswers"
                      className="form-control mx-sm-5"
                    />
                    <div className="invalid-feedback mx-sm-5" id="numanserr">
                      Please Enter Num Of Answers
                    </div>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="questionType"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Question Type
                  </label>
                  <div className="col col-sm-7">
                    <select
                      class="form-select form-select-sm form-control mx-sm-5"
                      aria-label=".form-select-sm example"
                      onChange={handleSelectQuesTypeChange}
                      value={quesType}
                    >
                      <option name="choose">Choose ONE</option>
                      {topics.map((topic) => {
                        return (
                          <option
                            key={topic.topicId}
                            label={topic.topicName}
                            value={topic.topicId}
                          >
                            {/* {exam.examName} */}
                          </option>
                        );
                      })}
                    </select>
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="questiontypeerr"
                    >
                      Please Enter Question Type
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="difficultyLevel"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Difficulty Level
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="difficultyLevel"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="difficultylevelerr"
                    >
                      Please Enter Difficulty Level
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 ms-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="answerValue"
                    className="col-sm-2 mt-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Answer Value
                  </label>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="answerValue"
                      className="form-control mx-sm-5"
                    />
                    <div
                      className="invalid-feedback mx-sm-5"
                      id="answervalueerr"
                    >
                      Please Enter Answer Value
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 row mt-3 d-flex align-items-center justify-content-center">
                  <label
                    htmlFor="topicId"
                    className="col-sm-2 mt-3"
                    style={{ fontWeight: "bolder" }}
                  >
                    Topic Id
                  </label>
                  <div className="col col-sm-7">
                    <select
                      class="form-select form-select-sm form-control mx-sm-5"
                      aria-label=".form-select-sm example"
                      onChange={handleSelectTopicChange}
                      value={topicChange}
                    >
                      <option name="choose">Choose ONE</option>
                      {topics.map((topic) => {
                        return (
                          <option
                            key={topic.topicId}
                            label={topic.topicName}
                            value={topic.topicId}
                          >
                            {/* {exam.examName} */}
                          </option>
                        );
                      })}
                    </select>
                    <div className="invalid-feedback mx-sm-5" id="topiciderr">
                      Please Enter Topic ID
                    </div>
                  </div>
                </div>
                <div className="col-6 row mt-3 ms-3 d-flex align-items-center justify-content-center">
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
                      id="negativemarkvalueeerr"
                    >
                      Please Enter Negative Mark Value
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mx-auto d-flex justify-content-between"
              style={{ width: "200px" }}
            >
              <input
                type="submit"
                name="submit"
                value="ADD"
                className="border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
                style={{ fontWeight: "bolder" }}
              />
              <button
                onClick={handleCloseQuestion}
                style={{ fontWeight: "bolder" }}
                className="border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Question;
