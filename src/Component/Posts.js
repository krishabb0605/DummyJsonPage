import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import Addpost from "./AddPost";

function Posts() {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { postData: postData[postId - 1] } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const responseOfData = await fetch(
          "https://dummyjson.com/posts?limit=150"
        );
        const responseOfUsers = await fetch(
          "https://dummyjson.com/users?limit=100"
        );

        const pData = await responseOfData.json();
        const uData = await responseOfUsers.json();

        const users = uData.users || [];
        const fetchedPosts = (pData.posts || []).map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return {
            ...post,
            username: user ? user.username : "Unknown",
          };
        });

        setPostData(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error while fetching data");
        console.log("Error in fetching : ", error);
      }
    }
    fetchData();
  }, []);

  const onAddPost = async (postDetail) => {
    try {
      const responseOfPosts = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postDetail.title,
          body: postDetail.data,
          userId: 5,
        }),
      });
      const newPost = await responseOfPosts.json();

      newPost.username = "Krisha";
      setPostData([...postData, newPost]);
    } catch (error) {
      setError("Error while adding post");
      console.log("Error : ", error);
    }
  };

  const deletePost = (event, postId) => {
    event.stopPropagation();
    console.log("PostId : ", postId);
    let confirmMsg = window.confirm("Sure you want to delete data ?? ");
    if (confirmMsg) {
      try {
        fetch(`https://dummyjson.com/posts/${postId}`, {
          method: "DELETE",
        });
        setPostData(postData.filter((post) => post.id !== postId));
      } catch (e) {
        console.log("Error : ", e);
      }
    }
  };

  const handleEdit = (event, postId) => {
    event.stopPropagation();
    setIsEdit(!isEdit);
    console.log("Edit ...", postId);
  };
  const handleSave = (event, postId) => {
    event.stopPropagation();
    setIsEdit(!isEdit);
    console.log("Save ...", postId);
  };

  if (isLoading) {
    return (
      <div className="container text-center ">
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }

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
    <div className="container">
      <a href="#add">
        <button className="arrow-down m-3">
          <i className="fa fa-arrow-down"></i>
        </button>
      </a>
      <button className="btn btn-primary float-end my-2">
        <a href="#add" className="text-white text-decoration-none">
          Add post
        </a>
      </button>
      <div className="card card1">
        {postData &&
          postData.map((postData) => (
            <div
              key={postData.id}
              className="post-data m-3 p-3 w-100"
              onClick={() => handlePostClick(postData.id)}
            >
              <div className="post-content card-body p-3 ">
                <h4 className="post-heading card-title">
                  {postData.id}. {postData.title}
                  {!isEdit ? (
                    <i
                      className="fa fa-edit post-edit-btn"
                      onClick={(event) => handleEdit(event, postData.id)}
                    ></i>
                  ) : (
                    <i className="fa fa-save post-edit-btn" onClick={(event) => handleSave(event, postData.id)}></i>
                  )}
                  <i
                    className="fa fa-trash trash-btn"
                    onClick={(event) => deletePost(event, postData.id)}
                  ></i>
                </h4>

                <div className="card-text">{postData.body}</div>
              </div>

              <div className="postUser-name card-footer text-end">
                - By {postData.username}
              </div>
            </div>
          ))}
      </div>
      <div id="add">
        <Addpost onAddPost={onAddPost} />
      </div>
      <a href="#root">
        <button className="arrow m-3">
          <i className="fa fa-arrow-up"></i>
        </button>
      </a>
    </div>
  );
}

export default Posts;
