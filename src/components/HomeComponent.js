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
import {getJobsData} from './api' ;

import List from "../components/components/List/List"
import { Grid } from '@mui/material';
import Map from "../components/components/Map/Map";
import Geocode from "react-geocode";

import NoJobPic from "../assets/images/job-search.svg";


// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";
// const baseURL = "https://testapijobslocation.herokuapp.com/jobs";

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
    const [childClicked, setChildClicked] = useState(null);

    useEffect(() => {
        setTimeout(()=> {
            setIsLoading(false)
        }, 6000)
    },[])
    



    // Retrieve the data dfrom the right table
    // Currently using profiles table for filter test! 
    // .jobs is added at the end of data because in the conroller, i resturn the data in a json format 
    // with a message asttached, so to add only the jobs into the data states here, .jobs is added
    const retrieveData = (countyN) => {
        // const URL = `${baseURL}/jobs/all`;
        // const URL = `${baseURL+county}`;
        const URL = `${baseURL}/jobs/findbycounty/${countyN}`;
        axios(URL)
        .then(response => {
            setAllData(response.data.jobs)
            setFilteredData(response.data.jobs);
            setJobs(response.data.jobs);
            console.log(response.data)
        })
       
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords : {latitude, longitude} }) => {
     
        setCoordinates({lat : latitude, lng : longitude});
        setLong(longitude);
        setLati(latitude);
        })
    }, [coordinates.lat,coordinates.lng  ]);

    useEffect(() => {
    console.log(coordinates,bounds);
   
    let city, state, country;
    let countyName;
    Geocode.fromLatLng( coordinates.lat,coordinates.lng) 
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
                // console.log("countyName" +countyName);
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


    // console.log("again"+countyName);
    retrieveData(county);
  }, [coordinates, bounds]);

   

    return (
        <div className="homecomp">
            <Header />
           {!isLoading ? (
                <Grid container spacing={3} style = {{ width: '100%' }}> 
                <Grid item xs={12} md={6}  >
                    
                    <List 
                        jobs = {allData}
                        childClicked = {childClicked } 
                    />

                    {/* {allData.length > 1 ? (
                        <List 
                            jobs = {allData}
                            childClicked = {childClicked } 
                        />
                    ):(
                        <div className="no__results">
                            <img src={NoJobPic} alt="No Job Found" />
                            <h4>No Jobs in this County!</h4>
                        </div>
                    )} */}
                    
                </Grid>
                <Grid item xs={12} md={6}  >
                    <Map

                        setCoordinates= {setCoordinates}
                        setBounds = {setBounds}
                        coordinates = {coordinates}
                        jobs = {allData}
                        setChildClicked = {setChildClicked}
                    />
                </Grid>
            </Grid>
           ):(
               <div className="loading">
                   <CircularProgress />
               </div>
           )}
        </div>

    )
}

export default HomeComponent
