var assert = require('assert');
var wootEventsResponse = require('../models/responses/woot-events');

describe('Models', function(){
  describe('WootRes', function(){
    it('.parseEvents()', function(){
      var data = require('./data/woot-event-1.js');

      var wRes = wootEventsResponse.create({
        res: { body: data }
      });

      var result = wRes.parseEvents().events;

      assert.equal( result.length, data.length );
    });

    it('.parseEvent()', function(){
      var data = require('./data/woot-event-1.js');

      var wRes = wootEventsResponse.create();

      var result = wRes.parseEvent( data[0] );

      assert.equal( result.title, 'MLB Headphones (detour)' );
      assert.equal( result.site, 'electronics.woot.com' );
      assert.equal( result.type, 'Daily' );
      assert.equal( result.id, '8b4378ae-43ab-4b9d-aa2f-1c070429cdbf' );
    });

    it('.parseEventOffer()', function(){
      var data = require('./data/woot-event-1.js');

      var wRes = wootEventsResponse.create();

      var result = wRes.parseEventOffer( data[0].Offers[0] );

      assert.equal( result.title, 'BiGR Audio MLB Over-the-Ear Headphones' );
      assert.equal( result.url, 'http://electronics.woot.com/plus/bigr-audio-mlb-over-the-ear-headphones' );
      assert.deepEqual( result.prices, [19.99] );
    });
  });
});