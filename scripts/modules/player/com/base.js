(function() {
  "use strict";
  (function(moduleName) {
    return angular.module(moduleName).factory("" + moduleName + ".Com.Base", [
      "$timeout", "$q", "" + moduleName + ".PlayerBase", function($timeout, $q, PlayerBase) {
        return function(name, boardMaster, maxDepth, delay) {
          var self;
          if (maxDepth == null) {
            maxDepth = 7;
          }
          if (delay == null) {
            delay = 0;
          }
          self = PlayerBase(name);
          self.play = function() {
            var deferred;
            deferred = $q.defer();
            $timeout(function() {
              var pos;
              pos = self.getChosen(maxDepth);
              boardMaster.select(pos);
              return deferred.resolve(boardMaster.isFinished());
            }, delay);
            return deferred.promise;
          };
          return self;
        };
      }
    ]);
  })("amo.minmax.Player");

}).call(this);

//# sourceMappingURL=base.js.map
