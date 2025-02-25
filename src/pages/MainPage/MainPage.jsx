import React from "react";
import "./MainPage.scss";
import MainPageComp from "../../Components/MainPageComps/MainPageComp";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
const MainPage = () => {
  return( <div className="MainPageContainer">
    <MainPageComp/>
    <AppFooter/>
  </div>);
};

export default MainPage;
