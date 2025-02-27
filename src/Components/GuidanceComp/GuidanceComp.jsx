import React from "react";
import "./GuidanceComp.scss";
import {
  FaChartBar,
  FaDatabase,
  FaPhone,
  FaEnvelope,
  FaRegImage,
} from "react-icons/fa6";
import { MdHeadsetMic } from "react-icons/md";
const GuidanceComp = () => {
  return (
    <div className="support-container">
      <div className="GuidanceCompWrapper">
        <h2 className="row-title">آموزش</h2>
        <div className="row row-1">
          <div className="box chartsBox">
            <FaDatabase className="icon" />
            <p>داده خوانی</p>
          </div>
          <div className="box dataBox">
            <FaChartBar className="icon" />
            <p>انواع نمودار</p>
          </div>
        </div>

        <h2 className="row-title">لورم</h2>
        <div className="row row-2">
          <div className="box large-box"></div>
        </div>

        <h2 className="row-title">پشتیبانی</h2>
        <div className="row row-3">
          <div className="box small-box">
            <FaPhone className="icon" />
            <p>تلفنی</p>
          </div>
          <div className="box small-box">
            <FaEnvelope className="icon" />
            <p>پیامکی</p>
          </div>
          <div className="box small-box">
            <MdHeadsetMic className="icon" />
            <p>تلفن گویا</p>
          </div>
          <div className="box small-box">
            <FaRegImage className="icon" />
            <p>راهنمای تصویری</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceComp;
