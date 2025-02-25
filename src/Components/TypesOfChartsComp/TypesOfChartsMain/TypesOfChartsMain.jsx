import React from "react";
import "./TypesOfChartsMain.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Bubble, Pie, PolarArea } from "react-chartjs-2";

// Register necessary elements and controllers
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const TypesOfChartsMain = () => {
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

  const polarData = {
    labels: [
      "مهارت های فنی",
      "مهارت های ارتباطی",
      "زبان انگلیسی",
      "هوش و استعداد",
    ],
    datasets: [
      {
        data: [30, 20, 15, 35],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const horizontalBarData = {
    labels: ["مهارت فنی", "زبان انگلیسی", "هوش و استعداد"],
    datasets: [
      {
        label: "شرکت C",
        data: [60, 90, 80],
        backgroundColor: "#FF8042",
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
      <div className="chart-item">
        <h3 className="chart-title">نمودار سینوسی</h3>
        <div className="chart-container">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      {/* Bubble Chart */}
      <div className="chart-item">
        <h3 className="chart-title">نمودار حبابی</h3>
        <div className="chart-container">
          <Bubble data={bubbleData} options={chartOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="chart-item">
        <h3 className="chart-title">نمودار دایره‌ای</h3>
        <div className="chart-container">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      {/* Polar Area Chart */}
      <div className="chart-item">
        <h3 className="chart-title">نمودار قطبی</h3>
        <div className="chart-container">
          <PolarArea data={polarData} options={chartOptions} />
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="chart-item">
        <h3 className="chart-title">نمودار میله‌ای افقی</h3>
        <div className="chart-container">
          <Bar
            data={horizontalBarData}
            options={{
              ...chartOptions,
              indexAxis: "y", // Horizontal bar chart
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypesOfChartsMain;
