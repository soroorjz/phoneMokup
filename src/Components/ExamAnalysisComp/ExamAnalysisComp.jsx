import React, { useState, useRef, useEffect, useCallback } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FaPen, FaPlus, FaExclamationCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ExamAnalysisComp.scss";
import { useReports } from "../../pages/ExamAnalysis/ReportsContext";
import ChartComponent from "./ExamAnalysisChart";
import DescriptionBoxComponent from "./DescriptionBoxComponent";
import ExamAnalysisFilters from "./ExamAnalysisFilters";

am4core.useTheme(am4themes_animated);

const ExamAnalysisComp = () => {
  const [examTitle, setExamTitle] = useState("");
  const { filters, addReport } = useReports();
  const [chartType, setChartType] = useState("line");
  const [descriptionBoxes, setDescriptionBoxes] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);
  const chartRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const addDescriptionBox = () => {
    setDescriptionBoxes([
      ...descriptionBoxes,
      { id: Date.now(), text: "", isSubmitted: false },
    ]);
  };

  const editDescriptionBox = (id, newText) => {
    setDescriptionBoxes(
      descriptionBoxes.map((box) =>
        box.id === id ? { ...box, text: newText } : box
      )
    );
  };

  const deleteDescriptionBox = (id) => {
    setDescriptionBoxes(descriptionBoxes.filter((box) => box.id !== id));
  };

  const submitDescriptionBox = (id) => {
    setDescriptionBoxes(
      descriptionBoxes.map((box) =>
        box.id === id ? { ...box, isSubmitted: true } : box
      )
    );
  };

  const enableEditDescriptionBox = (id) => {
    setDescriptionBoxes(
      descriptionBoxes.map((box) =>
        box.id === id ? { ...box, isSubmitted: false } : box
      )
    );
  };

  const handleSubmitReport = () => {
    Swal.fire({
      title: "عنوان گزارش خود را وارد کنید",
      input: "text",
      inputPlaceholder: "عنوان گزارش",
      showCancelButton: true,
      confirmButtonText: "ثبت",
      cancelButtonText: "لغو",
      customClass: {
        popup: "ExamAnalysis-popup",
        title: "ExamAnalysis-Title",
      },
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage("ثبت عنوان گزارش الزامی است!");
          return false;
        }
        return inputValue;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const title = result.value;
        setExamTitle(title);

        const report = {
          id: Date.now(),
          title,
          chartType,
          descriptionBoxes,
          filters,
          date: new Date().toLocaleDateString("fa-IR"),
        };
        addReport(report);

        Swal.fire({
          title: "",
          text: "گزارش شما با موفقیت ثبت شد.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: "ExamAnalysis-popup",
          },
        });

        setTimeout(() => {
          setExamTitle("");
          setChartType("line");
          setDescriptionBoxes([]);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 3000);
      }
    });
  };

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <div className="exam-analysis">
      <div className="header-section">
        <div className="title-wrapper">
          <h2>گزارش‌ساز</h2>
          <FaExclamationCircle
            className="info-icon"
            onClick={toggleTextVisibility}
          />
        </div>
        <p className={`info-text ${isTextVisible ? "visible" : ""}`}>
          با انتخاب گزینه‌های موردنظر، تحلیل آزمون خود را دریافت کنید.
        </p>
      </div>
      <div className="examAnalysisInner">
        <ExamAnalysisFilters />
        <div className="chart-section">
          <select
            className="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">نمودار خطی</option>
            <option value="bar">نمودار میله‌ای</option>
            <option value="pie">نمودار دایره‌ای</option>
            <option value="map">نمودار پراکندگی در کشور</option>
            <option value="semiCircle">نیم‌دایره</option>
            <option value="nestedDonut">دونات تودرتو</option>
            <option value="pictorial">تصویری انباشته</option>
          </select>
          <ChartComponent chartType={chartType} filters={filters} />
        </div>

        {/* بخش توضیحات */}
        <div className="analysis-boxes">
          <div className="add-description" onClick={addDescriptionBox}>
            <span>افزودن توضیحات</span>
            <FaPlus className="addBtn" />
          </div>
          {descriptionBoxes.map((box) => (
            <DescriptionBoxComponent
              key={box.id}
              box={box}
              onEdit={editDescriptionBox}
              onDelete={deleteDescriptionBox}
              onSubmit={submitDescriptionBox}
              onEnableEdit={enableEditDescriptionBox}
            />
          ))}
        </div>

        <div className="AnalysisSubmitBtns">
          <button className="download-btn">دریافت فایل اکسل</button>
          <button className="submit-btn" onClick={handleSubmitReport}>
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamAnalysisComp;