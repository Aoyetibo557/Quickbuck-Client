import axios from 'axios';
import Geocode from "react-geocode";


// const URL = 'https://testapijobslocation.herokuapp.com/jobs';
// const URL = "http://localhost:9090/api/jobs/findbycounty";
// const URL = 'https://quickbuck-api.herokuapp.com/api/jobs/findbycounty';





export const getJobsData = async (county) => {
 
  try {
    const { data : {data}} = await axios.get(URL, {
      method: 'GET',
      params: {
        
        county : county
        
      },
     
    });
    console.log(data);
    return data;

  }catch(error) {
    console.log(error);
  }
}

