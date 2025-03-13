// import React, { useLayoutEffect, useRef, useState } from "react";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_ir from "@amcharts/amcharts4-geodata/iranLow";
// import generateFakeChartData from "../../pages/fakeApi";

// // تابع برای تبدیل اعداد به ارقام فارسی
// const toPersianNumber = (num) => {
//   const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   return num
//     .toString()
//     .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
// };

// const ChartComponent = ({ chartType, filters }) => {
//   const chartRef = useRef(null);
//   const [description, setDescription] = useState("");

//   useLayoutEffect(() => {
//     let chart;
//     const result = generateFakeChartData(filters, chartType);
//     const chartData = result.data;
//     const supportedCharts = result.supportedCharts || [];
//     setDescription(result.description || "");

//     console.log("chartData:", chartData);
//     console.log("supportedCharts:", supportedCharts);

//     // اگر داده‌ای وجود نداره یا چارت فعلی پشتیبانی نمی‌شه
//     if (
//       !chartData ||
//       chartData.length === 0 ||
//       !supportedCharts.includes(chartType)
//     ) {
//       // به جای رندر نمودار، پیام رو نشون بده
//       const placeholder = document.createElement("div");
//       placeholder.style.width = "100%";
//       placeholder.style.height = "400px";
//       placeholder.style.display = "flex";
//       placeholder.style.alignItems = "center";
//       placeholder.style.justifyContent = "center";
//       placeholder.style.background = "rgba(0, 0, 0, 0.1)"; // پس‌زمینه تار
//       placeholder.style.backdropFilter = "blur(5px)"; // افکت تار
//       placeholder.style.color = "#333";
//       placeholder.style.fontSize = "24px";
//       placeholder.style.fontFamily = "Vazir, Arial, sans-serif"; // فونت فارسی
//       placeholder.style.textAlign = "center";
//       placeholder.innerText = result.description || "گزارشی یافت نشد";

//       chartRef.current.innerHTML = "";
//       chartRef.current.appendChild(placeholder);

//       return () => {
//         chartRef.current.innerHTML = "";
//       };
//     }

//     // تنظیم جهت RTL
//     am4core.options.defaultLocale = {
//       ...am4core.options.defaultLocale,
//       direction: "rtl",
//     };

//     // فرمت‌کننده اعداد فارسی
//     const numberFormatter = new am4core.NumberFormatter();
//     numberFormatter.numberFormat = "#.";
//     numberFormatter.format = (value) => toPersianNumber(value);

//     if (chartType === "bar") {
//       chart = am4core.create(chartRef.current, am4charts.XYChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//       categoryAxis.dataFields.category = "category";
//       categoryAxis.renderer.grid.template.location = 0;
//       categoryAxis.renderer.minGridDistance = 20;
//       categoryAxis.renderer.labels.template.rotation = -45;
//       categoryAxis.renderer.labels.template.horizontalCenter = "right";
//       categoryAxis.renderer.labels.template.verticalCenter = "middle";
//       categoryAxis.renderer.labels.template.truncate = false;
//       categoryAxis.renderer.labels.template.wrap = true;
//       categoryAxis.renderer.labels.template.fontSize = 12;

//       let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//       valueAxis.title.text = "تعداد (نفر)";
//       valueAxis.numberFormatter = numberFormatter;
//       valueAxis.renderer.labels.template.fontSize = 12;

//       let series = chart.series.push(new am4charts.ColumnSeries());
//       series.dataFields.valueY = "value";
//       series.dataFields.categoryX = "category";
//       series.columns.template.tooltipText = "{category}: {value} نفر";
//       series.columns.template.fillOpacity = 0.8;
//       series.columns.template.width = am4core.percent(70);

//       series.numberFormatter = numberFormatter;
//     } else if (chartType === "pie") {
//       chart = am4core.create(chartRef.current, am4charts.PieChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let pieSeries = chart.series.push(new am4charts.PieSeries());
//       pieSeries.dataFields.value = "value";
//       pieSeries.dataFields.category = "category";
//       pieSeries.labels.template.text = "{category}: {value}%";
//       pieSeries.labels.template.fontSize = 12;
//       pieSeries.radius = am4core.percent(80);
//       // محدود کردن عرض برچسب‌ها
//       pieSeries.labels.template.maxWidth = 100; // حداکثر عرض برچسب (پیکسل)
//       pieSeries.labels.template.truncate = true; // کوتاه کردن متن با ...
//       pieSeries.labels.template.radius = am4core.percent(-5); // جابجایی برچسب به سمت داخل
//       pieSeries.labels.template.inside = true; // نمایش برچسب داخل دایره
//       pieSeries.labels.template.fontSize = 10; // کاهش اندازه فونت برای جایگیری بهتر
//       pieSeries.labels.template.location = 0.5; // تنظیم موقعیت برچسب‌ها روی لبه دایره
//       pieSeries.alignLabels = true; // هم‌تراز کردن خودکار برچسب‌ها

//       pieSeries.numberFormatter = numberFormatter;
//     } else if (chartType === "semiCircle") {
//       chart = am4core.create(chartRef.current, am4charts.PieChart);
//       chart.data = chartData;
//       chart.startAngle = 180;
//       chart.endAngle = 360;
//       chart.rtl = true;

//       let series = chart.series.push(new am4charts.PieSeries());
//       series.dataFields.value = "value";
//       series.dataFields.category = "category";
//       series.labels.template.text = "{category}: {value}%";
//       series.labels.template.fontSize = 12;
//       series.labels.template.radius = -15; // فاصله از لبه به پیکسل
//       series.labels.template.rotation = 45;
//       series.radius = am4core.percent(80);
//       series.numberFormatter = numberFormatter;
//     } else if (chartType === "nestedDonut") {
//       chart = am4core.create(chartRef.current, am4charts.PieChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let series1 = chart.series.push(new am4charts.PieSeries());
//       series1.dataFields.value = "value";
//       series1.dataFields.category = "category";
//       series1.radius = am4core.percent(60);
//       series1.innerRadius = am4core.percent(30);
//       series1.labels.template.text = "{category}: {value}%";
//       series1.labels.template.fontSize = 10;
//       series1.numberFormatter = numberFormatter;

//       let series2 = chart.series.push(new am4charts.PieSeries());
//       series2.data = chartData.map((item) => ({
//         ...item,
//         value: item.value * 0.5,
//       }));
//       series2.dataFields.value = "value";
//       series2.dataFields.category = "category";
//       series2.radius = am4core.percent(30);
//       series2.innerRadius = am4core.percent(15);
//       series2.labels.template.text = "{category}: {value}%";
//       series2.labels.template.fontSize = 10;
//       series2.numberFormatter = numberFormatter;
//     } else if (chartType === "pictorial") {
//       chart = am4core.create(chartRef.current, am4charts.SlicedChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let series = chart.series.push(new am4charts.PictorialStackedSeries());
//       series.dataFields.value = "value";
//       series.dataFields.category = "category";
//       series.maskSprite.path = "M10,0h60v60h-60z";
//       series.labels.template.text = "{category}: {value} نفر";
//       series.labels.template.fontSize = 12;
//       series.labels.template.disabled = false;
//       series.ticks.template.disabled = false;
//       series.numberFormatter = numberFormatter;
//     } else if (chartType === "map") {
//       chart = am4core.create(chartRef.current, am4maps.MapChart);
//       chart.geodata = am4geodata_ir;
//       chart.projection = new am4maps.projections.Miller();

//       let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
//       polygonSeries.useGeodata = true;
//       polygonSeries.data = chartData;
//       polygonSeries.numberFormatter = numberFormatter;

//       let polygonTemplate = polygonSeries.mapPolygons.template;
//       polygonTemplate.tooltipText =
//         "{name}: [bold]{value.formatNumber('#')}[/] نفر";
//       polygonTemplate.fill = am4core.color("#cfcfcf");
//       polygonTemplate.stroke = am4core.color("#ffffff");
//       polygonTemplate.strokeWidth = 1;
//       polygonTemplate.propertyFields.fill = "fill";

//       // اطمینان از وجود تولتیپ
//       if (!polygonTemplate.tooltip) {
//         polygonTemplate.tooltip = new am4core.Tooltip();
//       }

//       // تنظیمات تولتیپ
//       polygonTemplate.tooltip.getFillFromObject = false;
//       polygonTemplate.tooltip.background.fill = am4core.color("#ffffff");
//       polygonTemplate.tooltip.background.stroke = am4core.color("#000000");
//       polygonTemplate.tooltip.background.strokeWidth = 1;
//       polygonTemplate.tooltip.label.padding(5, 5, 5, 5);
//       polygonTemplate.tooltip.pointerOrientation = "horizontal";
//       polygonTemplate.tooltip.fitPointerToBounds = true;
//       polygonTemplate.tooltip.direction = "rtl";
//       polygonTemplate.tooltip.label.textAlign = "right";
//       polygonTemplate.tooltip.label.fill = am4core.color("#000000");
//       polygonTemplate.tooltip.label.fontSize = 14;
//       polygonTemplate.tooltip.numberFormatter = numberFormatter;

//       // تنظیم موقعیت هوشمند تولتیپ با آداپتر
//       polygonTemplate.adapter.add("tooltipX", function (x, target) {
//         let tooltip = target.tooltip;
//         let chartWidth = chart.svgContainer.htmlElement.offsetWidth;
//         let tooltipWidth = tooltip.pixelWidth;

//         // اگر تولتیپ از سمت راست چارت خارج شود، به چپ منتقلش کن
//         if (x + tooltipWidth > chartWidth) {
//           return x - tooltipWidth - 20; // جابجایی به چپ
//         }
//         return x + 10; // جابجایی به راست
//       });

//       polygonTemplate.adapter.add("tooltipY", function (y, target) {
//         let tooltip = target.tooltip;
//         let chartHeight = chart.svgContainer.htmlElement.offsetHeight;
//         let tooltipHeight = tooltip.pixelHeight;

//         // اگر تولتیپ از پایین چارت خارج شود، به بالا منتقلش کن
//         if (y + tooltipHeight > chartHeight) {
//           return y - tooltipHeight - 10; // جابجایی به بالا
//         }
//         return y - 10; // جابجایی به بالا (پیش‌فرض)
//       });

//       if (chart.container) {
//         chart.container.direction = "rtl";
//         chart.container.layout = "horizontal";
//       }
//       chart.rtl = true;
//     } else {
//       chart = am4core.create(chartRef.current, am4charts.XYChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//       categoryAxis.dataFields.category = "category";
//       categoryAxis.renderer.grid.template.location = 0;
//       categoryAxis.renderer.minGridDistance = 20;
//       categoryAxis.renderer.labels.template.rotation = -45;
//       categoryAxis.renderer.labels.template.truncate = false;
//       categoryAxis.renderer.labels.template.wrap = true;
//       categoryAxis.renderer.labels.template.fontSize = 12;

//       let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//       valueAxis.title.text = "تعداد (نفر)";
//       valueAxis.numberFormatter = numberFormatter;
//       valueAxis.renderer.labels.template.fontSize = 12;

//       let series = chart.series.push(new am4charts.LineSeries());
//       series.dataFields.valueY = "value";
//       series.dataFields.categoryX = "category";
//       series.tooltipText = "{category}: {value} نفر";
//       series.numberFormatter = numberFormatter;
//     }

//     return () => {
//       if (chart) chart.dispose();
//     };
//   }, [chartType, filters]);

//   return (
//     <div className="chart-container">
//       <p className="chart-description">{description}</p>
//       <div
//         className="chart-placeholder"
//         ref={chartRef}
//         style={{ width: "100%", height: "400px" }}
//       />
//     </div>
//   );
// };

// export default ChartComponent;
//////////////////////////////

// import React, { useLayoutEffect, useRef } from "react";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

// // تابع برای تبدیل اعداد به ارقام فارسی
// const toPersianNumber = (num) => {
//   const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   return num
//     .toString()
//     .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
// };

// // تابع تبدیل داده‌های Chart.js به amCharts
// const convertChartJsToAmCharts = (data) => {
//   if (!data || !data.labels || !data.datasets || !data.datasets[0]) {
//     return [];
//   }
//   const labels = data.labels;
//   const dataset = data.datasets[0];
//   return labels.map((label, index) => ({
//     category: label,
//     value: dataset.data[index],
//   }));
// };

// const ChartComponent = ({ chartType, data }) => {
//   const chartRef = useRef(null);

//   useLayoutEffect(() => {
//     let chart;

//     // تبدیل داده‌ها به فرمت amCharts
//     const chartData = convertChartJsToAmCharts(data);

//     // اگر داده‌ای وجود نداره
//     if (!chartData || chartData.length === 0) {
//       const placeholder = document.createElement("div");
//       placeholder.style.width = "100%";
//       placeholder.style.height = "400px";
//       placeholder.style.display = "flex";
//       placeholder.style.alignItems = "center";
//       placeholder.style.justifyContent = "center";
//       placeholder.style.background = "rgba(0, 0, 0, 0.1)";
//       placeholder.style.backdropFilter = "blur(5px)";
//       placeholder.style.color = "#333";
//       placeholder.style.fontSize = "24px";
//       placeholder.style.fontFamily = "Vazir, Arial, sans-serif";
//       placeholder.style.textAlign = "center";
//       placeholder.innerText = "داده‌ای برای نمایش وجود ندارد";

//       chartRef.current.innerHTML = "";
//       chartRef.current.appendChild(placeholder);

//       return () => {
//         chartRef.current.innerHTML = "";
//       };
//     }

//     // تنظیم جهت RTL
//     am4core.options.defaultLocale = {
//       ...am4core.options.defaultLocale,
//       direction: "rtl",
//     };

//     // فرمت‌کننده اعداد فارسی
//     const numberFormatter = new am4core.NumberFormatter();
//     numberFormatter.numberFormat = "#.";
//     numberFormatter.format = (value) => toPersianNumber(value);

//     if (chartType === "bar") {
//       chart = am4core.create(chartRef.current, am4charts.XYChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//       categoryAxis.dataFields.category = "category";
//       categoryAxis.renderer.grid.template.location = 0;
//       categoryAxis.renderer.minGridDistance = 20;
//       categoryAxis.renderer.labels.template.rotation = -45;
//       categoryAxis.renderer.labels.template.horizontalCenter = "right";
//       categoryAxis.renderer.labels.template.verticalCenter = "middle";
//       categoryAxis.renderer.labels.template.truncate = false;
//       categoryAxis.renderer.labels.template.wrap = true;
//       categoryAxis.renderer.labels.template.fontSize = 12;

//       let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//       valueAxis.title.text = "امتیاز";
//       valueAxis.numberFormatter = numberFormatter;
//       valueAxis.renderer.labels.template.fontSize = 12;

//       let series = chart.series.push(new am4charts.ColumnSeries());
//       series.dataFields.valueY = "value";
//       series.dataFields.categoryX = "category";
//       series.columns.template.tooltipText = "{category}: {value}";
//       series.columns.template.fillOpacity = 0.8;
//       series.columns.template.width = am4core.percent(70);
//       series.columns.template.fill = am4core.color("rgba(75, 192, 192, 0.2)");
//       series.columns.template.stroke = am4core.color("rgba(75, 192, 192, 1)");
//       series.columns.template.strokeWidth = 1;
//       series.numberFormatter = numberFormatter;
//     } else if (chartType === "line") {
//       chart = am4core.create(chartRef.current, am4charts.XYChart);
//       chart.data = chartData;
//       chart.rtl = true;

//       let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//       categoryAxis.dataFields.category = "category";
//       categoryAxis.renderer.grid.template.location = 0;
//       categoryAxis.renderer.minGridDistance = 20;
//       categoryAxis.renderer.labels.template.rotation = -45;
//       categoryAxis.renderer.labels.template.truncate = false;
//       categoryAxis.renderer.labels.template.wrap = true;
//       categoryAxis.renderer.labels.template.fontSize = 12;

//       let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//       valueAxis.title.text = "درصد موفقیت";
//       valueAxis.numberFormatter = numberFormatter;
//       valueAxis.renderer.labels.template.fontSize = 12;

//       let series = chart.series.push(new am4charts.LineSeries());
//       series.dataFields.valueY = "value";
//       series.dataFields.categoryX = "category";
//       series.tooltipText = "{category}: {value}";
//       series.stroke = am4core.color("rgb(75, 192, 192)");
//       series.strokeWidth = 2;
//       series.tensionX = 0.1; // معادل tension در Chart.js
//       series.numberFormatter = numberFormatter;
//     }

//     return () => {
//       if (chart) chart.dispose();
//     };
//   }, [chartType, data]);

//   return (
//     <div className="chart-container">
//       <div
//         className="chart-placeholder"
//         ref={chartRef}
//         style={{ width: "100%", height: "400px" }}
//       />
//     </div>
//   );
// };

// export default ChartComponent;

/////////////////////////
import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_ir from "@amcharts/amcharts4-geodata/iranLow";

// تابع برای تبدیل اعداد به ارقام فارسی
const toPersianNumber = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// تابع تبدیل داده‌های Chart.js به amCharts
const convertChartJsToAmCharts = (data) => {
  if (!data || !data.labels || !data.datasets || !data.datasets.length) {
    return [];
  }
  const labels = data.labels;
  return labels.map((label, index) => {
    const result = { category: label };
    data.datasets.forEach((dataset, datasetIndex) => {
      // فقط برای سری اول (value0) مقدار رو برای هر دسته تنظیم کن
      if (datasetIndex === 0) {
        result[`value${datasetIndex}`] = dataset.data[index] || 0;
      } else if (datasetIndex === 1) {
        // برای سری دوم (value1)، فقط برای آخرین دسته مقدار 1500 رو اعمال کن
        result[`value${datasetIndex}`] =
          index === labels.length - 1 ? dataset.data[0] : 0;
      }
      result[`backgroundColor${datasetIndex}`] = dataset.backgroundColor
        ? Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[index] || dataset.backgroundColor[0]
          : dataset.backgroundColor
        : "rgba(75, 192, 192, 0.2)";
      result[`borderColor${datasetIndex}`] = dataset.borderColor
        ? Array.isArray(dataset.borderColor)
          ? dataset.borderColor[index] || dataset.borderColor[0]
          : dataset.borderColor
        : "rgba(75, 192, 192, 1)";
    });
    return result;
  });
};

const ChartComponent = ({ chartType, data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let chart;

    // تشخیص نوع داده و تبدیل مناسب
    let chartData;
    if (chartType === "map") {
      chartData = Array.isArray(data) ? data : [];
      console.log("Map Data:", chartData);
    } else {
      chartData = convertChartJsToAmCharts(data);
      console.log("Chart.js Data:", chartData);
    }

    // اگر داده‌ای وجود نداره
    if (!chartData || chartData.length === 0) {
      const placeholder = document.createElement("div");
      placeholder.style.width = "100%";
      placeholder.style.height = "400px";
      placeholder.style.display = "flex";
      placeholder.style.alignItems = "center";
      placeholder.style.justifyContent = "center";
      placeholder.style.background = "rgba(0, 0, 0, 0.1)";
      placeholder.style.backdropFilter = "blur(5px)";
      placeholder.style.color = "#333";
      placeholder.style.fontSize = "24px";
      placeholder.style.fontFamily = "Vazir, Arial, sans-serif";
      placeholder.style.textAlign = "center";
      placeholder.innerText = "داده‌ای برای نمایش وجود ندارد";

      chartRef.current.innerHTML = "";
      chartRef.current.appendChild(placeholder);

      return () => {
        chartRef.current.innerHTML = "";
      };
    }

    // تنظیم جهت RTL
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
      chart.data = chartData;
      chart.rtl = true;
      chart.paddingRight = 20;
      chart.paddingBottom = 70;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.labels.template.rotation = -90;
      categoryAxis.renderer.labels.template.truncate = true;
      categoryAxis.renderer.labels.template.maxWidth = 80;
      categoryAxis.renderer.labels.template.fontSize = 10;
      categoryAxis.renderer.labels.template.dx = -10;
      categoryAxis.renderer.labels.template.textAlign = "right";
      categoryAxis.renderer.labels.template.horizontalCenter = "right";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "ظرفیت مشاغل";
      valueAxis.numberFormatter = numberFormatter;
      valueAxis.renderer.labels.template.fontSize = 12;
      valueAxis.renderer.labels.template.textAlign = "right";
      valueAxis.renderer.labels.template.horizontalCenter = "right";

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value0";
      series.dataFields.categoryX = "category";
      series.columns.template.tooltipText = "{category}: {value0}";
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.width = am4core.percent(15);
      series.columns.template.propertyFields.fill = "backgroundColor0";
      series.columns.template.propertyFields.stroke = "borderColor0";
      series.columns.template.strokeWidth = 1;
      series.numberFormatter = numberFormatter;

      // تعریف صریح تولتیپ برای سری اول
      if (!series.columns.template.tooltip) {
        series.columns.template.tooltip = new am4core.Tooltip();
      }
      series.columns.template.tooltip.background.fill =
        am4core.color("#ffffff");
      series.columns.template.tooltip.label.fill = am4core.color("#000000");
      series.columns.template.tooltip.label.textAlign = "right";

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "value1";
      series2.dataFields.categoryX = "category";
      series2.columns.template.tooltipText = "{category}: {value1}";
      series2.columns.template.fillOpacity = 0.8;
      series2.columns.template.width = am4core.percent(15);
      series2.columns.template.propertyFields.fill = "backgroundColor1";
      series2.columns.template.propertyFields.stroke = "borderColor1";
      series2.columns.template.strokeWidth = 1;
      series2.numberFormatter = numberFormatter;

      // تعریف صریح تولتیپ برای سری دوم
      if (!series2.columns.template.tooltip) {
        series2.columns.template.tooltip = new am4core.Tooltip();
      }
      series2.columns.template.tooltip.background.fill =
        am4core.color("#ffffff");
      series2.columns.template.tooltip.label.fill = am4core.color("#000000");
      series2.columns.template.tooltip.label.textAlign = "right";
    } else if (chartType === "line") {
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
      categoryAxis.renderer.labels.template.textAlign = "right";
      categoryAxis.renderer.labels.template.horizontalCenter = "right";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "درصد موفقیت";
      valueAxis.numberFormatter = numberFormatter;
      valueAxis.renderer.labels.template.fontSize = 12;
      valueAxis.renderer.labels.template.textAlign = "right";
      valueAxis.renderer.labels.template.horizontalCenter = "right";

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value0";
      series.dataFields.categoryX = "category";
      series.tooltipText = "{category}: {value0}";
      series.stroke = am4core.color("rgb(75, 192, 192)");
      series.strokeWidth = 2;
      series.tensionX = 0.1;
      series.numberFormatter = numberFormatter;

      if (!series.tooltip) {
        series.tooltip = new am4core.Tooltip();
      }
      series.tooltip.background.fill = am4core.color("#ffffff");
      series.tooltip.label.fill = am4core.color("#000000");
      series.tooltip.label.textAlign = "right";
    } else if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.rtl = true;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value0";
      pieSeries.dataFields.category = "category";
      pieSeries.labels.template.text = "{category}: {value0} نفر";
      pieSeries.labels.template.fontSize = 14;
      pieSeries.radius = am4core.percent(80);
      pieSeries.innerRadius = am4core.percent(20);
      pieSeries.slices.template.propertyFields.fill = "backgroundColor0";
      pieSeries.slices.template.propertyFields.stroke = "borderColor0";
      pieSeries.slices.template.strokeWidth = 1;
      pieSeries.labels.template.fill = am4core.color("#fff");
      pieSeries.labels.template.radius = 10;
      pieSeries.labels.template.inside = true;
      pieSeries.alignLabels = true;
      pieSeries.numberFormatter = numberFormatter;

      pieSeries.hiddenState.properties.opacity = 0;
      pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;
      pieSeries.slices.template.states.getKey(
        "active"
      ).properties.shiftRadius = 0.05;

      if (!pieSeries.slices.template.tooltip) {
        pieSeries.slices.template.tooltip = new am4core.Tooltip();
      }
      pieSeries.slices.template.tooltip.background.fill =
        am4core.color("#ffffff");
      pieSeries.slices.template.tooltip.label.fill = am4core.color("#000000");
      pieSeries.slices.template.tooltip.label.textAlign = "right";
    } else if (chartType === "map") {
      chart = am4core.create(chartRef.current, am4maps.MapChart);
      chart.geodata = am4geodata_ir;
      chart.projection = new am4maps.projections.Miller();

      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.data = chartData;
      polygonSeries.numberFormatter = numberFormatter;

      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value} نفر";
      polygonTemplate.fill = am4core.color("#cfcfcf");
      polygonTemplate.stroke = am4core.color("#ffffff");
      polygonTemplate.strokeWidth = 1;

      polygonSeries.heatRules.push({
        property: "fill",
        target: polygonTemplate,
        min: am4core.color("#e6f3ff"),
        max: am4core.color("#0066cc"),
        minValue: 0,
        maxValue: 50,
      });

      if (!polygonTemplate.tooltip) {
        polygonTemplate.tooltip = new am4core.Tooltip();
      }
      polygonTemplate.tooltip.background.fill = am4core.color("#ffffff");
      polygonTemplate.tooltip.background.stroke = am4core.color("#000000");
      polygonTemplate.tooltip.label.fill = am4core.color("#000000");
      polygonTemplate.tooltip.label.fontSize = 14;
      polygonTemplate.tooltip.numberFormatter = numberFormatter;
      polygonTemplate.tooltip.label.textAlign = "right";

      chart.rtl = true;
    }

    return () => {
      if (chart) chart.dispose();
    };
  }, [chartType, data]);

  return (
    <div className="chart-container">
      <div
        className="chart-placeholder"
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ChartComponent;
