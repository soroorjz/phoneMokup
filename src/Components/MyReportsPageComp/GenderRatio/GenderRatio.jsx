import React, { useLayoutEffect } from "react";
import "./GenderRatio.scss";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const GenderRatio = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "count",
        categoryField: "gender",
      })
    );

    let tooltip = am5.Tooltip.new(root, {
      labelText: "{category}: {valuePercentTotal.formatNumber('#.00')}%",
      autoTextColor: true,
    });

    tooltip.label.setAll({
      oversizedBehavior: "wrap",
      maxWidth: 100,
      fontSize: 14,
      textAlign: "center",
      fill: am5.color("#000"),
    });

    tooltip.get("background").setAll({
      fill: am5.color("#fff"),
      stroke: am5.color("#fff"),
      strokeWidth: 1,
      cornerRadius: 8,
    });

    tooltip.setAll({
      pointerOrientation: "horizontal",
      centerX: am5.percent(50),
      centerY: am5.percent(50),
    });

    series.set("tooltip", tooltip);

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
    });

    series.labels.template.setAll({
      fontSize: 16,
      text: "{category}: {valuePercentTotal.formatNumber('#.')}%",
      maxWidth: 60,
      oversizedBehavior: "wrap",
    });

    series.slices.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem) {
        switch (target.dataItem.dataContext.gender) {
          case "زن":
            return am5.color(0x6794dc); // آبی روشن
          case "مرد":
            return am5.color(0xa367dc); // بنفش روشن
          default:
            return fill;
        }
      }
      return fill;
    });

    // داده‌های فرضی
    let data = [
      { gender: "زن", count: 600000 }, // تعداد فرضی زنان
      { gender: "مرد", count: 400000 }, // تعداد فرضی مردان
    ];

    series.data.setAll(data);
    series.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div className="GenderRatioContainer">
      <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
      <div className="GenderRatioBoxes">
        <div className="GenderRatioBox">
          تعداد کل ثبت‌نام‌کنندگان: <span>۱٬۰۰۰٬۰۰۰ نفر</span> 
        </div>
        <div className="GenderRatioBox">
          تعداد ثبت‌نام‌کنندگان زن: <span>۶۰۰٬۰۰۰ نفر</span> 
        </div>
        <div className="GenderRatioBox">
          تعداد ثبت‌نام‌کنندگان مرد: <span>۴۰۰٬۰۰۰ نفر</span> 
        </div>
        <div className="GenderRatioBox">
          نسبت زنان به مردان: <span>۶۰٪ زن،</span>  <span>۴۰٪ مرد</span>
        </div>
      </div>
    </div>
  );
};

export default GenderRatio;
