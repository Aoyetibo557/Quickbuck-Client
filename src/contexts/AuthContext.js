import React, {useContext, useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import Token from "../Token";

const AuthContext = React.createContext();


export function AuthProvider( {children, reducer}) {
    const [acctDetails, setAcctDetails] = useState({});
    const [user, setUser] = useState("");
    const [jobs, setJobs] = useState([])
    const history = useHistory();


    useEffect(() => {
        setAcctDetails(parseToken(acctToken));
        setUser(acctDetails.userName)
    },[])

    const {acctToken} = Token();

    // Function to parse token for the user details!
    const parseToken = (toke) => {
        if(!toke) {
            return;
        }

        const base64Url = toke.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }


    
    // Fuction tolog out of account
    const logOut = () => {
        // deletes the token in session storage and refreshes the page
        sessionStorage.clear();
        window.location.pathname = "/" //i'm using this because history.push isn't working!
        history.push("/")

    }

    const value = {
        user,
        acctDetails,
        logOut,
        setJobs,
        jobs,
        parseToken,
    }
    
    return (
        <AuthContext.Provider reducer={reducer} value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'SET_DESTINATION':
            return {
                ...state,
                destination: action.destination
            }
        default:
            return state
    }

}

export default reducer;