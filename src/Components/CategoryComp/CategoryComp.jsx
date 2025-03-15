import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./CategoryComp.scss";
import CategoryResultPage from "./CategoryResultPage/CategoryResultPage";

// دسته‌بندی‌های استاتیک
const staticCategories = [
  { title: "نتایج ارزیابی تکمیلی", details: ["غایب", "مردود", "قبول"] },
  { title: "نتایج آزمون کتبی", details: ["غایب", "مردود", "قبول"] },
  { title: "نتایج گزینش", details: ["غایب", "مردود", "قبول"] },
];

const CategoryComp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [geographies, setGeographies] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState({
    جنسیت: [],
    سهمیه: [],
    شغل: [],
    "مقطع تحصیلی": [],
    "رشته تحصیلی": [],
    دستگاه: [],
    "مجری آزمون": [],
    "عنوان آزمون": [],
    "شغل محل": [],
    "مجری ارزیابی آزمون": [],
  });

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post("/api/auth", null, {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
      });
      if (response.status !== 200) throw new Error("خطا در دریافت توکن!");
      const { token, expiresIn } = response.data;
      const expirationTime = Date.now() + expiresIn * 1000;
      setToken(token);
      localStorage.setItem("tokenExpiration", expirationTime.toString());
      return token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    if (!expirationTime) return true;
    return Date.now() > parseInt(expirationTime, 10);
  };

  const fetchData = useCallback(async () => {
    try {
      let currentToken = token;
      if (!currentToken || isTokenExpired()) {
        currentToken = await fetchToken();
        if (!currentToken) return;
      }

      const cachedGeographies = localStorage.getItem("geographies");
      const cachedDynamicData = Object.keys(dynamicCategories).reduce(
        (acc, key) => {
          const cached = localStorage.getItem(key);
          if (cached) acc[key] = JSON.parse(cached);
          return acc;
        },
        {}
      );

      if (
        cachedGeographies &&
        Object.keys(cachedDynamicData).length ===
          Object.keys(dynamicCategories).length
      ) {
        console.log("داده‌ها از کش خوانده شدند");
        setGeographies(JSON.parse(cachedGeographies));
        setDynamicCategories(cachedDynamicData);
        return;
      }

      const endpoints = {
        geographies: "/api/geography/geographies",
        جنسیت: "/api/gender/genders",
        سهمیه: "/api/quota/quotas",
        شغل: "/api/job/jobs",
        "مقطع تحصیلی": "/api/grade/grades",
        "رشته تحصیلی": "/api/field/fields",
        دستگاه: "/api/executivebody/executivebodies",
        "مجری آزمون": "/api/organizer/organizers",
        "عنوان آزمون": "/api/exam/exams",
        "شغل محل": "/api/joblocation/joblocations",
        "مجری ارزیابی آزمون": "/api/analyzeorganizer/analyzeorganizers",
      };

      const requests = Object.entries(endpoints).map(([key, url]) =>
        axios.get(url, {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        })
      );

      const responses = await Promise.all(requests);
      const newDynamicData = {};

      responses.forEach((response, index) => {
        const key = Object.keys(endpoints)[index];
        let data = response.data;

        if (key === "geographies") {
          setGeographies(data);
          localStorage.setItem("geographies", JSON.stringify(data));
        } else if (key === "جنسیت") {
          newDynamicData[key] = ["همه", ...data.map((item) => item.genderName)];
        } else if (key === "سهمیه") {
          newDynamicData[key] = [
            "همه",
            ...data
              .filter((item) => item.quotaParent === null)
              .map((item) => item.quotaTitle),
          ];
        } else if (key === "شغل") {
          newDynamicData[key] = ["همه", ...data.map((item) => item.jobName)];
        } else if (key === "مقطع تحصیلی") {
          newDynamicData[key] = ["همه", ...data.map((item) => item.gradeTitle)];
        } else if (key === "رشته تحصیلی") {
          newDynamicData[key] = ["همه", ...data.map((item) => item.fieldTitle)];
        } else if (key === "دستگاه") {
          newDynamicData[key] = [
            "همه",
            ...data.map((item) => item.executiveBodyName),
          ];
        } else if (key === "مجری آزمون") {
          newDynamicData[key] = [
            "همه",
            ...data.map((item) => item.organizerName),
          ];
        } else if (key === "عنوان آزمون") {
          newDynamicData[key] = ["همه", ...data.map((item) => item.examName)];
        } else if (key === "شغل محل") {
          newDynamicData[key] = [
            "همه",
            ...data.map((item) => item.jobLocationName),
          ];
        } else if (key === "مجری ارزیابی آزمون") {
          newDynamicData[key] = [
            "همه",
            ...data.map((item) => item.analyzeOrganizerName),
          ];
        }

        if (key !== "geographies") {
          localStorage.setItem(key, JSON.stringify(newDynamicData[key]));
        }
      });

      setDynamicCategories(newDynamicData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    }
  }, [token, fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const provinces = geographies.filter((g) => g.geographyParent === null);
  const counties = selectedOptions["استان"]
    ? geographies.filter(
        (g) => g.geographyParent === selectedOptions["استان"].id
      )
    : [];

  const categories = [
    {
      title: "استان",
      details: ["همه", ...provinces.map((p) => p.geographyName)],
    },
    {
      title: "شهرستان",
      details: ["همه", ...counties.map((c) => c.geographyName)],
    },
    ...Object.entries(dynamicCategories).map(([title, details]) => ({
      title,
      details,
    })),
    ...staticCategories,
  ];

  const handleCategoryClick = (category) => {
    if (category.title === "شهرستان" && !selectedOptions["استان"]) {
      setShowTooltip(true); // نمایش توتیپ
      setTimeout(() => setShowTooltip(false), 3000); // مخفی کردن بعد از 3 ثانیه
      return;
    }
    setSelectedCategory(category);
  };

  const handleOptionClick = (option) => {
    if (selectedCategory) {
      let value = option;
      if (selectedCategory.title === "استان") {
        const selectedProvince = provinces.find(
          (p) => p.geographyName === option
        );
        value = selectedProvince
          ? { id: selectedProvince.geographyId, name: option }
          : option;
      } else if (selectedCategory.title === "شهرستان") {
        const selectedCounty = counties.find((c) => c.geographyName === option);
        value = selectedCounty
          ? { id: selectedCounty.geographyId, name: option }
          : option;
      }

      setSelectedOptions((prev) => ({
        ...prev,
        [selectedCategory.title]: value,
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
      {error && <p>{error}</p>}
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${
              category.title === "شهرستان" && !selectedOptions["استان"]
                ? "disabled"
                : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-title">{category.title}</div>
            {selectedOptions[category.title] && (
              <div className="selected-option">
                {typeof selectedOptions[category.title] === "object"
                  ? selectedOptions[category.title].name
                  : selectedOptions[category.title]}
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
            {category.title === "شهرستان" && showTooltip && (
              <div className="tooltip">
                برای انتخاب شهر ابتدا استان مورد نظر را انتخاب کنید
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


