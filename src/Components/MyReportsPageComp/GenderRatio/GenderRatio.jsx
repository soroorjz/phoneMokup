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
    series.set(
      "tooltip",
      am5.Tooltip.new(root, {
        labelText: "{category}: {valuePercentTotal.formatNumber('#.00')}%",
        autoTextColor: true,
      })
    );

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
    });

    series.labels.template.setAll({
      fontSize: 16,
      text: "{category}: {valuePercentTotal.formatNumber('#.')}%",
      maxWidth: 120, // حداکثر عرض هر متن
      oversizedBehavior: "wrap", // اگر متن بزرگ شد، آن را به چند خط بشکن
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
