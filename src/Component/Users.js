import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from './Images/Rounded blocks.gif';
import errorSymbol from './Images/Error.gif';
import dataNotFound from './Images/dataNotFound.png';

import {
  getAllUsersData,
  searchUsersDataByQuery,
} from '../services/users.service';
import useFetchData from '../hooks/useFetchData';

function User() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  // Navigate to userdetail page ...

  const userDetail = (userId) => {
    navigate(`/users/${userId}`, {
      state: { userdata: usersData[userId - 1] },
    });
  };

  //  Fetch userdata ...

  const searchUsersData = (usersAllData) => {
    let filteredUsersData = searchUsersDataByQuery(searchQuery, usersAllData);
    return filteredUsersData;
  };

  let {
    isLoading,
    error,
    data: usersData,
    setData: setUserData,
  } = useFetchData(getAllUsersData);

  useEffect(() => {
    const serachDatas = async () => {
      setUserData(await searchUsersData(usersData));
    };
    serachDatas();
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
      <div className='container'>
        <div className='card card-data'>
            <img
              src={errorSymbol}
              alt='error ... '
              style={{ opacity: 0.5 }}
            />
            {error}
        </div>
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
            autoFocus
          />
        </div>
      </div>
      <div
        className='card card-data justify-content-around w-100 '
        style={{
          marginTop: '60px',
          maxHeight: 'calc(100vh - 140px)',
          overflow: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        {/* Display user data ... */}
        {(usersData || []) &&
          usersData.map((userdata, index) => (
            // Onclick navigate to userdetail page ...
            <div
              key={index}
              className='user-data m-2 p-3 pb-0 d-flex justify-content-center'
              onClick={() => userDetail(userdata.id)}
            >
              <div className='user-photo d-flex align-items-center h-100'>
                <img
                  src={userdata.image}
                  alt='UserImage'
                  className='h-75 user-image'
                />
              </div>
              <div className='align-self-center'>
                <h4 className='userName'>
                  <i className='fa fa-user me-2'></i>
                  {userdata.id} {userdata.firstName} {userdata.lastName}
                </h4>
                <i className='fa fa-phone me-2'></i>
                <i>{userdata.phone}</i>
                <br />
                <i className='fa fa-envelope-open me-2'></i>
                <i>{userdata.email}</i>
              </div>
            </div>
          ))}
      </div>
      {usersData.length === 0 && (
        <div className='d-flex justify-content-center my-5'>
          <img src={dataNotFound} alt='no data found' />
        </div>
      )}
    </div>
  );
}

export default User;
