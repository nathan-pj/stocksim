import { useState, useEffect } from "react";
import { Table } from "antd";
import { columns } from "./antdColumns.js";
import axios from "axios";
import Loading from "../Spinner/Loading.js";

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
        setApiData(response.data.finance.result[0].quotes);
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
        <Table dataSource={apiData} columns={columns} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
