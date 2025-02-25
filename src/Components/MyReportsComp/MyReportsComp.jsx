import React from "react";
import MyReportsTap from "./MyReportsTap/MyReportsTap";
import MyReportsFooter from "./MyReportsFooter/MyReportsFooter";
import "./MyReportsComp.scss";

const MyReportsComp = () => {
  return (
    <div className="MyReportsComp">
      <h1>گزارش‌های من</h1>
      <MyReportsTap />
      <MyReportsFooter />
    </div>
  );
};

export default MyReportsComp;
