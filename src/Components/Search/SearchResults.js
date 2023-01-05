import { useState, useEffect } from "react";
import { Table } from "antd";
import { columns } from "./antdColumns.js";

function SearchResults({ searchResults }) {
  const [pagination, setPagination] = useState({
    pageSize: 20,
    hideOnSinglePage: true,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total: searchResults.length,
    });
  }, [searchResults]);

  return (
    <div>
      <Table
        dataSource={searchResults}
        columns={columns}
        pagination={pagination}
      />
    </div>
  );
}

export default SearchResults;
