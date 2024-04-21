import React, { useEffect, useState } from "react";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";

export default function Quotes() {
  const [quotesData, setQuotesData] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const searchDatas = (datas) => {
    return datas.filter((data) =>
      data.author.toLowerCase().includes(searchQuery)
    );
  };

  useEffect(() => {
    async function fetchQuotesData() {
      try {
        const quotes = await fetch("https://dummyjson.com/quotes?limit=100");
        const data = await quotes.json();
        setQuotesData(searchDatas(data.quotes));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError("Error while fetching data ...");
        console.log("Error", e);
      }
    }
    fetchQuotesData();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="container text-center " style={{ marginTop: "100px" }}>
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }

  // Handle page whenever error occurs ...

  if (error) {
    return (
      <div className="container w-50">
        <marquee>
          <img src={errorSymbol} alt="Loading ... " style={{ opacity: 0.5 }} />
          {error}
        </marquee>
      </div>
    );
  }
  return (
    <div className="card " style={{ marginTop: "56px" }}>
      <div className="d-flex justify-content-between main-header">
        <div className="search-header">
          <i className="fa fa-search search-icon"></i>
          <input
            type="text"
            className="form-control p-3 my-3 search-field"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      {quotesData &&
        quotesData.map((quoteData, index) => (
          <div
            className="quote-data m-3 p-3 d-flex align-items-center"
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
