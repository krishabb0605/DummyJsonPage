import React from 'react'
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='card'>

        <div className="postData m-3 p-3" onClick={() => navigate("/comment")}>
          <div className="postContent card-body">
            <h4 className="postHeading card-title">
              Heading
            </h4>
            <div className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eius cum aspernatur debitis esse ut pariatur consequatur, maxime nemo rem quas, quam reiciendis deleniti ratione commodi optio. Maiores, id voluptate.</div>
          </div>
          <div className="postUserName card-footer text-end">
            - By krisha
          </div>
        </div>

        <div className="postData m-3 p-3">
          <div className="postContent card-body">
            <h4 className="postHeading card-title">
              Heading
            </h4>
            <div className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eius cum aspernatur debitis esse ut pariatur consequatur, maxime nemo rem quas, quam reiciendis deleniti ratione commodi optio. Maiores, id voluptate.</div>
          </div>
          <div className="postUserName card-footer text-end">
            - By krisha
          </div>
        </div>

        <div className="postData m-3 p-3">
          <div className="postContent card-body">
            <h4 className="postHeading card-title">
              Heading
            </h4>
            <div className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eius cum aspernatur debitis esse ut pariatur consequatur, maxime nemo rem quas, quam reiciendis deleniti ratione commodi optio. Maiores, id voluptate.</div>
          </div>
          <div className="postUserName card-footer text-end">
            - By krisha
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Post