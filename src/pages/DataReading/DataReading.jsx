import React from "react";
import "./DataReading.scss";
import DataReadingComp from "../../Components/DataReadingComp/DataReadingComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const DataReading = () => {
  return (
    <div className="DataReadingContainer">
      <h2 className="DataReadingTitle">راهنمای تحلیل آزمون‌ها</h2>
      <DotLottieReact
        src="/assets/Lootie/eMmMth4rX1.lottie"
        loop
        autoplay
        className="DataReading-lottie-background"
      />
      <DataReadingComp />
      <AppFooter />
    </div>
  );
};

export default DataReading;
