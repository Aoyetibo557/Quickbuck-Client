import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Box,Button,Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Rating from '@material-ui/lab';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const Map = ({coordinates ,  setCoordinates,setBounds, jobs}) => {
   
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');


    return(
        <div className={classes.mapContainer} >
            <GoogleMapReact
                bootstrapURLKeys= {{ key: 'AIzaSyAsiey1SMwJZPItXSjAGKWZ87i9EvkV0-0'}}
                defaultCenter={coordinates}
                center = {coordinates}
                defaultZoom ={14}
                margin = {[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng : e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={''}
            >
                {jobs?.map((job, i) =>(
                    <div
                        className ={classes.markerContainer}
                        lat = {Number(job.latitude)}
                        lng = {Number(job.longitude)}
                        key = {i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize= "large" />
                            ) : (
                                <Paper elevation = {3} className= {classes.paper} >
                                    <Box  display="flex" justifyContent="space-between" >
                                        <img
                                            style ={{ height : 35 , width : 35  }}
                                            className = {classes.pointer}
                                            src ={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1K6lHdNDXgkXbupvpgP8a7P_nwu06tNZmnnYCJOuNiczwcftvCNQDfU90IYtl-8m3Lws&usqp=CAU'}
                                            alt = {job.name}
                                        /> &nbsp;&nbsp;
                                        {/* <Rating size="small" value= {Number(job.rating)} readOnly /> */}
                                        <Typography  className= { classes.typography} variant = "subtitle2" gutterBottom >
                                            {job.name }
                                        </Typography>
                                    </Box>

                                    <Button variant="contained" style ={{ backgroundColor : "#76b5c5", color : "white" }} >
                                        APPLY
                                    </Button>
                                    <Button size="small" variant="contained" style ={{ backgroundColor : "#c5768e", color: "white" }} >
                                        VIEW
                                    </Button>

                                </Paper>
                            )
                        }

                    </div>
                ))}
            </GoogleMapReact>
        
        </div>
    );
}

export default Map;