import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Comment() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [userData, setUserData] = useState(null);

    async function fetchData() {
        try {
            const responseOfPost = await fetch(`https://dummyjson.com/posts/${postId}`);
            const responseOfComments = await fetch(`https://dummyjson.com/comments`);
            const responseOfUsers = await fetch('https://dummyjson.com/users');
            const postData = await responseOfPost.json();
            const commentData = await responseOfComments.json();
            const userData = await responseOfUsers.json();
            setPostData(postData);
            setCommentData(commentData);
            setUserData(userData);
        } catch (error) {
            console.log("Error : ", error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [postId]);

    return (
        <div className='container'>
            <div className="card">
                {postData && (
                    <div className="postDataDetail m-3 p-3">
                        <button className='float-end btn btn-primary' onClick={() => navigate(-1)}>Back to page</button>
                        <div className="postContent card-body mt-5">
                            <h4 className="postHeading card-title">
                                {postData.title}
                            </h4>
                            <div className="card-text">
                                {postData.body}
                            </div>
                        </div>
                        <h4 className='ps-3 mb-4'>Comments</h4>
                        {commentData && commentData.comments.filter(comment => comment.postId === parseInt(postId)).map(comment => (
                            <div key={comment.id} className="commentData ms-3 my-3">
                                <div className="card-body">
                                    {comment.body}
                                </div>
                                <div className="card-footer text-end">
                                    - By {comment.user.username}
                                </div>
                            </div>
                        ))}
                        {commentData && commentData.comments.filter(comment => comment.postId === parseInt(postId)).length === 0 && (
                            <div className='commentData ms-3 my-3'><div className="card-body">No comments available.</div></div>
                        )}

                        <div className="postUserName card-footer text-end">
                            {userData && userData.users.find(user => user.id === postData.userId)
                                ? `- By ${userData.users.find(user => user.id === postData.userId).firstName}`
                                : 'Unknown'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment;
