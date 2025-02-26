import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import MainPage from "./pages/MainPage/MainPage";
import MyReports from "./pages/MyReports/MyReports";
import BottomTabChart from "./Components/BottomTabChart/BottomTabChart";
import ExamAnalysis from "./pages/ExamAnalysis/ExamAnalysis";
import MyReportsPage from "./pages/MyReportsPage/MyReportsPage";
import Guidance from "./pages/Guidance/Guidance";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="LogIn" element={<LogIn />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/ExamAnalysis" element={<ExamAnalysis />} />
          <Route path="/MyReportsPage" element={<MyReportsPage />} />
          <Route path="/Guidance" element={<Guidance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
