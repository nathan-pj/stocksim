import { Link } from "react-router-dom";
import { Tag } from "antd";

const columns = [
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (symbol) => <Link to={`/stock/${symbol}`}>{symbol}</Link>, // closing bracket added here
  },
  {
    title: "Company",
    dataIndex: "shortName",
    key: "shortName",
  },
  {
    title: "Price",
    dataIndex: "regularMarketPrice",
    key: "regularMarketPrice",
    render: (price) => <span>${price}</span>,
  },
  {
    title: "Change",
    dataIndex: "change",
    key: "change",
    render: (change) => {
      return change > 0 ? (
        <Tag color="#87d068">{change}</Tag>
      ) : (
        <Tag color="#f50">{change}</Tag>
      );
    },
  },
];

export { columns };
