import React from "react";
import "./DataReading.scss";
import DataReadingComp from "../../Components/DataReadingComp/DataReadingComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
const DataReading = () => {
  return (
    <div className="DataReadingContainer">
      <h2 className="DataReadingTitle">راهنمای تحلیل آزمون‌ها</h2>

      <DataReadingComp />
      <AppFooter />
    </div>
  );
};

export default DataReading;
