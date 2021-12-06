import React, {useState} from 'react';
import './ForgotPassword.css';
import ForgotSvg from '../assets/images/forgot.svg';
import { Link } from 'react-router-dom';



function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [newpwd, setNewPwd] = useState("");
    const [confPass, setConfPassword] = useState("");
    const [err, setErr] = useState("");

    const [isTrue, setIsTrue] = useState(false);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setErr("User Not Found!")
    }

    return (
        <div className="forgotpassword">
            <div>
                <div>
                    <h4 className="forgot__h4">Reset Password</h4>
                </div>
                <>
                    {err === "" ? "" : <p className="err__box">{err}</p>}
                </>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className="forgot__input" type="text" name="username" value={username} onInput={(e) => setUsername(e.target.value)} placeholder = "Username" />
                    </div>
                    {isTrue && (
                        <div>
                            <div>
                                <input className="forgot__input" type="password" value={newpwd} onInput={(e) => setNewPwd(e.target.value)} placeholder="New Password" />
                            </div>

                            <div>
                                <input className="forgot__input" type="password" value={confPass} onInput={(e) => setConfPassword(e.target.value)} placeholder="Confirm New Password" />
                            </div>
                        </div>
                    )}
                    <div>
                        <button type="submit" className="forgot__btn">
                            {!isTrue ? "Find User" : "Reset Password"}
                        </button>
                    </div>
                </form>

                <div>
                    <span>Already Have an Account? </span>
                    <Link to="/">Login</Link>
                </div>
            </div>

            <div>
                <img className="forgot__img" src={ForgotSvg} alt="Forgot Password" />
            </div>
        </div>
    )
}

export default ForgotPassword
