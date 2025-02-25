import React from "react";
import { Pie } from "react-chartjs-2";
import "./PieChart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["ظرفیت ثبت نام بانوان", "ظرفیت ثبت نام آقایان"],
    datasets: [
      {
        label: "ظرفیت آزمون استخدامی",
        data: [40, 20],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
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
            return `${tooltipItem.label}: ${tooltipItem.raw} درصد`;
          },
        },
      },
    },
  };

  return (
    <div
      className="PieChartContainer"
      style={{ width: "100%", margin: "0 auto" }}
    >
      {/* <h2>ظرفیت آزمون استخدامی</h2> */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
