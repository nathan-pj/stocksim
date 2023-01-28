import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "./portfolioPage.css";
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

  const dataSource = Object.entries(portfolio.investments)
    .filter(([symbol, investment]) => investment.value !== 0)
    .map(([symbol, investment]) => ({
      key: symbol,
      symbol: symbol,
      value: investment.value,
    }));

  return (
    <div className="portfolio-page">
      <br />
      {dataSource.length !== 0 ? (
        <Table columns={columns} dataSource={dataSource} />
      ) : (
        <div className="no-investments">
          <p>No investments yet!</p>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
