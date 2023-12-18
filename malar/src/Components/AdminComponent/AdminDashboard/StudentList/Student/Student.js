
  
  import Table from 'react-bootstrap/Table';

  import {useParams , useNavigate } from "react-router-dom";
  import React, {useState , useEffect} from "react";
  import axios from "axios";

     function Student(){

         const {id} = useParams();

         const [email , setEmail] = useState();

         const[result , setResult] = useState([]);

         useEffect(() => {
             async function getStudentEmail(){
                 //user whose result we have to fetch
                let value = await axios.get(`http://localhost:3333/user/${id}`);
                 setEmail(value.data.user_email);
                 
             }
             getStudentEmail();
         })


         useEffect(() => {   
             async function getAllResult(){
                let value = await axios.get("http://localhost:3333/result");
                setResult(value.data);
             }
             getAllResult();
        },[])


         const history = useNavigate ();

        function handleGoBack(){ 
            history("/AdminDashboard/StudentList");
        }

         return (
              <>
               <div> 
                   <h2 align="center">Student Exam List</h2>     
                </div>

                <div>
                    <Table responsive>
                       <thead>
                          <tr>
                             <th>User Email</th>
                              <th>Exam Name</th>
                              <th>Exam Date</th>
                              <th>Result Status</th>
                              <th>Total Marks</th>
                              <th>Result Score</th>  
                           </tr>
                        </thead>
                        <tbody>
                        {
                                result.map((data , i) => {
                                    if(data.user_email === email)
                                    return(
                                          <tr key={i}>
                                              <td>{data.user_email}</td>
                                              <td>{data.exam_name}</td>
                                              <td>{data.exam_date}</td>
                                              <td>{data.result_status}</td>
                                              <td>{data.result_score}</td>
                                              <td>{data.total_marks}</td>
                                          </tr>
                                    );

                                    return <React.Fragment key={i}></React.Fragment>;
                                })
                            }
                               
                        </tbody>
                     </Table>
                </div>

                 <div>
                       <button onClick={handleGoBack}>Go Back</button>
                 </div>
              </>
         );
     }

     export default Student;