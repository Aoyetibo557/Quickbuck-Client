import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';


function Profile() {
    const [name, setName] = useState("");
    const [userName, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [userType, setUserType] = useState("");



    const { acctDetails } =useAuth();

    useEffect(() => {
        retrieveAccountDetails();
    }, [acctDetails])

    const retrieveAccountDetails = () => {
        setName(acctDetails.name);
        setEmailAddress(acctDetails.email);
        setPhone(acctDetails.phone);
        setAddress(acctDetails.location);
        setUserType(acctDetails.userType);
        setUsername(acctDetails.userName);
        setPwd(acctDetails.password)
    }

    const handleClick = (ev ) => {
        ev.preventDefault();
    }

    return (
        <div>
            <Header />
            <div className="profile__container">
                <div className="profile__top">
                    <img className="profile__avatar" src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${acctDetails.name}`} title={acctDetails.name} alt={acctDetails.name} />
                    <h5>{acctDetails.name}</h5>
                    <p>{acctDetails.userType}</p>
                </div>

                <form className="profile__form" method="POST"  >
                    <div className="profile__box">
                        <label htmlFor="full-name">Fullname</label>
                        <input type="text" onInput={(e) => setName(e.target.value)} value={name} name="full-name" placeholder="firstname"/>
                    </div>

               
                    <div className="profile__box">
                        <label htmlFor="email">Email Address</label>
                        <input type="text" onInput={(e) => setEmailAddress(e.target.value)} value={emailAddress} name="first-name" placeholder="firstname"/>
                    </div>

                    <div className="profile__box">
                        <label htmlFor="first-name">Phone</label>
                        <input type="text" onInput={(e) => setPhone(e.target.value)} value={phone} name="first-name" placeholder="firstname"/>
                    </div>

                    <div className="profile__box">
                        <label htmlFor="address">Address</label>
                        <input type="text" onInput={(e) => setAddress(e.target.value)} value={address} name="address" placeholder="street, city, state, zip"/>
                    </div>

                    <div className="profile__box">
                        <label htmlFor="username">Username</label>
                        <input type="text" onInput={(e) => setUsername(e.target.value)} value={userName} name="username" placeholder="username"/>
                    </div>

                    <div className="profile__box">
                        <label htmlFor="user_pwd">Password</label>
                        <input type="password" onInput={(e) => setPwd(e.target.value)} value={pwd} name="user_pwd" placeholder="user password"/>
                    </div>

                    <div className="profile__box">
                        <label htmlFor="usertype">Account Type</label>
                        <input type="text" onInput={(e) => setUserType(e.target.value)} value={userType} name="address" placeholder="account type"/>
                    </div>

                    <div>
                       <button type="submit" onClick = {handleClick} className="profile__btn">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
