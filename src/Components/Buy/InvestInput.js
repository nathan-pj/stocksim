import React, { useState, useEffect } from "react";
import "./investInput.css";

function InvestInput({ symbol, price, portfolio, setPortfolio }) {
  const [investmentAmount, setInvestmentAmount] = useState(
    portfolio.investments[symbol] ? portfolio.investments[symbol].amount : 0
  );
  const [investmentValue, setInvestmentValue] = useState(
    portfolio.investments[symbol] ? portfolio.investments[symbol].value : 0
  );
  const [priceBoughtAt, setPriceBoughtAt] = useState(undefined);

  useEffect(() => {
    if (priceBoughtAt) {
      let currentValue = (price / priceBoughtAt) * investmentAmount;

      setInvestmentValue(currentValue.toFixed(2));
    }
  }, [price, priceBoughtAt, investmentAmount, investmentValue]);

  useEffect(() => {
    setPortfolio({
      ...portfolio,
      investments: {
        ...portfolio.investments,
        [symbol]: { amount: investmentAmount, value: investmentValue },
      },
    });
  }, [investmentValue]);
  const handleBuy = () => {
    if (investmentAmount > portfolio.balance) {
      alert("You do not have enough balance to make this investment!");
      return;
    }

    setPriceBoughtAt(price);

    setInvestmentValue(investmentAmount);

    let newBalance = portfolio.balance - investmentAmount;

    setPortfolio({
      ...portfolio,
      balance: newBalance,
      investments: {
        ...portfolio.investments,
        [symbol]: { amount: investmentAmount, value: investmentValue },
      },
    });
  };

  const handleSell = () => {
    setPriceBoughtAt(0);
    const amount = Number(investmentValue);
    let newBalance = portfolio.balance + amount;
    setPortfolio({
      ...portfolio,
      balance: newBalance,
      investments: {
        ...portfolio.investments,
        [symbol]: { amount: 0, value: 0 },
      },
    });
    setInvestmentValue(0);
    setInvestmentAmount(0);
  };

  return (
    <div className="investment-container">
      <label className="investment-label">
        <input
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
        />
      </label>
      <div>
        <button className="investment-button" onClick={handleBuy}>
          BUY
        </button>
        <button
          className="investment-button"
          onClick={handleSell}
          style={{ backgroundColor: "red" }}
        >
          SELL
        </button>
      </div>
      {isNaN(investmentValue) ? (
        <p className="investment-value investment-value-large investment-value-white">
          Investment Value: 0
        </p>
      ) : (
        <p className="investment-value investment-value-large investment-value-white">
          Investment Value: {investmentValue.toLocaleString("en-US")}
        </p>
      )}
    </div>
  );
}

export default InvestInput;
