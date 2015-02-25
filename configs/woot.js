/**
 * config.woot
 */

var user = require('./woot.user.js');

module.exports = {
  apiKey:       user.apiKey
, apiSecret:    user.apiSecret
, baseUrl:      'http://api.woot.com/2'
, siteBaseUrl:  'woot.com'
};