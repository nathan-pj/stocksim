import axios from "axios";
import "./price.css";
import { useEffect } from "react";
import Loading from "../Spinner/Loading.js";

export default function GetPrice({ symbol, price, setPrice }) {
  useEffect(() => {
    const fetchPrice = () => {
      const priceUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=a88a05c1b85464390aa0564746684c52`;
      axios
        .get(priceUrl)
        .then((res) => {
          setPrice(res.data[0].price);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const interval = setInterval(fetchPrice, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="price">
      {price && price > 0 ? (
        <div>${price}</div>
      ) : (
        <div>
          Getting price... <Loading />
        </div>
      )}
    </div>
  );
}
