(function() {
  "use strict";
  (function(moduleName) {
    return angular.module(moduleName).factory("" + moduleName + ".Man", [
      "$q", "" + moduleName + ".PlayerBase", function($q, PlayerBase) {
        return function(name, boardMaster) {
          var deferred, self;
          deferred = null;
          self = PlayerBase(name);
          self.choice = function(p) {
            if (!deferred) {
              return;
            }
            if (!boardMaster.selectable(p)) {
              return;
            }
            boardMaster.select(p);
            deferred.resolve(boardMaster.isFinished());
            return deferred = null;
          };
          self.play = function() {
            deferred = $q.defer();
            return deferred.promise;
          };
          return self;
        };
      }
    ]);
  })("amo.minmax.Player");

}).call(this);

//# sourceMappingURL=man.js.map
