var item = require('../models/item')()
item.fetch().then( function(){ console.log(item); });