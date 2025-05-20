import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LogIn from "./pages/LogIn/LogIn";
import MainPage from "./pages/MainPage/MainPage";
import ExamAnalysis from "./pages/ExamAnalysis/ExamAnalysis";
import MyReportsPage from "./pages/MyReportsPage/MyReportsPage";
import Guidance from "./pages/Guidance/Guidance";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import DataReading from "./pages/DataReading/DataReading";
import ChartTraining from "./pages/ChartTraining/ChartTraining";
import { ReportsProvider } from "./pages/ExamAnalysis/ReportsContext";

// ایجاد QueryClient با تنظیمات پیش‌فرض
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry یک بار برای درخواست‌های ناموفق
      staleTime: 1000 * 60 * 5, // داده‌ها تا ۵ دقیقه تازه می‌مونن
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReportsProvider>
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
      </ReportsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
