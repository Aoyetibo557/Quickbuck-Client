import React, { useState, useEffect } from 'react';
import './HomeComponenet.css';
import Header from './Header';
import axios from 'axios';
import Job from './Job';
import Map from './Map';
import { useAuth } from '../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PlugImage from '../assets/images/plug.svg';
import JobDetails from './JobDetails';
import { useParams } from 'react-router-dom';

// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";


function HomeComponent() {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [isLoading, setIsLoading] = useState(true);

    const { setJobs } = useAuth(); //Context 
    
    const { jobId} = useParams();

    useEffect(() => {
        retrieveData();
        setTimeout(()=>{
            setIsLoading(false);
        },  5000)
    }, [])

    // The username should be changes to title when the table has been created fpr the 
    // Filter to seach by job title not username
    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];

        result = allData.filter((data) => {
            return data.name.search(value) !== -1 || data.author.search(value) !== -1;
        });

        setFilteredData(result);
    }


    // Retrieve the data dfrom the right table
    // Currently using profiles table for filter test! 
    // .jobs is added at the end of data because in the conroller, i resturn the data in a json format 
    // with a message asttached, so to add only the jobs into the data states here, .jobs is added
    const retrieveData = () => {
        const URL = `${baseURL}/jobs/all`;
        axios(URL)
        .then(response => {
            setAllData(response.data.jobs)
            setFilteredData(response.data.jobs);
            setJobs(response.data.jobs);
        })
       
    }

   

    return (
        <div className="homecomp">
            <Header />
            <div className="home__top">
                <div className="home__search">
                    <input className="search__bar" type="text" onChange={(event) =>handleSearch(event)} placeholder="Long Island, NY" />
                </div>

                {/* <div>
                    <select className="search__select">
                        <option>Category</option>
                        <option>Technology</option>
                    </select>
                </div> */}

                <div>
                    <select className="search__select">
                        <option value="">Filter</option>
                        <option value="price">Price</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>
            </div>

           <div className="home__body">  
                {isLoading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress color="primary" className="loading" /> 
                    </Box> 
                ): (
                    <div className="home__results">
                        {allData.length > 0 && !isLoading ? 
                            <div  className="home__results">
                                {filteredData.map((job,index) => (
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
                            :
                            <div className="error__div">
                                <img className="error-img" src={PlugImage} alt="Not Found!" />
                                {/* <div>
                                   <h2>OOPS! </h2>
                                   <p>We can't seem to find what you're looking for.</p>
                                </div>
                                <p>Error code: 404</p> */}

                            </div>
                        }
                    </div>
                )}

                <div>
                    {/* <Map /> */}
                    <JobDetails jobId={jobId}/>
                </div>
           </div>

        </div>
    )
}

export default HomeComponent
