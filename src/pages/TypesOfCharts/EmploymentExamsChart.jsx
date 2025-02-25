// components/EmploymentExamsChart.js
import React from "react";
import "./EmploymentExamsChart.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EmploymentExamsChart = () => {
  const data = {
    labels: ["دی", "بهمن", "اسفند", "فروردین", "اردیبهشت", "خرداد"],
    datasets: [
      {
        label: "تعداد قبولی آزمون‌های استخدامی",
        data: [120, 150, 100, 170, 130, 200],
        fill: false,
        borderColor: "#4caf50",
        backgroundColor: "#81c784",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "روند قبولی در آزمون‌های استخدامی ایران (۶ ماه گذشته)",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "ماه‌های سال",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "تعداد قبولی",
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 250,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="container">
      <div className="employment-exams-chart">
        <h3>آمار قبولی در آزمون‌های استخدامی</h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EmploymentExamsChart;
