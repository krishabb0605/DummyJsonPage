import React, { useEffect, useRef, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { getAllUsersData } from '../services/users.service';
import './login.css';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Registration = () => {
  const [error, setError] = useState('');
  const addRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: '', password: '', newPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (data.password !== data.newPassword) {
      alert('Password is not matched !!');
    } else {
      try {
        const responseOfPostData = await fetch(
          'https://dummyjson.com/users/add',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: data.name,
              password: data.password,
            }),
          }
        );

        const responseData = await responseOfPostData.json();
        console.log('responsedata : ', responseData);
      } catch (e) {
        console.log('Error:', e);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='krisha d-flex flex-column gap-3'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Enter username'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Enter password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Confirm password'
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              required
            />
          </div>

          <button type='submit' className='btn'>
            {isLoading ? 'Register....' : 'Register'}
          </button>

          <div className='register-link text-end'>
            <p>
              Back To
              <NavLink to='/'> Login</NavLink>
            </p>
          </div>
        </form>
      </div>

      {/* <div style={{ width: '420px' }} className='d-flex align-items-center'>
        <span
          ref={addRef}
          className='msgDisplay text-danger'
          style={{ padding: '0px 0px 0px 60px', fontWeight: 'bold' }}
        ></span>
      </div> */}
    </div>
  );
};

export default Registration;
