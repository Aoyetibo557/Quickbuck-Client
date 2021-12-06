import axios from 'axios';
import Geocode from "react-geocode";
import React from 'react';
import  {useState, useEffect} from 'react';

// const URL = 'http://ctp-zip-api.herokuapp.com/zip/11003'
// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
const URL = 'https://testapijobslocation.herokuapp.com/jobs';
// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';
// const URL = 'https://quickbuck-api.herokuapp.com/api/jobs/all'


// const api =  axios.create({
//   baseURL : `https://quickbuck-api.herokuapp.com/api/jobs/all/`
// })



// const getCounty(lat,lng) => {
//   let city, state, country, county;
//   Geocode.fromLatLng(lat, lng).then(
//     (response) => {
//       const address = response.results[0].formatted_address;
//       // let city, state, country, county;
//       for (let i = 0; i < response.results[0].address_components.length; i++) {
//         for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//           switch (response.results[0].address_components[i].types[j]) {
//             case "locality":
//               city = response.results[0].address_components[i].long_name;
//               break;
//             case "administrative_area_level_1":
//               state = response.results[0].address_components[i].long_name;
//               break;
//             case "administrative_area_level_2":
//               county = response.results[0].address_components[i].long_name;
//               break;
//             case "country":
//               country = response.results[0].address_components[i].long_name;
//               break;
//           }
//         }
//       }
//   }
// }


export const getJobsData = async (county) => {
  // const [county, setCounty] = useState({});

  // function getCounty(latti,lngi) {
  //   console.log("Hi");
  //   console.log(latti,lngi);
  //   let city, state, country;
  //   let county;
  //   // let county = "Kings County"
  //   Geocode.fromLatLng(latti, lngi)
  //   .then(response => {
  //       const address = response.results[0].formatted_address;
  //       // let city, state, country, county;
  //       for (let i = 0; i < response.results[0].address_components.length; i++) {
  //         for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
  //           switch (response.results[0].address_components[i].types[j]) {
  //             case "locality":
  //               city = response.results[0].address_components[i].long_name;
  //               break;
  //             case "administrative_area_level_1":
  //               state = response.results[0].address_components[i].long_name;
  //               break;
  //             case "administrative_area_level_2":
  //               county = response.results[0].address_components[i].long_name;
  //               // setCounty(ccounty);
  //               console.log(county);
  //               // county = "Queens County";
  //               break;
  //             case "country":
  //               country = response.results[0].address_components[i].long_name;
  //               break;
  //           }
  //         }
  //       }
  //   });
  //   console.log("city");
  //   console.log("again"+county);
  //   return county;
    
  //   // alert("Hellooo");
  //   // return "Queens County";
  // }

  try {
    const { data : {data}} = await axios.get(URL, {
      method: 'GET',
      // url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
      params: {
        // latitude: lat,
        // longitude: lng
        // county : 'Queens County'
        // county : sayHello(lat,lng)
        // county : getCounty(40.712859, -73.855713)
        county : county
        // bl_latitude: sw.lat,
        // tr_latitude: ne.lat,
        // bl_longitude: sw.lng,
        // tr_longitude: ne.lng,
        // bl_latitude: sw.lat,
        // tr_latitude: ne.lat,
        // bl_longitude: sw.lng,
        // tr_longitude: ne.lng,
        // restaurant_tagcategory_standalone: '10591',
        // restaurant_tagcategory: '10591',
        // limit: '30',
        // currency: 'USD',
        // open_now: 'false',
        // lunit: 'km',
        // lang: 'en_US'
      },
      // headers: {
      //   'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      //   'x-rapidapi-key': '2a7235d540msh60698b7b12f6430p105bc2jsnb6482f317cb6'
      // }
    });
    console.log(data);
    return data;

  }catch(error) {
    console.log(error);
  }
}





//original axios
// export const getJobsData = async (sw, ne) => {
//   try {
//     const { data : {data}} = await axios.get(URL, {
//       // method: 'GET',
//       // url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
//       params: {
//         // bl_latitude: '11.847676',
//         // tr_latitude: '12.838442',
//         // bl_longitude: '109.095887',
//         // tr_longitude: '109.149359',
//         bl_latitude: sw.lat,
//         tr_latitude: ne.lat,
//         bl_longitude: sw.lng,
//         tr_longitude: ne.lng,
//         // restaurant_tagcategory_standalone: '10591',
//         // restaurant_tagcategory: '10591',
//         // limit: '30',
//         // currency: 'USD',
//         // open_now: 'false',
//         // lunit: 'km',
//         // lang: 'en_US'
//       },
//       headers: {
//         'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//         'x-rapidapi-key': 'FQEkgw0q9MmshipdG7cBQi8iVnwzp1UkZv7jsnjymlS5pme7yY'
//       }
//     });
//     return data;

//   }catch(error) {
//     console.log(error);
//   }
// }

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });