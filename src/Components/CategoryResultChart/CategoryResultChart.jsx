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

const generateFakeData = (selectedOptions) => {
  const provinces = [
    { id: "IR-01", name: "آذربايجان شرقي" },
    { id: "IR-02", name: "آذربايجان غربي" },
    { id: "IR-03", name: "اردبيل" },
    { id: "IR-04", name: "اصفهان" },
    { id: "IR-32", name: "البرز" },
    { id: "IR-05", name: "ايلام" },
    { id: "IR-06", name: "بوشهر" },
    { id: "IR-07", name: "تهران" },
    { id: "IR-08", name: "چهارمحال و بختياري" },
    { id: "IR-29", name: "خراسان جنوبي" },
    { id: "IR-30", name: "خراسان رضوي" },
    { id: "IR-31", name: "خراسان شمالي" },
    { id: "IR-10", name: "خوزستان" },
    { id: "IR-11", name: "زنجان" },
    { id: "IR-12", name: "سمنان" },
    { id: "IR-13", name: "سيستان و بلوچستان" },
    { id: "IR-14", name: "فارس" },
    { id: "IR-28", name: "قزوين" },
    { id: "IR-26", name: "قم" },
    { id: "IR-16", name: "كردستان" },
    { id: "IR-15", name: "كرمان" },
    { id: "IR-17", name: "كرمانشاه" },
    { id: "IR-18", name: "كهكيلويه و بويراحمد" },
    { id: "IR-27", name: "گلستان" },
    { id: "IR-19", name: "گيلان" },
    { id: "IR-20", name: "لرستان" },
    { id: "IR-21", name: "مازندران" },
    { id: "IR-22", name: "مركزي" },
    { id: "IR-23", name: "هرمزگان" },
    { id: "IR-24", name: "همدان" },
    { id: "IR-25", name: "يزد" },
  ];

  const getRandomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const totalParticipants = 250000; // تعداد کل شرکت‌کنندگان
  let data = [];
  let chartType = "";
  let description = "";

  const getColorByValue = (value) => {
    if (value > 10000) return "#d32f2f"; // قرمز تیره
    if (value > 5000) return "#f57c00"; // نارنجی
    if (value > 3000) return "#fbc02d"; // زرد
    if (value > 1000) return "#388e3c"; // سبز تیره
    return "#81c784"; // سبز روشن
  };

  // اطمینان از اینکه selectedOptions یک شیء معتبر است
  selectedOptions = selectedOptions || {};

  // سناریو 1: فقط شغل محل
  if (selectedOptions["شغل محل"] && Object.keys(selectedOptions).length === 1) {
    chartType = "pie";
    const absent = getRandomValue(5, 15);
    const failed = getRandomValue(20, 35);
    const passed = 100 - absent - failed;
    data = [
      { category: "غایب", value: absent },
      { category: "مردود", value: failed },
      { category: "قبول", value: passed },
    ];
    description = `گزارش عملکرد شغل محل: این نمودار دایره‌ای درصد نتایج شرکت‌کنندگان در شغل محل "${selectedOptions["شغل محل"]}" (غایب: ${Math.round(
      (absent / 100) * totalParticipants
    )} نفر، مردود: ${Math.round(
      (failed / 100) * totalParticipants
    )} نفر، قبول: ${Math.round(
      (passed / 100) * totalParticipants
    )} نفر) را از کل ${totalParticipants} شرکت‌کننده در سطح کشور نشان می‌دهد.`;
  }

  // سناریو 2: فقط سهمیه
  else if (selectedOptions["سهمیه"] && Object.keys(selectedOptions).length === 1) {
    chartType = "bar";
    data = [
      { category: "آزمون استخدامی 1400", value: getRandomValue(500, 5000) },
      { category: "آزمون استخدامی 1401", value: getRandomValue(1000, 6000) },
      { category: "آزمون استخدامی 1402", value: getRandomValue(2000, 8000) },
    ];
    description = `گزارش قبولی سهمیه: این نمودار میله‌ای تعداد قبولی‌های سهمیه "${selectedOptions["سهمیه"]}" را در سه آزمون استخدامی مختلف (از کل ${totalParticipants} شرکت‌کننده در کشور) مقایسه می‌کند، نشان‌دهنده روند موفقیت این سهمیه در سال‌های اخیر.`;
  }

  // سناریو 3: سهمیه + استان
  else if (selectedOptions["سهمیه"] && selectedOptions["استان"]) {
    chartType = "pie";
    const selectedProvince = selectedOptions["استان"].name || selectedOptions["استان"] || "نامشخص";
    const teacher = getRandomValue(20, 40);
    const admin = getRandomValue(15, 30);
    const medical = getRandomValue(10, 25);
    const others = 100 - (teacher + admin + medical);
    data = [
      { category: "معلم", value: teacher },
      { category: "کارمند اداری", value: admin },
      { category: "پزشک و پرستار", value: medical },
      { category: "سایر مشاغل", value: others >= 0 ? others : 0 }, // جلوگیری از مقدار منفی
    ];
    description = `گزارش مشاغل سهمیه در استان: این نمودار دایره‌ای درصد شغل‌های موجود برای سهمیه "${selectedOptions["سهمیه"]}" در استان "${selectedProvince}" (معلم: ${teacher}%، کارمند اداری: ${admin}%، پزشک و پرستار: ${medical}%، سایر: ${data[3].value}%) را نشان می‌دهد، بر اساس ظرفیت‌های شغلی آن منطقه از کل ${totalParticipants} نفر.`;
  }

  // سناریو 4: فقط جنسیت
  else if (selectedOptions["جنسیت"] && Object.keys(selectedOptions).length === 1) {
    chartType = "map";
    data = provinces.map((prov) => {
      const value = getRandomValue(500, 15000);
      return {
        id: prov.id,
        name: prov.name,
        value,
        fill: getColorByValue(value),
      };
    });
    description = `گزارش قبولی جنسیت: این نقشه تعداد قبول‌شدگان با جنسیت "${selectedOptions["جنسیت"]}" را در کل کشور (از ${totalParticipants} نفر) نشان می‌دهد، با رنگ‌هایی که شدت قبولی در هر استان را مشخص می‌کنند.`;
  }

  // سناریو 5: فقط استان
  else if (selectedOptions["استان"] && Object.keys(selectedOptions).length === 1) {
    chartType = "pie";
    const selectedProvince = selectedOptions["استان"].name || selectedOptions["استان"] || "نامشخص";
    const freeQuota = getRandomValue(20, 40);
    const veteranQuota = getRandomValue(15, 30);
    const deprivedQuota = getRandomValue(10, 25);
    const othersQuota = 100 - (freeQuota + veteranQuota + deprivedQuota);
    data = [
      { category: "سهمیه آزاد", value: freeQuota },
      { category: "سهمیه ایثارگران", value: veteranQuota },
      { category: "سهمیه مناطق محروم", value: deprivedQuota },
      { category: "سایر سهمیه‌ها", value: othersQuota >= 0 ? othersQuota : 0 }, // جلوگیری از مقدار منفی
    ];
    description = `گزارش قبولی سهمیه‌ها در استان: این نمودار دایره‌ای نسبت قبولی‌ها در سهمیه‌های مختلف در استان "${selectedProvince}" (آزاد: ${freeQuota}%، ایثارگران: ${veteranQuota}%، مناطق محروم: ${deprivedQuota}%، سایر: ${data[3].value}%) را از کل شرکت‌کنندگان (${totalParticipants} نفر) نشان می‌دهد.`;
  }

  // سناریو 6: فقط شغل
  else if (selectedOptions["شغل"] && Object.keys(selectedOptions).length === 1) {
    chartType = "map";
    data = provinces.map((prov) => {
      const value = getRandomValue(50, 2000); // ظرفیت منطقی برای یک شغل در هر استان
      return {
        id: prov.id,
        name: prov.name,
        value,
        fill: getColorByValue(value),
      };
    });
    description = `گزارش ظرفیت شغلی: این نقشه تعداد ظرفیت‌های درخواستی برای شغل "${selectedOptions["شغل"]}" را در هر استان از کل کشور نشان می‌دهد، با رنگ‌هایی که میزان تقاضا یا ظرفیت را مشخص می‌کنند (بر اساس ${totalParticipants} نفر شرکت‌کننده).`;
  }

  // سناریو 7: شغل محل + استان
  else if (selectedOptions["شغل محل"] && selectedOptions["استان"]) {
    chartType = "pie";
    const selectedProvince = selectedOptions["استان"].name || selectedOptions["استان"] || "نامشخص";
    const absent = getRandomValue(5, 15);
    const failed = getRandomValue(20, 35);
    const passed = 100 - absent - failed;
    data = [
      { category: "غایب", value: absent },
      { category: "مردود", value: failed },
      { category: "قبول", value: passed },
    ];
    description = `گزارش عملکرد شغل محل در استان: این نمودار دایره‌ای درصد نتایج شرکت‌کنندگان در شغل محل "${selectedOptions["شغل محل"]}" در استان "${selectedProvince}" (غایب: ${Math.round(
      (absent / 100) * totalParticipants
    )} نفر، مردود: ${Math.round(
      (failed / 100) * totalParticipants
    )} نفر، قبول: ${Math.round(
      (passed / 100) * totalParticipants
    )} نفر) را از کل ${totalParticipants} شرکت‌کننده نشان می‌دهد.`;
  }

  // سناریو 8: جنسیت + سهمیه
  else if (selectedOptions["جنسیت"] && selectedOptions["سهمیه"]) {
    chartType = "bar";
    data = [
      { category: "آزمون استخدامی 1400", value: getRandomValue(400, 4500) },
      { category: "آزمون استخدامی 1401", value: getRandomValue(800, 5500) },
      { category: "آزمون استخدامی 1402", value: getRandomValue(1500, 7000) },
    ];
    description = `گزارش قبولی جنسیت و سهمیه: این نمودار میله‌ای تعداد قبولی‌های جنسیت "${selectedOptions["جنسیت"]}" با سهمیه "${selectedOptions["سهمیه"]}" را در سه آزمون استخدامی مختلف (از کل ${totalParticipants} نفر) مقایسه می‌کند.`;
  }

  // سناریو 9: پیش‌فرض
  else {
    chartType = "map";
    data = provinces.map((prov) => {
      const value = getRandomValue(1000, 20000);
      return {
        id: prov.id,
        name: prov.name,
        value,
        fill: getColorByValue(value),
      };
    });
    description = `گزارش کلی مشارکت: این نقشه توزیع جغرافیایی کل شرکت‌کنندگان (${totalParticipants} نفر) را در سراسر کشور نشان می‌دهد، با رنگ‌هایی که شدت مشارکت در هر استان را مشخص می‌کنند.`;
  }

  // اطمینان از اینکه data همیشه یک آرایه معتبر است
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Data generation failed, falling back to default.");
    chartType = "bar";
    data = [{ category: "خطا", value: 100 }];
    description = "خطا در تولید داده‌ها: لطفاً ورودی‌ها را بررسی کنید.";
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
