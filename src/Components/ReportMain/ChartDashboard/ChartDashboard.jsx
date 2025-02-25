import React from "react";
import "./ChartDashboard.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bubble } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

// Register necessary elements and controllers
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartsDashboard = () => {
  const barData = {
    labels: ["مهارت فنی", "زبان انگلیسی", "هوش و استعداد"],
    datasets: [
      {
        label: "شرکت A",
        data: [80, 70, 95],
        backgroundColor: "#8884d8",
      },
      {
        label: "شرکت B",
        data: [90, 85, 75],
        backgroundColor: "#82ca9d",
      },
    ],
  };

  const lineData = {
    labels: ["ماه اول", "ماه دوم", "ماه سوم", "ماه چهارم"],
    datasets: [
      {
        label: "پیشرفت",
        data: [10, 30, 50, 70],
        borderColor: "#8884d8",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: "شرکت A",
        data: [
          { x: 10, y: 20, r: 10 },
          { x: 15, y: 25, r: 15 },
          { x: 20, y: 30, r: 20 },
        ],
        backgroundColor: "#8884d8",
      },
    ],
  };

  const pieData = {
    labels: [
      "مهارت های فنی",
      "مهارت های ارتباطی",
      "زبان انگلیسی",
      "هوش و استعداد",
    ],
    datasets: [
      {
        data: [400, 300, 200, 100],
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="charts-dashboard">
      {/* Bar Chart */}
      <div className="chart-item">
        <h3 className="chart-title">نمودار میله‌ای</h3>
        <div className="chart-container">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Line Chart */}
      {/* <div className="chart-item">
        <h3 className="chart-title">نمودار خطی</h3>
        <div className="chart-container">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div> */}

      {/* Bubble Chart */}
      {/* <div className="chart-item">
        <h3 className="chart-title">نمودار حبابی</h3>
        <div className="chart-container">
          <Bubble data={bubbleData} options={chartOptions} />
        </div>
      </div> */}

      {/* Pie Chart */}
      <div className="chart-item">
        <h3 className="chart-title">نمودار دایره‌ای</h3>
        <div className="chart-container">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsDashboard;
