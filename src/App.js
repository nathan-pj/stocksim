import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import DisplayGraph from "./Components/Graph/DisplayGraph";
import GetSpecificStock from "./Components/stock list/GetSpecificStock.js";
import NavBar from "./Components/nav/NavBar.js";
import { useEffect, useState } from "react";
import PortfolioPage from "./Components/Portfolio/PortfolioPage.js";
import GetStocks from "./Components/stock list/GetStocks.js";

function App() {
  const [portfolio, setPortfolio] = useState({
    balance: 1000000,
    investments: {},
  });
  const [selectedStock, setSelectedStock] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(portfolio);
  }, [portfolio]);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar portfolio={portfolio} />

        <Routes>
          <Route
            path="/"
            element={
              <GetStocks
                portfolio={portfolio}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/stock/:id"
            element={
              <GetSpecificStock
                selectedStock={selectedStock}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/portfolio"
            element={<PortfolioPage portfolio={portfolio} />}
            loading={loading}
            setLoading={setLoading}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
