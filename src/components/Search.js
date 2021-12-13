import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './searchStyle.js';

const Search = ({ setCoordinates }) => {
  const classes = useStyles();

  const [autocomplete, setAutoComplete] = useState(null);

  const onLoad = (autoComp) => setAutoComplete(autoComp);
  const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCoordinates({lat:lat,lng:lng});
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
 
        <Box display="flex">
          {/* <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography> */}
          <Autocomplete onLoad = {onLoad} onPlaceChanged={onPlaceChanged} >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search... ex: Queens, NY" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete> 
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Search;