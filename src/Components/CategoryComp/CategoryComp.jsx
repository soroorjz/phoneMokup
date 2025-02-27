import React, { useState } from "react";
import "./CategoryComp.scss";
import CategoryResultPage from "./CategoryResultPage/CategoryResultPage";

const categories = [
  {
    title: "استان",
    details: ["همه", "تهران", "اصفهان", "شیراز", "مشهد", "تبریز"],
  },
  {
    title: "دستگاه",
    details: ["همه", "وزارت بهداشت", "وزارت علوم", "وزارت نیرو", "وزارت کشور"],
  },
  { title: "جنسیت", details: ["همه", "زن", "مرد"] },
  { title: "سهمیه", details: ["همه", "آزاد", "5%", "25%", "50%"] },
  {
    title: "سن",
    details: ["همه", "18-25 سال", "26-35 سال", "36-45 سال", "بیش از 45 سال"],
  },
  {
    title: "رشته تحصیلی",
    details: ["همه", "مهندسی نرم‌افزار", "حقوق", "حسابداری", "مدیریت", "پزشکی"],
  },
  {
    title: "هزینه آزمون",
    details: [
      "همه",
      "کمتر از 50 هزار تومان",
      "50-100 هزار تومان",
      "100-200 هزار تومان",
      "بیش از 200 هزار تومان",
    ],
  },
  {
    title: "مجری آزمون",
    details: ["همه", "سنجش", "رایانگان", "جهاد دانشگاهی"],
  },
  {
    title: "عنوان آزمون",
    details: [
      "همه",
      "آزمون استخدامی کشوری",
      "آزمون قضاوت",
      "آزمون وکالت",
      "آزمون دکتری",
    ],
  },
  { title: "نوبت آزمون", details: ["همه", "1400", "1401", "1402", "1403"] },
];

const CategoryComp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleOptionClick = (option) => {
    if (selectedCategory) {
      setSelectedOptions((prev) => ({
        ...prev,
        [selectedCategory.title]: option,
      }));
      closeSidebar();
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const clearSelection = (categoryTitle) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev };
      delete updatedOptions[categoryTitle];
      return updatedOptions;
    });
  };

  const handleHideResults = () => {
    setShowResults(false);
  };

  const closeSidebar = () => {
    setSelectedCategory(null);
  };

  if (showResults) {
    return (
      <CategoryResultPage
        selectedOptions={selectedOptions}
        clearSelection={clearSelection}
        onHideResults={handleHideResults}
      />
    );
  }

  return (
    <div className="categories-container">
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-title">{category.title}</div>
            {selectedOptions[category.title] && (
              <div className="selected-option">
                {selectedOptions[category.title]}
                <button
                  className="clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection(category.title);
                  }}
                >
                  ✖
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(selectedOptions).length > 0 && (
        <button className="showReportBtn" onClick={handleShowResults}>
          مشاهده گزارش‌ها
        </button>
      )}

      <div className={`sidebar ${selectedCategory ? "open" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>
          ✖
        </button>
        {selectedCategory && (
          <>
            <h2>{selectedCategory.title}</h2>
            <ul>
              {selectedCategory.details.map((detail, idx) => (
                <li key={idx} onClick={() => handleOptionClick(detail)}>
                  {detail}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryComp;
