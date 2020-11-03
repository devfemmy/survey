import axios from 'axios';



const instance = axios.create({//http://192.168.64.2/api_call/

    
    // baseURL: 'http://192.168.64.2/api_call/',
    baseURL: 'https://surveymanager.rewardsboxnigeria.com/api/',
    headers:{
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'Client-Key': 'absgdtyeu37',
        // 'Token': storedValue
        // 'Token': 'cH9JFbfa7VFeVwH1ORY4FmDmCbCchBm0MhWKzq7d0GJAFema7E2Q5iLiYcSvXRKemYMuk7h2ujPUKd72UFXaiAT7FMgAxgnQNaHGE28O7P1dYJ2zVBaPMiGiSjVt0c'
    }
    
});



export default instance;