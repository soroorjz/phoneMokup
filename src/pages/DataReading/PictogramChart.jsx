import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const PictogramChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PercentChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let data = [
      {
        category: "داوطلب ۱",
        value: 40,
        icon: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h41v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10V116h-10V0h-51v116h-51v38h51v188c0,7.333-3.5,11-10.5,11s-10.5-3.667-10.5-11V154h-41v188 c0,7.333-3.5,11-10.5,11s-10.5-3.667-10.5-11V154h-41V476z",
      },
      {
        category: "داوطلب ۲",
        value: 60,
        icon: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h41v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10V116h-10V0h-51v116h-51v38h51v188c0,7.333-3.5,11-10.5,11s-10.5-3.667-10.5-11V154h-41v188 c0,7.333-3.5,11-10.5,11s-10.5-3.667-10.5-11V154h-41V476z",
      },
      {
        category: "داوطلب ۳",
        value: 80,
        icon: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h41v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10V116h-10V0h-51v116h-51v38h51v188c0,7.333-3.5,11-10.5,11s-10.5-3.667-10.5-11V154h-41v188 c0,7.333-3.5,11-10.5,11s-10.5-3.667-10.5-11V154h-41V476z",
      },
    ];

    let series = chart.series.push(
      am5percent.PictorialStackedSeries.new(root, {
        name: "نمرات داوطلبان",
        categoryField: "category",
        valueField: "value",
        svgPathField: "icon",
      })
    );
    series.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "250px" }}></div>;
};

export default PictogramChart;