import React, { useState } from "react";

const Addpost = ({ onAddPost }) => {
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });

  const onValChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePostData = (event) => {
    event.preventDefault();
    onAddPost(formData);
    setFormData({ postTitle: "", postBody: "" });
  };

  return (
    <div className="container">
      <div className="add-post p-3 m-3">
        <h5 className="text-decoration-underline">Add posts !!</h5>
        <form className="d-flex align-items-center" onSubmit={handlePostData}>
          <div className="d-flex flex-grow-1 align-items-center">
            <label htmlFor="title" className="fs-4 ">
              Title :
            </label>
            <input
              type="text"
              className="form-control box-shadow m-2 d-inline w-75"
              name="postTitle"
              value={formData.postTitle}
              onChange={onValChange}
              required
            />
          </div>

          <div className="d-flex flex-grow-1 align-items-center ">
            <label htmlFor="data" className="me-3 fs-4">
              Data :
            </label>
            <textarea
              name="postBody"
              cols="20"
              rows="2"
              className="form-control box-shadow d-inline w-75"
              value={formData.postBody}
              onChange={onValChange}
              required
            ></textarea>
          </div>

          <button className="btn btn-outline-primary h-50" type="submit">
            Add new post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpost;
