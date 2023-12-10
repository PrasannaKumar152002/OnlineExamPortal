
 import style from "./Home.module.css";
 import pic1 from "../../images/1.png";
 import pic2 from "../../images/2.png";
 import pic3 from "../../images/3.jpg";

 import {Link} from "react-router-dom";


    
    function Home(){
        return(
            <>
               <div id={style.header}>
                   <div id={style.headerHeadingBox}>
                        <h3>Online Exam System</h3> 
                    </div>
                </div>

              <div id={style.div1}>
                  <img src={pic1} alt="" />
                  <span>Online Exam</span>
              </div>


              <div id={style.div2}>
            
                  <div className ={style.div3}>
                     <Link exact  href="/StudentLogin">
                        <img src={pic2} alt="" />
                        <span>Student</span>
                     </Link>
                  </div>

                  <div  className ={style.div3}>
                    <Link  to="/AdminLogin">
                       <img src={pic3} alt="" />
                       <span>Admin</span>
                     </Link> 
                  </div>
                
              </div>


             

            </>
        );
    }

     

    export default Home;