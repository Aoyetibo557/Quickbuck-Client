import React, {useState} from 'react';
import { ToggleButton } from '@mui/material';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';
import { FiCheck } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';




function Settings() {
    const [avctivePrefrence, setActivePreference] = useState(false);
    const [msgPreference, setMsgPreference] = useState(false);
    const [emailPreference, setEmailPreference] = useState(false);
    const [desktopPreference, setDesktopPreference] = useState(false);
    // const [msgPreference, setMsgPreference] = useState(false);


    const { acctDetails, logOut } = useAuth();

    return (
        <div className="setting">
            <Header />

            <div className="setting__container">
                <div className="setting__acct">
                    <h4>Account</h4>
                    <div>
                        <img className="acct-img" src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${acctDetails.name}`} title={acctDetails.name} alt={acctDetails.name} />
                        <p>
                            <span className="name-span">{acctDetails.name}</span>
                            <span className="logout-span">Not you? <button onClick={logOut} >Change user</button></span>

                        </p>
                    </div>
                </div>

                <div className="setting__preferences">
                    <h4>Preferences</h4>
                    <div className="preference__div">

                        <div>
                            <ToggleButton
                                value="check"
                                color='primary'
                                selected={msgPreference}
                                onChange={() => {
                                    setMsgPreference(!msgPreference);
                                }}
                                >
                                {!msgPreference ? <CgClose /> : <FiCheck /> }
                            
                            </ToggleButton>
                            <p>Send me Notifications to my Phone </p>
                        </div>

                        <div>
                            <ToggleButton
                                value="check"
                                color='primary'
                                selected={emailPreference}
                                onChange={() => {
                                    setEmailPreference(!emailPreference);
                                }}
                                >
                                {!emailPreference ? <CgClose /> : <FiCheck /> }
                                
                            </ToggleButton>
                            <p>Send Notifications to my Email</p>
                        </div>

                        <div>
                            <ToggleButton
                                value="check"
                                color='primary'
                                selected={desktopPreference}
                                onChange={() => {
                                    setDesktopPreference(!desktopPreference);
                                }}
                                >
                                {!desktopPreference ? <CgClose /> : <FiCheck />}
                            </ToggleButton>
                            <p>Send me desktop Notifications </p>
                        </div>

                    </div>
                </div>
                
                <div className="setting__status">
                    <h4>Active Status</h4>
                    <div className="status__descp">
                        <p>In this state, you will be able to recieve available jobs around you
                            . You'll appear as active or recently active, unless you turn off the setting. 
                            You'll keep receving notifications about jobs near you.
                        </p>
                    </div>
                    
                    <div className="status__toggle">
                        <ToggleButton
                            value="check"
                            color='primary'
                            selected={avctivePrefrence}
                            onChange={() => {
                                setActivePreference(!avctivePrefrence);
                            }}
                            >
                            {!avctivePrefrence ? <FiCheck /> : <CgClose /> }
                        </ToggleButton>
                        <p>Show me as available when i'm active</p>
                        </div>
                </div>

                <div className="setting__payment">
                    <h4>Payment Method</h4>
                    <div>
                        <p>There are currently no payment method on file for this account!</p>
                    </div>
                    <div>
                        <button className="payment__btn">Add a Card!</button>
                    </div>
                </div>

                <div className="setting__username">
                    <h4>Username</h4>
                    <div>
                        <p>@{acctDetails.userName}</p>
                    </div>
                </div>

                <div className="setting__jobs">
                    <h4>Accepted Jobs</h4>
                    <div>
                        <p>
                            Once you take on a job, you have to complete the job. After job completion
                            on the app you'll navigte to the jobs portal and click on completed to change job this.state.
                            Once you've completed this process your payment will be transffered to your account.
                            Manage your accepted job via the <Link to="/myjobs">My Jobs</Link> portal.
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Settings
