import React, {useState, useEffect} from 'react';
import './JobDetails.css';

function JobDetails({jobId}) {

    const retrieveJob = () => {
        console.log("Called")
    }

    useEffect(() => {
        console.log(jobId)
        retrieveJob()
    }, [])

    return (
        <div className="jobDetails">
            {jobId && jobId}
        </div>
    )
}

export default JobDetails
