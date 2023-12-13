
import DashBoard from './page/DashBoard';
import Report from './page/Report';
import Logout from './page/LogOut';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Exam from './page/Exam';
import Header from './components/Header';

function App() {
  return (

    <Router>
      <div className="App">

        <Header />
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
