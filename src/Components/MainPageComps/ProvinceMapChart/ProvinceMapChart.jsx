// src/components/ProvinceMapChart.jsx
import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_iran from "@amcharts/amcharts4-geodata/iranLow";

const ProvinceMapChart = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    console.log("داده‌های وارد شده به ProvinceMapChart:", data);

    if (!chartRef.current) {
      console.error("chartRef.current تعریف نشده است!");
      return;
    }

    // ایجاد چارت
    let chart = am4core.create(chartRef.current, am4maps.MapChart);
    chart.geodata = am4geodata_iran;
    chart.projection = new am4maps.projections.Miller();

    // تنظیم سری polygon برای نمایش استان‌ها
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // تنظیم قالب polygonها
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value} نفر";
    polygonTemplate.fill = am4core.color("#6794dc"); // رنگ پیش‌فرض
    polygonTemplate.stroke = am4core.color("#ffffff");
    polygonTemplate.strokeWidth = 1;

    // تنظیمات tooltip
    if (!polygonTemplate.tooltip) {
      polygonTemplate.tooltip = new am4core.Tooltip();
    }
    polygonTemplate.tooltip.background.fill = am4core.color("#ffffff");
    polygonTemplate.tooltip.background.stroke = am4core.color("#000000");
    polygonTemplate.tooltip.background.strokeWidth = 1;
    polygonTemplate.tooltip.label.padding(5, 5, 5, 5);
    polygonTemplate.tooltip.label.fontSize = 14;
    polygonTemplate.tooltip.label.fill = am4core.color("#000000");
    polygonTemplate.tooltip.label.textAlign = "right";
    polygonTemplate.tooltip.direction = "rtl";

    // هاور
    let hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = am4core.color("#ff6384");

    // اتصال داده‌ها
    polygonSeries.data = data;
    polygonSeries.dataFields.value = "value";
    polygonSeries.dataFields.id = "id";
    console.log("داده‌ها به سری متصل شدند:", polygonSeries.data);

    // پیدا کردن حداقل و حداکثر مقدار برای رنج رنگی
    const values = data.map((item) => item.value).filter((v) => v > 0);
    const minValue = Math.min(...values) || 0;
    const maxValue = Math.max(...values) || 1; // جلوگیری از تقسیم بر صفر

    // تابع محاسبه رنگ بر اساس مقدار (آبی کم‌رنگ به بنفش پررنگ)
    const getColor = (value) => {
      if (value === 0) return am4core.color("#e0e0e0"); // خاکستری برای صفر

      const ratio = (value - minValue) / (maxValue - minValue); // نرمال‌سازی بین 0 و 1
      const clampedRatio = Math.max(0, Math.min(1, ratio)); // محدود کردن بین 0 و 1

      // گرادیان از آبی کم‌رنگ (#67b7dc) به بنفش پررنگ (#dc67dc)
      const r = Math.round(103 + (220 - 103) * clampedRatio); // از 103 به 220
      const g = Math.round(183 + (103 - 183) * clampedRatio); // از 183 به 103
      const b = Math.round(220 + (220 - 220) * clampedRatio); // از 220 به 220 (ثابت نگه می‌داریم)

      return am4core.color(`rgb(${r}, ${g}, ${b})`);
    };

    // اعمال رنگ به هر استان
    polygonTemplate.adapter.add("fill", (fill, target) => {
      const value = target.dataItem?.dataContext?.value || 0;
      return getColor(value);
    });

    // ذخیره چارت
    chartRef.current = chart;

    // تمیز کردن
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
        backgroundColor: "#f0f0f0",
      }}
    />
  );
};

export default ProvinceMapChart;