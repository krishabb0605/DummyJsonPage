import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import Posts from "./Component/Posts";
import Users from "./Component/Users";
import Comments from "./Component/Comments";
import UserDetail from "./Component/UserDetail";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts/:postId" element={<Comments />} />
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
