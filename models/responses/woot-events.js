var Events = require('../event');
var Offers = require('../offer');

module.exports = require('stampit')()
  .state({
    events: []    
  })
  .enclose( function(){
    if ( !this.res ){
      throw new Error('Cannot parse events without setting `res`');
    }

    if ( !Array.isArray( this.res.body ) ){
      throw new Error('Invalid response body');
    }

    this.parseEvents();
    delete this.res;
  })
  .methods({
    parseEvents: function(){
      this.events = this.res.body.map( this.parseEvent.bind( this ) );

      return this;
    }

  , parseEvent: function( evt ){
      return Events.create({
        id:     evt.Id
      , title:  evt.Title
      , type:   evt.Type
      , site:   evt.Site
      , offers: evt.Offers.map( this.parseEventOffer.bind( this ) )
      });
    }

  , parseEventOffer: function( offer ){
      return Offers.create({
        title:  offer.Title
      , url:    offer.Url
      , prices: offer.Items.map( function( item ){
                  return item.SalePrice;  
                })
      });
    }
  });