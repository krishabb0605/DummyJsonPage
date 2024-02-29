import React, { useState } from "react";

function AddComments({ onAddComment ,disable}) {
  const [formData, setFormData] = useState({ comment: "" });

  const onValChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  function addComment(event) {
    event.preventDefault();
    onAddComment(formData);
    setFormData({ comment: "" });
  }

  return (
    <div>
      <div className="add-comment p-3 m-3">
        <h5 className="text-decoration-underline">Add comments !!</h5>
        <form className="d-flex align-items-center" onSubmit={addComment}>
          <div className="d-flex flex-grow-1 align-items-center ">
            <b>
              <label htmlFor="comment" className="me-4">
                Comment :
              </label>
            </b>
            <textarea
              name="comment"
              id="comment"
              cols="20"
              rows="2"
              className="form-control d-inline w-75 box-shadow"
              value={formData.comment}
              onChange={onValChange}
              required
            ></textarea>
          </div>
          <button className=" btn btn-primary h-50" type="submit" disabled={disable}>
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddComments;
