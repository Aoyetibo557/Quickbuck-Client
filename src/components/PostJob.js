import React, {useState, useEffect} from 'react';
import "./PostJob.css";
import axios from "axios";
import Card from "../components/Card";



const geoCodebaseURL = `https://maps.googleapis.com/maps/api/geocode/json?`;



// const baseURL = "http://localhost:9090/api";
// const baseURL = "https://quickbuck-api.herokuapp.com/api";



function PostJob() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();

    const [county, setCounty] = useState("");
    const [tag1, setTag1] = useState("");
    
    const [tag2, setTag2] = useState("");
    const [altTagTime, setAltTagTime] = useState("");
    
    const [altTagType, setAltTagType] = useState("");
    const [website, setWebsite] = useState("");
    
    const [err, setErr] = useState("");
    const [nextStep, setNextStep] = useState(false);


    //function to convert address to lat and lang before adding it to the database
    const geocode = (location) => {
        axios.get(geoCodebaseURL, {
            params: {
                address: location,
                // key: process.env.MAPS_API,
                key: "AIzaSyDNclWfUUv5s9_0hgEd6SvZGfVVexJSo2E"
            }
        }).then((response) => {
            setLatitude(response.data.results[0].geometry.location.lat)
            setLongitude(response.data.results[0].geometry.location.lng)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    const validateForm = () => {
        if(name === "" || location === "" || county === "" || description === "" || price === "" || tag1 === "" || tag2 === "" ){
            return false
        }else{
            return true
        }
    }


    // useEffect(() =>{
    //     console.log(tag1)
    // },[tag1]);
    

    const handleNext = (ev) => {
        ev.preventDefault();
        if(!validateForm()) {
            setErr("Fields can not be empty!");
        }else{
            setErr("") //empty field 
            geocode(location); //converts the inputed address into long and land
            setNextStep(true);            
        }
    }
    

    


    return !nextStep ? (
        <div className="postjob">

            <div className="postjob__container">

                    <div>
                        <h4 className="postjob__h4">Create a new Job using the form below</h4>
                    </div>

                    <div className="postjob__error">
                        {err === "" ? "" : <p> {err}</p>}
                    </div>
                    <form method="POST"  className="postjob__form">
                    
                        <div className="fields">
                            <label className="postjob__label" htmlFor="jobtitle">Job Title</label>
                            <input className="postjob__input" type="text" value={name} onInput={(e) => setName(e.target.value)} name="jobtitle" required placeholder="ex: Build a Desk" />
                        </div>

                        <div className="fields">
                            <label className="postjob__label" htmlFor="joblocation">Job Address</label>
                            <input className="postjob__input" type="text" value={location} onInput={(e) => setLocation(e.target.value)} name="joblocation" required placeholder="street, city, state, zip" />
                        </div>

                        <div className="fields">
                            <label className="postjob__label" htmlFor="jobcounty">Job Address County</label>
                            <input className="postjob__input" type="text" value={county} onInput={(e) => setCounty(e.target.value)} name="jobcounty" required placeholder="County" />
                        </div>

                        <div className="fields">
                            <label className="postjob__label" htmlFor="joblocation">Job Description</label>
                            <textarea className="postjob__textarea"  value={description} onInput={(e) => setDescription(e.target.value)}  name="jobdescription" required />
                        </div>

                        <div className="fields">
                            <label className="postjob__label" htmlFor="website">Website</label>
                            <input className="postjob__input" type="text" value={website} onInput={(e) => setWebsite(e.target.value)} name="website"  placeholder="www.company.com" />
                        </div>

                        <div className="fields">
                            <label className="postjob__label" htmlFor="jobprice">Job Price</label>
                            <input className="postjob__input" type="number" value={price} onInput={(e) => setPrice(e.target.value)} name="jobprice" required placeholder="$23/hr" />
                        </div>

                        <div className="postjob__form-innerdiv">
                            <select value={tag1} onChange={(e) => setTag1(e.target.value)} className="postjob__select" required name="jobtag1">
                                <option value="Marketing">Marketing</option>
                                <option value="Technology">Technology</option>
                                <option value="Business">Business</option>
                                <option value="Customer-Service">Customer Service</option>
                                <option value="Remote">Remote</option>
                                <option value="Other">Other</option>
                            </select>

                            <select value={tag2} onInput={(e) => setTag2(e.target.value)}className="postjob__select" required name="jobtag2">
                                <option>tag 2</option>
                                <option value="1 hours +">1 hours +</option>
                                <option value="2 hours +">2 hours +</option>
                                <option value="3 months +">3 months +</option>
                                <option value="other">Enter Time Value</option>
                            </select>

                           {tag2 === "other" ? 
                                <div>
                                    <input type="number" className="postjob__input-entry" maxLength="2" name="jobtime" placeholder="Job Length" />
                                    <select className="postjob__select" name="time-select" value={altTagType} onChange = {(e) => setAltTagType(e.target.value)}>
                                        <option value="hr">hour</option>
                                        <option value="month">month</option>
                                    </select>
                                </div>
                            : ("")}
                        </div>

                       


                        <div>
                            <button onClick={handleNext} type='submit'  className="postjob__btn" >Next</button>
                        </div>

                       

                    </form>
                </div>

                
        </div>
    ):<Card 
        name={name} 
        location={location} 
        description={description} 
        county={county} 
        price={price} 
        latitude={latitude} 
        longitude={longitude}  
        website={website} 
        altTagTime={altTagTime} 
        altTagType={altTagType}  
        tag1={tag1}
        tag2={tag2}
        // nextStep={nextStep}
    />
}

export default PostJob
