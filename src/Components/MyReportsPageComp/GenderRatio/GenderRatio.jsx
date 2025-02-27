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
            return am5.color(0xffc8dd); // صورتی روشن
          case "مرد":
            return am5.color(0xa2d2ff); // آبی روشن
          default:
            return fill;
        }
      }
      return fill;
    });

    let data = [
      { gender: "زن", count: 3500 },
      { gender: "مرد", count: 2500 },
    ];

    series.data.setAll(data);
    series.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
      <div className="GenderRatioBoxes">
        <div className="GenderRatioBox">توضیحات</div>
        <div className="GenderRatioBox">توضیحات</div>
        <div className="GenderRatioBox">توضیحات</div>
        <div className="GenderRatioBox">توضیحات</div>
      </div>
    </div>
  );
};

export default GenderRatio;
