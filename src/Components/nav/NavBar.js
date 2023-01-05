import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./nav.css";

function NavBar({ portfolio, display, setDisplay }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleSubmit = (event) => {
    setDisplay("search");
    event.preventDefault();
    axios
      .get(
        `https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&apikey=a88a05c1b85464390aa0564746684c52`
      )
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/portfolio">Portfolio</Link>

      <div>Balance: ${portfolio.balance.toLocaleString("en-US")}</div>
    </nav>
  );
}

export default NavBar;
