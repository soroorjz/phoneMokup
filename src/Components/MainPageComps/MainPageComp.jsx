import React, { useState, useEffect, useRef } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { fetchExamsData } from "../../dataService";
import ProvinceMapChart from "./ProvinceMapChart/ProvinceMapChart";
import { organizerColors } from "./colors";
import MainPageSkeleton from "./MainPageSkeleton/MainPageSkeleton";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// کامپوننت برای مدیریت resize
const ChartWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.dispatchEvent(new Event("resize"));

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="chart-wrapper">
      {children}
    </div>
  );
};

const MainPageComp = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("جدیدترین گزارشات");
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filters = [
    "جدیدترین گزارشات",
    "بیشترین تعداد شرکت‌کننده",
    "بیشترین تعداد جذب",
  ];

  // استفاده از useQuery برای لود داده‌ها
  const {
    data: examResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["examsData"],
    queryFn: fetchExamsData,
  });

  // مدیریت انتخاب آزمون بعد از لود داده‌ها
  useEffect(() => {
    if (examResponse && examResponse.examData) {
      setSelectedExam(examResponse.examData[0] || null);
    }
  }, [examResponse]);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  // مدیریت کلیک خارج از فیلتر
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
    lazyLoad: false,
    initialSlide: 0,
    afterChange: () => {
      window.dispatchEvent(new Event("resize"));
    },
  };

  // مدیریت لودینگ
  if (isLoading) {
    return (
      <div className="loading">
        <MainPageSkeleton />
      </div>
    );
  }

  // مدیریت خطا
  if (error) {
    return <div className="error">خطا در لود داده‌ها: {error.message}</div>;
  }

  // بررسی داده‌های خالی
  if (!examResponse?.examData?.length || !selectedExam) {
    return <div className="error">داده‌ای برای نمایش وجود ندارد!</div>;
  }

  const examsData = examResponse.examData;
  const organizers = examResponse.organizers;

  const filteredExams = examsData.filter((exam) =>
    exam.title.includes(searchTerm)
  );

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
                    <ChartWrapper>
                      <div className="chart-container">
                        {slide.type === "pie" && (
                          <Pie
                            key={`pie-${slideIndex}`}
                            data={slide.data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                        )}
                        {slide.type === "bar" && (
                          <Bar
                            key={`bar-${slideIndex}`}
                            data={slide.data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
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
                          <ProvinceMapChart
                            key={`map-${slideIndex}`}
                            data={slide.data}
                          />
                        )}
                        {slide.type === "histogram" && (
                          <Bar
                            key={`histogram-${slideIndex}`}
                            data={slide.data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
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
                          <Doughnut
                            key={`doughnut-${slideIndex}`}
                            data={slide.data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                        )}
                        {slide.type === "nestedDoughnut" && (
                          <Doughnut
                            key={`nestedDoughnut-${slideIndex}`}
                            data={slide.data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              cutout: "20%",
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
                                        const label = slide.data.labels[index];
                                        if (
                                          index >= organizers.length &&
                                          !label.includes("بدون آزمون")
                                        ) {
                                          return label;
                                        }
                                        return "";
                                      }
                                      return "";
                                    },
                                  },
                                },
                              },
                            }}
                          />
                        )}
                      </div>
                    </ChartWrapper>
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
