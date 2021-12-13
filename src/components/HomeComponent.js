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
import Search from "./Search";
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
    // const [filteredData, setFilteredData] = useState(allData);
    // const [isLoading, setIsLoading] = useState(true);

    const [coordinates, setCoordinates] = useState({
        lat : 40.755666 ,
        lng :  -73.977339
    });
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
    // const [childClicked, setChildClicked] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [type,setType] = useState('week');
    const [preference, setPreference] = useState(0);
    const [filteredJobs, setFilteredJobs] = useState([]);
    



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
            setIsLoading(false);
            setAllData(response.data.jobs)
            setFilteredJobs([]);
            setJobs(response.data.jobs);
            console.log(response.data)
        })
       
    }

    useEffect( () => {
      const filteredJobs = allData.filter((job) => job.price > preference )
      setFilteredJobs(filteredJobs);
    },[preference] );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords : {latitude, longitude} }) => {
     
        setCoordinates({lat : latitude, lng : longitude});
        setLong(coordinates.lng);
        setLati(coordinates.lat);
        })
    }, [ ]);

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
    if(bounds){
      setIsLoading(true);
      retrieveData(county);
    }
  }, [coordinates, bounds]);

   

    return (
        <div className="homecomp">
            <Header />
            <Search 
              setCoordinates = {setCoordinates}
              
            />
            
            <Grid container spacing={3} style = {{ width: '100%' }}> 
                            <Grid item xs={12} md={6}  >
                                <List 
                                    jobs = {filteredJobs.length ? filteredJobs : allData}
                                    // childClicked = {childClicked } 
                                    isLoading = {isLoading}
                                    type = {type}
                                    setType = {setType}
                                    preference = {preference}
                                    setPreference = {setPreference}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}  >
                                <Map
                                    
                                    setCoordinates= {setCoordinates}
                                    setBounds = {setBounds}
                                    coordinates = {coordinates}
                                    jobs = {filteredJobs.length ? filteredJobs : allData}
                                    // setChildClicked = {setChildClicked}
                                />
                            </Grid>
                        </Grid>
        </div>

    )
}

export default HomeComponent
