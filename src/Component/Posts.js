import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addPost,
  deletePost,
  getAllPostData,
  saveEditedPostData,
} from '../services/posts.service';
import { getAllUsersData } from '../services/users.service';
import loader from './Images/Rounded blocks.gif';
import errorSymbol from './Images/Error.gif';
import dataNotFound from './Images/dataNotFound.png';
import useFetchData from '../hooks/useFetchData';

const Posts = () => {
  const [isNavigatePage, setIsNavigatePage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const user = location.state?.responseData;

  useEffect(() => {
    if (user) {
      localStorage.setItem('logInUser', JSON.stringify(user));
    }
  }, []);

  const loginUserData = JSON.parse(localStorage.getItem('logInUser'));

  const [editedPostFormData, setEditedPostFormData] = useState({
    postIndex: -1,
    postBody: '',
    postTitle: '',
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

  const { data: postsDataToShow } = useFetchData(getAllPostData);

  const handleSearch = (datas) => {
    return datas.filter((data) =>
      data.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchedPosts = (postsDataToShow || []).map((post) => {
      const user = usersData.find((user) => user.id === post.userId);
      return {
        ...post,
        username: user ? user.username : 'Unknown',
      };
    });
    setPostsData(handleSearch(fetchedPosts));
  }, [searchQuery]);

  const { data: usersData } = useFetchData(getAllUsersData);

  useEffect(() => {
    const fetchedPosts = (postsData || []).map((post) => {
      const user = usersData.find((user) => user.id === post.userId);
      return {
        ...post,
        username: user ? user.username : 'Unknown',
      };
    });
    setPostsData(fetchedPosts);
  }, [usersData]);

  // Add post data ...

  const [formData, setFormData] = useState({
    postTitle: '',
    postBody: '',
  });

  const handleAddPost = async (postDetail) => {
    try {
      let newPostData = await addPost(postDetail);
      newPostData = { ...newPostData, username: loginUserData.username };

      setPostsData([...postsData, newPostData]);
    } catch (error) {
      setError('Error while adding post');
    }
  };

  const onValChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePostData = (event) => {
    event.preventDefault();
    handleAddPost(formData);
    setFormData({ postTitle: '', postBody: '' });
  };

  // Delete post Data ...

  const handleDeletePost = (event, postId) => {
    event.stopPropagation();
    let confirmMsg = window.confirm('Sure you want to delete data ?? ');
    if (confirmMsg) {
      try {
        deletePost(postId);
        setPostsData(postsData.filter((post) => post.id !== postId));
      } catch (e) {
        setError('Error while delete post');
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
      setError('Error while save post');
      console.error('Error updating title:', error);
    }
  };

  // Handle page during fetching data ...

  if (isLoading) {
    return (
      <div className='container text-center' style={{ marginTop: '100px' }}>
        <img src={loader} alt='Loading ... ' style={{ opacity: 0.5 }} />
      </div>
    );
  }
  // Handle page whenever error occurs ...

  if (error) {
    return (
      <div className='container w-50'>
        <img src={errorSymbol} alt='Loading ... ' style={{ opacity: 0.5 }} />
        {error}
      </div>
    );
  }

  return (
    <div className='container-fluid'>
      {/* Redirected to Add post ...*/}
      <div className='d-flex justify-content-between main-header'>
        <div className='search-header my-3 d-flex gap-3 align-items-center'>
          <div className='flex-grow-1'>
            <i
              className='fa fa-search search-icon'
              style={{ top: '12px', right: '124px' }}
            ></i>
            <input
              type='text'
              className='form-control p-2 search-field'
              placeholder='Search ...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // autoFocus
            />
          </div>
          <button
            className='btn btn-outline-info me-2'
            style={{ height: 'fit-content', textWrap: 'nowrap' }}
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
          >
            Add post
          </button>
        </div>
      </div>

      {/* Display post data ... */}

      {postsData && postsData.length > 0 ? (
        <div
          className='card card-data w-100'
          style={{
            marginTop: '60px',
            maxHeight: 'calc(100vh - 142px)',
            overflow: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          {postsData.map((postData, index) => (
            //  OnClick of post data, navigate to that postDetail page ...
            <div
              key={postData.id}
              id={index === 0 ? 'root1' : ''}
              className='post-data m-3 p-3 w-100'
              onClick={(event) => handlePostClick(event, postData.id)}
            >
              <div className='post-content card-body p-3 '>
                <h4 className='post-heading card-title'>
                  {postData.id}.
                  {/* If user wants to edit data then open inputbox to edit that data otherwise direct display that data ... */}
                  {editedPostFormData.postIndex !== postData.id ? (
                    postData.title
                  ) : (
                    <input
                      type='text'
                      value={editedPostFormData.postTitle}
                      onChange={(e) =>
                        setEditedPostFormData({
                          ...editedPostFormData,
                          postTitle: e.target.value,
                        })
                      }
                      className='w-75'
                      autoFocus
                    />
                  )}
                  {/* Edit and Save Button for post... */}
                  {editedPostFormData.postIndex !== postData.id ? (
                    <i
                      className='fa fa-edit post-edit-btn'
                      onClick={(event) => handleEditPost(event, postData)}
                    ></i>
                  ) : (
                    <i
                      className='fa fa-save post-edit-btn'
                      onClick={(event) => handleSavePost(postData.id)}
                    ></i>
                  )}
                  {/* Delete button for post ... */}
                  <i
                    className='fa fa-trash trash-btn'
                    onClick={(event) => handleDeletePost(event, postData.id)}
                  ></i>
                </h4>

                {/* If user wants to edit data then open inputbox to edit that data otherwise direct display that data ...  */}

                <div className='card-text'>
                  {editedPostFormData.postIndex !== postData.id ? (
                    postData.body
                  ) : (
                    <textarea
                      rows='3'
                      value={editedPostFormData.postBody}
                      onChange={(e) =>
                        setEditedPostFormData({
                          ...editedPostFormData,
                          postBody: e.target.value,
                        })
                      }
                      className='w-100'
                    />
                  )}
                </div>
              </div>

              <div className='postUser-name card-footer text-end'>
                - By {postData.username}
              </div>
            </div>
          ))}{' '}
        </div>
      ) : (
        <div
          className='d-flex justify-content-center'
          style={{ marginTop: '80px' }}
        >
          <img src={dataNotFound} alt='dataNotFound' />
        </div>
      )}

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add post
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handlePostData}>
                <div className='mb-3'>
                  <label htmlFor='recipient-name' className='col-form-label'>
                    Title:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    name='postTitle'
                    value={formData.postTitle}
                    onChange={onValChange}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Description:
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    value={formData.postBody}
                    onChange={onValChange}
                    name='postBody'
                    required
                  ></textarea>
                </div>

                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Redirect to top of the page ... */}
      <a href='#root1'>
        {postsData && postsData.length > 0 && (
          <button className='arrow-up m-3'>
            <i className='fa fa-arrow-up'></i>
          </button>
        )}
      </a>
    </div>
  );
};

export default Posts;
