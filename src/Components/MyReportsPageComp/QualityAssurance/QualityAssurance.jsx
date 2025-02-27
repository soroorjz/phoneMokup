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
        name: "تعداد",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "count",
        categoryYField: "name",
      })
    );

    let data = [
      { name: "کل ثبت‌نام‌کنندگان", count: 406000 },
      { name: "ظرفیت استخدام", count: 19179 },
    ];

    series.columns.template.setAll({
      fill: am5.color("#5e60ce"),
      stroke: am5.color("#6930c3"),
      maxHeight: 50,
      cornerRadiusTR: 0,
      cornerRadiusTL: 0,
    });

    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 200,
      textAlign: "right",
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div className="QualityAssuranceContainer">
      <div id="chartdiv" className="chartContainer"></div>
      <div className="QualityAssuranceBoxes">
        <div className="QualityAssuranceBox">
          کل ثبت‌نام‌کنندگان: <span>۴۰۶٬۰۰۰ نفر</span>
        </div>
        <div className="QualityAssuranceBox">
          تعداد شرکت‌کنندگان در آزمون: <span>۴۰۶٬۲۱۴ نفر</span>
        </div>
        <div className="QualityAssuranceBox">
          ظرفیت استخدام: <span>۱۹٬۱۷۹ نفر</span>
        </div>
        <div className="QualityAssuranceBox">
          تعداد استان‌های محل برگزاری: <span>۳۱ استان</span>
        </div>
        <div className="QualityAssuranceBox">
          تعداد شهرهای محل برگزاری: <span>۱۵۴ شهر</span>
        </div>
        <div className="QualityAssuranceBox">
          تعداد حوزه‌های امتحانی: <span>۸۰۲ حوزه</span>
        </div>
        <div className="QualityAssuranceBox">
          تعداد زیرحوزه‌های امتحانی: <span>۱٬۰۷۷ زیرحوزه</span>
        </div>
        <div className="QualityAssuranceBox">
          تاریخ برگزاری آزمون: <span>۱۴ اردیبهشت ۱۴۰۳</span>
        </div>
        <div className="QualityAssuranceBox">
          زمان اعلام نتایج اولیه: <span>۲۵ خرداد ۱۴۰۳</span>
        </div>
        <div className="QualityAssuranceBox">
          زمان اعلام نتایج نهایی: <span>۸ مهر ۱۴۰۳</span>
        </div>
      </div>
    </div>
  );
};

export default QualityAssurance;
