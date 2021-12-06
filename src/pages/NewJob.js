import React, {useEffect, useState} from 'react';
import './NewJob.css';
import Header from '../components/Header';
import QueryString from 'qs';
import SuccessComp from '../components/SuccessComp';
import { useAuth } from '../contexts/AuthContext';


// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";

function NewJob() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [county, setCounty] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [altTagTime, setAltTagTime] = useState("");
    const [altTagType, setAltTagType] = useState("");
    const [err, setErr] = useState("");
    const [ success, setSuccess] = useState(false)
    const [nextStep, setNextStep] = useState(false);

    const [ cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpDate, setCardExpDate] = useState("");
    const [cardCvv,setCvv] = useState("");
    const [cardErr, setCardErr] = useState("");




    const { acctDetails } = useAuth();

    useEffect(() => {
       
    },[])


    const generateUniqueId = () => {
        const newId = "id-"+ (Math.random().toString().slice(2).substring(0, 8));
        return newId;
    }


    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(name, location, description, price, tag1, tag2);
        createJob();
    }

    const handleNext = (ev) => {
        ev.preventDefault();
        if(!validateForm()) {
            setErr("Fields can not be empty!");
        }else{
            setErr("") //empty field 
            setNextStep(true);
        }
    }

    const validateForm = () => {
        if(name === "" || location === "" || description === "" || price === "" || tag1 === "" || tag2 === "" ){
            return false
        }else{
            return true
        }
    }

    const cardValidation = () => {
        if(cardName === "" || cardExpDate === "" ||cardCvv === "" || cardName === "") {
            return false;
        }else{
            return true;
        }
    }

    const createJob = () => {
        const URL = `${baseURL}/jobs/createjob`;

        if(!validateForm() || !cardValidation() || altTagTime === "" ||altTagType === ""){
            setSuccess(false);
            setCardErr("Card Fields cannot be Empty!")
            setErr("Fields can not be empty!");
        }else{

            const params = {
                jobId: generateUniqueId(),
                name: name,
                joblocation: location,
                author: acctDetails.name,
                jobstatus: "active",
                description: description,
                rating: 0, //all ratings are set to this untill someone rates them after job completion
                price: price,
                county: county,
                tag1: tag1,
                tag2: tag2 === null ? altTagTime + " " +altTagType : tag2 // add the altTagTime and Type if tag2 is empty
            }

            const options = {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
                body: QueryString.stringify(params)
            }

            

            fetch(URL, options)
            .then((response) => {
                // console.log("Create Response:", response.json())
                response.json().then((data) => {
                    console.log("data: ", data);
                    setErr(data.message);
                    setSuccess(true);
                }).catch(innErr => {
                    console.log(innErr)
                    setErr(innErr);
                    setSuccess(false)
                })

            })
            .catch(e => {
                console.log(e.message)
            })
        }
       
    }

    return (
        <div className="newjob">
            <Header />

            {nextStep === false ? (

                <div className="newjob__container">
                    <div>
                        <h4 className="newjob__h4">Create a new Job using the form below</h4>
                    </div>

                    <div className="newjob__error">
                        {err === "" ? "" : <p> {err}</p>}
                    </div>
                    <form method="POST" onSubmit={handleSubmit} className="newjob__form">
                    
                        <div className="fields">
                            <label className="newjob__label" htmlFor="jobtitle">Job Title</label>
                            <input className="newjob__input" type="text" value={name} onInput={(e) => setName(e.target.value)} name="jobtitle" required placeholder="ex: Build a Desk" />
                        </div>

                        <div className="fields">
                            <label className="newjob__label" htmlFor="joblocation">Job Address</label>
                            <input className="newjob__input" type="text" value={location} onInput={(e) => setLocation(e.target.value)} name="joblocation" required placeholder="street, city, state, zip" />
                        </div>

                        <div className="fields">
                            <label className="newjob__label" htmlFor="jobcounty">Job Address County</label>
                            <input className="newjob__input" type="text" value={county} onInput={(e) => setCounty(e.target.value)} name="jobcounty" required placeholder="County" />
                        </div>

                        <div className="fields">
                            <label className="newjob__label" htmlFor="joblocation">Job Description</label>
                            <textarea className="newjob__textarea"  value={description} onInput={(e) => setDescription(e.target.value)}  name="jobdescription" required />
                        </div>

                        <div className="fields">
                            <label className="newjob__label" htmlFor="jobprice">Job Price</label>
                            <input className="newjob__input" type="number" value={price} onInput={(e) => setPrice(e.target.value)} name="jobprice" required placeholder="$23/hr" />
                        </div>

                        <div className="newjob__form-innerdiv">
                            <select value={tag1} onChange={(e) => setTag1(e.target.value)} className="newjob__select" required name="jobtag1">
                                <option>tag 1</option>
                                <option value="limited">Limited</option>
                                <option value="project based">Project based</option>
                            </select>

                            <select value={tag2} onInput={(e) => setTag2(e.target.value)}className="newjob__select" required name="jobtag2">
                                <option>tag 2</option>
                                <option value="1 hours +">1 hours +</option>
                                <option value="2 hours +">2 hours +</option>
                                <option value="3 months +">3 months +</option>
                                <option value="other">Enter Time Value</option>
                            </select>

                           {tag2 === "other" ? 
                                <div>
                                    <input type="number" className="newjob__input-entry" maxLength="2" name="jobtime" placeholder="Job Length" />
                                    <select className="newjob__select" name="time-select" value={altTagType} onChange = {(e) => setAltTagType(e.target.value)}>
                                        <option value="hr">hour</option>
                                        <option value="month">month</option>
                                    </select>
                                </div>
                            : ("")}
                        </div>

                       


                        <div>
                            <button onClick={handleNext} type='submit'  className="newjob__btn" >Next</button>
                        </div>

                       

                    </form>
                </div>
                
            ): (
            //    <SuccessComp />
            <div  className="newjob__container">
                <div className="newjob__error">
                    {cardErr && <p>{cardErr}</p>}
                </div>

                <div className="addcard">
                    <h4>Add new card</h4>
                    <div className="card__div">
                        <label htmlFor="card-number">Card number</label>
                        <input type="text" maxLength="16" value={cardNumber} onInput = {(e) => setCardNumber(e.target.value)} required name="card-number" placeholder="0000 0000 0000 0000"/>
                    </div>

                    <div  className="double-card__div">
                        <div className="card__div">
                            <label htmlFor="exp-date">Expiry date</label>
                            <input type="text" name="exp-date" value = {cardExpDate} onInput={(e) => setCardExpDate(e.target.value)} maxLength= "7" placeholder="MM / YYYY" required />
                        </div>

                        <div className="card__div">
                            <label htmlFor="cvv">CVC/CVV</label>
                            <input type="text" value={cardCvv} onInput = {(e) => setCvv(e.target.value)} maxLength="3" name="cvv" placeholder="***" required />
                        </div>
                    </div>

                    <div className="card__div">
                        <label htmlFor="cardholder-name" >Cardholder name</label>
                        <input type="text" value = {cardName} onInput = {(e) => setCardName(e.target.value)} name="cardholder-name" placeholder="Enter cardholder's full name" required />
                    </div>
                </div>

                <div>
                    <button  onClick={handleSubmit} type='submit'  className="newjob__btn">Create Job</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default NewJob
