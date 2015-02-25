var qs      = require('querystring');
var config  = require('../../config');
var utils   = require('../../lib/utils');

module.exports = require('stampit')()
  .state({
    site: 'www'
  })
  .methods({
    baseUrl:      config.woot.baseUrl
  , apiKey:       config.woot.apiKey
  , siteBaseUrl:  config.woot.siteBaseUrl

  , getEventsUrl: function(){
      return this.baseUrl + '/events.json' + '?' + utils.qs.stringify({
        key:  this.apiKey
      , site: this.getSiteUrl()
      });
    }

  , getSiteUrl: function(){
      return this.site + '.' + this.siteBaseUrl;
    }

  , fetch: function(){
      console.log('for site', this.site, this.getEventsUrl());
      return new Promise( function( resolve, reject ){
        utils.req
          .get( this.getEventsUrl() )
          .set( 'Accept', 'application/json' )
          .end( function( error, res ){
            if ( error ) return reject( error );

            this.parseEvents( res.body );

            resolve( this );
          }.bind( this ));
      }.bind( this ));
    }

  , parseEvents: function( e ){
      if ( e.length === 0 ){
        throw new Error('Invalid argument array with length `0`');
      }

      // e = e[0];

      // this.title = e.Title;
      // this.price = e.Offers[0].Items.map( function( item ){
      //   return item.SalePrice;
      // });
      // this.url = e.Offers[0].URL;
      
      e.forEach( function( evt ){
        console.log(evt.Type, evt.Title);

        evt.Offers.map( function( offer ){
          return {
            title: offer.Title
          , url: offer.Url
          , prices: offer.Items.map( function( item ){
                      return item.SalePrice;  
                    })
          };
        }).forEach( function( offer ){
          console.log('  Offer:', offer);
        });
      });

      return this;
    }
  })
  .enclose( function(){

  });