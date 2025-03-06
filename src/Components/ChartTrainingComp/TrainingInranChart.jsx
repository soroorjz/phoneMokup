import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_ir from "@amcharts/amcharts4-geodata/iranLow";

const TrainingInranChart = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // ایجاد چارت
    let chart = am4core.create(chartRef.current, am4maps.MapChart);
    chart.geodata = am4geodata_ir;
    chart.projection = new am4maps.projections.Miller();

    // تنظیم سری polygon برای نمایش استان‌ها
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // تنظیم قالب polygonها
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value} نفر"; // متن tooltip
    polygonTemplate.fill = am4core.color("#cfcfcf"); // رنگ پیش‌فرض
    polygonTemplate.stroke = am4core.color("#ffffff"); // رنگ خطوط مرزها
    polygonTemplate.strokeWidth = 1; // عرض خطوط مرزها

    // ایجاد و تنظیم tooltip صراحتاً
    if (!polygonTemplate.tooltip) {
      polygonTemplate.tooltip = new am4core.Tooltip(); // ایجاد tooltip اگر وجود نداره
    }

    // تنظیمات پیشرفته‌تر برای tooltip با پشتیبانی RTL
    polygonTemplate.tooltip.getFillFromObject = false; // جلوگیری از ارث‌بری رنگ
    polygonTemplate.tooltip.background.fill = am4core.color("#ffffff"); // رنگ پس‌زمینه tooltip
    polygonTemplate.tooltip.background.stroke = am4core.color("#000000"); // رنگ حاشیه tooltip
    polygonTemplate.tooltip.background.strokeWidth = 1; // عرض حاشیه tooltip
    polygonTemplate.tooltip.label.padding(5, 5, 5, 5); // پدینگ داخلی tooltip
    polygonTemplate.tooltip.pointerOrientation = "horizontal"; // جهت نشانگر افقی
    polygonTemplate.tooltip.fitPointerToBounds = true; // اطمینان از پوزیشن درست نشانگر در محدوده چارت
    // polygonTemplate.tooltip.bounds = chart.plotContainer; // محدود کردن tooltip به محدوده چارت
    polygonTemplate.tooltip.direction = "rtl"; // تنظیم جهت راست‌به‌چپ برای tooltip
    // polygonTemplate.tooltip.label.horizontalCenter = "right"; // تنظیم مرکز افقی متن به راست
    // polygonTemplate.tooltip.label.verticalCenter = "middle"; // تنظیم مرکز عمودی متن

    // تنظیم فونت و جهت متن در tooltip
    polygonTemplate.tooltip.label.fontSize = 14; // اندازه فونت
    polygonTemplate.tooltip.label.fill = am4core.color("#000000"); // رنگ متن
    polygonTemplate.tooltip.label.textAlign = "right"; // چیدمان متن به راست

    // اتصال داده‌ها به سری
    polygonSeries.data = data;

    // تنظیم رنگ بر اساس مقدار value
    polygonTemplate.propertyFields.fill = "fill"; // رنگ رو از فیلد fill می‌گیره
    polygonSeries.dataFields.value = "value"; // فیلد مقدار
    polygonSeries.dataFields.id = "id"; // شناسه هر استان

    // رنگ‌بندی شرطی بر اساس مقدار value
    polygonTemplate.adapter.add("fill", (fill, target) => {
      const value = target.dataItem?.dataContext?.value || 0;
      if (value > 8000000) return am4core.color("#dc8c67"); 
      if (value > 6000000) return am4core.color("#dc6788"); 
      if (value > 4000000) return am4core.color("#a367dc"); 
      if (value > 2000000) return am4core.color("#8067dc"); 
      return am4core.color("#67b7dc"); 
    });

    // ذخیره چارت در ref
    chartRef.current = chart;

    // تمیز کردن چارت موقع unmount
    return () => chart.dispose();
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        direction: "ltr",
      }}
    />
  );
};

export default TrainingInranChart;
