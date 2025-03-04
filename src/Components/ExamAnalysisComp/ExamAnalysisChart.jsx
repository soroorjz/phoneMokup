import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import generateFakeChartData from "../../pages/fakeApi";

// تابع برای تبدیل اعداد به ارقام فارسی
const toPersianNumber = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const ChartComponent = ({ chartType, filters }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let chart;
    const chartData = generateFakeChartData(filters, chartType);
    console.log("chartData:", chartData);

    // تنظیم سراسری جهت برای پشتیبانی از فارسی
    am4core.options.defaultLocale = {
      ...am4core.options.defaultLocale,
      direction: "rtl",
    };

    if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = chartData;
      chart.rtl = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.truncate = false;
      categoryAxis.renderer.labels.template.wrap = true;
      categoryAxis.renderer.labels.template.fontSize = 12;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "تعداد (نفر)";
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = "#.0a";
      valueAxis.numberFormatter.format = (value) => toPersianNumber(value); // مستقیماً تابع را اعمال می‌کنیم
      valueAxis.renderer.labels.template.fontSize = 12;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
      series.columns.template.tooltipText = "{category}: {value} نفر";
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.width = am4core.percent(70);
      series.numberFormatter = new am4core.NumberFormatter();
      series.numberFormatter.format = (value) => toPersianNumber(value); // مستقیماً تابع را اعمال می‌کنیم
    } else if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.rtl = true;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      pieSeries.labels.template.text = "{category}: {value}%";
      pieSeries.labels.template.fontSize = 12;
      pieSeries.radius = am4core.percent(80);
      pieSeries.numberFormatter = new am4core.NumberFormatter();
      pieSeries.numberFormatter.format = (value) => toPersianNumber(value);
    } else if (chartType === "semiCircle") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.startAngle = 180;
      chart.endAngle = 360;
      chart.rtl = true;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "category";
      series.labels.template.text = "{category}: {value}%";
      series.labels.template.fontSize = 12;
      series.radius = am4core.percent(80);
      series.numberFormatter = new am4core.NumberFormatter();
      series.numberFormatter.format = (value) => toPersianNumber(value);
    } else if (chartType === "nestedDonut") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.rtl = true;

      let series1 = chart.series.push(new am4charts.PieSeries());
      series1.dataFields.value = "value";
      series1.dataFields.category = "category";
      series1.radius = am4core.percent(60);
      series1.innerRadius = am4core.percent(30);
      series1.labels.template.text = "{category}: {value}%";
      series1.labels.template.fontSize = 10;
      series1.numberFormatter = new am4core.NumberFormatter();
      series1.numberFormatter.format = (value) => toPersianNumber(value);

      let series2 = chart.series.push(new am4charts.PieSeries());
      series2.data = chartData.map((item) => ({
        ...item,
        value: item.value * 0.5,
      }));
      series2.dataFields.value = "value";
      series2.dataFields.category = "category";
      series2.radius = am4core.percent(30);
      series2.innerRadius = am4core.percent(15);
      series2.labels.template.text = "{category}: {value}%";
      series2.labels.template.fontSize = 10;
      series2.numberFormatter = new am4core.NumberFormatter();
      series2.numberFormatter.format = (value) => toPersianNumber(value);
    } else if (chartType === "pictorial") {
      chart = am4core.create(chartRef.current, am4charts.SlicedChart);
      chart.data = chartData;
      chart.rtl = true;

      let series = chart.series.push(new am4charts.PictorialStackedSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "category";
      series.maskSprite.path = "M10,0h60v60h-60z";
      series.labels.template.text = "{category}: {value} نفر";
      series.labels.template.fontSize = 12;
      series.labels.template.disabled = false;
      series.ticks.template.disabled = false;
      series.numberFormatter = new am4core.NumberFormatter();
      series.numberFormatter.format = (value) => toPersianNumber(value);
    } else {
      // پیش‌فرض خطی
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = chartData;
      chart.rtl = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.truncate = false;
      categoryAxis.renderer.labels.template.wrap = true;
      categoryAxis.renderer.labels.template.fontSize = 12;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "تعداد (نفر)";
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = "#.0a";
      valueAxis.numberFormatter.format = (value) => toPersianNumber(value);
      valueAxis.renderer.labels.template.fontSize = 12;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
      series.tooltipText = "{category}: {value} نفر";
      series.numberFormatter = new am4core.NumberFormatter();
      series.numberFormatter.format = (value) => toPersianNumber(value);
    }

    return () => {
      if (chart) chart.dispose();
    };
  }, [chartType, filters]);

  return (
    <div
      className="chart-placeholder"
      ref={chartRef}
      style={{ width: "100%", height: "300px" }}
    />
  );
};

export default ChartComponent;
