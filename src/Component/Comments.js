import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import AddComments from "./AddComments";

function Comments() {
  const navigate = useNavigate();
  const data = useLocation();
  const { postId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [postData, setPostData] = useState(
    data.state ? data.state.postData : null
  );
  const [commentData, setCommentData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCommentData() {
      try {
        const responseOfComments = await fetch(
          `https://dummyjson.com/posts/${postId}/comments`
        );
        const commentData = await responseOfComments.json();
        // console.log("Fetched comment data:", commentData);
        setCommentData(commentData.comments);
      } catch (error) {
        setError("Error while fetching comment data");
        console.log("Error fetching comment data: ", error);
      }
    }
    fetchCommentData();
  }, [postId]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const responseOfPost = await fetch(
          `https://dummyjson.com/posts/${postId}`
        );
        
        const pData = await responseOfPost.json();
        const userId = pData.userId;

        const responseOfUsers = await fetch(
          `https://dummyjson.com/users/${userId}`
        );

        const uData = await responseOfUsers.json();
        setPostData({ ...pData, username: uData.username });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error while fetching data");
        console.log("Error fetching data: ", error);
      }
    }

    if (!postData) {
      fetchData();
    }
  }, [postId]);

  const onAddComment = async (commentDetail) => {
    setDisable(true);
    try {
      const responseOfComments = await fetch(
        "https://dummyjson.com/comments/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: commentDetail.comment,
            postId: parseInt(postId),
            userId: 5,
          }),
        }
      );

      const newComment = await responseOfComments.json();
      console.log("data : ", newComment);
      setCommentData((prevCommentData) =>
        prevCommentData ? [...prevCommentData, newComment] : [newComment]
      );
 
      setDisable(false);
    } catch (error) {
      setError("Error while adding comment");
      console.log("Error adding comment: ", error);
    }
  };

  const deleteComment = async (commentId) => {
    console.log("CommentID : ", commentId);
    let confirmMsg = window.confirm("Sure you want to delete data ?? ");
    if (confirmMsg) {
      try {
        fetch(`https://dummyjson.com/comments/${commentId}`, {
          method: "DELETE",
        });
        setCommentData(
          commentData.filter((comment) => comment.id !== commentId)
        );
      } catch (e) {
        console.log("Error : ", e);
      }
    }
  };
  const handleEdit = (event, commentId) => {
    event.stopPropagation();
    setIsEdit(!isEdit);
    console.log("Edit ...", commentId);
  };
  const handleSave = (event, commentId) => {
    event.stopPropagation();
    setIsEdit(!isEdit);
    console.log("Save ...", commentId);
  };

  if (isLoading) {
    return (
      <div className="container text-center ">
        <img src={loader} alt="Loading ..." style={{ opacity: 0.5 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container d-flex">
        <div className="card card1 flex-grow-1 align-items-center">
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
    <div className="container">
      <div className="card card1">
        {postData && (
          <div className="postData-detail m-3 p-3 w-100">
            <button
              className="float-end btn btn-primary"
              onClick={() => navigate("/")}
            >
              Back to page
            </button>
            <div className="post-content card-body mt-5">
              <h4 className="post-heading card-title">
                {postData.id}. {postData.title}
              </h4>
              <div className="card-text">{postData.body}</div>
            </div>

            <h4 className="ps-3 mb-4">Comments</h4>
            {(commentData || []).length > 0 ? (
              commentData.map((comment) => (
                <div key={comment.id} className="comment-data ms-3 my-3">
                  <div className="card-body">
                    <i className="fa fa-comment me-3"></i>
                    {comment.id}. {comment.body}
                    {!isEdit ? (
                      <i
                        className="fa fa-edit comment-edit-btn"
                        onClick={(event) => handleEdit(event, comment.id)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-save comment-edit-btn"
                        onClick={(event) => handleSave(event, comment.id)}
                      ></i>
                    )}
                    <i
                      className="fa fa-trash comment-trash-btn"
                      onClick={() => deleteComment(comment.id)}
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
      <AddComments onAddComment={onAddComment} disable={disable} />
    </div>
  );
}

export default Comments;
