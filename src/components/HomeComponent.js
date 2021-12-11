/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import {getJobsData} from './api' ;

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
        // const URL = `${baseURL}/jobs/all`;
        const URL = `${baseURL}/jobs/findbycounty/richmond`;

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
   
    let city, state, country;
    let countyName;
    Geocode.fromLatLng( lati, long) 
    .then(response => {

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
                console.log(countyName);
                setCounty(countyName);
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
    console.log("again"+county);
 
    getJobsData(county)
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, bounds]);

   

    return (
        <div className="homecomp">
            <Header />
            
            <div className="home__top">
                <div className="home__search">
                    <input className="search__bar" type="text" onChange={(event) =>handleSearch(event)} placeholder="Long Island, NY" />
                </div>

              
                <div>
                    <select className="search__select">
                        <option value="">Filter</option>
                        <option value="price">Price</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>
            </div>

            {/* Error warpping */}
            {allData.length < 1 ?(
                <h3>No data found</h3>
            ):(
                <div className="home__body">
                    {/* <div  className="home__results">
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
                    </div> */}

                    <Grid container spacing={3}  style = {{ width: '100%' }}> 
                        <Grid item xs={3} md={5}  >
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
            )}
        </div>

    )
}

export default HomeComponent
