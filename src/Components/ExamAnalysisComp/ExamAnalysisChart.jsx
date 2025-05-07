import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_ir from "@amcharts/amcharts4-geodata/iranLow";

const toPersianNumber = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const convertChartJsToAmCharts = (data) => {
  if (!data || !data.labels || !data.datasets || !data.datasets.length) {
    return [];
  }
  const labels = data.labels;
  return labels.map((label, index) => {
    const result = { category: label };
    data.datasets.forEach((dataset, datasetIndex) => {
      result[`value${datasetIndex}`] = dataset.data[index] || 0;
      result[`backgroundColor${datasetIndex}`] = dataset.backgroundColor
        ? Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[index] || dataset.backgroundColor[0]
          : dataset.backgroundColor
        : "rgba(75, 192, 192, 0.2)";
      result[`borderColor${datasetIndex}`] = dataset.borderColor
        ? Array.isArray(dataset.borderColor)
          ? dataset.borderColor[index] || dataset.borderColor[0]
          : dataset.borderColor
        : "rgba(75, 192, 192, 1)";
    });
    return result;
  });
};

const ChartComponent = ({ chartType, data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let chart;

    console.log("ChartComponent - ChartType:", chartType, "Data:", data);

    let chartData;
    if (chartType === "map") {
      chartData = Array.isArray(data) ? data : [];
    } else {
      chartData = convertChartJsToAmCharts(data);
    }

    if (!chartData || chartData.length === 0) {
      const placeholder = document.createElement("div");
      placeholder.style.width = "100%";
      placeholder.style.height = "400px";
      placeholder.style.display = "flex";
      placeholder.style.alignItems = "center";
      placeholder.style.justifyContent = "center";
      placeholder.style.background = "rgba(0, 0, 0, 0.1)";
      placeholder.style.backdropFilter = "blur(5px)";
      placeholder.style.color = "#333";
      placeholder.style.fontSize = "24px";
      placeholder.style.fontFamily = "Vazir, Arial, sans-serif";
      placeholder.style.textAlign = "center";
      placeholder.innerText = "داده‌ای برای نمایش وجود ندارد";

      chartRef.current.innerHTML = "";
      chartRef.current.appendChild(placeholder);

      return () => {
        chartRef.current.innerHTML = "";
      };
    }

    am4core.options.defaultLocale = {
      ...am4core.options.defaultLocale,
      direction: "rtl",
    };

    const numberFormatter = new am4core.NumberFormatter();
    numberFormatter.numberFormat = "#.";
    numberFormatter.format = (value) => toPersianNumber(value);

    try {
      if (chartType === "bar") {
        chart = am4core.create(chartRef.current, am4charts.XYChart);
        chart.data = chartData;
        chart.rtl = true;
        chart.paddingRight = 20;
        chart.paddingBottom = 70;

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.labels.template.rotation = -90;
        categoryAxis.renderer.labels.template.maxWidth = 80;
        categoryAxis.renderer.labels.template.fontSize = 10;
        categoryAxis.renderer.labels.template.dx = -25;
        categoryAxis.renderer.labels.template.textAlign = "right";
        categoryAxis.renderer.labels.template.horizontalCenter = "right";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "ظرفیت مشاغل";
        valueAxis.numberFormatter = numberFormatter;
        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.textAlign = "right";
        valueAxis.renderer.labels.template.horizontalCenter = "right";

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value0";
        series.dataFields.categoryX = "category";
        series.columns.template.tooltipText = "{category}: {value0}";
        series.columns.template.fillOpacity = 0.8;
        series.columns.template.width = am4core.percent(15);
        series.columns.template.propertyFields.fill = "backgroundColor0";
        series.columns.template.propertyFields.stroke = "borderColor0";
        series.columns.template.strokeWidth = 1;
        series.numberFormatter = numberFormatter;

        if (!series.columns.template.tooltip) {
          series.columns.template.tooltip = new am4core.Tooltip();
        }
        series.columns.template.tooltip.background.fill =
          am4core.color("#ffffff");
        series.columns.template.tooltip.label.fill = am4core.color("#000000");
        series.columns.template.tooltip.label.textAlign = "right";

        // فقط در صورتی که value1 وجود داشته باشد، series2 را اضافه کنید
        if (data.datasets && data.datasets.length > 1) {
          let series2 = chart.series.push(new am4charts.ColumnSeries());
          series2.dataFields.valueY = "value1";
          series2.dataFields.categoryX = "category";
          series2.columns.template.tooltipText = "{category}: {value1}";
          series2.columns.template.fillOpacity = 0.8;
          series2.columns.template.width = am4core.percent(15);
          series2.columns.template.propertyFields.fill = "backgroundColor1";
          series2.columns.template.propertyFields.stroke = "borderColor1";
          series2.columns.template.strokeWidth = 1;
          series2.numberFormatter = numberFormatter;

          if (!series2.columns.template.tooltip) {
            series2.columns.template.tooltip = new am4core.Tooltip();
          }
          series2.columns.template.tooltip.background.fill =
            am4core.color("#ffffff");
          series2.columns.template.tooltip.label.fill =
            am4core.color("#000000");
          series2.columns.template.tooltip.label.textAlign = "right";
        }
      } else if (chartType === "line") {
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
        categoryAxis.renderer.labels.template.textAlign = "right";
        categoryAxis.renderer.labels.template.horizontalCenter = "right";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "درصد موفقیت";
        valueAxis.numberFormatter = numberFormatter;
        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.textAlign = "right";
        valueAxis.renderer.labels.template.horizontalCenter = "right";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value0";
        series.dataFields.categoryX = "category";
        series.tooltipText = "{category}: {value0}";
        series.stroke = am4core.color("rgb(75, 192, 192)");
        series.strokeWidth = 2;
        series.tensionX = 0.1;
        series.numberFormatter = numberFormatter;

        if (!series.tooltip) {
          series.tooltip = new am4core.Tooltip();
        }
        series.tooltip.background.fill = am4core.color("#ffffff");
        series.tooltip.label.fill = am4core.color("#000000");
        series.tooltip.label.textAlign = "right";
      } else if (chartType === "pie") {
        chart = am4core.create(chartRef.current, am4charts.PieChart);
        chart.data = chartData;
        chart.rtl = true;

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value0";
        pieSeries.dataFields.category = "category";
        pieSeries.labels.template.text = "{category}: {value0} نفر";
        pieSeries.labels.template.fontSize = 14;
        pieSeries.radius = am4core.percent(80);
        pieSeries.innerRadius = am4core.percent(20);
        pieSeries.slices.template.propertyFields.fill = "backgroundColor0";
        pieSeries.slices.template.propertyFields.stroke = "borderColor0";
        pieSeries.slices.template.strokeWidth = 1;
        pieSeries.labels.template.fill = am4core.color("#000");
        pieSeries.labels.template.radius = 10;
        pieSeries.labels.template.inside = true;
        pieSeries.alignLabels = true;
        pieSeries.numberFormatter = numberFormatter;

        pieSeries.hiddenState.properties.opacity = 0;
        pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;
        pieSeries.slices.template.states.getKey(
          "active"
        ).properties.shiftRadius = 0.05;

        if (!pieSeries.slices.template.tooltip) {
          pieSeries.slices.template.tooltip = new am4core.Tooltip();
        }
        pieSeries.slices.template.tooltip.background.fill =
          am4core.color("#ffffff");
        pieSeries.slices.template.tooltip.label.fill = am4core.color("#000000");
        pieSeries.slices.template.tooltip.label.textAlign = "right";
      } else if (chartType === "map") {
        chart = am4core.create(chartRef.current, am4maps.MapChart);
        chart.geodata = am4geodata_ir;
        chart.projection = new am4maps.projections.Miller();

        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.data = chartData;
        polygonSeries.numberFormatter = numberFormatter;

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value} نفر";
        polygonTemplate.fill = am4core.color("#cfcfcf");
        polygonTemplate.stroke = am4core.color("#ffffff");
        polygonTemplate.strokeWidth = 1;

        polygonSeries.heatRules.push({
          property: "fill",
          target: polygonTemplate,
          min: am4core.color("#e6f3ff"),
          max: am4core.color("#0066cc"),
          minValue: 0,
          maxValue: 50,
        });

        if (!polygonTemplate.tooltip) {
          polygonTemplate.tooltip = new am4core.Tooltip();
        }
        polygonTemplate.tooltip.background.fill = am4core.color("#ffffff");
        polygonTemplate.tooltip.background.stroke = am4core.color("#000000");
        polygonTemplate.tooltip.label.fill = am4core.color("#000000");
        polygonTemplate.tooltip.label.fontSize = 14;
        polygonTemplate.tooltip.numberFormatter = numberFormatter;
        polygonTemplate.tooltip.label.textAlign = "right";

        chart.rtl = true;
      } else {
        console.warn(`Chart type "${chartType}" is not supported.`);
        chartRef.current.innerHTML = "";
        const placeholder = document.createElement("div");
        placeholder.style.width = "100%";
        placeholder.style.height = "400px";
        placeholder.style.display = "flex";
        placeholder.style.alignItems = "center";
        placeholder.style.justifyContent = "center";
        placeholder.style.background = "rgba(0, 0, 0, 0.1)";
        placeholder.style.backdropFilter = "blur(5px)";
        placeholder.style.color = "#333";
        placeholder.style.fontSize = "24px";
        placeholder.style.fontFamily = "Vazir, Arial, sans-serif";
        placeholder.style.textAlign = "center";
        placeholder.innerText = "نوع نمودار پشتیبانی نمی‌شود";
        chartRef.current.appendChild(placeholder);

        return () => {
          chartRef.current.innerHTML = "";
        };
      }
    } catch (error) {
      console.error("Error rendering chart:", error);
      chartRef.current.innerHTML = "";
      const placeholder = document.createElement("div");
      placeholder.style.width = "100%";
      placeholder.style.height = "400px";
      placeholder.style.display = "flex";
      placeholder.style.alignItems = "center";
      placeholder.style.justifyContent = "center";
      placeholder.style.background = "rgba(0, 0, 0, 0.1)";
      placeholder.style.backdropFilter = "blur(5px)";
      placeholder.style.color = "#333";
      placeholder.style.fontSize = "24px";
      placeholder.style.fontFamily = "Vazir, Arial, sans-serif";
      placeholder.style.textAlign = "center";
      placeholder.innerText = "خطا در رندر نمودار";
      chartRef.current.appendChild(placeholder);

      return () => {
        chartRef.current.innerHTML = "";
      };
    }

    return () => {
      if (chart) chart.dispose();
    };
  }, [chartType, data]);

  return (
    <div className="chart-container" style={{ width: "100%", height: "400px" }}>
      <div
        className="chart-placeholder"
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ChartComponent;
