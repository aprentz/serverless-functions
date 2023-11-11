const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");

exports.handler = async (event, context) => {
   const method = event.httpMethod
   if (method !== 'POST') {
      return {
         statusCode: 405,
         body: 'Only POST Requests Allowed'
      }
   }
   const { email } = JSON.parse(event.body)
   if (!email) {
      return {
         statusCode: 400,
         body: "Please provide email value"
      }
   }
   try {
      mailchimp.setConfig({
         apiKey: process.env.MAILCHIMP_API_KEY,
         server: "us9",
      });

      const response = await client.lists.addListMember("f28a67cb73", {
         email_address: email,
         status: "pending",
      });
      return {
         statusCode: 201,
         body: JSON.stringify(response)
      }
   }
   catch (error) {
      return {
         statusCode: 400,
         body: JSON.stringify(error)
      };
   }
}