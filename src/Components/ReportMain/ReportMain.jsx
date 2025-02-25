import React from "react";
import "./ReportMain.scss";
import ReportMaikerSideBar from "./ReportMaikerSideBar/ReportMaikerSideBar";
import ChartsDashboard from "./ChartDashboard/ChartDashboard";

const ReportMain = () => {
  return (
    <div className="reportMakerMain">
      <div className="ReportMaikerSideBar">
        <ReportMaikerSideBar />
      </div>
      <div className="reportSamples">
        <ChartsDashboard />
      </div>
    </div>
  );
};

export default ReportMain;
