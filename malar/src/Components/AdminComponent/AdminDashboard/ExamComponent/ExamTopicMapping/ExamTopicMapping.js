import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
export default function ExamTopicMapping() {
  const [topics, setTopics] = useState([]);
  const [exams, setExams] = useState([]);
  const [examTopic, setExamTopic] = useState([]);
  const [selectedQuestionsPerExam, setSelectedQuestionsPerExam] = useState("");
  const [selectedExamID, setSelectedExamID] = useState("");
  const [selectedTopicID, setSelectedTopicID] = useState("");
  const count = [...Array(100).keys()].map((index) => `${index + 1}`);

  useEffect(() => {
    fetchTopics();
    fetchExam();
    fetchExamTopicMapping();
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
  console.log("''''''''''''''''''''''''''''''''''''''********************");
  console.log(topics);

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

  const fetchExamTopicMapping = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchExamTopicMappingEvent",
        {
          method: "POST",
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

    if (data_map.examId === "") {
      document.getElementById("examIDerr").style.display = "block";
    } else {
      document.getElementById("examIDerr").style.display = "none";
    }
    if (data_map.topicId === "") {
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
    if (data_map.questionsPerExam === "") {
      document.getElementById("questionsperexamerr").style.display = "block";
    } else {
      document.getElementById("questionsperexamerr").style.display = "none";
    }
    if (
      !(
        data_map.examId === "" ||
        data_map.topicId === "" ||
        data_map.percentage === "" ||
        data_map.topicPassPercentage === "" ||
        data_map.questionsPerExam === ""
      )
    ) {
      try {
        fetch(
          "https://localhost:8443/onlineexam/control/IExamTopicMappingEvent",
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
      <div className="d-flex align-items-center justify-content-center min-vh-100 text-black">
        <form
          onSubmit={submitHandler}
          className="rounded-1 row mt-3 p-5 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgb(203, 195, 227)" }}
          id="examtopping"
        >
          <div className="container">
            <div className="row">
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
                    class="form-select form-select-sm form-control mx-sm-5"
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
                    class="form-select form-select-sm form-control mx-sm-5"
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
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-4 row mt-3 d-flex align-items-center justify-content-center">
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
              <div className="col-12 col-sm-4 row mt-3 d-flex align-items-center justify-content-center">
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
              <div className="col-12 col-sm-4 row mt-3 d-flex align-items-center justify-content-center">
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

              <div
                className="mx-auto d-flex justify-content-between"
                style={{ width: "100px" }}
              >
                <input
                  type="submit"
                  name="submit"
                  value="CREATE"
                  className="border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
                  style={{ fontWeight: "bolder" }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
