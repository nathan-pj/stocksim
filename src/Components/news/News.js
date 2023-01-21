import { List, Card, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./news.css";
const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://financialmodelingprep.com/api/v3/stock_news?limit=50&apikey=a88a05c1b85464390aa0564746684c52"
      );
      console.log(result.data);
      setNews(result.data);
    };
    fetchData();
  }, []);

  return (
    <List
      className="news-container"
      grid={{ gutter: 16, column: 3 }}
      dataSource={news}
      renderItem={(item) => (
        <List.Item>
          <Card
            cover={<img alt={item.title} src={item.image} />}
            actions={[
              <Button type="link" href={item.url}>
                Read More
              </Button>,
            ]}
          >
            <div
              className="meta"
              style={{ overflow: "visible", wordBreak: "break-all" }}
            >
              <Card.Meta
                title={
                  <Typography.Title
                    level={5}
                    ellipsis={false}
                    style={{ maxWidth: "100px" }}
                  >
                    {item.title}
                  </Typography.Title>
                }
                description={item.text}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default News;
