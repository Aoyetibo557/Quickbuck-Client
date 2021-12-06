import React, { useState } from 'react';
import './Loginpage.css'; 
import { Link, useHistory} from 'react-router-dom';
import './Form.css';
import LoginImage from '../assets/images/City.jpg'
import GoogleImage from '../assets/images/googleicon.png';
import Token from '../Token';
import axios from 'axios';



// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";


function Loginpage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [msg, setMsg] = useState("");
    const [acct, setAcct] = useState({});

    //save the user token for authentication
    const {acctToken, setAcctToken} = Token();


    //for rerouting after login authentication
    // const history = createBrowserHistory({forceRefresh: true});
    let history = useHistory();


    const handleSubmit = () => {
        // setErr("")
        login();
       
    }



    const login = async() => {
        
        setMsg("");
        setErr("");

        const URL = `${baseURL}/users/login/${username}/${password}`;
        await axios(URL)
        .then(response => {

            if(response.data.status === 401) {
                console.log("srere")
            }
            console.log(response.data);
            setMsg(response.data.message);
            setAcctToken(response.data.token);
            setAcct(response.data.user);
            
            if(response.data.status === 200) {
                window.location = "/home"
                history.push("/home");
            }

        })
        .catch(err => {
            console.log(err);
            setMsg("Invalid Credentials!")
        })
    }

    const clearForm = () => {
        setUsername("");
        setPassword("");
    }

    const handleClick = (ev) => {
        ev.preventDefault()
        handleSubmit()
        clearForm();        
    }

    return (
        <div className="loginpage">
            <div className="loginpage__left">
                <div>
                    <h4 className="login_h4">Login</h4>
                    <p>If You Are Already A Member. Easily Log In</p>
                </div>
                <div>
                    {/* {err === "" ? "" : <p className="err__box">{err}</p>} */}
                    {msg === "" ? "" : <p className="err__box">{msg}</p>}

                </div>

                <form className="loginform" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <input className="input" type="text" name="username" value = {username} onInput = {(e) => setUsername(e.target.value)}  placeholder="Username" required />
                    </div>

                    <div>
                        <input className="input" type="password" value={password} onInput ={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    </div>

                    <div>
                        <button onClick={handleClick} className="btn primary">Login</button>
                    </div>
                </form>

                <div>
                    <span className="loginpage__span" >Don't have an account? </span>
                    <Link className="form__link" to="signup" >Sign up</Link>
                </div>

               <div>
                    <a className="google__btn" href="/" target="_blank"> 
                     <img className="google-icon" src={GoogleImage} alt="google icon" />
                     Login with Google
                    </a>
               </div>

               <div>
                    <span className="loginpage__span" >Don't remember your password?  </span>
                   <Link className="form__link" to="/forgot">Forgot my password</Link>
               </div>


            </div>

           <div className="loginpage__right">
                <img className="loginpage__img" src = {LoginImage} alt="Login" /> 
           </div>
        </div>
    )
}

export default Loginpage