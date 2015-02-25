var config  = require('../../config');
var utils   = require('../../lib/utils');
var wootRes = require('../models/responses/woot-events');

module.exports.fetch = function( params ){
  params = params || {};

  var url = [
    config.woot.baseUrl
  , 'events.json'
  ].join('/');

  url += '?' + utils.qs.stringify( utils.extend({
    key: config.woot.apiKey
  }, params ));

  return new Promise( function( resolve, reject ){
    utils.req
      .get( url )
      .set( 'Accept', 'application/json' )
      .end( function( error, res ){
        if ( error ) return reject( error );

        resolve(
          wootRes.create( res ).parseEvents()
        );
      });
  });
};