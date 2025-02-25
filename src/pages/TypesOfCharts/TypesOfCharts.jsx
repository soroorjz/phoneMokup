import React from "react";
import TypesOfChartsMain from "../../Components/TypesOfChartsComp/TypesOfChartsMain/TypesOfChartsMain";
import "./TypesOfCharts.scss";
import BottomTabChart from "../../Components/BottomTabChart/BottomTabChart";
import MenuComp from "../../Components/MenuComp/MenuComp";
import EmploymentExamsChart from "./EmploymentExamsChart";

const TypesOfCharts = () => {
  return (
    <div className="TypesOfCharts-Container">
      <MenuComp />
      <TypesOfChartsMain />
      <EmploymentExamsChart />
      <BottomTabChart />
    </div>
  );
};

export default TypesOfCharts;
