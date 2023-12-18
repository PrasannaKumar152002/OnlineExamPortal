import React, { useEffect, useState } from "react";
// import { useState } from "react";

export default function TopicMaster() {
  // const { topicId, topicName } = data;

  // const changeHandler = (e) => {
  //   setData({ ...data, [e.target.name]: [e.target.value] });
  // };

  // const [topics, setTopics] = useState([]);

  // useEffect(() => {
  //   fetchTopicMaster();
  // }, []);

  // const fetchTopicMaster = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://localhost:8443/onlineexam/control/FetchTopicMasterEvent',
  //       {
  //         method: 'POST',
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     const topicsList = data.TopicMaster;
  //     console.log([...topicsList]);

  //     // Use the functional form of setTopics to avoid dependency issues
  //     setTopics((prevTopics) => [...prevTopics, ...topicsList]);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // console.log(topics);
  const [display, setDisplay] = useState({
    display: "block",
  });

  function handleCloseAdd(e) {
    e.preventDefault();
    setDisplay({ display: "none" });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("topic");
    const formData = new FormData(form);
    const data_map = {
      //   topicId: formData.get("topicId"),
      topicName: formData.get("topicName"),
    };
    //  data_map.set("topicId",formData.get("topicId"));
    // data_map.set("topicName", formData.get("topicName"));
    // console.log(data);
    // setData({ topicId: "", topicName: "" });
    // FETCH
    if (!data_map.topicName) {
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
          console.log("FETCH DATA" + fetch_data);
        });
    }
  };

  return (
    // <div className="d-flex align-items-center justify-content-center min-vh-100 text-black" style={display}>
    //   <form
    //     onSubmit={submitHandler}
    //     className="min-vw-50 p-4 rounded-1"
    //     style={{ backgroundColor: "rgb(203, 195, 227)" }}
    //     id="topic"
    //   >
    //     {/* <div className="row mt-3 d-flex align-items-center justify-content-center">
    //       <label
    //         htmlFor="topicId"
    //         className="col-sm-2 mt-3"
    //         style={{ fontWeight: "bolder" }}
    //       >
    //         Topic ID
    //       </label>
    //       <div className="col-auto">
    //         <input
    //           type="text"
    //           name="topicId"
    //           // value={topicId}
    //           className="form-control mx-sm-3"
    //           // onChange={changeHandler}
    //         />
    //       </div>
    //     </div> */}
    //     <div
    //       className="row mt-3 d-flex align-items-center justify-content-center"

    //     >
    //       <label
    //         htmlFor="topicName"
    //         className="col-sm-2 mt-2"
    //         style={{ fontWeight: "bolder" }}
    //       >
    //         Topic Name
    //       </label>
    //       <div className="col-auto">
    //         <input
    //           type="text"
    //           name="topicName"
    //           // value={topicName}
    //           className="form-control mx-sm-3"
    //           // onChange={changeHandler}
    //         />
    //       </div>
    //     </div>
    //     <div className="mx-auto" style={{ width: "100px" }}>
    //       <input
    //         type="submit"
    //         name="submit"
    //         value="ADD"
    //         className="border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
    //         style={{ fontWeight: "bolder" }}
    //       />
    //       <button
    //         onClick={handleCloseAdd}
    //         style={{ fontWeight: "bolder" }}
    //         className="border border-primary rounded-pill p-3 mt-4 mb-2 bg-primary text-white"
    //       >
    //         Close
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
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
                <div className="invalid-feedback mx-sm-5" id="topicNameerr">
                  Please Choose ExamID
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
}

// "https://localhost:8443/onlineexam/control/TopicMasterEvent"

// fetch(`https://localhost:8443/onlineexam/control/FetchTopicMasterEvent`,
//     {
//       method: "POST",
//     }).then((data)=>{
//       return data.json()
//     }).then(data=>{
//       console.log("''''''''''''''");
//       console.log(data);
//     })
