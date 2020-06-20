const  braintree = require('braintree');

const gateway = braintree.connect({
  accessToken: 'access_token$sandbox$8zjhtty7nvwrqw3z$5d7352a66a9d5f89314c47b2055592f1'
});

gateway.transaction.sale({
  amount: '5.00',
  paymentMethodNonce: 'paypal',
  options: {
    submitForSettlement: true
  }
}).then(function (result) {
  if (result.success) {
    console.log('Transaction ID: ' + result.transaction.id);
  } else {
    console.log('result: ', result);
    console.error(result.message);
  }
}).catch(function (err) {
  console.error(err);
});