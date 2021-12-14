import React, { useState, useEffect} from 'react';
import "./JobApplicants.css";
import { useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import QueryString from 'qs';
import axios from 'axios';
import ApplicationComp from '../components/ApplicationComp';


// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";

function JobApplicants() {
    const [applications, setApplications] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const { jobId } = useParams();
    const { acctDetails } = useAuth();


    const getApplicants = () => {
        const URL = `${baseURL}/jobapplications/findbyid/${jobId}`


        fetch(URL)
        .then(response => {
            response.json().then(data => {
                console.log(data)
                if(!response.ok){
                    const error = (data && data.message) ||response.status;
                    setErrMsg(error)
                    return error;
                }
                setApplications(data.applicants)
            })
        })
        .catch(error => {
            setErrMsg(errMsg)
            console.log(error)
        })
    }

    useEffect(() => {
        console.log(acctDetails.name)
        getApplicants();
    },[])

    return (
        <div className="">
            <Header />
            <div className="applicants__container">

                <div className="applicants__header">
                    <div>
                        <h5>APPLICANTS</h5>
                    </div>

                    <div>
                        <h5>APPLIED ON</h5>
                    </div>

                    <div>
                        <h5>PHONE NO.</h5>
                    </div>

                    <div>
                        <h5>EMAIL</h5>
                    </div>

                    <div>
                        <h5>STATUS</h5>
                    </div>

                    <div>
                        <h5>RATING</h5>
                    </div>

                    <div>
                        <h5>PROFILE</h5>
                    </div>
                </div>

                <div>
                    {errMsg && <p>{errMsg}</p>}
                </div>
                
                
               <div>
                   {applications.length < 1 ? (
                       <div className="no__applicants">
                           <h5>There are currently no applicants for this Job</h5>
                       </div>
                   ):(
                        applications.map((val, idx) => (
                             <ApplicationComp
                                key={idx}
                                author={val.author}
                                status = {val.status}
                                jobId={val.jobId}
                                createdAt = {val.createdAt}
                            />
                        ))
                    )}
               </div>
               
            </div>
        </div>
    )
}

export default JobApplicants
