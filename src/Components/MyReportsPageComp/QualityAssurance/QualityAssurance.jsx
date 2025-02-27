import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "./QualityAssurance.scss";
const QualityAssurance = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.container.setAll({
      width: am5.percent(100),
      height: am5.percent(100),
    });
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: am5xy.AxisRendererY.new(root, { inversed: true }),
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Count",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "count",
        categoryYField: "name",
      })
    );

    let data = [
      { name: "شرکت‌کنندگان", count: 300000 },
      { name: "قبول‌شدگان", count: 75000 },
    ];
    series.columns.template.setAll({
      fill: am5.color("#83b0e1"), // رنگ ستون
      stroke: am5.color("#83b0e1"),
      // maxWidth: 20,
      maxHeight:50,
      cornerRadiusTR: 0,
    });
    
    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate", // برش دادن نوشته‌های خیلی بلند
      maxWidth: 100, // حداکثر عرض نوشته‌ها
      textAlign: "right",
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div>
      <div id="chartdiv"></div>
      <div className="QualityAssuranceBoxes">
        <div className="QualityAssuranceBox">توضیحات</div>
        <div className="QualityAssuranceBox">توضیحات</div>
        <div className="QualityAssuranceBox">توضیحات</div>
        <div className="QualityAssuranceBox">توضیحات</div>
      </div>
    </div>
  );
};

export default QualityAssurance;
