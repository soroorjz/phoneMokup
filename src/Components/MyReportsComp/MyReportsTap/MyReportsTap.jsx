import React, { useState } from "react";
import "./MyReportsTap.scss";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import MyReportPage from "../MyReportPage/MyReportPage";
const MyReportsTap = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: "گزارش ۱", content: <MyReportPage/> },
    { id: 2, title: "گزارش ۲", content: "Content for گزارش 2" },
  ]);

  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    const newTab = {
      id: tabs.length ? tabs[tabs.length - 1].id + 1 : 1,
      title: `گزارش ${tabs.length + 1}`,
      content: `Content for Page ${tabs.length + 1}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    if (id === activeTab && updatedTabs.length > 0) {
      setActiveTab(updatedTabs[0].id);
    } else if (updatedTabs.length === 0) {
      setActiveTab(null);
    }
  };

  return (
    <div className="chrome-tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.title}</span>
            <IoMdClose
              className="close-icon"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            />
          </div>
        ))}
        
      </div>

      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.content || "No active tab"}
      </div>
    </div>
  );
};
export default MyReportsTap;
