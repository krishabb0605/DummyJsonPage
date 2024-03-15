import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AddComments from "./AddComments";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import { getPostCommentById, getPostDataByID } from "../services/posts.service";
import { getUserDataById } from "../services/users.service";
import {
  addCommentData,
  deletCommentData,
  saveEditedCommentData,
} from "../services/comments.service";
import useFetchData from "../hooks/useFetchData";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  const [editedCommentFormData, setEditedCommentFormData] = useState({
    editedCommentIndex: -1,
    editedCommentData: "",
  });

  const {
    isLoading,
    error,
    setError,
    data: commentsData,
    setData: setCommentsData,
  } = useFetchData(getPostCommentById, postId);

  const { data: postData, setData: setPostData } = useFetchData(
    getPostDataByID,
    postId
  );

  const { data: userData } = useFetchData(getUserDataById, postData.userId);

  useEffect(() => {
    setPostData({ ...postData, username: userData.username });
  }, [userData]);

  // Add comment data ...

  const handleAddComment = async (commentDetail) => {
    setSubmitBtnDisable(true);
    try {
      const newComment = await addCommentData(commentDetail, postId);
      setCommentsData((prevCommentData) =>
        prevCommentData ? [...prevCommentData, newComment] : [newComment]
      );
      setSubmitBtnDisable(false);
    } catch (error) {
      setError("Error while adding comment");
      console.log("Error adding comment: ", error);
    }
  };

  //  Delete comment  data ...

  const handleDeleteComment = async (commentId) => {
    let confirmMsg = window.confirm("Sure you want to delete data ?? ");
    if (confirmMsg) {
      try {
        deletCommentData(commentId);
        setCommentsData(
          commentsData.filter((comment) => comment.id !== commentId)
        );
      } catch (e) {
        setError("Error while delete comment");
        console.log("Error : ", e);
      }
    }
  };

  // Edit and save data ...

  const handleEditComment = (event, comment) => {
    event.stopPropagation();
    setEditedCommentFormData({
      editedCommentIndex: comment.id,
      editedCommentData: comment.body,
    });
    console.log("Edit ...", comment.id);
  };

  const handleSaveComment = async (event, commentId) => {
    event.stopPropagation();
    setEditedCommentFormData({ editedCommentIndex: -1 });
    try {
      const updatedCommentData = await saveEditedCommentData(
        commentId,
        editedCommentFormData,
        commentsData
      );
      setCommentsData(updatedCommentData);
    } catch (e) {
      console.log("Error : ", e);
    }
    console.log("Save ...", commentId);
  };

  // Handle page during fetching data ...

  if (isLoading) {
    return (
      <div className="container text-center ">
        <img src={loader} alt="Loading ..." style={{ opacity: 0.5 }} />
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
          onClick={() => navigate("/")}
        >
          Back to post page
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <button
        className="float-end btn btn-primary my-3"
        onClick={() => navigate("/")}
      >
        Back to page
      </button>
      <div className="card card-data w-100">
        {/* Display post data ... */}
        {postData && (
          <div className="postData-detail m-3 p-3 w-100">
            <button className="btn btn-primary float-end my-2">
              <a href="#addComment" className="text-white text-decoration-none">
                Add comment
              </a>
            </button>
            <div className="post-content card-body mt-5">
              <h4 className="post-heading card-title">
                {postData.id}. {postData.title}
              </h4>
              <div className="card-text">{postData.body}</div>
            </div>

            {/* Display comment data  ... */}

            <h4 className="ps-3 mb-4">Comments</h4>
            {commentsData && commentsData.length > 0 ? (
              commentsData.map((comment) => (
                <div key={comment.id} className="comment-data ms-3 my-3">
                  <div className="card-body">
                    <i className="fa fa-comment me-3"></i>
                    {comment.id}.
                    {editedCommentFormData.editedCommentIndex == comment.id ? (
                      <input
                        type="text"
                        className="form-control w-75 d-inline ms-3"
                        value={editedCommentFormData.editedCommentData}
                        onChange={(e) =>
                          setEditedCommentFormData({
                            ...editedCommentFormData,
                            editedCommentData: e.target.value,
                          })
                        }
                        autoFocus
                      />
                    ) : (
                      comment.body
                    )}
                    {/* Edit and save btn for comment ...*/}
                    {editedCommentFormData.editedCommentIndex !== comment.id ? (
                      <i
                        className="fa fa-edit comment-edit-btn"
                        onClick={(event) => handleEditComment(event, comment)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-save comment-edit-btn"
                        onClick={(event) =>
                          handleSaveComment(event, comment.id)
                        }
                      ></i>
                    )}
                    {/* Delete btn for comment ... */}
                    <i
                      className="fa fa-trash comment-trash-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                    ></i>
                  </div>
                  <div className="card-footer text-end">
                    - Comment by{" "}
                    {comment.user ? comment.user.username : "Unknown User"}
                  </div>
                </div>
              ))
            ) : (
              <div className="comment-data ms-3 my-3">
                <div className="card-body">No comments available.</div>
              </div>
            )}

            <div className="postUser-name card-footer text-end">
              <b>- Post by {postData.username}</b>
            </div>
          </div>
        )}
      </div>

      {/* Add comment ... */}

      <div id="addComment">
        <AddComments
          handleAddComment={handleAddComment}
          disable={submitBtnDisable}
        />
      </div>
    </div>
  );
};

export default PostDetail;
