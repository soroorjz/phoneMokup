import React from "react";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import CategoryComp from "../../Components/CategoryComp/CategoryComp";
import "./CategoryPage.scss";

const CategoryPage = () => {
  return (
    <div className="CategoryPage">
      <CategoryComp />
      <AppFooter />
    </div>
  );
};

export default CategoryPage;
