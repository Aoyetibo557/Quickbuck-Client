import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { MdNotificationsActive } from 'react-icons/md';
import { VscAccount, VscLayersActive } from "react-icons/vsc";
import { FiSettings} from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext';
import DropdownMenu from './DropdownMenu';

import { HiOutlineMenuAlt4 } from 'react-icons/hi';



function Header() {
    const [menu, setMenu] = useState(false);

    useEffect(() => {

    }, [])

    const { logOut, acctDetails } = useAuth();

  

    return (
        <div className="header">
            <Link className="header__logo" to="/home" title="QuickBuck" >QuickBuck</Link>
            <nav className="header__nav">

                <Link className="" to="/createjob" title="post a New Job">Post a New Job</Link>
                <Link className="dropdown__link" title="setting" to="/settings" ><FiSettings /> Setting</Link>
                <Link className="dropdown__link" title="my jobs" to="/myjobs" ><VscLayersActive /> My Jobs</Link>
                <Link className="dropdown__link" title="account" to="/profile" ><VscAccount /> {acctDetails.userName}</Link>

                {/* <Link className="header__link dropdown"  title={acctDetails.userName}> <VscAccount />
                    <div className="dropdown-content">
                        <Link className="dropdown__link" title="setting" to="/settings" ><FiSettings /> Setting</Link>
                        <Link className="dropdown__link" title="my jobs" to="/myjobs" ><VscLayersActive /> My Jobs</Link>
                        <Link className="dropdown__link" title="account" to="/profile" ><VscAccount /> {acctDetails.userName}</Link>
                    </div>
                </Link> */}

                
                <button className="" onClick={logOut} title="logout">Log out</button>

            </nav>

            <div className="hamburger">
                <HiOutlineMenuAlt4 onClick = {() => setMenu(!menu)} />
                {menu === true ? <DropdownMenu /> : ""}
            </div>
        </div>
    )
}

export default Header
