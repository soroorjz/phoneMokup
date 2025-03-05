import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_ir from "@amcharts/amcharts4-geodata/iranLow";
import "./CategoryResultChart.scss";

// تابع برای تبدیل اعداد به ارقام فارسی
const toPersianNumber = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// تابع تولید دیتای فیک
const generateFakeData = (selectedOptions) => {
  const provinces = [
    { id: "IR-07", name: "تهران" },
    { id: "IR-04", name: "اصفهان" },
    { id: "IR-14", name: "فارس" },
    { id: "IR-30", name: "خراسان رضوي" },
    { id: "IR-10", name: "خوزستان" },
  ];

  const getRandomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  let data = [];
  let chartType = "";
  let description = "";

  // تابع تعیین رنگ برای نقشه
  const getColorByValue = (value) => {
    if (value > 5000) return "#d32f2f"; // قرمز تیره
    if (value > 3000) return "#f57c00"; // نارنجی
    if (value > 2000) return "#fbc02d"; // زرد
    if (value > 1000) return "#388e3c"; // سبز تیره
    return "#81c784"; // سبز روشن
  };

  // سناریو 1: فقط جنسیت
  if (selectedOptions["جنسیت"] && Object.keys(selectedOptions).length === 1) {
    chartType = "pie";
    const male = getRandomValue(40, 60);
    data = [
      { category: "مرد", value: male },
      { category: "زن", value: 100 - male },
    ];
    description = `نسبت شرکت‌کنندگان بر اساس جنسیت (${selectedOptions["جنسیت"]})`;
  }

  // سناریو 2: فقط استان
  else if (
    selectedOptions["استان"] &&
    Object.keys(selectedOptions).length === 1
  ) {
    chartType = "map";
    data = provinces.map((prov) => {
      const value = getRandomValue(500, 6000);
      return {
        id: prov.id,
        name: prov.name,
        value,
        fill: getColorByValue(value),
      };
    });
    description = `تعداد شرکت‌کنندگان در استان ${
      selectedOptions["استان"].name || selectedOptions["استان"]
    }`;
  }

  // سناریو 3: فقط سهمیه
  else if (
    selectedOptions["سهمیه"] &&
    Object.keys(selectedOptions).length === 1
  ) {
    chartType = "bar";
    const male = getRandomValue(40, 60);
    data = [
      { category: "مرد", value: male },
      { category: "زن", value: 100 - male },
    ];
    description = `نسبت شرکت‌کنندگان سهمیه ${selectedOptions["سهمیه"]} بر اساس جنسیت`;
  }

  // سناریو 4: فقط نتایج ارزیابی تکمیلی
  else if (
    selectedOptions["نتایج ارزیابی تکمیلی"] &&
    Object.keys(selectedOptions).length === 1
  ) {
    chartType = "pie";
    const absent = getRandomValue(10, 20);
    const failed = getRandomValue(20, 30);
    const passed = 100 - absent - failed;
    data = [
      { category: "غایب", value: absent },
      { category: "مردود", value: failed },
      { category: "قبول", value: passed },
    ];
    description = `نتایج ارزیابی تکمیلی (${selectedOptions["نتایج ارزیابی تکمیلی"]})`;
  }

  // سناریو 5: جنسیت + سهمیه
  else if (
    selectedOptions["جنسیت"] &&
    selectedOptions["سهمیه"] &&
    !selectedOptions["استان"]
  ) {
    chartType = "nestedDonut";
    data = [
      { category: "مرد", value: getRandomValue(40, 60) },
      { category: "زن", value: getRandomValue(40, 60) },
    ];
    description = `تعداد شرکت‌کنندگان جنسیت ${selectedOptions["جنسیت"]} با سهمیه ${selectedOptions["سهمیه"]}`;
  }

  // سناریو 6: جنسیت + استان
  else if (
    selectedOptions["جنسیت"] &&
    selectedOptions["استان"] &&
    !selectedOptions["سهمیه"]
  ) {
    chartType = "bar";
    data = provinces.slice(0, 3).map((prov) => ({
      category: prov.name,
      value: getRandomValue(200, 800),
    }));
    description = `تعداد شرکت‌کنندگان جنسیت ${
      selectedOptions["جنسیت"]
    } در استان ${selectedOptions["استان"].name || selectedOptions["استان"]}`;
  }

  // سناریو 7: جنسیت + سهمیه + استان
  else if (
    selectedOptions["جنسیت"] &&
    selectedOptions["سهمیه"] &&
    selectedOptions["استان"]
  ) {
    chartType = "map";
    data = provinces.map((prov) => {
      const value = getRandomValue(300, 5000);
      return {
        id: prov.id,
        name: prov.name,
        value,
        fill: getColorByValue(value),
      };
    });
    description = `تعداد شرکت‌کنندگان جنسیت ${
      selectedOptions["جنسیت"]
    } با سهمیه ${selectedOptions["سهمیه"]} در ${
      selectedOptions["استان"].name || selectedOptions["استان"]
    }`;
  }

  // سناریو 8: شغل + مقطع تحصیلی
  else if (selectedOptions["شغل"] && selectedOptions["مقطع تحصیلی"]) {
    chartType = "bar";
    data = [
      { category: "تهران", value: getRandomValue(100, 300) },
      { category: "اصفهان", value: getRandomValue(100, 300) },
      { category: "فارس", value: getRandomValue(100, 300) },
    ];
    description = `تعداد شرکت‌کنندگان شغل ${selectedOptions["شغل"]} با مقطع ${selectedOptions["مقطع تحصیلی"]}`;
  }

  // سناریو 9: نتایج آزمون کتبی + استان
  else if (selectedOptions["نتایج آزمون کتبی"] && selectedOptions["استان"]) {
    chartType = "pie";
    const absent = getRandomValue(10, 20);
    const failed = getRandomValue(20, 30);
    const passed = 100 - absent - failed;
    data = [
      { category: "غایب", value: absent },
      { category: "مردود", value: failed },
      { category: "قبول", value: passed },
    ];
    description = `نتایج آزمون کتبی (${
      selectedOptions["نتایج آزمون کتبی"]
    }) در ${selectedOptions["استان"].name || selectedOptions["استان"]}`;
  }

  // سناریو 10: پیش‌فرض
  else {
    chartType = "bar";
    data = [
      { category: "تهران", value: getRandomValue(100, 500) },
      { category: "اصفهان", value: getRandomValue(100, 500) },
      { category: "فارس", value: getRandomValue(100, 500) },
    ];
    description = "تعداد شرکت‌کنندگان بر اساس استان";
  }

  return { data, chartType, description };
};

const CategoryResultChart = ({ selectedOptions }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let chart;
    const { data, chartType, description } = generateFakeData(selectedOptions);

    // تنظیم RTL
    am4core.options.defaultLocale = {
      ...am4core.options.defaultLocale,
      direction: "rtl",
    };

    // فرمت‌کننده اعداد فارسی
    const numberFormatter = new am4core.NumberFormatter();
    numberFormatter.numberFormat = "#.";
    numberFormatter.format = (value) => toPersianNumber(value);

    if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = data;
      chart.rtl = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.fontSize = 12;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "تعداد (نفر)";
      valueAxis.numberFormatter = numberFormatter;
      valueAxis.renderer.labels.template.fontSize = 12;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
      series.columns.template.tooltipText = "{category}: {value} نفر";
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.width = am4core.percent(70);
      series.numberFormatter = numberFormatter;
    } else if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = data;
      chart.rtl = true;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      pieSeries.labels.template.text = "{category}: {value}%";
      pieSeries.labels.template.fontSize = 12;
      pieSeries.radius = am4core.percent(80);
      pieSeries.numberFormatter = numberFormatter;
    } else if (chartType === "nestedDonut") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = data;
      chart.rtl = true;

      let series1 = chart.series.push(new am4charts.PieSeries());
      series1.dataFields.value = "value";
      series1.dataFields.category = "category";
      series1.radius = am4core.percent(60);
      series1.innerRadius = am4core.percent(30);
      series1.labels.template.text = "{category}: {value}";
      series1.labels.template.fontSize = 10;
      series1.numberFormatter = numberFormatter;
    } else if (chartType === "map") {
      chart = am4core.create(chartRef.current, am4maps.MapChart);
      chart.geodata = am4geodata_ir;
      chart.projection = new am4maps.projections.Miller();

      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.data = data;
      polygonSeries.numberFormatter = numberFormatter;

      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value.formatNumber('#')} نفر";
      polygonTemplate.fill = am4core.color("#cfcfcf");
      polygonTemplate.stroke = am4core.color("#ffffff");
      polygonTemplate.strokeWidth = 1;
      polygonTemplate.propertyFields.fill = "fill";

      chart.rtl = true;
      if (chart.container) {
        chart.container.direction = "rtl";
        chart.container.layout = "horizontal";
      }

      if (!polygonTemplate.tooltip) {
        polygonTemplate.tooltip = new am4core.Tooltip();
      }
      polygonTemplate.tooltip.numberFormatter = numberFormatter;
      polygonTemplate.tooltip.direction = "rtl";
      polygonTemplate.tooltip.label.textAlign = "right";
      polygonTemplate.tooltip.label.fontSize = 14;

      polygonSeries.dataFields.value = "value";
      polygonSeries.dataFields.id = "id";
      polygonSeries.dataFields.name = "name";
    }

    return () => {
      if (chart) chart.dispose();
    };
  }, [selectedOptions]);

  const { description } = generateFakeData(selectedOptions);

  return (
    <div className="category-result-chart">
      <p className="chart-description">{description}</p>
      <div
        id="chartdiv"
        ref={chartRef}
        style={{ width: "100%", height: "400px", margin: "auto" }}
      />
    </div>
  );
};

export default CategoryResultChart;
