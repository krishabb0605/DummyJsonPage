import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function Comment() {

    const navigate = useNavigate();
    const { postId } = useParams();

    const data = useLocation();
    
    const userData = data.state.userData.users;
    const postData = data.state.postData;

    const [commentData, setCommentData] = useState(null);

    async function fetchData() {
        try {
            const responseOfComments = await fetch(`https://dummyjson.com/comments`);
            const commentData = await responseOfComments.json();
            // console.log("Hey...", userData)
            setCommentData(commentData);
        }
        catch (error) {
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
                                {postData.id}. {postData.title}
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
                                    - Comment by {comment.user.username}
                                </div>
                            </div>
                        ))}

                        {commentData && commentData.comments.filter(comment => comment.postId === parseInt(postId)).length === 0 && (
                            <div className='commentData ms-3 my-3'><div className="card-body">No comments available.</div></div>
                        )}

                        <div className="postUserName card-footer text-end"> <b>
                            {userData && userData.find(user => user.id === postData.userId)
                                ? `- Post by ${userData.find(user => user.id === postData.userId).firstName}`
                                : 'Unknown'}</b>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default Comment;
