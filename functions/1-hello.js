// domain/.netlify/functions/1-hello
const person = { msg: `Hi, I'm`, name: 'Alex' }

exports.handler = async (event, context) => {
   return {
      headers: {
         'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify(person)
   }
}