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
  // اطلاعات داده ها اینجا وارد شود
  const data = {
    labels: [
      "آزمون اول",
      "آزمون دوم",
      "آزمون سوم",
      "آزمون چهارم",
      "آزمون پنجم",
    ], // محور افقی: سال‌ها
    datasets: [
      {
        label: "تعداد", // نام داده‌ها
        data: [42, 56, 48, 88, 90], // مقادیر تعداد (به عنوان مثال: [10, 20, 30, 40, 50])
        borderColor: "#3b82f6", // رنگ خط نمودار
        backgroundColor: "#93c5fd", // رنگ نقاط نمودار
        tension: 0.4, // حالت خمیدگی خط
      },
    ],
  };

  // تنظیمات دلخواه نمودار
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // موقعیت توضیحات

        labels: {
          font: {
            size: 14, // اندازه فونت
            family: "Vazirmatn", // نوع فونت
            weight: "bold", // ضخامت فونت
          },
        },
      },
      title: {
        display: true,
        text: "نمودار تعداد داوطلبان بر اساس آزمون در استان قم",
        font: {
          size: 20, // اندازه فونت
          family: "Vazirmatn", // نوع فونت
          weight: "bold", // ضخامت فونت
        },
        color: "#04364A", // رنگ متن عنوان
        padding: {
          top: 10, // فاصله از بالا
          bottom: 10, // فاصله از پایین
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
