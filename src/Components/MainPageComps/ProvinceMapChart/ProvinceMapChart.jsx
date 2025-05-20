import { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_iranLow from "@amcharts/amcharts4-geodata/iranLow";
// import "./ProvinceMapChart.scss";

const ProvinceMapChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    console.log("داده‌های وارد شده به ProvinceMapChart:", data);

    if (!chartRef.current) {
      console.error("chartRef.current تعریف نشده است!");
      return;
    }

    // نابود کردن نقشه قبلی اگه وجود داره
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // ایجاد نقشه
    const chart = am4core.create(chartRef.current, am4maps.MapChart);
    chart.geodata = am4geodata_iranLow;
    chart.projection = new am4maps.projections.Miller();

    // سری‌های نقشه
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value} نفر";
    polygonTemplate.fill = am4core.color("#6794dc"); // رنگ پیش‌فرض
    polygonTemplate.stroke = am4core.color("#ffffff");
    polygonTemplate.strokeWidth = 1;

    // تنظیمات tooltip
    polygonTemplate.tooltip = new am4core.Tooltip();
    polygonTemplate.tooltip.background.fill = am4core.color("#ffffff");
    polygonTemplate.tooltip.background.stroke = am4core.color("#000000");
    polygonTemplate.tooltip.background.strokeWidth = 1;
    polygonTemplate.tooltip.label.padding(5, 5, 5, 5);
    polygonTemplate.tooltip.label.fontSize = 14;
    polygonTemplate.tooltip.label.fill = am4core.color("#000000");
    polygonTemplate.tooltip.label.textAlign = "right";
    polygonTemplate.tooltip.direction = "rtl";

    // حالت هاور
    const hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = am4core.color("#ff6384");

    // اتصال دیتا
    polygonSeries.data = data;
    polygonSeries.dataFields.value = "value";
    polygonSeries.dataFields.id = "id";
    console.log("داده‌ها به سری متصل شدند:", polygonSeries.data);

    // محاسبه حداقل و حداکثر برای رنگ‌ها
    const values = data.map((item) => item.value).filter((v) => v > 0);
    const minValue = values.length ? Math.min(...values) : 0;
    const maxValue = values.length ? Math.max(...values) : 1;

    // تابع رنگ‌دهی
    const getColor = (value) => {
      if (value === 0) return am4core.color("#e0e0e0");
      const ratio = (value - minValue) / (maxValue - minValue || 1);
      const clampedRatio = Math.max(0, Math.min(1, ratio));
      const r = Math.round(103 + (220 - 103) * clampedRatio);
      const g = Math.round(183 + (103 - 183) * clampedRatio);
      const b = Math.round(220 + (220 - 220) * clampedRatio);
      return am4core.color(`rgb(${r}, ${g}, ${b})`);
    };

    // اعمال رنگ به پلی‌گان‌ها
    polygonTemplate.adapter.add("fill", (fill, target) => {
      const value = target.dataItem?.dataContext?.value || 0;
      return getColor(value);
    });

    // اطمینان از رندر بعد از لود
    chart.events.on("ready", () => {
      console.log("نقشه آماده شد!");
      polygonSeries.mapPolygons.each((polygon) => {
        const dataItem = polygon.dataItem;
        if (dataItem) {
          polygon.fill = getColor(dataItem.dataContext?.value || 0);
        }
      });
    });

    chartInstance.current = chart;

    // تمیز کردن موقع unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        console.log("نقشه dispose شد");
      }
    };
  }, [data]);

  return <div ref={chartRef} className="map-container" />;
};

export default ProvinceMapChart;
