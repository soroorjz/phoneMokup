import React from "react";
import ChartTrainingComp from "../../Components/ChartTrainingComp/ChartTrainingComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import "./ChartTraining.scss";
const ChartTraining = () => {
  return (
    <div className="ChartTrainingContainer">
      <h2>راهنمای انواع نمودار</h2>
      <ChartTrainingComp />
      <AppFooter />
    </div>
  );
};

export default ChartTraining;
