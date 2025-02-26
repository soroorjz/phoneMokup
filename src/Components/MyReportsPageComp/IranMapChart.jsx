import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_iran from "@amcharts/amcharts5-geodata/iranLow";

const IranMapChart = ({ data }) => {
  useEffect(() => {
    let root = am5.Root.new("iranMap");

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_iran,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x74b9ff),
    });

    polygonSeries.events.on("datavalidated", function () {
      data &&
        polygonSeries.mapPolygons.each((polygon) => {
          const provinceName = polygon.dataItem.dataContext.name;
          if (provinceName === data.topProvince) {
            polygon.set("fill", am5.color(0x00b894)); // رنگ برای استان با بیشترین قبولی
          } else if (provinceName === data.lowestProvince) {
            polygon.set("fill", am5.color(0xd63031)); // رنگ برای استان با کمترین قبولی
          }
        });
    });

    return () => root.dispose();
  }, [data]);

  return <div id="iranMap" style={{ width: "100%", height: "400px" }}></div>;
};

export default IranMapChart;
