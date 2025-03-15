import React from "react";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import CategoryComp from "../../Components/CategoryComp/CategoryComp";
import "./CategoryPage.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CategoryPage = () => {
  return (
    <div className="CategoryPage">
      <DotLottieReact
        src="/assets/Lootie/eMmMth4rX1.lottie"
        loop
        autoplay
        className="Category-lottie-background"
      />
      <h2>جستجو بر اساس دسته‌بندی‌ها</h2>
      <CategoryComp />
      <AppFooter />
    </div>
  );
};

export default CategoryPage;
