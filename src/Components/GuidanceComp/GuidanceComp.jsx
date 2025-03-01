import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { FaHeadset } from "react-icons/fa6";
import { Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./GuidanceComp.scss";
import { FaChartBar, FaDatabase } from "react-icons/fa6";
import { Link } from "react-router-dom";
const sentences = [
  { text: "امکان دریافت فایل اکسل", bg: "#8c76df" },
  { text: "امکان ساخت گزارش شخصی", bg: "#df9776" },
  { text: "استفاده از به‌روزترین داده‌های آماری", bg: "#76bedf" },
];

const GuidanceComp = () => {
  const [bgColor, setBgColor] = useState(sentences[0].bg);

  return (
    <div className="support-container">
      <div className="GuidanceCompWrapper">
        <h2 className="row-title">آموزش</h2>
        <div className="row row-1">
          <Link to="/DataReading" className="box chartsBox">
            <FaDatabase className="icon" />
            <p>داده خوانی</p>
          </Link>
          <Link to="/ChartTraining" className="box dataBox">
            <FaChartBar className="icon" />
            <p>انواع نمودار</p>
          </Link>
        </div>

        <h2 className="row-title">جدیدترین امکانات برنامک</h2>
        <div className="row row-2">
          <div className="box large-box" style={{ backgroundColor: bgColor }}>
            <Swiper
              direction="vertical"
              slidesPerView={1}
              spaceBetween={30}
              speed={1000} // سرعت اسلایدها
              loop={true} // لوپ
              autoplay={{ delay: 3000, disableOnInteraction: false }} // اسلاید خودکار
              mousewheel={true}
              modules={[Mousewheel, Autoplay]}
              onSlideChange={(swiper) =>
                setBgColor(sentences[swiper.activeIndex].bg)
              }
            >
              {sentences.map((item, index) => (
                <SwiperSlide key={index}>
                  <p className="slide-text">{item.text}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <h2 className="row-title">پشتیبانی</h2>
        <div className="row row-3">
          <div className="box small-box">
            <FaPhone />
            <p>تلفنی</p>
          </div>
          <div className="box small-box">
            <IoMdChatbubbles />
            <p>پیامکی</p>
          </div>
          <div className="box small-box">
            <FaHeadset />
            <p>تلفن گویا</p>
          </div>
          <div className="box small-box">
            <MdOutlineMenuBook />
            <p>راهنمای تصویری</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceComp;
