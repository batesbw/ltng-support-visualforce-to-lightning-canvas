/* eslint "prefer-destructuring": "off", "object-shorthand": "off" */

/**
 * Utility methods for working with canvas.
 * @author Paul Roth <proth@salesforce.com>
 **/

//-- cryptography library
const CryptoJS = require('crypto-js');

//-- used to access canvas multi-part body signatures
const bodyParser = require('body-parser');
// const multer = require('multer');
// const upload = multer();

/**
 * Determines the signed request for a request.
 * @param req (Request)
 * @return (String)
 **/
function getSignedRequest(req) {
  let result = (process.env.EXAMPLE_SIGNED_REQUEST || 'bad.signed_request');
    
  //-- always use the request sent by body if one was sent though.
  if (req.body && req.body.signed_request) {
    console.log('req.body');
    result = req.body.signed_request;
  } else {
    console.log('req.body not found');
  }
  
  return (result);
}

/**
 * Determines the shared secret
 * @visibility - private
 * @return (String)
 */
function getSharedSecret() {
  return (process.env.CONSUMER_SECRET || 'bad.shared_secret');
}

/**
 *  Checks a signed request
 *  @param signedRequest (String)
 *  @param sharedSecret (String)
 *  @return boolean - true if passing false if not
**/
function validateSignedRequest(signedRequest, sharedSecret) {
  let matches = false;
  
  let hashedContext;
  let b64Hash;
  let context;
  let hash;
  
  try {
    //-- hashed context
    hashedContext = signedRequest.split('.')[0];
    context = signedRequest.split('.')[1];
    
    //-- sign the hash with the secret
    hash = CryptoJS.HmacSHA256(context, sharedSecret);
    b64Hash = CryptoJS.enc.Base64.stringify(hash);
    
    matches = (hashedContext === b64Hash);
  } catch (err) {
    console.error('error occurred while checking signed request');
    console.error(err);
  }
  
  if (matches) {
    console.log('signed_request matches');
  } else {
    console.error(`signed_request DOES NOT MATCH \
Expecting:${b64Hash} \
Found:' + hashedContext`);
  }
  
  return (matches);
}

/**
 * Verifies a request is signed.
 * <p>Defaults the signed request using EX_SIGNED_REQUEST if one was sent though</p>
 * 
 * @param req (Request) - assumed multi-part.body.signed_request has been sent
 * @param resp (Response) - response to be returned.
 * @return (Boolean) - if the request was authorized (true) or not(false)
 */
function checkForSignedRequest(req, resp) {
  //-- default using the ex signed request if it is present
  const signedRequest = getSignedRequest(req);
  
  const secret = getSharedSecret();
  
  const isValidRequest = validateSignedRequest(signedRequest, secret);
  if (!isValidRequest) {
    resp.render('pages/error', {
      errMsg: 'not a valid signed request',
    });
  }
  return (isValidRequest);
}

/**
 * Get user context
 * @param signedRequest (String)
 * @param sharedSecret (String)
 * @return UserInfo (Object)
 **/
function getSignedRequestContext(req) {
  const results = {};
  
  const signedRequest = getSignedRequest(req);
  const sharedSecret = getSharedSecret();
  
  //-- hashed context
  const hashedContext = signedRequest.split('.')[0];
  const context = signedRequest.split('.')[1];
  
  const words = CryptoJS.enc.Base64.parse(context);
  const textString = CryptoJS.enc.Utf8.stringify(words);
  
  //-- @TODO: remove
  console.log('signed request context:'); console.log(textString);
  
  return (JSON.parse(textString));
}

module.exports = {
  getSignedRequest: getSignedRequest,
  checkForSignedRequest: checkForSignedRequest,
  validateSignedRequest: validateSignedRequest,
  getSignedRequestContext: getSignedRequestContext,
};
