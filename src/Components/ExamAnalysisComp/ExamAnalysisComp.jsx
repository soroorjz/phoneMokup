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
  const [chartType, setChartType] = useState("pie");
  const [descriptionBoxes, setDescriptionBoxes] = useState([]);
  const chartRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [filterNotes, setFilterNotes] = useState([]);

  useEffect(() => {
    const notes = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "") {
        notes.push({ type: key, value });
      }
    }
    setFilterNotes(notes);
    console.log("Updated filters:", filters);
  }, [filters]);

  const removeFilterNote = (type) => {
    updateFilters(type, "");
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

  const getSupportedCharts = useCallback(() => {
    const result = generateFakeChartData(filters, chartType);
    console.log(
      "getSupportedCharts - Filters:",
      filters,
      "ChartType:",
      chartType,
      "SupportedCharts:",
      result.supportedCharts
    );
    return result.supportedCharts?.length
      ? result.supportedCharts
      : ["pie", "bar", "line", "map", "nestedDonut"];
  }, [filters, chartType]);

  useEffect(() => {
    const supportedCharts = getSupportedCharts();
    if (!supportedCharts.includes(chartType) && supportedCharts.length > 0) {
      console.log("Resetting chartType to:", supportedCharts[0]);
      setChartType(supportedCharts[0]);
    }
  }, [filters, getSupportedCharts]);

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
        const { data, description } = generateFakeChartData(filters, chartType);
        const report = {
          id: Date.now(),
          title,
          chartType,
          data,
          descriptionBoxes,
          filters,
          date: new Date().toLocaleDateString("fa-IR"),
          description,
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
          setChartType("pie");
          setDescriptionBoxes([]);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 3000);
      }
    });
  };

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const chartData = generateFakeChartData(filters, chartType).data;

  return (
    <div className="exam-analysis">
      <DotLottieReact
        src="/assets/Lootie/eMmMth4rX1.lottie"
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
                onClick={() => removeFilterNote(note.type)}
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
            {getSupportedCharts().length > 0 ? (
              getSupportedCharts().map((type) => (
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
              ))
            ) : (
              <option value="" disabled>
                هیچ نموداری موجود نیست
              </option>
            )}
          </select>
          <ChartComponent chartType={chartType} data={chartData} />
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
