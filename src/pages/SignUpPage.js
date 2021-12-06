import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';
import './Form.css';
import SignupPic from '../assets/images/signupimage.svg';
import QueryString from 'qs';
import Token from '../Token';
import { createBrowserHistory  } from 'history';

// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";


function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [inputGender, setInputGender] = useState();
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [usertype, setuserType] = useState("");

    const [err, setErr] = useState("");

    //to route after account creation
    const history = createBrowserHistory();

    const {acctToken, setAcctToken } = Token();

    const handleSubmit =()=>{
        setErr("");
        signup();
    }

    const handleClick = (ev) => {
        ev.preventDefault();
        handleSubmit();
    }

    const clearForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setAge("");
        setGender("");
        setInputGender("");
        setUsername("");
        setPwd("");
        setuserType("");
    }    

    const signup = async() =>{
        const URL = `${baseURL}/users/signup`;

        const params = {
            username : username,
            password: pwd,
            name: name,
            age: age,
            gender: gender === "" ? inputGender : gender,
            email: email,
            phone: phone,
            location: location,
            usertype: usertype
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
            // body: JSON.stringify( params ),
            body: QueryString.stringify(params)
        }

        await fetch(URL, options)
        .then(response => response.json())
        .then(response => {
            setAcctToken(response.token);
            console.log("Signup Data:", response)
            setErr(response.message);

        })
        .catch(error => {
            console.log(error);
            setErr(error.message);
        })

        if(acctToken){
            clearForm();
            history.push("/home");
        }else{
            return;
        }
    }

    return (
        <div className="signuppage">
            <div className="signuppage__left">
                <div>
                    <h4 className="signup__h4">Create an Account</h4>
                    <p className="signup__p">Join 100+ Freelancers Experiencing Financial Freedom!</p>
                </div>
                
                <div>
                    {err === "" ? "" : <p className="err__box">{err}</p>}
                </div>

                <form method="POST" onSubmit={handleSubmit}  className="signupform">
                    <div>
                        <label className="signup__label" htmlFor="fullname">Full Name</label>
                        <input required className="signup__input" type="text" name="fullname" value={name} onInput={(e) => setName(e.target.value) } placeholder="Full Legal Name" />
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="email">Email</label>
                        <input required className="signup__input" type="email" name="email" value={email} onInput={(e) => setEmail(e.target.value) } placeholder="email-address" />
                    </div>

                     <div>
                        <label className="signup__label" htmlFor="phone">Phone Number</label>
                        <input required className="signup__input" type="tel" name="phone" value={phone} onInput={(e) => setPhone(e.target.value) } placeholder="Phone Number" />
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="location">Location</label>
                        <input required className="signup__input" type="text" name="location" value={location} onInput={(e) => setLocation(e.target.value) } placeholder="street, city, state, zip, country" />
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="age">Age</label>
                        <input className="signup__input" type="number" name="age" value={age} onInput={(e) => setAge(e.target.value)} placeholder="18+" />
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="gender">Gender</label>
                        <select className="signup__select" name="gender" required onChange = {(e) => setGender(e.target.value)}>
                            <option>select</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>

                        {gender === "other" ? (
                            <input className="signup__input" type="text" name="gender" value={inputGender} onInput={(e) => setInputGender(e.target.value)} placeholder="Gender" />
                        ): ""}
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="username">Username</label>
                        <input required className="signup__input" type="text" name="username" value={username} onInput={(e) => setUsername(e.target.value) } placeholder="Preffered Username" />
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="password">Password</label>
                        <input className="signup__input" type="password" required name="password" value={pwd} onInput={(e) => setPwd(e.target.value)} placeholder="New Password" />
                    </div>

                    <div>
                        <label className="signup__label" htmlFor="usertype">Account Type</label>
                        <select required className="signup__select" placeholder="Usertype" name="usertype" value={usertype} onChange={(e) => setuserType(e.target.value)}>
                            <option value="freelancer">Freelancer (default) </option>
                            <option value="employer">Job Poster</option>
                        </select>
                    </div>

                    <div>
                        <button onClick={handleClick} className="btn secondary" to="/home">Sign Up</button>
                    </div>
                </form>

                <div>
                    <span>Already have an account? </span>
                    <Link className="form__link" to="/">Login</Link>
                </div>
            </div>

            <div className="signuppage__right">
                <img className="signup__img" src={SignupPic} alt="Signup PagePic" />
            </div>
        </div>
    )
}

export default SignUpPage
