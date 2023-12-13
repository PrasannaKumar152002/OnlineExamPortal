import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const url = "https://localhost:8443/onlineExam/control/examInfo";
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const requestBody = { userLoginId: "kowsi@gmail.com" };

  const fetchInfo = () => {
    console.log("inside fetch...");

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((fetchedData) => {
        if (fetchedData.exam === undefined) {
          console.log("PartyId null...");
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again.');
        } else {
          console.log(fetchedData.exam.exam);
          setData(fetchedData.exam.exam);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchDataFromDatabase = (exam) => {
    console.log("Entered func" + exam.examId);
    return (
      <Card
        key={`${exam.examId}`}
        title={`${exam.examName}`}
        content={`ExamId:${(exam.examId)}<br>ExamName: ${(exam.examName)}<br>Time: ${Number(exam.durationMinutes)}min<br>Description: ${exam.description}`}
        ex={`${exam.examId}`}
      />
    );
  };

  return (
    <div className="container mt-4">
      {error && <p>{error}</p>}
      {!error && (
        <div className="row">
          {data.map((exam) => (
            <div key={exam.examId} className="col-md-4 mb-4">
              {fetchDataFromDatabase(exam)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Card = (props) => {
  console.log("Entered Card...");
  console.log("Entered card------" + props.ex);

  return (
    <div className="card border border-dark">
      <div className="card-body" dangerouslySetInnerHTML={{ __html: props.content }} />

      <button
        className='btn btn-primary mt-2'
        onClick={() => sessionStorage.setItem("exam", props.ex)}
      >
        <NavLink to="/exam" className='text-light' style={{ textDecoration: "none" }}>
          Exam
        </NavLink>
      </button>
    </div>
  );
};

export default Dashboard;
