import React, { useEffect, useRef, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { getAllUsersData } from '../services/users.service';
import './login.css';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [error, setError] = useState('');
  const addRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const responseOfPostData = await fetch(
        'https://dummyjson.com/auth/login',
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

      if (responseData.id) {
        navigate('/posts', {
          state: { responseData: responseData },
        });
      } else {
        addRef.current.textContent = 'Username and password are not valid !!';
        addRef.current.classList.add('wrapper');
        setTimeout(() => {
          addRef.current.textContent = '';
          addRef.current.classList.remove('wrapper');
        }, 1000);
        setError('Username and password are not valid !!');
        toast.error('Username and password are not valid !!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Error while fetching data');
    }
    setIsLoading(false);
  };

  const { data: usersData } = useFetchData(getAllUsersData);

  useEffect(() => {
    usersData.map((data) => console.log(data.username, ',', data.password));
  }, []);

  return (
    <div className='krisha d-flex flex-column gap-3'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Username'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className='remember-forgot justify-content-end'>
            <label>
              <input type='checkbox' />
              Remember Me
            </label>
          </div>
          <button type='submit' className='btn'>
            {isLoading ? 'Login....' : 'Login'}
          </button>

          <div className='register-link'>
            <p>
              Dont have an account?{' '}
              <NavLink to='/registration'>Register</NavLink>
            </p>
          </div>
        </form>
      </div>
      <div style={{ width: '420px' }} className='d-flex align-items-center'>
        <span
          ref={addRef}
          className='msgDisplay text-danger'
          style={{ padding: '0px 0px 0px 60px', fontWeight: 'bold' }}
        ></span>
      </div>
    </div>
  );
};

export default Login;
