import React from 'react';
import { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import { BsDot} from "react-icons/bs"
import useStyles from './styles.js';
import { red } from '@material-ui/core/colors';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlaceDetails = ({ job, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();
  const [splitTags, setSplitTags] = useState([]);
  const [splitDescription, setSplitDescription] = useState([]);

  // if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"})

  useEffect(() =>{
    let substring = job.tags.split(".");
    setSplitTags(substring);

		let subDescp = job.description.split(".");
		setSplitDescription(subDescp);
    
  },[]);



  return (
    <Card elevation={3}>
    <Box  display="flex"  >
      <CardMedia
        style={{ height: 275, width : 275 }}
        image={`https://avatars.dicebear.com/api/personas/${job.name+`job`}.svg?mood[]=happy&mood[]=sad`} 
        title={job.name}
      />
      <Card style = {{flex : 1 }}>
        <CardContent>
          <Box  display="flex" justifyContent="space-between"> 
            <Typography  variant="h5">{job.name} 
              {job.jobstatus === "inactive" ? <span className={classes.inactiveSpan}>({job.jobstatus})</span> : ""}
            </Typography>
            <Rating name="read-only" value={Number(job.rating)} readOnly />
          </Box>
          
          
          <Box display="flex" justifyContent="space-between">
            {job.joblocation && (
            <Typography  variant="overline" color="textSecondary" className={classes.subtitle}>
              <LocationOnIcon />{job.joblocation}</Typography>
          )}
            
            <Button variant="contained" style={{ backgroundColor : "#8a5363",color:"white", borderRadius : 50, height : 26 }} >{"$" + job.price + "/hr"}</Button>
          </Box>   
        
          &nbsp;&nbsp;&nbsp;
          <Typography variant="subtitle1" >
              {splitDescription.map((line) =>(
                  <li style= {{paddingLeft : 15}}  >{line}</li>
              ))}
              {/* {job.description} */}
          </Typography>
          <Box   display="flex" justifyContent="" style= {{}} >
              <Button disabled={job.jobstatus === "inactive" ? true : false} variant="contained" color="default"  >
                  <Link className={classes.link} to={`/home/${job.jobId}`}>
                    {/* View Details */}
                    {job.jobstatus === "inactive" ? "Not Available" : "View Details"}
                  </Link>
              </Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={() => alert("Apologies Mate! this feature is currently not available.")} variant="contained" color="secondary">
                  TALK TO EMPLOYER
              </Button>
          </Box> &nbsp;&nbsp;&nbsp;
          <Box> 
            {splitTags.map((tag) => (
              <Chip key={tag} size="small" label={tag} className={classes.chip} />
            ))}
            
            {job.jobstatus === "inactive" ? (
              <Chip size="small" label={`${job.jobstatus}`} key={job.jobstatus} className={classes.inactiveChip} />
            ): ""}

          </Box>
  
        </CardContent>
     
      </Card>
    </Box>
    </Card>
  );
};


export default PlaceDetails;