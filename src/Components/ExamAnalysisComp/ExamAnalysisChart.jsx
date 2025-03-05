import React, { useLayoutEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_ir from "@amcharts/amcharts4-geodata/iranLow";
import generateFakeChartData from "../../pages/fakeApi";

// تابع برای تبدیل اعداد به ارقام فارسی
const toPersianNumber = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const ChartComponent = ({ chartType, filters }) => {
  const chartRef = useRef(null);
  const [description, setDescription] = useState("");

  useLayoutEffect(() => {
    let chart;
    const result = generateFakeChartData(filters, chartType);
    const chartData = result.data;
    setDescription(result.description);
    console.log("chartData for map:", chartData);

    // تنظیم جهت RTL
    am4core.options.defaultLocale = {
      ...am4core.options.defaultLocale,
      direction: "rtl",
    };

    // فرمت‌کننده اعداد فارسی
    const numberFormatter = new am4core.NumberFormatter();
    numberFormatter.numberFormat = "#.";
    numberFormatter.format = (value) => toPersianNumber(value);

    if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = chartData;
      chart.rtl = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.truncate = false;
      categoryAxis.renderer.labels.template.wrap = true;
      categoryAxis.renderer.labels.template.fontSize = 12;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "تعداد (نفر)";
      valueAxis.numberFormatter = numberFormatter;
      valueAxis.renderer.labels.template.fontSize = 12;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
      series.columns.template.tooltipText = "{category}: {value} نفر";
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.width = am4core.percent(70);
      series.numberFormatter = numberFormatter;
    } else if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.rtl = true;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      pieSeries.labels.template.text = "{category}: {value}%";
      pieSeries.labels.template.fontSize = 12;
      pieSeries.radius = am4core.percent(80);
      pieSeries.numberFormatter = numberFormatter;
    } else if (chartType === "semiCircle") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.startAngle = 180;
      chart.endAngle = 360;
      chart.rtl = true;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "category";
      series.labels.template.text = "{category}: {value}%";
      series.labels.template.fontSize = 12;
      series.radius = am4core.percent(80);
      series.numberFormatter = numberFormatter;
    } else if (chartType === "nestedDonut") {
      chart = am4core.create(chartRef.current, am4charts.PieChart);
      chart.data = chartData;
      chart.rtl = true;

      let series1 = chart.series.push(new am4charts.PieSeries());
      series1.dataFields.value = "value";
      series1.dataFields.category = "category";
      series1.radius = am4core.percent(60);
      series1.innerRadius = am4core.percent(30);
      series1.labels.template.text = "{category}: {value}%";
      series1.labels.template.fontSize = 10;
      series1.numberFormatter = numberFormatter;

      let series2 = chart.series.push(new am4charts.PieSeries());
      series2.data = chartData.map((item) => ({
        ...item,
        value: item.value * 0.5,
      }));
      series2.dataFields.value = "value";
      series2.dataFields.category = "category";
      series2.radius = am4core.percent(30);
      series2.innerRadius = am4core.percent(15);
      series2.labels.template.text = "{category}: {value}%";
      series2.labels.template.fontSize = 10;
      series2.numberFormatter = numberFormatter;
    } else if (chartType === "pictorial") {
      chart = am4core.create(chartRef.current, am4charts.SlicedChart);
      chart.data = chartData;
      chart.rtl = true;

      let series = chart.series.push(new am4charts.PictorialStackedSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "category";
      series.maskSprite.path = "M10,0h60v60h-60z";
      series.labels.template.text = "{category}: {value} نفر";
      series.labels.template.fontSize = 12;
      series.labels.template.disabled = false;
      series.ticks.template.disabled = false;
      series.numberFormatter = numberFormatter;
    } else if (chartType === "map") {
      chart = am4core.create(chartRef.current, am4maps.MapChart);
      chart.geodata = am4geodata_ir;
      chart.projection = new am4maps.projections.Miller();

      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.data = chartData;
      polygonSeries.numberFormatter = numberFormatter; // اعمال فرمت فارسی به سری

      let polygonTemplate = polygonSeries.mapPolygons.template;
      // تنظیم دستی تولتیپ با اعداد فارسی
      polygonTemplate.tooltipText = "{name}: [bold]{value.formatNumber('#')}[/] نفر";
      polygonTemplate.fill = am4core.color("#cfcfcf");
      polygonTemplate.stroke = am4core.color("#ffffff");
      polygonTemplate.strokeWidth = 1;
      polygonTemplate.propertyFields.fill = "fill";

      if (chart.container) {
        chart.container.direction = "rtl";
        chart.container.layout = "horizontal";
      }
      chart.rtl = true;

      if (!polygonTemplate.tooltip) {
        polygonTemplate.tooltip = new am4core.Tooltip();
      }
      polygonTemplate.tooltip.getFillFromObject = false;
      polygonTemplate.tooltip.background.fill = am4core.color("#ffffff");
      polygonTemplate.tooltip.background.stroke = am4core.color("#000000");
      polygonTemplate.tooltip.background.strokeWidth = 1;
      polygonTemplate.tooltip.label.padding(5, 5, 5, 5);
      polygonTemplate.tooltip.pointerOrientation = "horizontal";
      polygonTemplate.tooltip.fitPointerToBounds = true;
      polygonTemplate.tooltip.direction = "rtl";
      polygonTemplate.tooltip.label.textAlign = "right";
      polygonTemplate.tooltip.label.fill = am4core.color("#000000");
      polygonTemplate.tooltip.label.fontSize = 14;
      polygonTemplate.tooltip.numberFormatter = numberFormatter; // اعمال فرمت فارسی

      polygonSeries.dataFields.value = "value";
      polygonSeries.dataFields.id = "id";
      polygonSeries.dataFields.name = "name";
    } else {
      chart = am4core.create(chartRef.current, am4charts.XYChart);
      chart.data = chartData;
      chart.rtl = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.truncate = false;
      categoryAxis.renderer.labels.template.wrap = true;
      categoryAxis.renderer.labels.template.fontSize = 12;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "تعداد (نفر)";
      valueAxis.numberFormatter = numberFormatter;
      valueAxis.renderer.labels.template.fontSize = 12;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
      series.tooltipText = "{category}: {value} نفر";
      series.numberFormatter = numberFormatter;
    }

    return () => {
      if (chart) chart.dispose();
    };
  }, [chartType, filters]);

  return (
    <div className="chart-container">
      <p className="chart-description">{description}</p>
      <div
        className="chart-placeholder"
        ref={chartRef}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default ChartComponent;