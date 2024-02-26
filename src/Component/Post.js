import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {

  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);

  // Navigation to comment component ...
  const navigate = useNavigate();
  const handlePostClick = (postId) => {
    navigate(`/comment/${postId}`, { state: { userData, postData: data.posts[postId - 1] } });
  };

  // Fetching data ...
  async function fetchData() {
    try {
      const responseOfData = await fetch('https://dummyjson.com/posts');
      const responseOfUsers = await fetch('https://dummyjson.com/users');

      const postData = await responseOfData.json();
      const userData = await responseOfUsers.json();

      setData(postData);
      setUserData(userData)

    }
    catch (error) {
      console.log("Error in fetching : ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className='container'>
      <div className='card'>

        {data && data.posts.map((postData, index) => (
          <div key={index} className="postData m-3 p-3" onClick={() => handlePostClick(postData.id)}>

            <div className="postContent card-body p-3 ">

              <h4 className="postHeading card-title">
                {postData.id}. {postData.title}
              </h4>

              <div className="card-text">
                {postData.body}
              </div>

            </div>

            <div className="postUserName card-footer text-end">
              {userData && userData.users.find(user => user.id === postData.userId)
                ? `- By ${userData.users.find(user => user.id === postData.userId).firstName}`
                : 'Unknown'}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Post;
