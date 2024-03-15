import React, { useEffect, useState } from "react";
import Addpost from "./AddPost";
import { useNavigate } from "react-router-dom";
import {
  addPost,
  deletePost,
  getAllPostData,
  saveEditedPostData,
} from "../services/posts.service";
import { getAllUsersData } from "../services/users.service";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import useFetchData from "../hooks/useFetchData";

const Posts = () => {
  const [isNavigatePage, setIsNavigatePage] = useState(false);

  const [editedPostFormData, setEditedPostFormData] = useState({
    postIndex: -1,
    postBody: "",
    postTitle: "",
  });

  // Navigate page to postdetail ...

  const navigate = useNavigate();
  const handlePostClick = (event, postId) => {
    if (isNavigatePage) {
      event.stopPropagation();
    } else {
      navigate(`/posts/${postId}`, {
        state: { postData: postsData[postId - 1] },
      });
    }
  };

  const {
    isLoading,
    error,
    setError,
    data: postsData,
    setData: setPostsData,
  } = useFetchData(getAllPostData);

  const { data: usersData } = useFetchData(getAllUsersData);

  useEffect(() => {
    const fetchedPosts = (postsData || []).map((post) => {
      const user = usersData.find((user) => user.id === post.userId);
      return {
        ...post,
        username: user ? user.username : "Unknown",
      };
    });
    setPostsData(fetchedPosts);
  }, [usersData]);

  // Add post data ...

  const handleAddPost = async (postDetail) => {
    try {
      const newPostData = await addPost(postDetail);
      setPostsData([...postsData, newPostData]);
    } catch (error) {
      setError("Error while adding post");
      console.log("Error : ", error);
    }
  };

  // Delete post Data ...

  const handleDeletePost = (event, postId) => {
    event.stopPropagation();
    let confirmMsg = window.confirm("Sure you want to delete data ?? ");
    if (confirmMsg) {
      try {
        deletePost(postId);
        setPostsData(postsData.filter((post) => post.id !== postId));
      } catch (e) {
        setError("Error while delete post");
        console.log("Error : ", e);
      }
    }
  };

  // Edit post data ...

  const handleEditPost = (event, post) => {
    event.stopPropagation();
    setIsNavigatePage(true);
    setEditedPostFormData({
      postIndex: post.id,
      postTitle: post.title,
      postBody: post.body,
    });
    console.log("Edit ...", post.id);
  };

  // Save edited post Data ...

  const handleSavePost = async (postId) => {
    setIsNavigatePage(false);
    setEditedPostFormData({ postIndex: -1 });
    try {
      const updatedPost = await saveEditedPostData(
        editedPostFormData,
        postId,
        postsData
      );
      setPostsData(updatedPost);
    } catch (error) {
      setError("Error while save post");
      console.error("Error updating title:", error);
    }
  };

  // Handle page during fetching data ...

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
      <div className="container w-50">
        <marquee>
          <img src={errorSymbol} alt="Loading ... " style={{ opacity: 0.5 }} />
          {error}
        </marquee>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Redirected to Add post ...*/}

      <a href="#addPost">
        <button className="arrow-down m-3">
          <i className="fa fa-arrow-down"></i>
        </button>
      </a>
      <button className="btn btn-primary float-end my-2">
        <a href="#addPost" className="text-white text-decoration-none">
          Add post
        </a>
      </button>

      {/* Display post data ... */}

      <div className="card card-data w-100">
        {postsData &&
          postsData.map((postData) => (
            //  OnClick of post data, navigate to that postDetail page ...
            <div
              key={postData.id}
              className="post-data m-3 p-3 w-100"
              onClick={(event) => handlePostClick(event, postData.id)}
            >
              <div className="post-content card-body p-3 ">
                <h4 className="post-heading card-title">
                  {postData.id}.
                  {/* If user wants to edit data then open inputbox to edit that data otherwise direct display that data ... */}
                  {editedPostFormData.postIndex !== postData.id ? (
                    postData.title
                  ) : (
                    <input
                      type="text"
                      value={editedPostFormData.postTitle}
                      onChange={(e) =>
                        setEditedPostFormData({
                          ...editedPostFormData,
                          postTitle: e.target.value,
                        })
                      }
                      className="w-75"
                      autoFocus
                    />
                  )}
                  {/* Edit and Save Button for post... */}
                  {editedPostFormData.postIndex !== postData.id ? (
                    <i
                      className="fa fa-edit post-edit-btn"
                      onClick={(event) => handleEditPost(event, postData)}
                    ></i>
                  ) : (
                    <i
                      className="fa fa-save post-edit-btn"
                      onClick={(event) => handleSavePost(postData.id)}
                    ></i>
                  )}
                  {/* Delete button for post ... */}
                  <i
                    className="fa fa-trash trash-btn"
                    onClick={(event) => handleDeletePost(event, postData.id)}
                  ></i>
                </h4>

                {/* If user wants to edit data then open inputbox to edit that data otherwise direct display that data ...  */}

                <div className="card-text">
                  {editedPostFormData.postIndex !== postData.id ? (
                    postData.body
                  ) : (
                    <textarea
                      rows="3"
                      value={editedPostFormData.postBody}
                      onChange={(e) =>
                        setEditedPostFormData({
                          ...editedPostFormData,
                          postBody: e.target.value,
                        })
                      }
                      className="w-100"
                    />
                  )}
                </div>
              </div>

              <div className="postUser-name card-footer text-end">
                - By {postData.username}
              </div>
            </div>
          ))}
      </div>

      {/* Add post data ... */}
      <div id="addPost">
        <Addpost onAddPost={handleAddPost} />
      </div>

      {/* Redirect to top of the page ... */}
      <a href="#root">
        <button className="arrow-up m-3">
          <i className="fa fa-arrow-up"></i>
        </button>
      </a>
    </div>
  );
};

export default Posts;
