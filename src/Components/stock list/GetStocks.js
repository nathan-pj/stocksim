import { useState, useEffect } from "react";
import { Table, Radio, Input } from "antd";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import axios from "axios";

const GetStocks = ({ tableData, setTableData }) => {
  const [pagination, setPagination] = useState({
    pageSize: 20,
    hideOnSinglePage: true,
  });
  const [selectedOption, setSelectedOption] = useState("actives");
  const [apiUrl, setApiUrl] = useState(
    "https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=a88a05c1b85464390aa0564746684c52"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    axios
      .request(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setTableData(data);
        setPagination({
          ...pagination,
          total: data.length,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption, searchTerm]);

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => <Link to={`/stock/${symbol}`}>{symbol}</Link>,
    },
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
    },
  ];
  if (!searchTerm) {
    columns.push(
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => <span>${price}</span>,
      },
      {
        title: "Change",
        dataIndex: "change",
        key: "change",
        render: (change) => {
          return (
            <Tag color={change > 0 ? "#87d068" : "#f50"}>{`${change}%`}</Tag>
          );
        },
      }
    );
  }
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setApiUrl(
      `https://financialmodelingprep.com/api/v3/stock_market/${e.target.value}?apikey=a88a05c1b85464390aa0564746684c52`
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setApiUrl(
        `https://financialmodelingprep.com/api/v3/search?query=${e.target.value}&limit=20&apikey=a88a05c1b85464390aa0564746684c52`
      );
    } else {
      setApiUrl(
        `https://financialmodelingprep.com/api/v3/stock_market/${selectedOption}?apikey=a88a05c1b85464390aa0564746684c52`
      );
    }
  };

  return (
    <div>
      <div className="filter-stocks">
        <Radio.Group
          onChange={handleOptionChange}
          value={selectedOption}
          defaultValue="a"
          style={{
            marginTop: 16,
          }}
        >
          <Radio.Button value="actives">Active</Radio.Button>
          <Radio.Button value="gainers">Gainers</Radio.Button>
          <Radio.Button value="losers">Losers</Radio.Button>
        </Radio.Group>
        <Input
          placeholder="Search for a stock"
          style={{ width: 275, marginRight: 10, marginLeft: 50 }}
          onChange={handleSearchChange}
        />
      </div>
      <Table dataSource={tableData} columns={columns} pagination={pagination} />
    </div>
  );
};

export default GetStocks;
