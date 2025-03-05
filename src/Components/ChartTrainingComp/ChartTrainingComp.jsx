import React from "react";
import {
  Chart as ChartJS,
  Bar,
  Line,
  Pie,
  Scatter,
  Radar,
} from "react-chartjs-2";
import "chart.js/auto";
import "./ChartTrainingComp.scss";
import { chartData } from "../../pages/ChartTraining/chartTrainingData";
import { Link } from "react-router-dom";

import TrainingInranChart from "./TrainingInranChart";

const toPersianDigits = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const chartOptions = {
  scales: {
    x: {
      ticks: {
        callback: function (value) {
          return toPersianDigits(value); // فارسی کردن اعداد محور X
        },
      },
    },
    y: {
      ticks: {
        callback: function (value) {
          return toPersianDigits(value); // فارسی کردن اعداد محور Y
        },
      },
    },
  },
};

const ChartTrainingComp = () => {
  return (
    <div className="chart-tutorial-Container">
      <div className="chart-tutorial">
        {chartData.map((chart, index) => {
          // فارسی کردن labels
          const formattedData = { ...chart.chart.data };
          formattedData.labels = formattedData.labels?.map(toPersianDigits);

          return (
            <div key={index} className="chart-card">
              <h2>{chart.title}</h2>
              <p className="chart-type-description">
                {chart.chartTypeDescription}
              </p>

              <p>{chart.chart.description}</p>
              <div className="chart-container">
                {chart.chart.type === "bar" && (
                  <Bar data={formattedData} options={chartOptions} />
                )}
                {chart.chart.type === "line" && (
                  <Line data={formattedData} options={chartOptions} />
                )}
                {chart.chart.type === "pie" && (
                  <Pie data={formattedData} options={chartOptions} />
                )}
                {chart.chart.type === "scatter" && (
                  <Scatter data={formattedData} options={chartOptions} />
                )}
                {chart.chart.type === "radar" && (
                  <Radar data={formattedData} options={chartOptions} />
                )}
                {chart.chart.type === "map" && (
                  <TrainingInranChart data={chart.chart.data} />
                )}
              </div>
              <p className="chart-analysis">
                <span>کاربرد:</span>
                این نمودار به شما کمک می‌کند تا
                {chart.chart.description?.toLowerCase() || "این داده‌ها"} را
                بهتر درک کنید.
              </p>
            </div>
          );
        })}
      </div>
      <button className="backToGuidanceBtn">
        <Link to="/Guidance">بازگشت</Link>
      </button>
    </div>
  );
};

export default ChartTrainingComp;
