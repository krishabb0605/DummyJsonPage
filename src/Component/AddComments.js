import React, { useState } from "react";

const AddComments = ({ handleAddComment, disable }) => {
  const [newCommentBody, setNewCommentBody] = useState("");
  const onAddComment = (event) => {
    event.preventDefault();
    handleAddComment(newCommentBody);
    setNewCommentBody("");
  };

  return (
    <div className="container">
      <div className="add-comment p-3 my-3">
        <h5 className="text-decoration-underline">Add comments !!</h5>
        <form className="d-flex align-items-center" onSubmit={onAddComment}>
          <div className="d-flex flex-grow-1 align-items-center ">
            <b>
              <label htmlFor="comment" className="me-4">
                Comment :
              </label>
            </b>

            <textarea
              name="newCommentBody"
              cols="20"
              rows="2"
              className="form-control d-inline w-75 box-shadow"
              value={newCommentBody}
              onChange={(e) => setNewCommentBody(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            className=" btn btn-primary h-50"
            type="submit"
            disabled={disable}
          >
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComments;
