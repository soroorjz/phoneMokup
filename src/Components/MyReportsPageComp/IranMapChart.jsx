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
    root.container.set("dir", "ltr"); // تنظیم جهت راست به چپ بر روی container

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

    const fakeProvinceData = [
      { id: "IR-01", name: "آذربایجان شرقی", value: 900 },
      { id: "IR-02", name: "آذربایجان غربی", value: 650 },
      { id: "IR-03", name: "تهران", value: 2200 }, // بالاترین پذیرش
      { id: "IR-04", name: "چهارمحال و بختیاری", value: 300 },
      { id: "IR-05", name: "خراسان جنوبی", value: 400 },
      { id: "IR-06", name: "خراسان رضوی", value: 1800 },
      { id: "IR-07", name: "خوزستان", value: 1200 },
      { id: "IR-08", name: "زنجان", value: 450 },
      { id: "IR-09", name: "سمنان", value: 350 },
      { id: "IR-10", name: "سیستان و بلوچستان", value: 500 },
      { id: "IR-11", name: "فارس", value: 1500 },
      { id: "IR-12", name: "قزوین", value: 600 },
      { id: "IR-13", name: "قم", value: 550 },
      { id: "IR-14", name: "کردستان", value: 520 },
      { id: "IR-15", name: "کرمان", value: 980 },
      { id: "IR-16", name: "کرمانشاه", value: 750 },
      { id: "IR-17", name: "کهگیلویه و بویراحمد", value: 250 },
      { id: "IR-18", name: "گلستان", value: 780 },
      { id: "IR-19", name: "گیلان", value: 820 },
      { id: "IR-20", name: "لرستان", value: 730 },
      { id: "IR-21", name: "مازندران", value: 1100 },
      { id: "IR-22", name: "مرکزی", value: 670 },
      { id: "IR-23", name: "هرمزگان", value: 420 },
      { id: "IR-24", name: "همدان", value: 580 },
      { id: "IR-25", name: "یزد", value: 500 },
      { id: "IR-26", name: "البرز", value: 920 },
      { id: "IR-27", name: "خراسان شمالی", value: 360 },
      { id: "IR-28", name: "ایلام", value: 200 }, // کمترین پذیرش
    ];

    // اتصال داده‌های فیک به استان‌ها
    polygonSeries.data.setAll(fakeProvinceData);

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const value = target.dataItem?.dataContext?.value || 0;

      if (value > 1800) return am5.color(0xff0000); // قرمز (بسیار زیاد)
      if (value > 1200) return am5.color(0xff8c00); // نارنجی (زیاد)
      if (value > 800) return am5.color(0xffff00); // زرد (متوسط)
      if (value > 400) return am5.color(0x32cd32); // سبز روشن (کم)
      return am5.color(0x008000); // سبز تیره (بسیار کم)
    });

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="iranMap"
      style={{ width: "100%", height: "500px", direction: "ltr" }}
    ></div>
  );
};

export default IranMapChart;
