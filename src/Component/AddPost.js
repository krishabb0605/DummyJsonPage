import React, { useState } from "react";

function Addpost({ onAddPost }) {
  const [formData, setFormData] = useState({
    data: "",
    title: "",
  });

  const onValChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  function addComment(event) {
    event.preventDefault();
    onAddPost(formData);
    setFormData({ data: "", title: "" });
  }

  return (
    <div>
      <div className="add-post p-3 m-3">
        <h5 className="text-decoration-underline">Add posts !!</h5>
        <form className="d-flex align-items-center" onSubmit={addComment}>
          <div>
            <label htmlFor="title" className="fs-4 ">
              Title :
            </label>
            <input
              type="text"
              className="form-control box-shadow m-2 d-inline w-75"
              id="title"
              name="title"
              value={formData.title}
              onChange={onValChange}
              required
            />
          </div>
          <div className="d-flex flex-grow-1 align-items-center ">
            <label htmlFor="data" className="me-2">
              Data :
            </label>
            <textarea
              name="data"
              id="data"
              cols="20"
              rows="2"
              className="form-control box-shadow d-inline w-75"
              value={formData.data}
              onChange={onValChange}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary h-50" type="submit">
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addpost;
