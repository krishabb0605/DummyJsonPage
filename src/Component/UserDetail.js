import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import { getUserDataById } from "../services/users.service";
import useFetchData from "../hooks/useFetchData";

function UserDetail() {
  const navigate = useNavigate();
  const { userId } = useParams();

  // Fetch user data when want to fetch data through URL change

  let {
    isLoading,
    error,
    data: userdata,
  } = useFetchData(getUserDataById, userId);

  // Handle page during fetching data ...

  if (isLoading) {
    return (
      <div className="container text-center " style={{ marginTop: "100px" }}>
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }

  // Handle page whenever error occurs ...

  if (error) {
    return (
      <div className="container d-flex">
        <div className="card card-data flex-grow-1 align-items-center">
          <marquee>
            <img
              src={errorSymbol}
              alt="Loading ... "
              style={{ opacity: 0.5 }}
            />
            {error}
          </marquee>
        </div>
        <button
          className=" float-end m-3 btn btn-primary"
          onClick={() => navigate("/users")}
        >
          Back to User page
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "90px" }}>
      <div className="card card-data  mb-3 w-100">
        <div className="p-3 m-3 d-flex flex-column w-100 user-detail">
          {/* Back to user page ... */}
          <button
            className="btn btn-primary  align-self-end mb-5"
            style={{ width: "120px" }}
            onClick={() => navigate("/users")}
          >
            Back to page
          </button>

          {/*  Display userData ... */}

          {userdata && (
            <div className="d-flex flex-column flex-lg-row gap-5 align-items-center ">
              <div className="image-shadow text-center">
                <img src={userdata.image} alt="UserImage" className="h-75 " />
              </div>
              <div className="">
                <div className="card-body">
                  <h2 className="card-title text-center pb-3 ">
                    <i>
                      <u>
                        <i className="fa fa-user me-2"></i>
                        {userdata.firstName} {userdata.lastName}
                      </u>
                    </i>
                  </h2>
                  <div className="d-flex flex-column flex-sm-row justify-content-around">
                    <div>
                      <p className="card-text">
                        <b>UserName : </b>
                        {userdata.username}
                      </p>
                      <p className="card-text">
                        <b>Gender : </b>
                        {userdata.gender}
                      </p>
                      <p className="card-text">
                        <b>BirthDate : </b>
                        {userdata.birthDate}
                      </p>
                      <p className="card-text">
                        <b>Age : </b>
                        {userdata.age}
                      </p>
                      <p className="card-text">
                        <b>BloodGroup : </b>
                        {userdata.bloodGroup}
                      </p>
                      <p className="card-text">
                        <b>Height : </b>
                        {userdata.height}
                      </p>
                      <p className="card-text">
                        <b>Weight : </b>
                        {userdata.weight}
                      </p>
                      <p className="card-text">
                        <b>EyeColor : </b>
                        {userdata.eyeColor}
                      </p>
                      <p className="card-text">
                        <b>HairColor : </b>
                        {userdata.hair.color}
                      </p>
                      <p className="card-text">
                        <b>University : </b>
                        {userdata.university}
                      </p>
                    </div>
                    <div>
                      <p className="card-text">
                        <b>Company Details: </b>
                      </p>
                      <ul>
                        <li>
                          <b>Name : </b>
                          {userdata.company.name}{" "}
                        </li>
                        <li>
                          <b>Role : </b>
                          {userdata.company.title}{" "}
                        </li>
                        <li>
                          <b>Department : </b>
                          {userdata.company.department}{" "}
                        </li>
                        <li>
                          <b>Address : </b>
                          {userdata.company.address.address} ,{" "}
                          {userdata.company.address.city}{" "}
                        </li>
                      </ul>
                      <p className="card-text">
                        <b>Crypto Details: </b>
                      </p>
                      <ul>
                        <li>
                          <b>Coin : </b>
                          {userdata.crypto.coin}{" "}
                        </li>
                        <li>
                          <b>Network : </b>
                          {userdata.crypto.network}{" "}
                        </li>
                      </ul>
                      <p className="card-text">
                        <b>Bank Details: </b>
                      </p>
                      <ul>
                        <li>
                          <b>CardType : </b>
                          {userdata.bank.cardType}{" "}
                        </li>
                        <li>
                          <b>Currency : </b>
                          {userdata.bank.currency}{" "}
                        </li>
                        <li>
                          <b>CardNumber : </b>
                          {userdata.bank.cardNumber}{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex flex-wrap align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className="fa fa-phone me-2"></i>
                    <i className="me-5">{userdata.phone}</i>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fa fa-envelope-open me-2"></i>
                    <i className="me-5">{userdata.email}</i>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fa fa-map-pin me-2"></i>
                    <i>
                      {userdata.address.address} , {userdata.address.city} ,{" "}
                      {userdata.address.state}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
