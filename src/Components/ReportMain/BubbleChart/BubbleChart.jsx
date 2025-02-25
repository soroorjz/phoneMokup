import React from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = () => {
  // داده‌های آزمون استخدامی
  const data = {
    datasets: [
      {
        label: "ظرفیت دولتی",
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 15, y: 10, r: 10 },
          { x: 20, y: 30, r: 25 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "ظرفیت خصوصی",
        data: [
          { x: 5, y: 25, r: 20 },
          { x: 10, y: 15, r: 12 },
          { x: 25, y: 20, r: 18 },
        ],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
      },
    ],
  };

  // تنظیمات نمودار
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const { x, y, r } = tooltipItem.raw;
            return `x: ${x}, y: ${y}, شعاع: ${r}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "محور افقی",
        },
      },
      y: {
        title: {
          display: true,
          text: "محور عمودی",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", height: "100%" }}>
      {/* <h2 style={{ textAlign: "center" }}></h2> */}
      <Bubble data={data} options={options} />
    </div>
  );
};

export default BubbleChart;
