import React from "react";
import ChartTrainingComp from "../../Components/ChartTrainingComp/ChartTrainingComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import "./ChartTraining.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const ChartTraining = () => {
  return (
    <div className="ChartTrainingContainer">
      <DotLottieReact
        src="/assets/Lootie/eMmMth4rX1.lottie"
        loop
        autoplay
        className="ChartTraining-lottie-background"
      />
      <h2>راهنمای انواع نمودار</h2>
      <ChartTrainingComp />
      <AppFooter />
    </div>
  );
};

export default ChartTraining;
