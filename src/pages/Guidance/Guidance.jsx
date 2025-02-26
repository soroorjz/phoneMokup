import React from "react";
import "./Guidance.scss";
import GuidanceComp from "../../Components/GuidanceComp/GuidanceComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
const Guidance = () => {
  return (
    <div className="Guidance">
      <GuidanceComp />
      <AppFooter/>
    </div>
  );
};

export default Guidance;
