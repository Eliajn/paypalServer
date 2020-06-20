// Initialize the Braintree SDK:
// 1. Import the Braintree SDK module
var braintree = require('braintree');
var express = require('express');
const app = express();

  // 3. Set up a URL to return a client token to the browser
  app.get('/my-api/client-token', (req, res) => {
    // 2. Set up a gateway using your Braintree access token
    var gateway = braintree.connect({
      accessToken: (req.query.env === 'production')
        ? 'BRAINTREE_PRODUCTION_ACCESS_TOKEN'
        : 'access_token$sandbox$zrdjndhw4n3zcpps$38f537f9ba1121b6b3b854b2e04bff4d'
    });

    

    gateway.clientToken.generate({}, (err, response) => {
      console.log('response.clientToken', response.clientToken)
      res.json('response.clientToken');
    });
  })
  
  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  app.post('/my-api/execute-payment/', (req, res) => {
    // 2. Get the nonce from the request body
    var nonce = req.body.nonce;
    // 3. Set up the parameters to execute the payment
    var saleRequest = {
      amount: '13.37',
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    };
    // 4. Call the Braintree gateway to execute the payment
    gateway.transaction.sale(saleRequest, (err, result) => {
      if (err || !result.success) {
        return res.status(500).json({ status: 'error' });
      }
      // 5. Return a success response to the client
      return res.status(200)
        .json({ status: 'success', id: result.transaction.id });
    });
  })
  app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000/');
  });
  // Run `node ./server.js` in your terminal