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
        <h2 align="center">Student List</h2>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">User Email</th>
              <th scope="col">Options</th>
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
                      <button>Assign Test</button>
                      <button>View Result</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
       {/* <div class="table-responsive">
  <table class="table">
  <tr>
  <td class="table-active">Student List</td>

  <td class="table-primary">Student List</td>
  <td class="table-secondary">Student List</td>
  <td class="table-success">Student List</td>
  <td class="table-danger">Student List</td>
  <td class="table-warning">Student List</td>
  <td class="table-info">Student List</td>
  <td class="table-light">Student List</td>
  <td class="table-dark">Student List</td>
</tr>
  </table>
</div> */}
    </>
  );
}

export default StudentList;
