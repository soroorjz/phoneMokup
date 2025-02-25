import React from "react";
import "./BottomTabChart.scss";
import { MdOutlineMessage } from "react-icons/md";
import {
  BarChart2,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
} from "lucide-react";

const BottomTabChart = () => {
  return (
    <div className="bottom-tab">
      <button className="tab-button">
        <BarChart2 className="icon" />
      </button>
      <button className="tab-button">
        <PieChart className="icon" />
      </button>
      <button className="tab-button">
        <LineChart className="icon" />
      </button>
      <button className="tab-button">
        <AreaChart className="icon" />
      </button>
      <button className="tab-button">
        <MdOutlineMessage className="icon" />
      </button>
    </div>
  );
};

export default BottomTabChart;
