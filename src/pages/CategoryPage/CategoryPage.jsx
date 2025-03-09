import React from "react";
import AppFooter from "../../Components/MainPageComps/AppFooter/AppFooter";
import CategoryComp from "../../Components/CategoryComp/CategoryComp";
import "./CategoryPage.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CategoryPage = () => {
  return (
    <div className="CategoryPage">
      <DotLottieReact
        src="https://lottie.host/1ffa5243-af25-4d2b-a0b7-80c45b5f6504/eMmMth4rX1.lottie"
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
