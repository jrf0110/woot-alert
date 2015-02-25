var stampit = require('stampit');
var utils   = require('../../lib/utils');

module.exports = stampit();

var stamps = {
  fetch: require('./fetch')
};

module.exports = module.exports.compose.apply(
  module.exports
, utils.values( stamps )
);

utils.extend( module.exports, stamps );