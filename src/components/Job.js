import React, { useState, useEffect } from 'react';
import './Job.css';
import { Rating } from '@mui/material';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BsDot } from "react-icons/bs";
import axios from 'axios';
import DeleteBox from './DeleteBox';

// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";

function Job({category, jobId, name, location, county_name, website, price, descp, tags, author, rating, status}) {
    const [splitTags, setSplitTags] = useState([]);
    const [active, setActive] = useState(false);


    const setJobId = () => {
        console.log(jobId)
        return jobId;
    }



    useEffect(() => {
        let substring = tags.split(".");
        setSplitTags(substring);
        console.log(substring)
    },[])


    return (
        <div title={category} className="job">
            <div>
                <img title="Profile Avatar" className="job__img" src={`https://avatars.dicebear.com/api/personas/${name+`job`}.svg?mood[]=happy&mood[]=sad`} alt={author} />
                <h5 className="job__author">{author}</h5>

            </div>

            
            <div>
                <div className="job__top">
                    <div>
                        <h4 title={"Job name - " + name} className="job__name">{name}</h4>
                        <span title="Address/Location" className="job__location"> {location}, {county_name}</span> 
                    </div>

                    <div> 
                        <p>
                            <BsDot className="status" />
                        </p>
                       
                        {/* {rating === "0" ? "" : <Rating title="Job rating" value = {rating} disabled /> }                         */}
                    </div>
                </div>

                <div>
                    <p title="Job Description" className="job__descp"> {descp}</p>
                </div>

                <div className="job__bottom">
                    <div>
                        <button title="Chat Button" className="job__btn" onClick={() => setActive(true)} >Delete</button>
                    
                        {/* <a className="job__links" title={website} href={`${website}`} target="_blank" rel="noreferrer">{website}</a> */}
                        <Link to = {`/home/${jobId}`} onClick={setJobId} className="job__links" title="View Details" >
                            View Details 
                            {/* <BsBoxArrowUpRight className="btn-icon" /> */}
                        </Link>

                        <Link className="job__links" to={`/applicants/${jobId}`} >
                            View Applicants
                            <BsBoxArrowUpRight className="btn-icon" />
                        </Link>
                    </div>
                    <p title="Job Price" className="job__price">${price}/hr</p>
                </div>

                {/* <div className="job__tags">
                    {splitTags.map((tag, idx) => (
                        <span title="tags" key={idx}>{tag}</span>
                    ))}
                </div> */}
            </div>

        </div>
    )
}

export default Job
