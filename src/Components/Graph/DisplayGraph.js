import "./graphStyle.css";
import ApexCharts from "apexcharts";
import { useRef, useEffect } from "react";
export default function DisplayGraph({ stockInfo }) {
  console.log(stockInfo);
  const myref = useRef();

  let formattedStockData = [];
  Object.keys(stockInfo).forEach((date, i) => {
    let stats = stockInfo[date];
    date = new Date(date).getTime();
    let open = parseInt(stats[Object.keys(stats)[0]]);
    let high = parseInt(stats[Object.keys(stats)[1]]);
    let low = parseInt(stats[Object.keys(stats)[2]]);
    let close = parseInt(stats[Object.keys(stats)[3]]);

    formattedStockData.push([date, open, high, low, close]);
  });

  useEffect(() => {
    //const my = data.map((d) => [d.time, d.open, d.high, d.low, d.close]);

    let options = {
      chart: {
        type: "candlestick",
        height: 350,
      },

      series: [
        {
          data: [...formattedStockData],
        },
      ],
      xaxis: {
        type: "datetime",
        labels: {
          format: "MM yyyy",
        },
      },
    };
    var chart = new ApexCharts(myref.current, options);

    chart.render();
  }, []);

  return (
    <div className="App">
      <div ref={myref}></div>
    </div>
  );
}
