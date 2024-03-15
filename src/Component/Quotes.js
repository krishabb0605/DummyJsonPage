import React, { useEffect, useState } from "react";

export default function Quotes() {
  const [quotesData, setQuotesData] = useState();
  useEffect(() => {
    async function fetchQuotesData() {
      try {
        const quotes = await fetch("https://dummyjson.com/quotes");
        const data = await quotes.json();
        setQuotesData(data.quotes);
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchQuotesData();
  }, []);
  return (
    <div className="card ">
      {quotesData &&
        quotesData.map((quoteData, index) => (
          <div
            className="quote-data m-3 p-3 d-flex quote-detail align-items-center"
            key={index}
          >
            <div className="card-body">
              {quoteData.id}. {quoteData.quote}
            </div>
            <b>~ {quoteData.author}</b>
          </div>
        ))}
    </div>
  );
}
