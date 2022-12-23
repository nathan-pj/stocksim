import { Link } from "react-router-dom";
import { Tag } from "antd";

const columns = [
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (symbol) => <Link to={`/stock/${symbol}`}>{symbol}</Link>,
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
    key: "regularMarketChange",
    render: (_, record) => {
      const change = record.regularMarketChange;
      const changePercent = record.regularMarketChangePercent;
      let changeTag = <Tag color="#f50">{change}</Tag>;
      if (change > 0) {
        changeTag = <Tag color="#87d068">{change}</Tag>;
      }
      return (
        <>
          {changeTag} ({changePercent}%)
        </>
      );
    },
  },
];

export { columns };
