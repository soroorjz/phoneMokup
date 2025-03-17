import React, { useState, useEffect } from "react";
import "./MainPageComp.scss";
import Slider from "react-slick";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
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
import ProvinceMapChart from "./ProvinceMapChart/ProvinceMapChart";
import { organizerColors } from "./colors";

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
  const [organizers, setOrganizers] = useState([]);
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
      const { examData, organizers } = await fetchExamsData(); // گرفتن examData و organizers
      console.log("Data loaded:", examData);
      console.log("Organizers:", organizers);
      setExamsData(examData);
      setOrganizers(organizers);
      setSelectedExam(examData[0] || null);
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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    lazyLoad: "ondemand",
    afterChange: () => {
      window.dispatchEvent(new Event("resize"));
    },
  };

  const filteredExams = examsData.filter((exam) =>
    exam.title.includes(searchTerm)
  );

  // if (loading) {
  //   return <div>در حال بارگذاری...</div>;
  // }

  return (
    <div className="exam-report-slider">
      <DotLottieReact
        src="/assets/Lootie/eMmMth4rX1.lottie"
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
        {examsData.map((exam, examIndex) => {
          console.log(
            `رندر بخش ${examIndex}: ${exam.title}`,
            exam.reportSlides
          );
          return (
            <div key={examIndex} className="exam-section">
              <h2 className="exam-title">{exam.title}</h2>
              <Slider {...settings} className="mainPageSlider">
                {exam.reportSlides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="slide">
                    <h3 className="slide-title">{slide.title}</h3>
                    <div className="chart-container">
                      {slide.type === "pie" && <Pie data={slide.data} />}
                      {slide.type === "bar" && (
                        <Bar
                          data={slide.data}
                          options={{
                            scales: {
                              y: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: "تعداد داوطلب‌ها",
                                },
                              },
                              x: {
                                title: {
                                  display: true,
                                  text: slide.title.includes("آزمون")
                                    ? "آزمون‌ها"
                                    : "دین",
                                },
                                ticks: {
                                  maxRotation: 45,
                                  minRotation: 45,
                                },
                              },
                            },
                          }}
                        />
                      )}
                      {slide.type === "map" && (
                        <ProvinceMapChart data={slide.data} />
                      )}
                      {slide.type === "histogram" && (
                        <Bar
                          data={slide.data}
                          options={{
                            scales: {
                              y: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: "تعداد داوطلب‌ها",
                                },
                              },
                              x: {
                                title: { display: true, text: "سن (سال)" },
                                ticks: { autoSkip: false, maxRotation: 45 },
                              },
                            },
                            plugins: { legend: { display: false } },
                            barPercentage: 1.0,
                            categoryPercentage: 1.0,
                          }}
                        />
                      )}
                      {slide.type === "doughnut" && (
                        <Doughnut data={slide.data} />
                      )}
                      {slide.type === "nestedDoughnut" && (
                        <Doughnut
                          data={slide.data}
                          options={{
                            cutout: "20%", // سوراخ تنگ‌تر
                            plugins: {
                              legend: {
                                position: "right",
                                labels: {
                                  filter: (item) => {
                                    return (
                                      item.index < organizers.length &&
                                      slide.data.datasets[1].data[
                                        item.index
                                      ] !== undefined
                                    );
                                  },
                                  generateLabels: (chart) => {
                                    const datasets = chart.data.datasets;
                                    const innerData = datasets[1].data;
                                    return organizers.map(
                                      (organizer, index) => {
                                        const color =
                                          organizerColors[
                                            String(organizer.organizerId)
                                          ] || "#CCCCCC";
                                        return {
                                          text: organizer.organizerName,
                                          fillStyle: color,
                                          hidden: !innerData[index],
                                          index,
                                        };
                                      }
                                    );
                                  },
                                },
                              },
                              tooltip: {
                                callbacks: {
                                  label: (context) => {
                                    const datasetIndex = context.datasetIndex;
                                    const index = context.dataIndex;

                                    if (datasetIndex === 0) {
                                      // فقط برای لایه خارجی (آزمون‌ها)
                                      const label = slide.data.labels[index];
                                      if (
                                        index >= organizers.length &&
                                        !label.includes("بدون آزمون")
                                      ) {
                                        return label; // فقط اسم آزمون
                                      }
                                      return ""; // برای "بدون آزمون" یا اندیس‌های مربوط به مجری‌ها، چیزی نشون نده
                                    }
                                    return ""; // برای لایه داخلی چیزی نشون نده
                                  },
                                },
                              },
                            },
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="MainPage-exam-stats">
                <h3>نگاه کلی</h3>
                <ul className="stats-list">
                  {exam.examStats.map((stat, statIndex) => (
                    <li key={statIndex} className="stats-item">
                      <strong>{stat.label}: </strong> {stat.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPageComp;
