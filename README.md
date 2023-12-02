
https://placehold.it/150/ffffff/ff0000?text=hello
**#0969DA** Site is deployed at https://serverless-functions1.netlify.app/        


SETUP & DEPLOY SERVERLESS FUNCTIONS VIA NETLIFY - aprentz

1. Install Netlify CLI:
   `npm install netlify-cli -g`

2. Create functions folder in root

3. Create netlify.toml in root and point it towards the functions folder
   `[build]
   functions = './functions'
`
4. Setup redirects in netlify.toml
   `[[redirects]]
   from = '/api/*' 
   to = '/.netlify/functions/:splat'`
   status=200

5. Access functions via domain/.netlify/functions/function-name

6. Preface functions with exports.handle eg
   `exports.handler = async (event, context, callback) => {
      return {
         headers: {
         'Access-Control-Allow-Origin':'*'
         },
         statusCode: 200,
         body: 'this must be a string'
      }
}`
