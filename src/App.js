import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Post from './Component/Post';
import Users from './Component/Users';
import Comment from './Component/Comment'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Post />} />
            <Route path="user" element={<Users />} />
            <Route path="/comment" element={<Comment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
