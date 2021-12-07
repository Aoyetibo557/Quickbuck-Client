import React, { useState, useEffect } from 'react';
import './HomeComponenet.css';
import Header from './Header';
import axios from 'axios';
import Job from './Job';
import { useAuth } from '../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PlugImage from '../assets/images/plug.svg';
import JobDetails from './JobDetails';
import { useParams } from 'react-router-dom';

import List from "../components/components/List/List"
import { Grid } from '@mui/material';
import Map from "../components/components/Map/Map";
import Geocode from "react-geocode";
// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";

Geocode.setApiKey("AIzaSyAsiey1SMwJZPItXSjAGKWZ87i9EvkV0-0");
// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("us");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


function HomeComponent() {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [isLoading, setIsLoading] = useState(true);

    const [coordinates, setCoordinates] = useState({});
    const [county, setCounty] = useState({});
    const [bounds, setBounds] = useState({});
    const [long, setLong] = useState({});
    const [lati, setLati] = useState({});

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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords : {latitude, longitude} }) => {
        setLong(longitude);
        setLati(latitude);
        setCoordinates({lat : latitude, lng : longitude});
        })
    }, []);

    useEffect(() => {
    console.log(coordinates,bounds);
    ////
  // function getCounty(latti,lngi) {
  //   console.log("Hi");
  //   console.log(latti,lngi);
    let city, state, country;
    let countyName;
    // let county = "Kings County"
    Geocode.fromLatLng( lati, long) 
    .then(response => {
        // const address = response.results[0].formatted_address;
        // let city, state, country, county;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_2":
                countyName = response.results[0].address_components[i].long_name;
                // setCounty(ccounty);
                console.log(countyName);
                setCounty(countyName);
                // county = "Queens County";
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
                default:
                    break;
            }
          }
        }
    });
  //   console.log("city");
    console.log("again"+county);
  //   return county;
    
  //   // alert("Hellooo");
  //   // return "Queens County";
  // }
    ////
    getJobsData(county)
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
  }, [coordinates, bounds]);

   

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

                <List />
                <div>
                    {/* <JobDetails jobId={jobId}/> */}

                    <Grid container spacing={3} style = {{ width: '100%' }}> 
                        <Grid item xs={12} md={6}  >
                            {/* console.log("hello"); */}
                            <List jobs = {allData} />
                        </Grid>
                        <Grid item xs={12} md={6}  >
                        <Map
                            
                            setCoordinates= {setCoordinates}
                            setBounds = {setBounds}
                            coordinates = {coordinates}
                            jobs = {allData}
                        />
                    </Grid>
                </Grid>

                </div>
           </div>

        </div>
    )
}

export default HomeComponent
