import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import style from "../SubjectComponent/Subject.module.css";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      let value = await axios.get("http://localhost:3333/user");
      setStudents(value.data);
    }
    getAllStudent();
  }, []);

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Student List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>ID</th>
              <th id={style.center}>User Name</th>
              <th id={style.center}>User Email</th>
              <th id={style.center}>Options</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{data.user_name}</td>
                  <td>{data.user_email}</td>
                  <td>
                    <Link
                      exact
                      to={`/AdminDashboard/StudentList/Details/${data.id}`}
                    >
                      <button>Take Test</button>
                      <button>View Result</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentList;
