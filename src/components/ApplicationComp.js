import axios from 'axios';
import "./ApplicationComp.css";
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// const baseURL = "http://localhost:9090/api";
const baseURL = "https://quickbuck-api.herokuapp.com/api";


function ApplicationComp({jobId, author, status, createdAt}) {
    const [obj, setObj] = useState({});
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getProfile = () => {
        const URL =`${baseURL}/users/findbyname/${author}`
        
        axios.get(URL)
        .then(response => { 
            console.log(response.data.user);
            setObj(response.data.user)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const approveApplicant = () => {
        const URL = `${baseURL}/jobapplications/updateapplicationstatus/${jobId}/${author}`

        const applicantstatus = {
            status: "approved",
        }

        setErr("")
        setIsLoading(true)

        if(err.length < 0  ) {
            setIsLoading(true)
        }else {
            axios.put(URL, applicantstatus)
            .then(response => {
                const data = response.data;
                console.log(data)
                if(!response.data.length > 1){
                    const error = (data && data.message) || response.status;
                    setErr(error)
                    setIsLoading(false)
                    return error;
                }

                console.log(response.data);
                window.location.reload(true)

            })
            .catch(error => {
                console.log(error)
                setErr("Sorry an error occured in the approval process!", error.message)
            })
        }
        
    }

    
    useEffect(() => {
        getProfile()
    },[])

    return (
        <div className="applicationcomp__container">
            <div>
                <img className="container__img" src={`https://avatars.dicebear.com/api/personas/${author+`job`}.svg?mood[]=happy&mood[]=sad`} alt={author} />
                <h5>{author}</h5>
            </div>
            <div>
                <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <div>
                <p>{obj.phone}</p>
            </div>

            <div>
                <a href={`mailto: ${obj.email} `}>{obj.email}</a>
            </div>

            <div>
                <p>{status.toUpperCase()}</p>
            </div>

            <div>
                <Rating disabled value={4} />
            </div>

            <div>

                {status === "approved" ? (
                    <div>
                        {/* <h4>{status}</h4> */}
                        <button disabled={status === "approved" ? "true" : ""} onClick={approveApplicant}>Approved</button>
                    </div>
                ):(
                    <div>
                        {/* <button onClick={() => alert("Apologies mate! that feature is currently not available")}>View Profile</button> */}
                        {/* <Link to={`/applicants/${jobId}/${author}`} >View Profile</Link> */}
                        {!isLoading || err.length > 0 ? (
                            <button disabled={status === "approved" ? "true" : ""} onClick={approveApplicant}>Approve</button>

                        ):(
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        )}
                    </div>

                )}
               
            </div>

        </div>
    )
}

export default ApplicationComp
