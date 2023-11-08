const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base('appUgOopNXK31ZtqU')
   .table('tbla8QKvSx3PbRWKN')

exports.handler = async (event, context, callback) => {
   const method = event.httpMethod
   if (method === 'GET') {
      try {
         const { records } = await airtable.list()
         const survey = records.map((item) => {
            const { id } = item
            const { room, votes } = item.fields
            return { id, room, votes }
         })

         return {
            statusCode: 200,
            body: JSON.stringify(survey)
         }

      } catch (error) {
         return {
            statusCode: 500,
            body: 'Server error'
         }
      }
   } if (method === 'PUT') {
      try {
         const data = await axios.put(id, {})
         return {
            statusCode: 200,
            
         }
      } catch (error) {

      }
   }

   return {
      statusCode: 405,
      body: 'Only GET & PUT requests are allowed'
   }

}