import React from "react";
import "./MainPage.scss";
import MainPageComp from "../../Components/MainPageComps/MainPageComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import PwaComp from "../PwaComp";
const MainPage = () => {
  return( <div className="MainPageContainer">
    <MainPageComp/>
    <AppFooter/>
    <PwaComp/>
  </div>);
};

export default MainPage;
