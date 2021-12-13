import React, {useState, useEffect } from 'react';
import "./JobDetail.css";
import { useParams} from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';
import QueryString from 'qs';
import { FaRegThumbsUp,FaRegThumbsDown } from "react-icons/fa";
import { VscComment } from "react-icons/vsc"
import { Rating } from '@mui/material';
import Review from '../components/Review';
import { Link } from 'react-router-dom';

// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";

function JobDetail() {
    const [data, setData] = useState({})
    const [reviewState, setReviewState] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [disLikeState, setDisLikeState] = useState(false);
    const [reviewAuthor, setReviewAuthor] = useState("")
    const [rating, setRating] = useState(0);
    const[review, setReview] = useState("");
    const [msg, setMsg] = useState("");

    const [allReviews, setAllReviews] = useState([]);


    const { jobId } = useParams();
    const [descp, setDescp] = useState([]);

    const getJobDetails = async() => {
        const URL = `${baseURL}/jobs/findbyid/${jobId}`
        await axios.get(URL)
        .then(response => {
            console.log(response.data.job[0]);
            setData(response.data.job[0])
        })
        .catch(error => {
            console.log("Job details Error:", error)
        })
    }

    useEffect(() => {
        getJobDetails();
        getReviews(jobId)
    }, [])

    const handleLike = () => {
        if(disLikeState === false){
            setLikeState(!likeState)
        }else{
            return;
        }
    }

    const handleDisLike = () => {

        if(likeState === false){
            setDisLikeState(!disLikeState)
        }else{
            return;
        }
    }

    const handleClick = (ev) => {
        ev.preventDefault();
        addReview();
    }

    const handleReviewState = () => {
        setReviewState(!reviewState)
    }


    const addReview = () => {
        const URL = `${baseURL}/reviews/createreview`;
        const params = {
            jobId:jobId,
            author: reviewAuthor,
            rating: rating,
            review: review
        }

        const options = {
            method: "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
            body: QueryString.stringify(params)
        }
        fetch(URL, options)
        .then(response => {
            response.json().then((data) => {
                console.log(data);
                setMsg(data.message);
                // setReviewState(false)
                window.location.reload(false)
            })
        })
        .catch(error => {
            console.log("error", error)
        })

        
    }


    // get all the reviews associated with the id passed as a parameter
    const getReviews = (id) => {
        const URL = `${baseURL}/reviews/findbyid/${id}`

        axios.get(URL)
        .then(response => {
            console.log(response.data.reviews);
            setAllReviews(response.data.reviews)
        })
    }

    const updateJobStatus = () => {
        const URL = `${baseURL}/jobs/update/${jobId}`

        axios.put(URL)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }


  

    return (
        <div className="jobdetail">
            <Header />
            <div className="jobdetail__container">
                <div className="img__div">
                    <img className="jobdetail__img" src={`https://avatars.dicebear.com/api/personas/${data.name+`job`}.svg?mood[]=happy&mood[]=sad`} alt= "Job Detail Profile Pic" />
                </div>

                <div className="jobdetail__titlediv">
                    {/* job name, ratings and  */}
                    <div>
                        <h4 className="jobdetail__title">{data.name}</h4>
                        <p className="jobdetail__author">{data.author}</p>
                    </div>

                    <div className="btn__div">
                        <button onClick={handleLike} className={!likeState ? "jobdetail__votebtn" : "jobdetail__votebtn votebtn__active"}>
                            <FaRegThumbsUp />
                        </button>

                        <button  onClick={handleDisLike} className={!disLikeState ? "jobdetail__votebtn" : "jobdetail__votebtn votebtn__active"}>
                            <FaRegThumbsDown />
                        </button>

                    </div>
                </div>

                <div className="details__div">
                    {/* job descriptions */}
                    <div className="description__div">
                        <h5 className="jobdetail__description">Description</h5>
                        <p className="description__p">{data.description}</p>
                    </div>

                    <div className="reviews__div">
                        <div className="reviews__div-top">
                            <h5 title="Reviews">Reviews ({allReviews.length < 1? 0 : allReviews.length})</h5>
                            <button onClick={handleReviewState} title="add a review" className="reviews__btn">
                                Add a review 
                                <VscComment />
                            </button>
                        </div>

                        {!reviewState ? (
                            allReviews.length < 1 ? (
                                <div className="emptyreviews">
                                    <p>
                                        No reviews
                                    </p>
                                </div>   
                            ):(
                                <div>
                                {allReviews.map((rev, idx) => (
                                    <Review 
                                        key={rev.jobId}
                                        id={rev.id}
                                        author={rev.author}
                                        review={rev.review}
                                        rating={rev.rating}
                                        createdAt={new Date(rev.createdAt).toLocaleDateString()}
                                    />
                                )).reverse()}

                                </div>
                            )
                        ): (
                            <div>
                                {msg && <p>{msg}</p>}
                                <form method="POST" onSubmit = {handleClick} className="addreview__form">
                                    <div className="addreview__form__input-div">
                                        <input type="text"value={reviewAuthor} onInput={(e) => setReviewAuthor(e.target.value)} name="review-author" required placeholder="Author / Anonymous" />

                                        <Rating value={rating} required onClick={(e) => setRating(e.target.value)} />

                                    </div>

                                    <div>
                                        <textarea required className="review__textarea" value={review} onInput={(e) => setReview(e.target.value)} placeholder="Enter a Feedback / Review"></textarea>
                                    </div>

                                    <div>
                                        <button onClick={handleClick} className="primary-btn">Add Review!</button>
                                    </div>


                                </form>
                            </div>
                        )}
                                 
                    </div>
                </div>

                <div className="apply__div">
                    <Link onClick={updateJobStatus} to={`/home/application/${jobId}`} className="apply__div-btn secondary-btn">Apply</Link>
                    <button onClick={() => alert("Apologies mate, This featue isn't available yet!")} className="apply__div-btn primary-btn">Talk to Job Poster</button>
                </div>
            </div>
        </div>
    )
}

export default JobDetail
