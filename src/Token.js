import { useState } from 'react';

export default function Token() {
    // This function retrieves the token if there is on in session Storage. It is primarily called in
    //app.js 
    const getToken = () => {
        const tokenString = sessionStorage.getItem("userToken");
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [acctToken, setAcctToken] = useState(getToken());

    // This function primarily called in login and signup pages/componenet.to save the token fromlogin
    const saveToken = uToken => {
        if(!uToken){
            return;
        }else{
            sessionStorage.setItem("userToken", JSON.stringify(uToken));
            setAcctToken(uToken);
        }
    };

    return {
        setAcctToken: saveToken,
        acctToken
    }
}