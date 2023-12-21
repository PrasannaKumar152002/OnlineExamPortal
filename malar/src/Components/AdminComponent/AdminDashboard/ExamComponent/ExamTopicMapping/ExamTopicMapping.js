import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
export default function ExamTopicMapping() {
  const [topics, setTopics] = useState([]);
  const [exams, setExams] = useState([]);
  const [examTopic, setExamTopic] = useState([]);
  const [selectedQuestionsPerExam, setSelectedQuestionsPerExam] =
    useState("Choose Count");
  const [selectedExamID, setSelectedExamID] = useState("Choose ONE");
  const [selectedTopicID, setSelectedTopicID] = useState("Choose ONE");
  const count = [...Array(100).keys()].map((index) => `${index + 1}`);

  useEffect(() => {
    fetchTopics();
    fetchExam();
    fetchExamTopicMapping();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchTopicMaster",
        {
          method: "GET",
          credentials: "include",
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
  console.log("''''''''''''''''''''''''''''''''''''''********************");
  console.log(topics);

  const fetchExam = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchExamMaster",
        {
          method: "GET",
          credentials: "include",
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

  const fetchExamTopicMapping = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchExamTopicMapping",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.ExamTopicMapping;
      setExamTopic([...list]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(exams);

  const submitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("examtopping");
    const formData = new FormData(form);
    const data_map = {
      examId: selectedExamID,
      topicId: selectedTopicID,
      percentage: formData.get("percentage"),
      topicPassPercentage: formData.get("topicPassPercentage"),
      questionsPerExam: selectedQuestionsPerExam,
    };
    console.log(data_map);

    if (data_map.examId === "Choose ONE") {
      document.getElementById("examIDerr").style.display = "block";
    } else {
      document.getElementById("examIDerr").style.display = "none";
    }
    if (data_map.topicId === "Choose ONE") {
      document.getElementById("topicIDerr").style.display = "block";
    } else {
      document.getElementById("topicIDerr").style.display = "none";
    }
    if (data_map.percentage === "") {
      document.getElementById("percentageerr").style.display = "block";
    } else {
      document.getElementById("percentageerr").style.display = "none";
    }
    if (data_map.topicPassPercentage === "") {
      document.getElementById("topicpasspercentageerr").style.display = "block";
    } else {
      document.getElementById("topicpasspercentageerr").style.display = "none";
    }
    if (data_map.questionsPerExam === "Choose Count") {
      document.getElementById("questionsperexamerr").style.display = "block";
    } else {
      document.getElementById("questionsperexamerr").style.display = "none";
    }
    if (
      !(
        data_map.examId === "Choose ONE" ||
        data_map.topicId === "Choose ONE" ||
        data_map.percentage === "" ||
        data_map.topicPassPercentage === "" ||
        data_map.questionsPerExam === "Choose Count"
      )
    ) {
      try {
        fetch(
          "https://localhost:8443/onlineexam/control/CreateExamTopicMapping",
          {
            method: "POST",
            credentials: "include",
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
            fetchExamTopicMapping();
          });
      } catch (error) {
        console.log(error);
      }
    }
    // document.getElementById("examIDerr").style.display = "block";
    // document.getElementById("topicIDerr").style.display = "block";
    // document.getElementById("percentageerr").style.display = "block";
    // document.getElementById("topicpasspercentageerr").style.display = "block";
    // document.getElementById("questionsperexamerr").style.display = "block";
  };

  const handleSelectQChange = (e) => {
    setSelectedQuestionsPerExam(e.target.value);
  };
  const handleSelectEChange = (e) => {
    setSelectedExamID(e.target.value);
  };
  const handleSelectTChange = (e) => {
    setSelectedTopicID(e.target.value);
  };
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Exam ID</th>
            {/* <th>Exam Name</th> */}
            <th>Topic ID</th>
            {/* <th>Topic Name</th> */}
            <th>Percentage</th>
            <th>Topic Pass Percentage</th>
            <th>Questions Per Exam</th>
          </tr>
        </thead>
        <tbody>
          {examTopic.map((examtopic, index) => {
            // const exam_name = exams[examTopic.examId].examName;
            return (
              <tr key={index}>
                <td>{examtopic.examId}</td>
                {/* <td>{exam_name}</td> */}
                <td>{examtopic.topicId}</td>
                <td>{examtopic.percentage}</td>
                <td>{examtopic.topicPassPercentage}</td>
                <td>{examtopic.questionsPerExam}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center min-vh-2 text-black">
        <form
          onSubmit={submitHandler}
          className="rounded-1 row mt-3 d-flex align-items-center justify-content-aroundmin-vw-100"
          style={{ background: "#D9EBFF" }}
          id="examtopping"
        >
          <div className="container">
            <div className="row ms-1 p-5">
            <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="examId"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Exam Name
                </label>
                <div className="col col-sm-7">
                  <select
                    className="form-select form-select-sm form-control mx-sm-5"
                    aria-label=".form-select-sm example"
                    onChange={handleSelectEChange}
                    value={selectedExamID}
                  >
                    <option name="choose">Choose ONE</option>
                    {exams.map((exam) => {
                      return (
                        <option
                          key={exam.examId}
                          label={exam.examName}
                          value={exam.examId}
                        >
                          {/* {exam.examName} */}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback mx-sm-5" id="examIDerr">
                    Please Choose ExamID
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="expiratitopicIdonDate"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Topic Name
                </label>
                <div className="col col-sm-7">
                  <select
                    className="form-select form-select-sm form-control mx-sm-5"
                    aria-label=".form-select-sm example"
                    onChange={handleSelectTChange}
                    value={selectedTopicID}
                  >
                    <option name="choose">Choose ONE</option>
                    {topics.map((topic) => {
                      return (
                        <option
                          key={topic.topicId}
                          label={topic.topicName}
                          value={topic.topicId}
                        >
                          {/* {topic.topicName} */}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback mx-sm-5" id="topicIDerr">
                    Please Choose Topic Name
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="percentage"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Percentage
                </label>
                <div className="col col-sm-7">
                  <input
                    type="text"
                    name="percentage"
                    className="form-control mx-sm-5"
                  />
                  <div className="invalid-feedback mx-sm-5" id="percentageerr">
                    Please Enter Percentage
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="topicPassPercentage"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Topic Pass Percentage
                </label>
                <div className="col col-sm-7">
                  <input
                    type="text"
                    name="topicPassPercentage"
                    className="form-control mx-sm-5"
                  />
                  <div
                    className="invalid-feedback mx-sm-5"
                    id="topicpasspercentageerr"
                  >
                    Please Enter Topic Pass Percentage
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="questionsPerExam"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Questions Per Exam
                </label>
                <div className="col col-sm-7">
                  <select
                    class="form-select form-select-sm form-control mx-sm-5"
                    aria-label=".form-select-sm example"
                    onChange={handleSelectQChange}
                    value={selectedQuestionsPerExam}
                  >
                    <option name="choose">Choose Count</option>
                    {count.map((count) => {
                      return (
                        <option key={count} label={count} value={count}>
                          {/* {count} */}
                        </option>
                      );
                    })}
                  </select>
                  <div
                    className="invalid-feedback mx-sm-5"
                    id="questionsperexamerr"
                  >
                    Please Enter Questions Per Exam
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              

              <div
                className="mx-auto d-flex justify-content-center p-5"
                style={{ width: "500px" }}
              >
                <input
                  type="submit"
                  name="submit"
                  value="CREATE"
                  className="border-none px-3 py-1 mt-4 mb-2 text-white"
                  style={{
                    fontWeight: "bolder",
                    background:
                      "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
                  }}
                />
                <Link
                  exact
                  to="/AdminDashboard/Exam"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bolder",
                    background:
                      "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
                    padding: "9px",
                    border: "2px solid gray",
                    width: "0.9in",
                  }}
                  className="ms-3 mt-4 mb-2 text-white d-flex justify-content-center"
                >
                  CLOSE
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
