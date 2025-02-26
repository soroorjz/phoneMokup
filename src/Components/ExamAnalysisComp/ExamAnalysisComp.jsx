import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ExamAnalysisComp.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد"],
  datasets: [
    {
      label: "نتایج آزمون",
      data: [65, 59, 80, 81, 56],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

const ExamAnalysisComp = () => {
  const [examTitle, setExamTitle] = useState("");
  const [chartType, setChartType] = useState("line");

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={data} />;
      case "pie":
        return <Pie data={data} />;
      case "line":
      default:
        return <Line data={data} />;
    }
  };

  return (
    <div className="exam-analysis">
      <h2>گزارش‌ساز</h2>
      <p>با انتخاب گزینه‌های موردنظر، تحلیل آزمون خود را دریافت کنید.</p>

      <div className="filters">
        <select>
          <option>عنوان آزمون</option>
        </select>
        <select>
          <option>سهمیه</option>
        </select>
        <select>
          <option>استان</option>
        </select>
        <select>
          <option>دستگاه</option>
        </select>
        <select>
          <option>شغل</option>
        </select>
        <select>
          <option>جنسیت</option>
        </select>
        <select>
          <option>نوبت آزمون</option>
        </select>
        <select>
          <option>مجری آزمون</option>
        </select>
      </div>

      <div className="chart-section">
        <div className="title-input">
          <label>عنوان آزمون:</label>
          <input
            type="text"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
          />
        </div>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="line">نمودار خطی</option>
          <option value="bar">نمودار میله‌ای</option>
          <option value="pie">نمودار دایره‌ای</option>
        </select>
        <div className="chart-placeholder">{renderChart()}</div>
      </div>

      <div className="analysis-boxes">
        <div className="box">توضیحات</div>
        <div className="box">توضیحات</div>
        <div className="box">توضیحات</div>
      </div>

      <button className="download-btn">📥 دانلود اکسل</button>
    </div>
  );
};

export default ExamAnalysisComp;
