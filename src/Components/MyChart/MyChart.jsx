import React from "react";
import { Line } from "react-chartjs-2";
import "./MyChart.scss";
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

const MyChart = () => {

  const data = {
    labels: [
      "آزمون اول",
      "آزمون دوم",
      "آزمون سوم",
      "آزمون چهارم",
      "آزمون پنجم",
    ], 
    datasets: [
      {
        label: "تعداد", 
        data: [42, 56, 48, 88, 90], 
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd", 
        tension: 0.4, 
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",

        labels: {
          font: {
            size: 14,
            family: "Vazirmatn", 
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "نمودار تعداد داوطلبان بر اساس آزمون در استان قم",
        font: {
          size: 20,
          family: "Vazirmatn", 
          weight: "bold", 
        },
        color: "#04364A",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default MyChart;
