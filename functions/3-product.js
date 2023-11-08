const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base('appUgOopNXK31ZtqU')
   .table('tblsohIiYdQvYWICx')


exports.handler = async (event, context, cb) => {
   const { id } = event.queryStringParameters
   if (id) {
      try {
         const product = await airtable.retrieve(id)
         if (product.error) {
            return {
               statusCode: 404,
               body: `No product with id: ${id}`
            }
         }
         return {
            statusCode: 200,
            body: JSON.stringify(product)
         }
      } catch (error) {
         return {
            statusCode: 500,
            body: "Server error"
         }
      }
   } return {
      statusCode: 400,
      body: 'No ID provided'
   }
}