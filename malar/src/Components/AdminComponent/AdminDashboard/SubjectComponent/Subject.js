import { useState, useEffect } from "react";
import TopicMaster from "../../../TopicMaster/TopicMaster";
import Form from "../Dashboard/Form/TopicForm";
import TopicForm from "../Dashboard/Form/TopicForm";
import TopicModalSample from "../../../Modal/TopicModalSample";

function Subject() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });
  const [topics, setTopics] = useState([]);
  const [updateTopics, setUpdateTopics] = useState([]);

  function handleAddSubject() {
    setDisplay({ display: "block" });
  }

  function handleCloseAdd(e) {
    e.preventDefault();
    setDisplay({ display: "none" });
  }
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
        fetch("https://localhost:8443/onlineexam/control/CreateTopicMaster", {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data_map),
        })
          .then((response) => {
            return response.json(); //  converts the response object to JSON to info
          })
          .then((fetch_data) => {
            console.log(
              "-------------------------------------------------------------------"
            );
            console.log(fetch_data.topicName);
            // var addTopic = fetch_data.topicName;
            // setTopics([...topics,addTopic]);
            fetchTopics();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // --------------- Fetching all subjects from db.json file-------------------------
  // const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  // --------------------Adding Exam And re-render Exam component-----------------

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
      setTopics((prevList) => [prevList, ...list]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(topics);

  const handleEditTopic = async (topic) => {
    // try {
    //   const response = await fetch(
    //     "https://localhost:8443/onlineexam/control/UpdateTopicMaster",
    //     {
    //       method: "PUT",
    //       credentials: "include",
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error();
    //   }
    // e.preventDefault();
    console.log("*******************" + topic.topicId + " " + topic.topicName);
    setUpdateTopics([{ topicName: topic.topicName }]);  
    // setUpdateTopics(topics.map((gettopicId)=>topicId===gettopicId?console.log(topicId):console.log("*******************"+gettopicId)));
    //   const data = await response.json();
    //   console.log(data);
    //   var list = data.TopicMaster;
    //   setTopics((prevList) => [prevList, ...list]);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  console.log(updateTopics);
  const handleDeleteTopic = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchTopicMaster",
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.TopicMaster;
      setTopics((prevList) => [prevList, ...list]);
    } catch (error) {
      console.log(error);
    }
  };

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
            <TopicForm
              submitHandler={submitHandler}
              handleCloseAdd={handleCloseAdd}
            />
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
          <table className="table table-responsive-sm table-borderless">
            <thead>
              <tr>
                <th scope="col">Topic ID</th>
                <th scope="col">Topic Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {topics &&
                topics.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.topicId}</td>
                      <td>{data.topicName}</td>
                      {/*  style={{background:"none", backgroundColor:"none"}} */}
                      <td
                        // onClick={() => handleEditTopic(data)}

                        // onClick={handleShow}
                        // style={{ fontWeight: "bolder",background: "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)" }}
                        className="border-none px-3 py-1 mt-4 mb-2 text-white rounded-0"
                        // style={{ background: "none", backgroundColor: "none" }}
                      >
                        <TopicModalSample topicName={data.topicName}/>
                      </td>
                      <td>
                        <button
                          onClick={handleDeleteTopic}
                          style={{
                            fontWeight: "bolder",
                            background:
                              "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
                          }}
                          className="border-none px-3 py-1 mt-4 mb-2 text-white rounded-0"
                        >
                          {/* // style={{ background: "none", backgroundColor: "none" }}> */}
                          Delete
                        </button>
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
            className="border  px-3 py-1 mt-4 mb-2 text-white"
            style={{
              fontWeight: "bolder",
              background:
                "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
            }}
          >
            Add Topic
          </button>
        </div>

        {/* Add Subject */}

        <div style={display}>
          <div className="d-flex justify-content-center min-vh-2 text-black">
            <TopicForm
              submitHandler={submitHandler}
              handleCloseAdd={handleCloseAdd}
            />
          </div>
        </div>
        {/* <div>{updateTopics && <TopicForm />} </div> */}
      </div>
    </>
  );
}

export default Subject;
