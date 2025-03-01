import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import MainPage from "./pages/MainPage/MainPage";
import ExamAnalysis from "./pages/ExamAnalysis/ExamAnalysis";
import MyReportsPage from "./pages/MyReportsPage/MyReportsPage";
import Guidance from "./pages/Guidance/Guidance";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import DataReading from "./pages/DataReading/DataReading";
import ChartTraining from "./pages/ChartTraining/ChartTraining";

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
          <Route path="/CategoryPage" element={<CategoryPage />} />
          <Route path="/DataReading" element={<DataReading />} />
          <Route path="/ChartTraining" element={<ChartTraining />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
