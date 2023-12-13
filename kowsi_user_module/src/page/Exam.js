import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Exam() {
  const examId = sessionStorage.getItem("exam");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Check if examId is truthy before making the fetch request
    if (examId) {
      // Fetch questions and options from the API using POST method
      const apiUrl = "https://localhost:8443/onlineExam/control/questionInfo";
      const requestBody = { examId: examId };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data----->"+data.question.examquestion);
          setQuestions(data.question.examquestion);
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
        });
    }
  }, [examId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  return (
    <div className='container mt-4'>
      <h2>Exam Page</h2>

      {/* {questions.map((question) => (
        <div key={question.id} className='card mt-3'>
          <div className='card-body'>
            <h5 className='card-title'>{question.question}</h5>

            <div className='form-check'>
              {question.options.map((option, index) => (
                <div key={index} className='form-check'>
                  <input
                    type='radio'
                    className='form-check-input'
                    id={`option${index}`}
                    name={`question${question.id}`}
                    value={option}
                    onChange={() => handleOptionChange(question.id, option)}
                    checked={answers[question.id] === option}
                  />
                  <label className='form-check-label' htmlFor={`option${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))} */}

      <div className='mt-4'>
        <button
          className='btn btn-primary'
          onClick={() => {
            // Handle submission logic here, e.g., sending answers to a server
            console.log('Submitted Answers:', answers);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Exam;
