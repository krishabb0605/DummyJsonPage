import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function UserDetail() {
    const data = useLocation();
    const navigate = useNavigate();
    const userdata = data.state.userData;
    console.log(userdata)

    return (
        <div className='container'>
            <div className="card mb-3 w-100">
                <div className="p-3 m-3 d-flex flex-column w-100">
                    <button className='btn btn-primary w-25 align-self-end mb-5' onClick={() => navigate(-1)}>Back to page</button>
                    <div className="row align-items-center ">
                        <div className="col-4 image-shadow text-center">
                            <img src={userdata.image} alt="UserImage" className='h-75 ' />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h2 className="card-title text-center pb-3 "><i><u><i className="fa fa-user me-2"></i>
                                    {userdata.firstName} {userdata.lastName}</u></i></h2>
                                <div className="row">
                                    <div className="col">
                                        <p className="card-text"><b>UserName : </b>{userdata.username}</p>
                                        <p className="card-text"><b>Gender : </b>{userdata.gender}</p>
                                        <p className="card-text"><b>BirthDate : </b>{userdata.birthDate}</p>
                                        <p className="card-text"><b>Age : </b>{userdata.age}</p>
                                        <p className="card-text"><b>BloodGroup : </b>{userdata.bloodGroup}</p>
                                        <p className="card-text"><b>Height : </b>{userdata.height}</p>
                                        <p className="card-text"><b>Weight : </b>{userdata.weight}</p>
                                        <p className="card-text"><b>EyeColor : </b>{userdata.eyeColor}</p>
                                        <p className="card-text"><b>HairColor : </b>{userdata.hair.color}</p>
                                        <p className="card-text"><b>University : </b>{userdata.university}</p>

                                    </div>
                                    <div className="col">
                                        <p className="card-text">
                                            <b>Company Details: </b>
                                        </p>
                                        <ul>
                                            <li><b>Name : </b>{userdata.company.name} </li>
                                            <li><b>Role : </b>{userdata.company.title} </li>
                                            <li><b>Department : </b>{userdata.company.department} </li>
                                            <li><b>Address : </b>{userdata.company.address.address} , {userdata.company.address.city} </li>
                                        </ul>
                                        <p className="card-text">
                                            <b>Crypto Details: </b>
                                        </p>
                                        <ul>
                                            <li><b>Coin : </b>{userdata.crypto.coin} </li>
                                            <li><b>Network : </b>{userdata.crypto.network} </li>
                                        </ul>
                                        <p className="card-text">
                                            <b>Bank Details: </b>
                                        </p>
                                        <ul>
                                            <li><b>CardType : </b>{userdata.bank.cardType} </li>
                                            <li><b>Currency : </b>{userdata.bank.currency} </li>
                                            <li><b>CardNumber : </b>{userdata.bank.cardNumber} </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <i className="fa fa-phone me-2"></i>
                                <i className="me-5">{userdata.phone}</i>
                                <i className="fa fa-envelope-open me-2"></i>
                                <i className="me-5">{userdata.email}</i>
                                <i className="fa fa-map-pin me-2"></i>
                                <i>{userdata.address.address} , {userdata.address.city} , {userdata.address.state}</i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserDetail