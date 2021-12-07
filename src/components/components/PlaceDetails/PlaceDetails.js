import React from 'react';
import { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';
import { red } from '@material-ui/core/colors';
import { useEffect } from 'react';

const PlaceDetails = ({ job, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();
  const [splitTags, setSplitTags] = useState([]);

  useEffect(() =>{
    let substring = job.tags.split(".");
    setSplitTags(substring);

  },[]);



  return (
    <Card elevation={2}>
    <Box  display="flex"  >
      <CardMedia
        style={{ height: 275, width : 275 }}
        image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1K6lHdNDXgkXbupvpgP8a7P_nwu06tNZmnnYCJOuNiczwcftvCNQDfU90IYtl-8m3Lws&usqp=CAU'}
        title={job.name}
      />
      <Card style = {{flex : 1 }}>
      <CardContent>
        <Box  display="flex" justifyContent="space-between"> 
          <Typography  variant="h5">{job.name}</Typography>
          <Rating name="read-only" value={Number(job.rating)} readOnly />
        </Box>
        
        {/* <Box display="flex" justifyContent="space-between" > */}
          {/* <Rating name="read-only" value={Number(job.rating)} readOnly /> */}
          {/* <Typography component="legend">{job.num_reviews} review{job.num_reviews > 1 && 's'}</Typography> */}
        {/* </Box> */}
        <Box display="flex" justifyContent="space-between">
          {/* <Typography  component="legend" variant="overline" style={{color :"#b1a9ab" }} > */}
          {job.joblocation && (
          <Typography  variant="overline" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{job.joblocation}</Typography>
        )}
          {/* </Typography> */}
          {/* <div gutterBottom variant="subtitle1" style={{ color : 'white' ,backgroundColor : "#c53b3e", borderRadius : 50, height: 50,width : 50}}>
             <h5 style ={{textAlign: 'center', fontSize : 14 }}  >{job.wage + "/hr"}</h5>
          </div> */}
          <Button variant="contained" style={{ backgroundColor : "#8a5363",color:"white", borderRadius : 50, height : 26 }} >{"$" + job.wage + "/hr"}</Button>
        </Box>   
        {/* <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {job.ranking}
          </Typography>
        </Box> */}
        {/* {job?.awards?.map((award) => (s
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))} */}
        &nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" >
            {job?.description?.map(( {line }) =>(
                 <li style= {{paddingLeft : 15}}  >{line}</li>
            ))}
            {/* {job.description} */}
        </Typography>
        <Box   display="flex" justifyContent="" style= {{}} >
            <Button  variant="contained" color="primary"  >
                APPLY
            </Button>&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="secondary">
                TALK TO EMPLOYER
            </Button>
        </Box> &nbsp;&nbsp;&nbsp;
        <Box> 
          {splitTags.map((tag) => (
            <Chip key={tag} size="small" label={tag} className={classes.chip} />
          ))}


        </Box>
 

        {/* {job.joblocation && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{job.joblocation}
          </Typography>
        )} */}
        {/* {job.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {job.phone}
          </Typography>
        )} */}
      </CardContent>
      {/* <CardActions>
        {/* <Button size="small" color="primary" onClick={() => window.open(job.web_url, '_blank')}>
          MORE INFO
        </Button> */}
        {/* <Button size="small" color="primary" onClick={() => window.open(job.website, '_blank')}>
          LINK TO WEBSITE
        </Button>  */}
      {/* </CardActions> */}
      </Card>
    </Box>
    </Card>
  );
};


export default PlaceDetails;