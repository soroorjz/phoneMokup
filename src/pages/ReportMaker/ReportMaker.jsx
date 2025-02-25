import React from "react";
import Footer from "../../Components/Footer/Footer";
import MenuComp from "../../Components/MenuComp/MenuComp";
import ReportMain from "../../Components/ReportMain/ReportMain";
import ReaportHeader from "../../Components/ReportMain/ReaportHeader/ReaportHeader";
import BottomTabChart from "../../Components/BottomTabChart/BottomTabChart";

const ReportMaker = () => {
  return (
    <div>
      <ReaportHeader />
      <ReportMain />
      <BottomTabChart />
    </div>
  );
};

export default ReportMaker;
