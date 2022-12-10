import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default function GetStocks() {
  const [apiData, setApiData] = useState("");

  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/market/get-trending-tickers",
    params: { region: "US" },
    headers: {
      "X-RapidAPI-Key": "636b6813dbmsh5df740a728e2580p127b48jsn6b905ee8e04b",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };
  const fetchData = () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        setApiData(response.data.finance.result[0].quotes);
        console.log(apiData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {apiData.length > 0 ? (
        <div>
          <p>top stocks today</p>
          {apiData.map((stock) => (
            <div>
              <Link to={`/stock/${stock.symbol}`}>
                <p key={stock.symbol} id={stock.symbol}>
                  {stock.shortName}, symbol: {stock.symbol}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading stocks...</p>
      )}
    </div>
  );
}
