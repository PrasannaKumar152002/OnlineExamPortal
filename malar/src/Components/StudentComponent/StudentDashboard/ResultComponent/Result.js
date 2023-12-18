

   import axios from "axios";
   import React, {useState , useEffect} from "react"; 

   
import Table from "react-bootstrap/Table";


function Result() {

    const [results , setResults] = useState([]);

     useEffect(()=>{    
        async function getAllResults(){
            let value = await axios.get("http://localhost:3333/result");
            setResults(value.data);
        }
            getAllResults();
     },[]);


    return (
        <>
            <div>
                <h2>Student Exam List</h2>
            </div>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                             <th>User Email</th>
                             <th>Exam Name</th>
                             <th>Exam Date</th>
                             <th>Result Status</th>
                             <th>Your Score</th>  
                             <th>Total Marks</th>
                             <th>Total Question</th>  
                        </tr>
                    </thead>
                    <tbody>
                    {
                        results.map((data , i) => {
                                if( data.user_email === sessionStorage.getItem("user"))
                                    return(
                                          <tr key={i}>
                                              <td>{data.user_email}</td>
                                              <td>{data.exam_name}</td>
                                              <td>{data.exam_date}</td>
                                              <td>{data.result_status}</td>
                                              <td>{data.result_score}</td>
                                              <td>{data.total_marks}</td>
                                              <td>{data.total_Question}</td>
                                          </tr>
                                    );

                                    return <React.Fragment key={i}></React.Fragment>
                                })
                            }

                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Result;