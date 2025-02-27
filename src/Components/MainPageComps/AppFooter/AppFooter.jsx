import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AppFooter.scss";
import { FaHome, FaThList, FaChartBar, FaFileAlt } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { FaBook } from "react-icons/fa6";

const AppFooter = () => {
  const location = useLocation();

  const tabs = [
    { id: "guide", label: "راهنما", icon: <FaBook />, path: "/Guidance" },
    {
      id: "categories",
      label: "دسته‌بندی‌ها",
      icon: <FaThList />,
      path: "/CategoryPage",
    },
    { id: "home", label: "خانه", icon: <FaHome />, path: "/" },
    {
      id: "report-builder",
      label: "گزارش‌ساز",
      icon: <FaChartBar />,
      path: "/ExamAnalysis",
    },
    {
      id: "my-reports",
      label: "گزارش‌های من",
      icon: <FaFileAlt />,
      path: "/MyReportsPage",
    },
  ];

  return (
    <div className="navbar">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.path}
          className={`nav-item ${
            location.pathname === tab.path ? "active" : ""
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default AppFooter;
