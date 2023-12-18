import { useState, useEffect } from "react";
import TopicMaster from "../../../TopicMaster/TopicMaster";

const submitHandler = (e) => {
  e.preventDefault();
  var form = document.getElementById("topic");
  const formData = new FormData(form);
  const data_map = {
    topicName: formData.get("topicName"),
  };
  //  data_map.set("topicId",formData.get("topicId"));
  // data_map.set("topicName", formData.get("topicName"));
  // console.log(data);
  // setData({ topicId: "", topicName: "" });
  // if (!data_map.topicName) {
  // }
  // FETCH
  if (data_map.topicName === "") {
    document.getElementById("topicnameerr").style.display = "block";
  } else {
    try {
      document.getElementById("topicnameerr").style.display = "none";
      fetch("https://localhost:8443/onlineexam/control/ITopicMasterEvent", {
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
    } catch (error) {
      console.log(error);
    }
  }
};

function Subject() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleAddSubject() {
    setDisplay({ display: "block" });
  }

  function handleCloseAdd(e) {
    e.preventDefault();
    setDisplay({ display: "none" });
  }

  // --------------- Fetching all subjects from db.json file-------------------------

  const [topics, setTopics] = useState([]);

  // const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  // --------------------Adding Exam And re-render Exam component-----------------

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

  // useEffect(() => {

  // }, []);

  // const fetchTopicMaster = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://localhost:8443/onlineexam/control/FetchTopicMasterEvent",
  //       {
  //         method: "POST",
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     const topicsList = data.TopicMaster;
  //     console.log("''''''''''''''''''''''''''''''''''''''''''");
  //     // console.log([...topicsList]);

  //     // Use the functional form of setTopics to avoid dependency issues
  //     setTopics(() => [...topicsList]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // console.log(topics);

  // --------------------Adding Subject And re-render subject component-----------------

  // const [subject, setSubject] = useState({
  //   subject_name: "",
  // });

  // function handleInput(e) {
  //   setSubject({
  //     subject_name: e.target.value,
  //   });
  //   //   console.log(subject);
  // }

  // async function handleAddNewSubject() {
  //   await axios.post("http://localhost:3333/subject", subject);
  //   setStatus(true);
  // }

  // const [status, setStatus] = useState();

  // ------------------------Deleting Subject and reload component------------------------------

  // async function deleteSubject(id) {
  //   await axios.delete(`http://localhost:3333/subject/${id}`);
  //   setStatusDelete(true);
  // }

  // const [statusDelete, setStatusDelete] = useState();

  // if (statusDelete) return <Subject />;

  // if (status) return <Subject />;

  // // -------------------------------------------------------

  if (topics.length === 0)
    return (
      <>
        <div>
          <div className="d-flex justify-content-center min-vh-2 text-black">
            <form
              onSubmit={submitHandler}
              className="min-vw-50 p-4 rounded-1"
              style={{ backgroundColor: "rgb(203, 195, 227)" }}
              id="topic"
            >
              <div className="row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="topicName"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Topic Name
                </label>
                <div className="col-auto">
                  <input
                    type="text"
                    name="topicName"
                    // value={topicName}
                    className="form-control mx-sm-3"
                    // onChange={changeHandler}
                    validation={{
                      required: {
                        value: true,
                        message: "required",
                      },
                    }}
                  />
                  <div className="invalid-feedback mx-sm-5" id="topicnameerr">
                    Please Enter Topic Name
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
                  onClick={handleCloseAdd}
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

  return (
    <>
      <div>
        <div>
          <h2 align="center">Topic List</h2>
        </div>

        <div className="table-responsive-sm">
          <table className="table table-responsive-sm">
            <thead>
              <tr>
                <th scope="col">Topic ID</th>
                <th scope="col">Topic Name</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {topics &&
                topics.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.topicId}</td>
                      <td>{data.topicName}</td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            onClick={handleAddSubject}
            className="border border-success rounded-pill p-3 mt-4 mb-2 bg-success text-white"
            style={{ fontWeight: "bolder" }}
          >
            Add Topic
          </button>
        </div>

        {/* Add Subject */}

        <div style={display}>
          <div className="d-flex justify-content-center min-vh-2 text-black">
            <form
              onSubmit={submitHandler}
              className="min-vw-50 p-4 rounded-1"
              style={{ backgroundColor: "rgb(203, 195, 227)" }}
              id="topic"
            >
              <div className="row mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="topicName"
                  className="col-sm-2 mt-2"
                  style={{ fontWeight: "bolder" }}
                >
                  Topic Name
                </label>
                <div className="col-auto">
                  <input
                    type="text"
                    name="topicName"
                    // value={topicName}
                    className="form-control mx-sm-3"
                    // onChange={changeHandler}
                    validation={{
                      required: {
                        value: true,
                        message: "required",
                      },
                    }}
                  />
                  <div className="invalid-feedback mx-sm-5" id="topicnameerr">
                    Please Enter Topic Name
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
                  onClick={handleCloseAdd}
                  style={{ fontWeight: "bolder" }}
                  className="border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subject;
