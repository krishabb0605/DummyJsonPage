import React, { useEffect, useState } from 'react';
import loader from './Images/Rounded blocks.gif';
import errorSymbol from './Images/Error.gif';
import dataNotFound from './Images/dataNotFound.png';

export default function Quotes() {
  const [quotesData, setQuotesData] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const searchDatas = (datas) => {
    return datas.filter((data) =>
      data.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    async function fetchQuotesData() {
      try {
        const quotes = await fetch('https://dummyjson.com/quotes?limit=100');
        const data = await quotes.json();
        setQuotesData(searchDatas(data.quotes));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Error while fetching data ...');
      }
    }
    fetchQuotesData();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className='container text-center ' style={{ marginTop: '100px' }}>
        <img src={loader} alt='Loading ... ' style={{ opacity: 0.5 }} />
      </div>
    );
  }

  // Handle page whenever error occurs ...

  if (error) {
    return (
      <div className='container w-50'>
        <img src={errorSymbol} alt='error ... ' style={{ opacity: 0.5 }} />
        {error}
      </div>
    );
  }
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-between main-header'>
        <div className='search-header'>
          <i className='fa fa-search search-icon'></i>
          <input
            type='text'
            className='form-control p-2 my-3 search-field'
            placeholder='Search ...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // autoFocus
          />
        </div>
      </div>
      {quotesData && quotesData.length > 0 ? (
        <div
          className='card px-2 '
          style={{
            marginTop: '58px',
            boxShadow: '0 0 10px 2px #00000061',
            maxHeight: 'calc(100vh - 140px)',
            overflow: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          {quotesData &&
            quotesData.map((quoteData, index) => (
              <div
                className='quote-data my-3 p-3 d-flex align-items-center'
                key={index}
              >
                <div className='card-body'>
                  ` {quoteData.quote}`
                </div>
                <b>~ {quoteData.author}</b>
              </div>
            ))}
        </div>
      ) : (
        <div
          className='d-flex justify-content-center'
          style={{ marginTop: '80px' }}
        >
          <img src={dataNotFound} alt='dataNotFound' />
        </div>
      )}
    </div>
  );
}
