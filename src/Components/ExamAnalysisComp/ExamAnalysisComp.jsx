import React, { useState, useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FaPen, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import "./ExamAnalysisComp.scss";

am4core.useTheme(am4themes_animated);

const ExamAnalysisComp = () => {
  const [examTitle, setExamTitle] = useState("");
  const [chartType, setChartType] = useState("line");
  const [descriptionBoxes, setDescriptionBoxes] = useState([]);
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let chart;
    if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = [
        { category: "فروردین", value: 65 },
        { category: "اردیبهشت", value: 59 },
        { category: "خرداد", value: 80 },
        { category: "تیر", value: 81 },
        { category: "مرداد", value: 56 },
      ];
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
    } else if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = [
        { category: "فروردین", value: 65 },
        { category: "اردیبهشت", value: 59 },
        { category: "خرداد", value: 80 },
        { category: "تیر", value: 81 },
        { category: "مرداد", value: 56 },
      ];
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
    } else {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = [
        { category: "فروردین", value: 65 },
        { category: "اردیبهشت", value: 59 },
        { category: "خرداد", value: 80 },
        { category: "تیر", value: 81 },
        { category: "مرداد", value: 56 },
      ];
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
    }
    return () => chart.dispose();
  }, [chartType]);

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
    // نمایش پیام موفقیت‌آمیز
    Swal.fire({
      title: "",
      text: "گزارش شما با موفقیت ثبت شد.",
      icon: "success",
      timer: 2000, // 2 ثانیه
      showConfirmButton: false,
      customClass: {
        popup: "ExamAnalysis-popup", // کلاس سفارشی برای مودال
      },
    });

    // ریست کردن همه چیز به حالت اولیه
    setTimeout(() => {
      setExamTitle("");
      setChartType("line");
      setDescriptionBoxes([]);
      window.scrollTo({ top: 0, behavior: "smooth" }); // اسکرول به بالای صفحه
    }, 2000);
  };

  return (
    <div className="exam-analysis">
      <h2>گزارش‌ساز</h2>
      <p>با انتخاب گزینه‌های موردنظر، تحلیل آزمون خود را دریافت کنید.</p>
      <div className="examAnalysisInner">
        <div className="filters">
          <select>
            <option>عنوان آزمون</option>
          </select>
          <select>
            <option>سهمیه</option>
          </select>
          <select>
            <option>استان</option>
          </select>
          <select>
            <option>دستگاه</option>
          </select>
          <select>
            <option>شغل</option>
          </select>
          <select>
            <option>جنسیت</option>
          </select>
          <select>
            <option>نوبت آزمون</option>
          </select>
          <select>
            <option>مجری آزمون</option>
          </select>
        </div>

        <div className="chart-section">
          <div className="title-input">
            <label>عنوان گزارش:</label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
            />
            <FaPen />
          </div>
          <select
            className="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">نمودار خطی</option>
            <option value="bar">نمودار میله‌ای</option>
            <option value="pie">نمودار دایره‌ای</option>
          </select>
          <div className="chart-placeholder" ref={chartRef}></div>
        </div>

        <div className="analysis-boxes">
          <div className="add-description" onClick={addDescriptionBox}>
            <span>افزودن توضیحات</span>
            <FaPlus className="addBtn" />
          </div>
          {descriptionBoxes.map((box) => (
            <div key={box.id} className="box">
              <textarea
                className="boxTexArea"
                value={box.text}
                onChange={(e) => editDescriptionBox(box.id, e.target.value)}
                disabled={box.isSubmitted}
              />
              <div className="box-actions">
                <button
                  className="editeBtn"
                  onClick={() => enableEditDescriptionBox(box.id)}
                >
                  <CiEdit />
                  ویرایش
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteDescriptionBox(box.id)}
                >
                  <MdDelete />
                  حذف
                </button>
                {!box.isSubmitted && (
                  <button
                    className="submitBtn"
                    onClick={() => submitDescriptionBox(box.id)}
                  >
                    <IoMdCheckmarkCircleOutline />
                    ثبت
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="AnalysisSubmitBtns">
          <button className="download-btn"> دریافت فایل اکسل</button>
          <button className="submit-btn" onClick={handleSubmitReport}>
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamAnalysisComp;