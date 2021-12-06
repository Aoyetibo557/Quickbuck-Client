import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './MyJobs.css';
import Job from '../components/Job';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";



function MyJobs() {
    const [userJobs, setUserJobs] = useState([]);


   
    const { acctDetails } =useAuth();

    const getJobsByUsername = async() => {

        const URL = `${baseURL}/jobs/find/${acctDetails.name}`
        await axios.get(URL)
        .then(response => {
            console.log(">>", response.data)
            setUserJobs(response.data.jobs)
        })
        .catch((callErr) => {
            console.log(callErr)
        })
    }

    useEffect(() => {
        console.clear();
        // setTimeout(() => {
            getJobsByUsername();
        // }, 5000)
    }, []);

    return (
        <div>
            <Header />

            <div className="myjobs__container">
                <div>
                    <h4>My Jobs</h4>
                    <div>
                        {userJobs.map((job, idx)=> (
                            <Job 
                                key = {job.id}
                                jobId = {job.jobId}
                                name= {job.name}
                                location={job.joblocation}
                                price={job.price}
                                descp ={job.description}
                                author={job.author}
                                status={job.jobstatus}
                                tags = {job.tags}
                                county_name = {job.county_name}
                                website = {job.website}
                                rating = {job.rating}
                            />
                        )).reverse()}
                        
                    </div>
                </div>                    
                <div>
                    <h4>Active Jobs</h4>
                    <div>
                        
                    </div>
                </div>

                <div>
                    <h4>Completed Jobs</h4>
                </div>

            </div>
            
        </div>
    )
}

export default MyJobs
