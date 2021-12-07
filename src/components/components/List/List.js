import React, {useState} from 'react';
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({jobs}) => {
    
    const classes = useStyles();
    const [type,setType] = useState('week');
    const [preference, setPreference] = useState('all');

    // const jobs = [
    //     {title: 'Handy Man'},
    //     {title: 'Shop Keeper'},
    //     {title: 'IT Specialist'},
    //     {title: 'Handy Man'},
    //     {title: 'Shop Keeper'},
    //     {title: 'IT Specialist'},
    //     {title: 'Handy Man'},
    //     {title: 'Shop Keeper'},
    //     {title: 'IT Specialist'},

    // ];

    return(
        <div className={classes.container}>
            <Typography variant="h4">Jobs near you</Typography>
            {/* filterring the time period of the jobs */}
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)} >
                    <MenuItem value= "week" > Less than week</MenuItem>
                    <MenuItem value="month">Less than a month</MenuItem>
                    <MenuItem value="moreMonth">More than a month</MenuItem>
                </Select>
            </FormControl>
            {/* Filtering the job List */}
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
                    
                    <Grid item key={i} xs={12}>
                        <PlaceDetails job={job}/>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default List;