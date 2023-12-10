
   import {Link , Routes , Route , BrowserRouter , useNavigate } from "react-router-dom";

   import { useEffect } from "react";

    import style from "./StudentDashboard.module.css";

    import Subject from "./Subject/Subject";

    import Result from "./ResultComponent/Result";
import Exam from "./ExamComponent/Exam";
import Test from "./TestComponent/Test";

      function StudentDashboard(){

       
        // useEffect( () => {
        //         if(sessionStorage.getItem("user") == null){
        //             alert("Detect Illegal Way of Entering");
        //            // history("/StudentLogin");
        //         }
        // })


        //  let history = useNavigate ();

        //  function logout(){
        //      sessionStorage.clear();
        //     history("/StudentLogin");
        //  }
        

         
          return (
              <>
             <BrowserRouter>
                 <div id={style.header}>
                
                      <div id={style.headerHeadingBox}>
                          <h3>Online Exam System</h3> 
                      </div>

                        <div id={style.headerMenuBox}>
                            <Link exact to="/StudentDashboard"> <span>Subject</span> </Link>
                            <Link exact to="/StudentDashboard/Result"> <span>My Result</span></Link>
                            <Link exact to="/StudentLogin"> <span>Logout</span> </Link>
                       </div>

                   </div>

                  <div id={style.displayBox}>
                      <Routes>
                           <Route exact path="/StudentDashboard" element={<Subject/>} ></Route>
                           <Route exact path="/StudentDashboard/Result" element={<Result/>} ></Route>

                           <Route exact path="/StudentDashboard/Exam/:category" element={<Exam/>} ></Route>

                           <Route exact path="/StudentDashboard/Exam/:category/:id" element={<Test/>} ></Route>
                      </Routes>
                   </div>
             </BrowserRouter>
              </>
          );
      }

      export default StudentDashboard;