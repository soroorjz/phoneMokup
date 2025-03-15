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
        src="https://lottie.host/1ffa5243-af25-4d2b-a0b7-80c45b5f6504/eMmMth4rX1.lottie"
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
