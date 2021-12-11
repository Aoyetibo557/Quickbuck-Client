import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext';
import QueryString from 'qs';
import { Link } from 'react-router-dom';
// import {BiArrowBack} from 'react-icons/bi';


// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";

function Card({name, location, description, price, county, longitude, latitude, website, tag1, tag2, altTagTime, altTagType}) {
    const [cardErr, setCardErr] = useState("");

    const [ cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpDate, setCardExpDate] = useState("");
    const [cardCvv,setCvv] = useState("");
    const [err, setErr] = useState("");
    const [ success, setSuccess] = useState(false)

    // From context api to set the author for the job being created
    const { acctDetails } = useAuth();

    useEffect(() => {
        console.clear()
        console.log(name, description, price, longitude, latitude, tag1, tag2, website, location)
    },[])

    const cardValidation = () => {
        if(err === "Content can not be empty!" || cardName === "" || cardExpDate === "" ||cardCvv === "" || cardName === "") {
            setSuccess(false);
            return false;
        }else{
            setSuccess(true)
            return true;
        }
    }



    const handleSubmit = (ev) => {
        ev.preventDefault();
        createJob();
    }

    const generateUniqueId = () => {
        const newId = "id-"+ (Math.random().toString().slice(2).substring(0, 8));
        return newId;
    }

    const createJob = () => {
        setCardErr("");
        const URL = `${baseURL}/jobs/createjob`;
        const params = {
            jobId: generateUniqueId(),
            name: name,
            description: description,
            joblocation: location,
            latitude: latitude,
            longitude: longitude,
            // add the altTagTime and Type if tag2 is empty
            tags: tag1 + " " + tag2 === null||"other" ? altTagTime + " " + altTagType : tag2,
            //all ratings are set to this untill someone rates them after job completion
            rating: 0,
            num_reviews: "",
            price: price,
            author: acctDetails.name,
            website: website,
            jobstatus: "active",
            county_name: county,
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
            body: QueryString.stringify(params)
        }

        if(cardValidation()) {
            fetch(URL, options)
            .then((response) => {
                // console.log("Create Response:", response.json())
                response.json().then((data) => {
                    console.log("data: ", data);
                    setErr(data.message);
                    
                }).catch(innErr => {
                    console.log(innErr)
                    setErr(innErr);
                
                })
            })
            .catch(e => {
                console.log(e.message)
            })
        }else {
            setCardErr("Fields cannot be empty!")
        }

        
    
       
    }

    

    return !success ? (
        <div className="card__container">

            
            <div className="postjob__error">
            
                {cardErr && <p>{cardErr}</p>}

                <div className="postjob__error">
                    {err === "" ? "" : <p> {err}</p>}
                </div>
            
            </div>

            <form method="POST"onSubmit={handleSubmit} className="addcard">
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

                <div>
                    <button  onClick={handleSubmit} type='submit'  className="postjob__btn">Create Job</button>
                </div>

            </form>

            
        </div>
    ):(
        <div>
            <h3>{err}</h3>
            <Link to="/home">Go to home page to view job</Link>
        </div>
    )
}

export default Card
