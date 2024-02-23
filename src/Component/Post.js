import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);

  async function fetchData() {
    try {
      const responseOfData = await fetch('https://dummyjson.com/posts');
      const responseOfUsers = await fetch('https://dummyjson.com/users');
      const postData = await responseOfData.json();
      const userData = await responseOfUsers.json();

      setData(postData);
      setUserData(userData)

    } catch (error) {
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
          <div key={index} className="postData m-3 p-3" onClick={() => navigate('comment')}>
            <div className="postContent card-body">
              <h4 className="postHeading card-title">
                <li> {postData.title}</li>
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
