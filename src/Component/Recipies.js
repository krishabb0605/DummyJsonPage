import React, { useEffect, useState } from 'react';
import { getProductsData, getRecipiesData } from '../services/recipies.service';
import loader from './Images/Rounded blocks.gif';
import errorSymbol from './Images/Error.gif';
import dataNotFound from './Images/dataNotFound.png';
import { useNavigate } from 'react-router-dom';

function Recipies() {
  const [recipiesData, setRecipiesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [query, setQuery] = useState('');
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem('recipieCartData')) || []
  );
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem('cartCount')) || 0
  );
  useEffect(() => {
    localStorage.setItem('recipieCartData', JSON.stringify(cartData));
    localStorage.setItem('cartCount', JSON.stringify(count));
  }, [cartData, count]);

  const navigate = useNavigate();
  const search = (recipieData) => {
    return recipieData.filter(
      (recipieData) =>
        recipieData.cuisine.toLowerCase().includes(query) ||
        recipieData.mealType[0].toLowerCase().includes(query) ||
        recipieData.name.toLowerCase().includes(query)
    );
  };

  useEffect(() => {
    async function data() {
      try {
        let recipiesDataList = await getRecipiesData();
        let productsDataList = await getProductsData();
        setRecipiesData(search(recipiesDataList));
        productsDataList.map((data) => productsData.push(data.price));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Error while fetching data ');
      }
    }
    data();
  }, [query]);

  if (isLoading) {
    return (
      <div className='container text-center ' style={{ marginTop: '100px' }}>
        <img src={loader} alt='Loading ... ' style={{ opacity: 0.5 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container-fluid'>
        <p className='p-5 text-center'>
          <img src={errorSymbol} alt='Loading ... ' style={{ opacity: 0.5 }} />
          {error}
        </p>
      </div>
    );
  }

  const addToCart = (foodData, price) => {
    const existingItem = cartData?.find((item) => item.id === foodData.id);
    if (existingItem) {
      setCartData((prevCartData) =>
        prevCartData.map((item) => {
          if (item.id === foodData.id) {
            return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      const newData = { ...foodData, price: price, count: 1 };
      setCartData((prevFoodData) => [...prevFoodData, newData]);
      setCount((prevCount) => prevCount + 1);
    }
  };

  const openCartDetail = () => {
    navigate('/food/cart', {
      state: { cartData },
    });
  };

  return (
    <div className='container-fluid' id='recipies'>
      <div className='d-flex justify-content-between main-header'>
        <div className='search-header'>
          <i className='fa fa-search search-icon'></i>
          <input
            type='text'
            className='form-control p-2 my-3 ms-0 search-field'
            placeholder='Search ...'
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <i className='count'>{count}</i>
        <i
          className='fa fa-shopping-cart cart-symbol p-3 m-3'
          onClick={() => openCartDetail()}
        ></i>
      </div>

      <div
        className='card card1-data justify-content-around'
        style={{
          marginTop: '60px',
          maxHeight: 'calc(100vh - 150px)',
          overflow: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        {recipiesData &&
          productsData &&
          recipiesData.map((recipieData, index) => (
            <div
              key={index}
              className='user-data1 data1 m-2 p-3 d-flex flex-column flex-xl-row recipie-data main-containter'
            >
              <div className='user-photo d-flex flex-column justify-content-center align-items-center h-100'>
                <img
                  src={recipieData.image}
                  alt='UserImage'
                  className='h-75 user-image recipie-image'
                />
                <div className='middle'>
                  <div
                    className='text'
                    onClick={() => addToCart(recipieData, productsData[index])}
                  >
                    Add To Cart
                  </div>
                </div>
              </div>
              <div className='d-flex flex-column align-items-center gap-3 recipie-data'>
                <b className='recipieName'>{recipieData.name}</b>
                <div
                  className='align-self-center d-flex justify-content-around'
                  style={{ gap: '30px' }}
                >
                  <div>
                    <div>
                      <b> Cuisine: </b>
                      {recipieData.cuisine}
                    </div>
                    <div>
                      <b> MealType: </b>
                      {recipieData.mealType}
                    </div>
                  </div>

                  <div>
                    <div>
                      <b>Price: </b>
                      {productsData[index]}
                    </div>
                    <div>
                      <b> Rating: </b>
                      {recipieData.rating}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <b> PrepTimeMinutes: </b>
                    {recipieData.prepTimeMinutes}
                  </div>
                  <div>
                    <b> CookTimeMinutes: </b>
                    {recipieData.cookTimeMinutes}
                  </div>
                  <div>
                    <b> CaloriesPerServing: </b>
                    {recipieData.caloriesPerServing}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {recipiesData.length === 0 && (
        <div className='d-flex justify-content-center my-5'>
          <img src={dataNotFound} alt='no data found' />
        </div>
      )}
    </div>
  );
}

export default Recipies;
