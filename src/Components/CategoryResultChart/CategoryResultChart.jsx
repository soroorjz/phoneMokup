import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import "./CategoryResultChart.scss";

const generateFakeData = (selectedOptions) => {
  const data = [];
  let chartType = "";
  let summary = "";

  if (selectedOptions["جنسیت"] && selectedOptions["جنسیت"] !== "همه") {
    chartType = "PieChart";
    data.push(
      { category: "زن", value: Math.floor(Math.random() * 100) + 50 },
      { category: "مرد", value: Math.floor(Math.random() * 100) + 50 }
    );
    summary = `شرکت‌کنندگان: ${data[0].value + data[1].value} نفر`;
  } else if (selectedOptions["استان"] && selectedOptions["استان"] !== "همه") {
    chartType = "BarChart";
    const values = [120, 95, 110, 85, 130];
    ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز"].forEach((city, i) => {
      data.push({ category: city, value: values[i] });
    });
    summary = `تعداد داوطلبان در ${selectedOptions["استان"]}: ${
      values[Math.floor(Math.random() * values.length)]
    } نفر`;
  } else if (
    selectedOptions["نوبت آزمون"] &&
    selectedOptions["نوبت آزمون"] !== "همه"
  ) {
    chartType = "LineChart";
    let year = 1399;
    for (let i = 0; i < 5; i++) {
      data.push({
        category: `${year + i}`,
        value: Math.floor(Math.random() * 200) + 100,
      });
    }
    summary = "روند شرکت در آزمون‌ها در سال‌های اخیر";
  } else {
    chartType = "ColumnChart";
    data.push(
      { category: "مهندسی نرم‌افزار", value: 120 },
      { category: "حقوق", value: 90 },
      { category: "حسابداری", value: 75 },
      { category: "مدیریت", value: 100 },
      { category: "پزشکی", value: 110 }
    );
    summary = "آمار شرکت‌کنندگان بر اساس رشته تحصیلی";
  }
  return { data, chartType, summary };
};

const CategoryResultChart = ({ selectedOptions }) => {
  useLayoutEffect(() => {
    let chart;
    const { data, chartType } = generateFakeData(selectedOptions);
    
    if (chartType === "PieChart") {
      chart = am4core.create("chartdiv", am4charts.PieChart);
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      pieSeries.slices.template.propertyFields.fill = "color"; // رنگ بر اساس مقدار اختصاص داده شده در data
    } else {
      chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 10; // کاهش فضای اضافه اطراف نمودار
      
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.labels.template.fontSize = 12; // کوچک‌تر کردن فونت محور افقی
      categoryAxis.renderer.labels.template.horizontalCenter = "middle";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fontSize = 12; // کوچک‌تر کردن فونت محور عمودی

      let series;
      if (chartType === "BarChart") {
        series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
      } else if (chartType === "LineChart") {
        series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
        series.strokeWidth = 2;
      } else {
        series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
      }
      series.columns.template.width = am4core.percent(50); // کاهش عرض ستون‌ها
      series.columns.template.strokeWidth = 1;
      series.columns.template.strokeOpacity = 0.8;
    }

    chart.data = data;
    return () => {
      chart.dispose();
    };
  }, [selectedOptions]);

  return (
    <div className="category-result-chart">
      <h2 style={{ fontSize: "18px", textAlign: "center" }}>نمودار تحلیلی</h2>
      <div id="chartdiv" style={{ width: "80%", height: "250px", margin: "auto" }}></div>
      <div className="analysis-text" style={{ textAlign: "center", fontSize: "14px" }}>
        <p>{generateFakeData(selectedOptions).summary}</p>
      </div>
    </div>
  );
};

export default CategoryResultChart;
