import React from "react";

export default function ExamForm(props) {
  return (
    <div className="w-100">
      <form
        onSubmit={props.submitHandler}
        className="rounded-1 row mt-3 p-5 d-flex align-items-center justify-content-center"
        id="exam"
        style={{ background: "#D9EBFF" }}
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
                  placeholder={props.description}
                />
                <div className="invalid-feedback mx-sm-5" id="descriptionerr">
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
                  placeholder={props.examName}
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
                  placeholder={props.creationDate}
                />
                <div className="invalid-feedback mx-sm-5" id="creationdateerr">
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
                  placeholder={props.expirationDate}
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
                  placeholder={props.noOfQuestions}
                />
                <div className="invalid-feedback mx-sm-5" id="noofquestionserr">
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
                  placeholder={props.durationMinutes}
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
                  placeholder={props.passPercentage}
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
                    <label className="form-check-label" htmlFor="answersMust">
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
                    <label className="form-check-label" htmlFor="answersMust">
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
                  placeholder={props.negativeMarkValue}
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
                className="border-none mt-4 mb-2 text-white"
                style={{
                  fontWeight: "bolder",
                  background:
                    "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
                  padding: "9px",
                }}
              />
              <input
                type="button"
                value="CLOSE"
                className="border-none mt-4 mb-2 text-white"
                onClick={props.handleCloseExam}
                style={{
                  fontWeight: "bolder",
                  background:
                    "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
                  padding: "9px",
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
