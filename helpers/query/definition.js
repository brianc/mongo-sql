if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require, exports, module){
  var helpers = require('../../lib/query-helpers');
  var defs    = require('../../lib/column-def-helpers');
  var utils   = require('../../lib/utils');

  helpers.register('definition', function(definition, values, query){
    if (typeof definition == 'string') return definition;

    var output = "";
    
    for (var k in definition){
      output += utils.quoteColumn(k);

      for (var j in definition[k])
        if (defs.has(j))
          output += ' ' + defs.get(j).fn(definition[k][j], values, query, j);

      output +=  ", ";
    }

    return output.substring(0, output.length - 2);
  });

  return module.exports;
});