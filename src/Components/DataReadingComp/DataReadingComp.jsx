import React from "react";
import "./DataReadingComp.scss";
import { DataReadingchartData } from "../../pages/DataReading/dataReadingData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Link } from "react-router-dom";

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DataReadingComp = () => {
  return (
    <div className="DataReadingComp-Container">
      <div className="Data-Reading-Container">
        {DataReadingchartData.map((chart, index) => (
          <div className="chartContainer" key={index}>
            <h2 className="chartTile">{chart.title}</h2>
            <div
              className={
                chart.title.includes("دایره‌ای") ? "Pie-Chart" : "chartPart"
              }
            >
              {chart.chart}
            </div>

            <p className="chartDescription">{chart.description}</p>
          </div>
        ))}
      </div>
      <button className="backToGuidanceBtn">
        <Link to="/Guidance">بازگشت</Link>
      </button>
    </div>
  );
};

export default DataReadingComp;
