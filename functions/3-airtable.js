const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base('appUgOopNXK31ZtqU')
   .table('tblsohIiYdQvYWICx')

exports.handler = async (event, context, cb) => {
   try {
      const { records } = await airtable.list()
      const products = records.map((product) => {
         const { id } = product
         const { name, image, price } = product.fields
         const url = image[0].url
         return { id, name, url, price }
      })
      return {
         statusCode: 200,
         body: JSON.stringify(products),
      }
   }
   catch (error) {
      return {
         statusCode: 500,
         body: "Server Error"
      }
   }
}

// ABOVE METHOD MAY BECOME DEPRECATED - TESTED NEW METHOD BELOW USING PWT

// const axios = require('axios')
// const Airtable = require('airtable');

// const AIRTABLE_API_URL = 'https://api.airtable.com/v0/appUgOopNXK31ZtqU/tblsohIiYdQvYWICx/';
// const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

// exports.handler = async () => {

//    const { data: { records } } = await axios.get(AIRTABLE_API_URL, {
//       headers: {
//          Authorization: `Bearer ${AIRTABLE_TOKEN}`
//       }
//    })
//    console.log(records)
//    return {
//       headers: {
//          'Access-Control-Allow-Origin': '*'
//       },
//       statusCode: 200,
//       body: JSON.stringify(records)
//    }
// }