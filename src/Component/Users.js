import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userDetail = (userId) => {
    navigate(`/userdetail/${userId}`, { state: { userData: userData.users[userId - 1] } })
  }

  async function fetchData() {
    try {
      const responseOfUsers = await fetch(`https://dummyjson.com/users`);
      const userData = await responseOfUsers.json();
      // console.log("Hey...", userData.users[0])
      setUserData(userData);
    }
    catch (error) {
      console.log("Error : ", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='card'>
        {userData && userData.users.map((userdata, index) => (
          <div key={index} className="userData data1 m-3 p-3 d-flex justify-content-center" onClick={() => userDetail(userdata.id)}>

            <div className="user-photo col-4">
              <img src={userdata.image} alt="" className='h-100' />
            </div>
            <div className="col-8 align-self-center">
              <h4 className="userName">
              <i className="fa fa-user me-2"></i>
                 {userdata.firstName} {userdata.lastName}
              </h4>
              <i className="fa fa-phone me-2"></i>
              <i>{userdata.phone}</i><br/>
              <i className="fa fa-envelope-open me-2"></i>
              <i>{userdata.email}</i>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default User;
