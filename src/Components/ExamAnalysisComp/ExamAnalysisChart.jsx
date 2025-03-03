import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const ChartComponent = ({ chartType }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let chart;
    if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = [
        { category: "فروردین", value: 65 },
        { category: "اردیبهشت", value: 59 },
        { category: "خرداد", value: 80 },
        { category: "تیر", value: 81 },
        { category: "مرداد", value: 56 },
      ];
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
    } else if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = [
        { category: "فروردین", value: 65 },
        { category: "اردیبهشت", value: 59 },
        { category: "خرداد", value: 80 },
        { category: "تیر", value: 81 },
        { category: "مرداد", value: 56 },
      ];
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
    } else {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = [
        { category: "فروردین", value: 65 },
        { category: "اردیبهشت", value: 59 },
        { category: "خرداد", value: 80 },
        { category: "تیر", value: 81 },
        { category: "مرداد", value: 56 },
      ];
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
    }
    return () => chart.dispose();
  }, [chartType]);

  return <div className="chart-placeholder" ref={chartRef}></div>;
};

export default ChartComponent;
