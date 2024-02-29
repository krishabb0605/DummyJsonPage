import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";

function User() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const userDetail = (userId) => {
    navigate(`/users/${userId}`, { state: { userdata: userData[userId - 1] } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const responseOfUsers = await fetch(
          `https://dummyjson.com/users?limit=100`
        );
        const uData = await responseOfUsers.json();
        setUserData(uData.users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error while fetching data");
        console.log("Error : ", error);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container text-center ">
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <div className="card card1">
          <marquee>
            <img
              src={errorSymbol}
              alt="Loading ... "
              style={{ opacity: 0.5 }}
            />
            {error}
          </marquee>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card card1">
        {userData &&
          userData.map((userdata, index) => (
            <div
              key={index}
              className="user-data data1 m-3 p-3 pb-0 d-flex flex-column flex-xl-row justify-content-center"
              onClick={() => userDetail(userdata.id)}
            >
              <div className="user-photo d-flex align-items-center h-100">
                <img
                  src={userdata.image}
                  alt="UserImage"
                  className="h-75 user-image"
                />
              </div>
              <div className="align-self-center">
                <h4 className="userName">
                  <i className="fa fa-user me-2"></i>
                  {userdata.firstName} {userdata.lastName}
                </h4>
                <i className="fa fa-phone me-2"></i>
                <i>{userdata.phone}</i>
                <br />
                <i className="fa fa-envelope-open me-2"></i>
                <i>{userdata.email}</i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default User;
