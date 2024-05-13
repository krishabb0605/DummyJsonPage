import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Posts from './Component/Posts';
import Users from './Component/Users';
import PostDetail from './Component/PostDetail';
import UserDetail from './Component/UserDetail';
import Quotes from './Component/Quotes';
import Recipies from './Component/Recipies';
import Login from './Component/Login';
import CartData from './Component/CartData';
import Registration from './Component/Registration';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/:postId' element={<PostDetail />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:userId' element={<UserDetail />} />
          <Route path='/quotes' element={<Quotes />} />
          <Route path='/food' element={<Recipies />} />
          <Route path='/food/cart' element={<CartData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
