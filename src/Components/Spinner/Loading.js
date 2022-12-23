import React from "react";
import { Spin } from "antd";
import "./loading.css";
function Loading({ loading, setLoading }) {
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }
}

export default Loading;
