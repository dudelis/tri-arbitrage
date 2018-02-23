var axios = require('axios');


(async()=>{
    var res = await axios.get('http://www.apilayer.net/api/live?access_key=a93e18488832a53274f6fcc7767a9e42&format=1');
    console.log(res.data);
})()





