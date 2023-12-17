import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Exam() {
  const examId = sessionStorage.getItem("exam");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

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
          console.log(data.question.examquestion);
          setQuestions(data.question.examquestion);
          setLoading(false); // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
          setLoading(false); // Set loading to false in case of an error
        });
    }
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: [...(prevAnswers[questionId] || []), selectedOption],

    }));
  };

  return (
    <div className='container mt-4'>
      {questions.map((quesGroup) => (
        <React.Fragment>
          {quesGroup.map((re) => (
            <div key={re.questionId} className='card mt-3'>
              <div className='card-body'>
                <h5 className='card-title'>{re.questionDetail}</h5>
                <div className='form-check'>
                  {['A', 'B', 'C', 'D', 'E'].map((option) => {
                    const optionKey = `option${option}`;
                    const optionValue = re[optionKey];
                    const que = re.QuestionType;
                    console.log("----------->" + que);
                    switch (que) {
                      case 'QT_SC':
                        console.log("-------->single");
                        return optionValue && (

                          <div key={optionKey} className='form-check'>
                            <input
                              type='radio'
                              className='form-check-input'
                              id={`${optionKey}-${re.questionId}`}
                              name={`question${re.questionId}`}
                              value={optionKey}
                              onChange={() => handleOptionChange(re.questionId, optionKey)}
                              checked={answers[re.questionId] === optionKey}
                            />
                            <label className='form-check-label' htmlFor={`${optionKey}-${re.questionId}`}>
                              {optionValue}
                            </label>
                          </div>
                        );
                      case 'QT_MC':
                        console.log("-------->multiple");
                        // Render checkboxes for multiple-choice question
                        return optionValue && (
                          <div key={optionKey} className='form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input'
                              id={`${optionKey}-${re.questionId}`}
                              name={`question${re.questionId}`}
                              value={optionKey}
                              onChange={() => handleOptionChange(re.questionId, optionKey)}
                              checked={answers[re.questionId] && answers[re.questionId].includes(optionKey)}
                            />
                            <label className='form-check-label' htmlFor={`${optionKey}-${re.questionId}`}>
                              {optionValue}
                            </label>
                          </div>
                        );
                    }

                  })}
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {!loading && (
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
      )}
    </div>
  );
}

export default Exam;
