import React, { useState, useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FaPen } from "react-icons/fa6";
import "./ExamAnalysisComp.scss";

am4core.useTheme(am4themes_animated);

const ExamAnalysisComp = () => {
  const [examTitle, setExamTitle] = useState("");
  const [chartType, setChartType] = useState("line");
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
            <label>عنوان آزمون:</label>
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
          <div className="box">توضیحات</div>
          <div className="box">توضیحات</div>
          <div className="box">توضیحات</div>
          <div className="box">توضیحات</div>
        </div>

        <button className="download-btn"> دریافت فایل اکسل</button>
      </div>
    </div>
  );
};

export default ExamAnalysisComp;