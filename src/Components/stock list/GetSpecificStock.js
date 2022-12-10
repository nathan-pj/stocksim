import { useEffect, useState } from "react";

import DisplayGraph from "../Graph/DisplayGraph.js";

//import { request } from "http";

export default function GetSpecificStock() {
  useEffect(() => {
    fetch(
      `
      https://query1.finance.yahoo.com/v8/finance/chart/aapl?metrics=high?&interval=1h&range=5d
      `
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // };
  // // yahooFinance
  // //   .historical({
  // //     symbol: SYMBOL,
  // //     from: "2012-01-01",
  // //     to: "2012-12-31",
  // //     period: "d",
  // //   })
  // //   .then(function (quotes) {
  // //     console.log(util.format("=== %s (%d) ===", SYMBOL, quotes.length));
  // //     if (quotes[0]) {
  // //       console.log(
  // //         "%s\n...\n%s",
  // //         JSON.stringify(quotes[0], null, 2),
  // //         JSON.stringify(quotes[quotes.length - 1], null, 2)
  // //       );
  // //     } else {
  // //       console.log("N/A");
  // //     }
  // //   });

  // useEffect(() => {
  //   getCurrency();
  // }, []);
  return (
    <div>
      {/* {loaded ? (
        <DisplayGraph stockInfo={stockInfo} />
      ) : (
        <div>
          <p>loading..</p>
        </div>
      )} */}
      a
    </div>
  );
}
