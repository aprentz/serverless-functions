const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");


exports.handler = async (event, context) => {
   const method = event.httpMethod
   const { email } = JSON.parse(event.body)
   console.log(email)
   try {
      mailchimp.setConfig({
         apiKey: process.env.MAILCHIMP_API_KEY,
         server: "us9",
      });

      // const members = await client.lists.getListMembersInfo(process.env.MAILCHIMP_LIST_ID);
      // const {total_items} = response
      

      const response = await client.lists.addListMember("f28a67cb73", {
         email_address: email,
         status: "subscribed",
      });

      return {
         statusCode: 200,
         body: JSON.stringify(response)
      }
   }
   catch (error) {
      return {
         statusCode: 500,
         body: JSON.stringify(error.response.error)
      }
   }
}