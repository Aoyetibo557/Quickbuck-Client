import React, {useState, useEffect, createRef} from 'react';
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({jobs, childClicked}) => {
    
    const classes = useStyles();
    const [type,setType] = useState('week');
    const [preference, setPreference] = useState('all');
    // const [elRefs, setElRefs] = useState([]);



    console.log({childClicked});

    // useEffect(() => {
    //     const refs = Array(jobs.length).fill().map((_, i) => refs[i] || createRef());
    //     setElRefs(refs);
    // }, [jobs]);

  
    return(
        <div className={classes.container}>
            <Typography variant="h4">Jobs near you</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)} >
                    <MenuItem value= "week" > Less than week</MenuItem>
                    <MenuItem value="month">Less than a month</MenuItem>
                    <MenuItem value="moreMonth">More than a month</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Filter</InputLabel>
                <Select value={preference} onChange={(e)=> setPreference(e.target.value)} >
                    <MenuItem value= "all" >All Jobs</MenuItem>
                    <MenuItem value="high">Highest Paying</MenuItem>
                    <MenuItem value="top">Highest Ratings</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
                {jobs?.map((job,i) => (
                    
                    <Grid  item key={i} xs={12}>
                        <PlaceDetails 
                            job={job}
                            selected={Number(childClicked) == i  }   
                            // refProp={ elRefs[i] } 
                        />
                       
                    </Grid>
                )).reverse()}
            </Grid>

        </div>
    );
}

export default List;