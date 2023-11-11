const sgMail = require('@sendgrid/mail')


exports.handler = async (event, context, callback) => {
   const method = event.httpMethod
   if (method !== 'POST') {
      return {
         statusCode: 400,
         body: 'Only POST Requests Allowed'
      }
   }

   const { name, email, subject, message } = JSON.parse(event.body)
   if (!name || !email || !subject || !message) {
      return {
         statusCode: 400,
         body: 'Please Provide All Values'
      }
   }

   sgMail.setApiKey(process.env.SENDGRID_API_KEY)
   const msg = {
      to: 'alex.rentz@outlook.com', // Change to your recipient
      from: 'Alex Rentz <support@aprentz.com>', // Change to your verified sender
      subject: `Serverless Functions - ${subject}`,
      text: `${message}`,
      html: `
         <strong>Sender: </strong>${name}
         <br><br>
         <strong>Email: </strong>${email}
         <br><br>
         <strong>Message: </strong>${message}
         `,
   }

   try {
      await sgMail.send(msg);
      return {
         statusCode: 200,
         body: 'Success'
      }
   } catch (error) {
      console.error(error)
      return {
         statusCode: 400,
         body: JSON.stringify(error)
      }
   }
}

