import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Post from './Component/Post';
import Users from './Component/Users';
import Comment from './Component/Comment'
import UserDetail from './Component/UserDetail'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path="/user" element={<Users />} />
          <Route path="/comment/:postId" element={<Comment />} />
          <Route path="/userdetail/:userId" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
