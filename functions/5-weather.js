const axios = require('axios')
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.OPENWEATHER_API_KEY}&q=`


exports.handler = async (event, context) => {
   const method = event.httpMethod
   if (method !== 'POST') {
      return {
         statusCode: 400,
         body: 'Only POST Requests Allowed'
      }
   }
   if (method === 'POST') {
      const { city } = JSON.parse(event.body)
      try {
         const response = await axios.get(`${url}${city}`)
         return {
            statusCode: 200,
            body: JSON.stringify(response.data)
         }
      } catch (error) {
         return {
            statusCode: 404,
            body: JSON.stringify(error)
         }
      }
   }
}
