import axios from "axios";

const baseURL = `https://maps.googleapis.com/maps/api/geocode/json?`;

var arr = []

const geocode = (location) => {

    axios.get(baseURL, {
        params: {
            address: location,
            // key: process.env.MAPS_API,
            key: "AIzaSyDNclWfUUv5s9_0hgEd6SvZGfVVexJSo2E"
        }
    }).then((response) => {
        // console.log(response.data.results[0]);
 
        //Geometry Details
        arr = response.data.results[0].geometry.location;
        // response.data.results[0].geometry.location.lng
        // response.data.results[0].geometry.location.lat;
        // console.log("l&l", long, lat)
        
    })
    .catch((error) => {
        console.log(error)
    })

}

// Stripe card number validation

const stripeCardNumberValidation = (cardNum) => {
    if(isNaN(cardNum)) {
        return  "";
    }else{
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
            DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
            JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/
        };

        for (const card in regexPattern) {
            if (cardNum.replace(/[^\d]/g, "").match(regexPattern[card])) {
                if (cardNum) {
                    return cardNum && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNum.replace(/[^\d]/g, "").trim()) ? "" : "Enter a valid Card";
                }
            }
        }

        return "Enter a valid Card";
    }
}


const stripeCardExpirValidation = (value) => {
    if (value) {
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
            let today = new Date();
            let CurrentDate = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate())
            let visaValue = value.split("/");
            let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
            return CurrentDate < visaDate ? undefined : "Please enter valid date";
        }
        else {
            return "Invalid date format";
        }
    }
};



export {geocode, arr, stripeCardNumberValidation, stripeCardExpirValidation}