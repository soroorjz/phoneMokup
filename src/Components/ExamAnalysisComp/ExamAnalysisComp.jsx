import React, { useState, useRef, useEffect, useCallback } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FaPen, FaPlus, FaExclamationCircle, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ExamAnalysisComp.scss";
import { useReports } from "../../pages/ExamAnalysis/ReportsContext";
import ChartComponent from "./ExamAnalysisChart";
import DescriptionBoxComponent from "./DescriptionBoxComponent";
import ExamAnalysisFilters from "./ExamAnalysisFilters";
import generateFakeChartData from "../../pages/fakeApi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

am4core.useTheme(am4themes_animated);

const ExamAnalysisComp = () => {
  const [examTitle, setExamTitle] = useState("");
  const { filters, updateFilters, addReport } = useReports();
  const [chartType, setChartType] = useState("line");
  const [descriptionBoxes, setDescriptionBoxes] = useState([]);
  const chartRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [filterNotes, setFilterNotes] = useState([]);

  // به‌روزرسانی filterNotes بر اساس filters
  useEffect(() => {
    const notes = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "") {
        notes.push({ type: key, value });
      }
    }
    setFilterNotes(notes);
    console.log("Updated filters:", filters); // برای دیباگ
  }, [filters]);

  // حذف فیلتر
  const removeFilterNote = (type) => {
    updateFilters(type, ""); // فیلتر رو توی state به "" تغییر بده
  };

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

  const getSupportedCharts = useCallback(() => {
    const result = generateFakeChartData(filters, chartType);
    return result.supportedCharts || [];
  }, [filters, chartType]);

  useEffect(() => {
    const supportedCharts = getSupportedCharts();
    if (!supportedCharts.includes(chartType) && supportedCharts.length > 0) {
      setChartType(supportedCharts[0]);
    }
  }, [filters, chartType, getSupportedCharts]);

  return (
    <div className="exam-analysis">
      <DotLottieReact
        src="https://lottie.host/1ffa5243-af25-4d2b-a0b7-80c45b5f6504/eMmMth4rX1.lottie"
        loop
        autoplay
        className="analysis-lottie-background"
      />
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
        <ExamAnalysisFilters filters={filters} updateFilters={updateFilters} />
        <div className="filter-notes">
          {filterNotes.map((note, index) => (
            <div key={index} className="filter-note">
              <span>{`${
                note.type === "religion"
                  ? "دین: "
                  : note.type === "province"
                  ? "استان: "
                  : note.type === "quota"
                  ? "سهمیه: "
                  : note.type === "examId"
                  ? "عنوان آزمون: "
                  : note.type === "job"
                  ? "شغل: "
                  : note.type === "gender"
                  ? "جنسیت: "
                  : note.type === "executiveBody"
                  ? "دستگاه اجرایی: "
                  : `${note.type}: `
              }${note.value}`}</span>
              <FaTimes
                className="remove-note"
                onClick={() => removeFilterNote(note.type)} // فقط type رو بفرست
              />
            </div>
          ))}
        </div>
        <div className="chart-section">
          <select
            className="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            {getSupportedCharts().map((type) => (
              <option key={type} value={type}>
                {type === "line"
                  ? "نمودار خطی"
                  : type === "bar"
                  ? "نمودار میله‌ای"
                  : type === "pie"
                  ? "نمودار دایره‌ای"
                  : type === "map"
                  ? "نمودار پراکندگی در کشور"
                  : type === "semiCircle"
                  ? "نیم‌دایره"
                  : type === "nestedDonut"
                  ? "دونات تودرتو"
                  : type === "pictorial"
                  ? "تصویری انباشته"
                  : type}
              </option>
            ))}
          </select>
          <ChartComponent chartType={chartType} filters={filters} />
        </div>

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
