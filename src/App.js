import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import DisplayGraph from "./Components/Graph/DisplayGraph";
import GetSpecificStock from "./Components/stock list/GetSpecificStock.js";
import StockList from "./Components/stock list/StockList.js";
import { useState } from "react";

function App() {
  const [selectedStock, setSelectedStock] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <StockList
                selectedStock={selectedStock}
                setSelectedStock={setSelectedStock}
              />
            }
          />
          <Route
            path="/stock/:id"
            element={<GetSpecificStock selectedStock={selectedStock} />}
          />
          /
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
