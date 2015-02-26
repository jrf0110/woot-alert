var config  = require('../config');
var utils   = require('./utils');
var wootRes = require('../models/responses/woot-events');
var Promise = require('bluebird');

module.exports.fetch = function( params, callback ){
  params = params || {};

  var url = [
    config.woot.baseUrl
  , 'events.json'
  ].join('/');

  url += '?' + utils.qs.stringify( utils.extend({
    key: config.woot.apiKey
  }, params ));

  utils.req
    .get( url )
    .set( 'Accept', 'application/json' )
    .end( function( error, res ){
      if ( error ) return callback( error );

      callback( null, wootRes.create({ res: res }) );
    });
};

Promise.promisifyAll( module.exports );