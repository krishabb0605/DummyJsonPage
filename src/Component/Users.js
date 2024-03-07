import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import {
  getAllUsersData,
  searchUsersDataByQuery,
} from "../services/users.service";
import useFetchData from "../hooks/useFetchData";

function User() {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");

  // Navigate to userdetail page ...

  const userDetail = (userId) => {
    navigate(`/users/${userId}`, {
      state: { userdata: usersData[userId - 1] },
    });
  };

  //  Fetch userdata ...

  const searchUsersData = (usersAllData) => {
    let filteredUsersData = searchUsersDataByQuery(searchQuery, usersAllData);
    return filteredUsersData;
  };

  let { isLoading, error, data: usersData } = useFetchData(getAllUsersData);
  console.log("heyy", usersData);

  if (isLoading) {
    return (
      <div className="container text-center ">
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }

  // Handle page whenever error occurs ...

  if (error) {
    return (
      <div className="container">
        <div className="card card-data">
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
      <input
        type="search"
        className="form-control my-3"
        placeholder="Search ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
      <div className="card card-data">
        {/* Display user data ... */}
        {usersData &&
          usersData.map((userdata, index) => (
            // Onclick navigate to userdetail page ...
            <div
              key={index}
              className="user-data m-3 p-3 pb-0 d-flex flex-column flex-xl-row justify-content-center"
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
                  {userdata.id} {userdata.firstName} {userdata.lastName}
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
