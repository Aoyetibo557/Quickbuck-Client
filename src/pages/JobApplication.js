import React from 'react';
import "./JobApplication.css";
import Header from '../components/Header'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


function JobApplication() {
    return (
        <div>
            <Header />
            <div className="jobapplication__container">
                <div>
                    <FaCheckCircle className="check-icon" />
                </div>

                <div>
                    <h5>Congratulations!</h5>
                    <p>Your interest has been recorded. The Job author will get back to you via the email on your account.</p>
                    <p>Reach out to us anytime if you have any concerns or questions.</p>
                    <p>
                        Via <a href="mailto: temp@mail.com" rel="noreferrer" target="_blank" >Email</a> or any of our social media platforms @quickcbuck
                    </p>

                    <Link to="/home">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default JobApplication
