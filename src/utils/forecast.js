const request = require('request')
const forecast = (latitude,logtitude, callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=2878bd5c63ff6383d948d0a9c1515490&query='+ latitude +','+ logtitude +'&units=f'
   
    request({url,json:true},(error, { body })=>{
        //const {weather_descriptions, temperature, feelslike} =body.current
       if(error){
          callback('Unable to connect to weather service !!', undefined)
       }else if ( body.error){
          callback('Unable to find location. Please try again!', undefined)
       } else {
          callback(undefined, 
            body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degrees out.'   
          )
       }
    })
 }
module.exports = forecast