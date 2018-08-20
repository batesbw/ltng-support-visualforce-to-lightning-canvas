const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const multer = require('multer');
// var upload = multer();

const canvasHelpers = require('./local_modules/CanvasHelpers');

const PORT = process.env.PORT || 5000;

//-- defined in the heroku configuration (if running on heroku)
//-- or defined in the .bashrc file (if running locally)
const { EXAMPLE_SIGNED_REQUEST, CONSUMER_KEY, CONSUMER_SECRET } = process.env;

console.log('Example Signed Request');
console.log(`${EXAMPLE_SIGNED_REQUEST}`);
console.log(`consumer key[${CONSUMER_KEY}]`);
console.log(`consumer secret[${CONSUMER_SECRET}]`);

/**
 *  Handles if the callback page is requested
 *  @param req (request)
 *  @param resp (response)
**/
function handleCanvasRequest(req, resp) {
  debugger;
  if (!canvasHelpers.checkForSignedRequest(req, resp)) return;
  
  const userInfo = canvasHelpers.getSignedRequestContext(req);
  
  const signedRequest = canvasHelpers.getSignedRequest(req);
  
  resp.render('pages/canvas', {
    SIGNED_REQUEST: signedRequest,
    CLIENT_ID: process.env.CONSUMER_KEY,
    USERNAME: userInfo.context.user.fullName,
    INSTANCE_URL: userInfo.client.instanceUrl,
    TOKEN: userInfo.client.oauthToken,
    USER_INFO: userInfo,
  });
}

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/canvas', handleCanvasRequest)
  .post('/canvas', handleCanvasRequest)
  .get('/lightningDesignSystem', (req, res) => res.render('pages/lightningDesignSystem'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
