import React, { useState } from "react";
import "./AppFooter.scss";
import {
  FaHome,
  FaThList,
  FaBook,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
const AppFooter = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "categories", label: "دسته‌بندی‌ها", icon: <FaThList /> },
    { id: "guide", label: "دسته‌بندی‌ها", icon: <TbCategory2 /> },
    { id: "home", label: "خانه", icon: <FaHome /> },
    { id: "report-builder", label: "گزارش‌ساز", icon: <FaChartBar /> },
    { id: "my-reports", label: "گزارش‌های من", icon: <FaFileAlt /> },
  ];
  return (
    <div className="navbar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AppFooter;
