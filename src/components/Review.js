import React from 'react'
import "./Review.css";
import { Rating } from '@mui/material'


function Review({id, jobId, author, rating, review, createdAt}) {
    return (
        <div className="review" key={id}>
            <p className="review__date">{createdAt}</p> 
            <div>
                <p>
                    {review}
                </p>
            </div>

            <div className="review__bottom">
                <p className="review__author">by {author}</p>
                <Rating disabled value={rating} />
            </div>
        </div>
    )
}

export default Review
