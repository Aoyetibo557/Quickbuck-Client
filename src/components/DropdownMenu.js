import React from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

function DropdownMenu() {
    return (
        <div className="dropdowdmenu">
            <nav className="dropdownmenu__nav">
                <Link className="dropdownmenu__link" to="/setting">01. Setting</Link>
                <Link className="dropdownmenu__link" to="/myjobs">02. My Jobs Portal</Link>
                <Link className="dropdownmenu__link" to="/createjob">03. Post a new Job</Link>
                <Link className="dropdownmenu__link" to="/profile">04. Profile</Link>
                <button>Log out</button>
            </nav>            
        </div>
    )
}

export default DropdownMenu
