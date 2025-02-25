import React from "react";
import "./ReportMaikerSideBar.scss";
import { FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { RiBubbleChartLine } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";
const ReportMaikerSideBar = () => {
  return (
    <div className="sideBarContainer">
      <button>
        <BsClipboardData />
        <span>ورود اطلاعات</span>
      </button>
      <button>
        <FaChartPie />
        <span>نمودار دایره ای</span>
      </button>
      <button>
        <FaChartLine />
        <span>نمودار سینوسی</span>
      </button>
      <button>
        <FaChartBar />
        <span>نمودار میله‌ای</span>
      </button>
      <button>
        <RiBubbleChartLine />
        <span>نمودار حبابی</span>
      </button>
    </div>
  );
};

export default ReportMaikerSideBar;
