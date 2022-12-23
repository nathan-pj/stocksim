import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

function PortfolioPage({ portfolio }) {
  const columns = [
    {
      title: "Company",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => <Link to={`/stock/${symbol}`}>{symbol}</Link>,
    },
    {
      title: "Investment Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const dataSource = Object.entries(portfolio.investments).map(
    ([symbol, investment]) => ({
      key: symbol,
      symbol: symbol,
      value: investment.value,
    })
  );

  return (
    <div className="portfolio-page">
      <br />
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default PortfolioPage;
