(function() {
  "use strict";
  (function(modulePrefix) {
    return angular.module("" + modulePrefix + ".controllers", ["ng", "ngRoute", "amo.module.game.game", "amo.module.game.player", "amo.minmax.module.board", "amo.minmax.module.translator"]).controller("" + modulePrefix + ".controllers.minmax", [
      "$location", "$route", "$scope", "amo.module.game.game.Game", "amo.module.game.player.Player", "amo.module.game.player.strategy.Man", "amo.module.game.player.strategy.Com.AlphaBeta", "amo.minmax.module.board.Board", "amo.module.translator.translatorCollection", function($location, $route, $scope, Game, Player, Man, Com, Board, translatorCollection) {
        var board, com, createStrategy, game, gameDelegate, man, options, opts, p1, p2, playerClass, playerTypes, toNum, translator, _i, _ref, _results;
        playerTypes = {
          "MAN": "MAN",
          "COM": "COM"
        };
        playerClass = {
          MAN: Man,
          COM: Com
        };
        toNum = function(n, d) {
          if (!n) {
            return d;
          }
          return Number(n);
        };
        createStrategy = function(type, board, delay, level) {
          return playerClass[type](board, Math.max(delay, 0), Math.max(level, 1));
        };
        translator = translatorCollection.getTranslator("trans");
        opts = $location.search();
        options = {
          min: toNum(opts.min, -10),
          max: toNum(opts.max, 10),
          rank: toNum(opts.rank, 7),
          p1: opts.p1 || playerTypes.MAN,
          p1_name: opts.p1_name || translator("You"),
          p1_level: toNum(opts.p1_level, 5),
          p1_delay: toNum(opts.p1_delay, 100),
          p1_win: toNum(opts.p1_win, 0),
          p2: opts.p2 || playerTypes.COM,
          p2_name: opts.p2_name || translator("Com"),
          p2_level: toNum(opts.p2_level, 5),
          p2_delay: toNum(opts.p2_delay, 100),
          p2_win: toNum(opts.p2_win, 0),
          draw: toNum(opts.draw, 0),
          auto: opts.auto === "true"
        };
        $scope.levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        $scope.p2_level = options.p2_level;
        p1 = Player(options.p1_name);
        p2 = Player(options.p2_name);
        board = Board(p1, p2, options.rank, options.min, options.max);
        man = createStrategy(options.p1, board, options.p1_delay, options.p1_level);
        com = createStrategy(options.p2, board, options.p2_delay, options.p2_level);
        p1.changeStrategy(man);
        p2.changeStrategy(com);
        $scope.board = board;
        $scope.rankList = (function() {
          _results = [];
          for (var _i = 0, _ref = options.rank - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
        $scope.p1 = p1;
        $scope.p2 = p2;
        gameDelegate = {
          getNextPlayer: function() {
            return board.current.player();
          },
          end: function() {
            var result;
            console.log("end");
            result = board.current.value(board["const"].TURN.BLACK);
            if (result > 0) {
              $scope.winner = {
                name: p1.name()
              };
              options.p1_win++;
            } else if (result < 0) {
              $scope.winner = {
                name: p2.name()
              };
              options.p2_win++;
            } else {
              options.draw++;
            }
            if (options.auto) {
              $location.search("p1_win", options.p1_win);
              $location.search("p2_win", options.p2_win);
              $location.search("draw", options.draw);
              return $scope.play();
            }
          },
          stop: function() {
            return console.log("stop");
          }
        };
        game = Game(gameDelegate);
        game.start();
        $scope.play = function() {
          $location.search("p2_level", $scope.p2_level);
          return $route.reload();
        };
        return $scope.clickCell = function(i, j) {
          board.current.player().select([i, j]);
          console.log(board.current.getSelectableList());
          return console.log(com.getChosen());
        };
      }
    ]);
  })("amo.minmax");

}).call(this);

//# sourceMappingURL=minmax.js.map
