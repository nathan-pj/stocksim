import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function NavBar({ portfolio }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Perform search using `searchTerm`
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/portfolio">Portfolio</Link>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search stocks"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
      <div>Balance: ${portfolio.balance.toLocaleString("en-US")}</div>
    </nav>
  );
}

export default NavBar;
