import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CartData = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const cartData = params.state.cartData;
  const totalCount = cartData.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);

  return (
    <div
      className='container-fluid'
      style={{
        marginTop: '76px',
      }}
    >
      <div
        className='card card1-data justify-content-around'
        style={{
          marginTop: '60px',
          maxHeight: 'calc(100vh - 150px)',
          overflow: 'auto',
        }}
      >
        {cartData &&
          cartData.map((cartData, index) => (
            <div
              key={index}
              className='user-data1 data1 m-2 p-3 d-flex flex-column flex-xl-row '
            >
              <div className='user-photo d-flex flex-column justify-content-center align-items-center h-100'>
                <img
                  src={cartData.image}
                  alt='UserImage'
                  className='h-75 user-image '
                />
              </div>
              <div className='d-flex flex-column align-items-center gap-3'>
                <b className='recipieName'>{cartData.name}</b>
                <div
                  className='align-self-center d-flex justify-content-around'
                  style={{ gap: '30px' }}
                >
                  <div>
                    <div>
                      <b> Cuisine: </b>
                      {cartData.cuisine}
                    </div>
                    <div>
                      <b> MealType: </b>
                      {cartData.mealType}
                    </div>
                  </div>

                  <div>
                    <div>
                      <b>Total: </b>
                      {cartData.price} * {cartData.count}
                    </div>
                    <div>
                      <b> Rating: </b>
                      {cartData.rating}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <b> PrepTimeMinutes: </b>
                    {cartData.prepTimeMinutes}
                  </div>
                  <div>
                    <b> CookTimeMinutes: </b>
                    {cartData.cookTimeMinutes}
                  </div>
                  <div>
                    <b> CaloriesPerServing: </b>
                    {cartData.caloriesPerServing}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className='d-flex justify-content-between gap-2 mt-2'>
        <button
          className='btn btn btn-primary'
          onClick={() => navigate('/food')}
        >
          Back to Food
        </button>
        <div className='d-flex justify-content-end gap-2'>
          <b>Total count : </b>
          <div className='text-decoration-underline'> ${totalCount}</div>
        </div>
      </div>
    </div>
  );
};

export default CartData;
