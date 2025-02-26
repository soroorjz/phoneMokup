import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import iranGeoData from "@amcharts/amcharts5-geodata/iranLow";

const IranMapChart = () => {
  useEffect(() => {
    const root = am5.Root.new("iranMap");

    // فعال‌سازی تم و پشتیبانی RTL
    root.setThemes([am5themes_Animated.new(root)]);
    root.container.set("dir", "rtl"); // تنظیم جهت راست به چپ بر روی container

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelX: "none",
        wheelY: "none",
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: iranGeoData,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value} پذیرفته‌شده",
      interactive: true,
      fill: am5.color(0xcfcfcf),
      stroke: am5.color(0xffffff),
    });

    // استفاده از داده‌های فیک
    const fakeProvinceData = [
      { id: "IR-01", name: "آذربایجان شرقی", value: 450 },
      { id: "IR-02", name: "آذربایجان غربی", value: 280 },
      { id: "IR-03", name: "تهران", value: 850 },
      { id: "IR-04", name: "چهارمحال و بختیاری", value: 150 },
      { id: "IR-05", name: "خراسان جنوبی", value: 300 },
      { id: "IR-06", name: "خراسان رضوی", value: 700 },
      { id: "IR-07", name: "خوزستان", value: 490 },
      { id: "IR-08", name: "زنجان", value: 240 },
      { id: "IR-09", name: "سمنان", value: 320 },
      { id: "IR-10", name: "سیستان و بلوچستان", value: 120 },
      { id: "IR-11", name: "فارس", value: 540 },
      { id: "IR-12", name: "قزوین", value: 380 },
      { id: "IR-13", name: "قم", value: 460 },
      { id: "IR-14", name: "کردستان", value: 300 },
      { id: "IR-15", name: "کرمان", value: 390 },
      { id: "IR-16", name: "کرمانشاه", value: 310 },
      { id: "IR-17", name: "کهگیلویه و بویراحمد", value: 220 },
      { id: "IR-18", name: "گلستان", value: 370 },
      { id: "IR-19", name: "گیلان", value: 370 },
      { id: "IR-20", name: "لرستان", value: 280 },
      { id: "IR-21", name: "مازندران", value: 520 },
      { id: "IR-22", name: "مرکزی", value: 410 },
      { id: "IR-23", name: "هرمزگان", value: 220 },
      { id: "IR-24", name: "همدان", value: 280 },
      { id: "IR-25", name: "یزد", value: 400 },
      { id: "IR-26", name: "آذربایجان غربی", value: 290 },
      { id: "IR-27", name: "خراسان شمالی", value: 230 },
      { id: "IR-28", name: "سمنان", value: 340 },
      { id: "IR-29", name: "قم", value: 460 },
      { id: "IR-30", name: "کردستان", value: 350 },
      { id: "IR-31", name: "البرز", value: 500 },
      { id: "IR-32", name: "تهران", value: 850 },
    ];

    // اتصال داده‌های فیک به استان‌ها
    polygonSeries.data.setAll(fakeProvinceData);

    // رنگ‌بندی بر اساس تعداد قبولی‌ها
    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const value = target.dataItem?.dataContext?.value || 0;
      console.log(target.dataItem?.dataContext); // بررسی مقادیر استان‌ها
      if (value > 700) return am5.color(0xff0000); // قرمز (خیلی زیاد)
      if (value > 500) return am5.color(0xff8c00); // نارنجی پررنگ
      if (value > 300) return am5.color(0xffff00); // زرد
      if (value > 150) return am5.color(0x32cd32); // سبز روشن
      return am5.color(0x008000); // سبز تیره (خیلی کم)
    });

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="iranMap" style={{ width: "100%", height: "500px" }}></div>;
};

export default IranMapChart;
