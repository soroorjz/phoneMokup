import React, { useState, useEffect } from "react";
import "./MainPageComp.scss";
import Slider from "react-slick";
import { Pie, Bar } from "react-chartjs-2";
import { IoMdSearch } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { fetchExamsData } from "../../dataService";

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
  const [examsData, setExamsData] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const filters = [
    "جدیدترین گزارشات",
    "بیشترین تعداد شرکت‌کننده",
    "بیشترین تعداد جذب",
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchExamsData();
      console.log("Data loaded:", data);
      setExamsData(data);
      setSelectedExam(data[0] || null);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterContainer = document.querySelector(".filter-container");
      const mainContentTitle = document.querySelector(".mainContentTitle");
      const mainContent = document.querySelector(".mainContent");
      if (
        filterContainer &&
        !filterContainer.contains(event.target) &&
        (mainContentTitle?.contains(event.target) ||
          mainContent?.contains(event.target))
      ) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const filteredExams = examsData.filter((exam) =>
    exam.title.includes(searchTerm)
  );

  return (
    <div className="exam-report-slider">
      <DotLottieReact
        src="/assets/Lootie/eMmMth4rX1.lottie"
        key="background-animation"
        loop
        autoplay
        className="home-lottie-background"
      />
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
        <div className="logoPart">
          <img src="/assets/images/logo2.png" alt="" />
        </div>
      </div>

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
            <h2 className="exam-title">{exam.title}</h2>
            <Slider {...settings} className="mainPageSlider">
              {exam.reportSlides.map((slide, index) => (
                <div key={index} className="slide">
                  <h3 className="slide-title">{slide.title}</h3>
                  <div className="chart-container">
                    {slide.type === "pie" && <Pie data={slide.data} />}
                    {slide.type === "bar" && <Bar data={slide.data} />}
                  </div>
                </div>
              ))}
            </Slider>
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
            <div className="religion-chart">
              <h3>تحلیل دین داوطلب‌ها</h3>
              <div className="chart-container">
                {exam.religionChart && exam.religionChart.labels.length > 0 ? (
                  <Bar
                    data={exam.religionChart}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          suggestedMax: exam.examStats[0].value.split(" ")[0],
                          title: { display: true, text: "تعداد داوطلب‌ها" },
                        },
                        x: {
                          title: { display: true, text: "دین" },
                        },
                      },
                    }}
                  />
                ) : (
                  <p>داده‌ای برای نمایش وجود ندارد</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPageComp;
