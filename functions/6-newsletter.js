
const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");


exports.handler = async (event, context) => {
   try {
      mailchimp.setConfig({
         apiKey: process.env.MAILCHIMP_API_KEY,
         server: "us9",
      });

      // const response = await client.lists.getListMembersInfo("f28a67cb73");
      // const {total_items} = response

      const response = await client.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
         email_address: "100millionsemails@hotmail.com",
         status: "pending",
      });


      return {
         statusCode: 200,
         body: JSON.stringify(`Total Items: ${total_items}`)
      }
   }
   catch (error) {
      console.log(error)
      return { statusCode: 500, body: 'error alert' }
   }
}