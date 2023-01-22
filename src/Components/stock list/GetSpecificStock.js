import axios from "axios";
import { Table, Radio, Input } from "antd";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisplayGraph from "../Graph/CandleStick.js";
import InvestInput from "../Buy/InvestInput.js";
import GetPrice from "../Graph/GetPrice.js";
import "./stockList.css";
import InfoIcon from "../Graph/InfoIcon.js";
// const API_KEY = "a88a05c1b85464390aa0564746684c52"

function GetSpecificStock({ portfolio, setPortfolio, loading, setLoading }) {
  const location = useLocation();
  const symbol = location.pathname.split("/").pop();
  const [timeRange, setTimeRange] = useState("/1min");
  const [apiData, setApiData] = useState([]);
  const [price, setPrice] = useState(0);
  const [API_URL, setAPI_URL] = useState(
    `https://financialmodelingprep.com/api/v3/historical-chart${timeRange}/${symbol}?&apikey=a88a05c1b85464390aa0564746684c52`
  );
  useEffect(() => {
    function fetchData() {
      let url;
      if (
        timeRange === "/5min" ||
        timeRange === "/1hour" ||
        timeRange === "/1min"
      ) {
        url = `https://financialmodelingprep.com/api/v3/historical-chart/${timeRange}/${symbol}?apikey=a88a05c1b85464390aa0564746684c52`;
      } else if (timeRange === "/1day") {
        url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?limit=1&from=2022-01-01&to=2022-21-12&apikey=a88a05c1b85464390aa0564746684c52`;
      } else if (timeRange === "/alltime") {
        url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?limit=1&from=01-01-2022&to=2022-21-12&apikey=a88a05c1b85464390aa0564746684c52`;
      }

      axios
        .get(url)
        .then((res) => {
          setApiData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, [symbol, timeRange]);

  return (
    <div>
      {apiData ? (
        <div className="container">
          <div className="chart">
            <DisplayGraph
              apiData={apiData}
              timeRange={timeRange}
              loading={loading}
              setLoading={setLoading}
            />

            <div className="time-range">
              <Radio.Group
                onChange={(e) => setTimeRange(e.target.value)}
                value={timeRange}
                style={{
                  marginTop: 10,
                }}
              >
                <Radio.Button value="/1min">1m</Radio.Button>
                <Radio.Button value="/5min">5m</Radio.Button>
                <Radio.Button value="/1hour">1h</Radio.Button>
                <Radio.Button value="/1day">1d</Radio.Button>
                <Radio.Button value="/alltime">all</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className="center">
            <GetPrice symbol={symbol} price={price} setPrice={setPrice} />
            <InvestInput
              symbol={symbol}
              price={price}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          </div>
        </div>
      ) : (
        <div>LOADING</div>
      )}
      <br />
      <br />
    </div>
  );
}
export default GetSpecificStock;
