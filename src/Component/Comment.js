import React from 'react'
import { useNavigate } from "react-router-dom";

function Comment() {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className="card">

                <div className="postDataDetail m-3 p-3">

                    <button className='float-end btn btn-primary' onClick={() => navigate(-1)}>Back to page</button>

                    <div className="postContent card-body mt-5">
                        <h4 className="postHeading card-title">
                            Heading
                        </h4>
                        <div className="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eius cum aspernatur debitis esse ut pariatur consequatur, maxime nemo rem quas, quam reiciendis deleniti ratione commodi optio. Maiores, id voluptate.</div>
                    </div>

                    <h4 className='ps-3 mb-4'>Comments</h4>

                    <div className="commentData ms-3 my-3">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam vitae tempora quis nesciunt, debitis consectetur!
                        </div>
                        <div className="card-footer text-end">- By this</div>
                    </div>

                    <div className="commentData ms-3 my-3">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam vitae tempora quis nesciunt, debitis consectetur!
                        </div>
                        <div className="card-footer text-end">- By this</div>
                    </div>

                    <div className="commentData ms-3 my-3">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam vitae tempora quis nesciunt, debitis consectetur!
                        </div>
                        <div className="card-footer text-end">- By this</div>
                    </div>

                    <div className="postUserName card-footer text-end">
                        - By krisha
                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default Comment