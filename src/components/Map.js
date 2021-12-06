import React, {useEffect, useState} from 'react';
import {geocode, arr} from '../utils/functions';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useAuth } from '../contexts/AuthContext';

function Map() {
    const loca = "98 canal street, staten island, New York, 10304";

    const { jobs } = useAuth();

    const [obj, setObj]= useState([])

    const getJobsLngandLat = () => {
        jobs.map((itm) => (
            setObj(itm.joblocation)
        ))
    }

    
    useEffect(() => {   
        console.clear();
        console.log(jobs);

        getJobsLngandLat();

        console.log(obj);
        geocode(loca);

    }, [jobs])  
    
    
   

   
    const mapStyles = {
        height: "70vh",
        width: "40vw"
    }

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }


    return (
        <div id="address" className="map">
            <LoadScript
                googleMapsApiKey="AIzaSyDNclWfUUv5s9_0hgEd6SvZGfVVexJSo2E">
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={19}
                        center ={arr}
                    >
                    <Marker key="current location" position = {arr} />
                    
                    {
                        jobs.map(itm => (
                            <Marker key="current location" position= {"lat: ", itm.latitude, "lng: ", itm.longitude} />
                        ))
                    }

                    </GoogleMap>
            </LoadScript>
            
            <div>
              
            </div>
        
        </div>
    )
}

export default Map
