import React, { useState, useRef, useEffect, useCallback } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FaPen, FaPlus } from "react-icons/fa";

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
    // مرحله اول: نمایش مودال برای ثبت عنوان آزمون
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
        setExamTitle(title); // ذخیره عنوان آزمون در state

        const report = {
          id: Date.now(), // یک ID منحصر به فرد برای گزارش
          title,
          chartType,
          descriptionBoxes,
          filters,
          date: new Date().toLocaleDateString("fa-IR"), // تاریخ گزارش
        };
        addReport(report);

        // مرحله دوم: نمایش مودال موفقیت‌آمیز
        Swal.fire({
          title: "",
          text: "گزارش شما با موفقیت ثبت شد.",
          icon: "success",
          timer: 3000, // 3 ثانیه
          showConfirmButton: false,
          customClass: {
            popup: "ExamAnalysis-popup",
          },
        });

        // ریست کردن همه چیز به حالت اولیه
        setTimeout(() => {
          setExamTitle("");
          setChartType("line");
          setDescriptionBoxes([]);
          window.scrollTo({ top: 0, behavior: "smooth" }); // اسکرول به بالای صفحه
        }, 3000);
      }
    });
  };

  return (
    <div className="exam-analysis">
      <h2>گزارش‌ساز</h2>
      <p>با انتخاب گزینه‌های موردنظر، تحلیل آزمون خود را دریافت کنید.</p>
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
