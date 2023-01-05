import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

import "./styles.css";

export default function DisplayGraph({
  apiData,
  timeRange,
  setLoading,
  loading,
}) {
  setLoading(true);
  const chartContainerRef = useRef();
  const chart = useRef();
  const [accessData, setAccessData] = useState(apiData);

  useEffect(() => {
    setAccessData(apiData);
    if (chartContainerRef.current) {
      if (chart.current) {
        chartContainerRef.current.innerHTML = "";
        chart.current = null;
      }
      chart.current = createChart(chartContainerRef.current, {
        width: "100%",

        height: "100%",
        layout: {
          backgroundColor: "#253248",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "#334158",
          },
          horzLines: {
            color: "#334158",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        priceScale: {
          borderColor: "#485c7b",
        },
        timeScale: {
          borderColor: "#485c7b",
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candleSeries = chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      let formatData = Array.isArray(accessData)
        ? accessData
        : accessData.historical;

      formatData = formatData.map((d) => ({
        time: new Date(d.date).getTime() / 1000,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }));
      const formattedStockData = formatData.reverse();
      candleSeries.setData(formattedStockData);
      const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        chart.current.resize(width, height / 2);
        chart.current.timeScale().fitContent();
      };

      onResize();

      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [timeRange, apiData, accessData]);

  return <div ref={chartContainerRef} className="chart-container"></div>;
}
