import React, { useState } from "react";
import "./MainPageComp.scss";
import Slider from "react-slick";
import { Pie, Bar } from "react-chartjs-2";
import { IoMdSearch } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { examsData } from "./mainPageData";
import { FaClipboard } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const MainPageComp = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("جدیدترین گزارشات");
  const [selectedExam, setSelectedExam] = useState(examsData[0]); // مقدار پیش‌فرض اولین آزمون
  const [searchTerm, setSearchTerm] = useState(""); // ذخیره مقدار جستجو

  const filters = [
    "جدیدترین گزارشات",
    "بیشترین تعداد شرکت‌کننده",
    "بیشترین تعداد جذب",
  ];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // فیلتر کردن آزمون‌ها بر اساس جستجو
  const filteredExams = examsData.filter((exam) =>
    exam.title.includes(searchTerm)
  );

  return (
    <div className="exam-report-slider">
      <div className="exam-reportHeader">
        <div className="user-info">
          <div className="userName">
            <FaCircleUser />
            <h3>نام کاربر</h3>
          </div>
          <div className="userPosition">
            <p>سمت سازمانی کاربر</p>
          </div>
        </div>
        <div className="search-bar">
          <IoMdSearch className="search-icon" />
          <input
            type="text"
            placeholder="آزمون مورد نظر خود را انتخاب کنید..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* نمایش لیست آزمون‌های پیدا شده */}
      {searchTerm && (
        <ul className="exam-list">
          {filteredExams.map((exam, index) => (
            <li key={index} onClick={() => setSelectedExam(exam)}>
              {exam.title}
            </li>
          ))}
        </ul>
      )}

      <div className="mainContentTitle">
        <div className="filter-container">
          <div
            className="filter-containerBtn"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <LuFilter className="filter-icon" />
            <p className="filterSpan">چینش بر اساس...</p>
          </div>
          <span className="selected-filter">{selectedFilter}</span>
          {filterOpen && (
            <ul className="filter-dropdown">
              {filters.map((filter, index) => (
                <li key={index} onClick={() => handleFilterSelect(filter)}>
                  {filter}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mainContent">
        {examsData.map((exam, examIndex) => (
          <div key={examIndex} className="exam-section">
            {/* عنوان آزمون */}
            <h2 className="exam-title">
              <FaClipboard />
              {exam.title}
            </h2>

            {/* اسلایدشو مربوط به هر آزمون */}
            <Slider {...settings}>
              {exam.reportSlides.map((slide, index) => (
                <div key={index} className="slide">
                  <h3 className="slide-title">{slide.title}</h3>
                  <div className="chart-container">
                    {slide.type === "pie" && (
                      <Pie data={slide.data} options={slide.options} />
                    )}
                    {slide.type === "bar" && (
                      <Bar data={slide.data} options={slide.options} />
                    )}
                  </div>
                </div>
              ))}
            </Slider>

            {/* باکس‌های توضیحات آزمون */}
            <div className="MainPage-exam-stats">
              <h3>نگاه کلی به آزمون</h3>
              <ul className="stats-list">
                {exam.examStats.map((stat, index) => (
                  <li key={index} className="stats-item">
                    <strong>{stat.label}: </strong> {stat.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPageComp;
