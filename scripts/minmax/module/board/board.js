(function() {
  "use strict";
  (function(moduleName) {
    var getOther, _black, _white;
    _white = 0;
    _black = 1;
    getOther = function(t) {
      return 1 - t;
    };
    return angular.module(moduleName, ["ng"]).factory("" + moduleName + ".RandomScoreCreator", function() {
      return function(min, max) {
        return function() {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
      };
    }).factory("" + moduleName + ".Board", [
      "" + moduleName + ".RandomScoreCreator", function(RandomScoreCreator) {
        return function(p1, p2, rank, min, max) {
          var createScore, isInside, l, players, pos, score, scoreTable, self, stack, turn, _i, _ref, _results;
          if (rank == null) {
            rank = 7;
          }
          if (min == null) {
            min = -10;
          }
          if (max == null) {
            max = 10;
          }
          createScore = RandomScoreCreator(min, max);
          l = (function() {
            _results = [];
            for (var _i = 0, _ref = rank - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this);
          isInside = function(p) {
            var _ref1, _ref2;
            return (0 <= (_ref1 = p[_white]) && _ref1 < rank) && (0 <= (_ref2 = p[_black]) && _ref2 < rank);
          };
          scoreTable = (function() {
            var i, j, t;
            t = (function() {
              var _j, _len, _results1;
              _results1 = [];
              for (_j = 0, _len = l.length; _j < _len; _j++) {
                i = l[_j];
                _results1.push((function() {
                  var _k, _len1, _results2;
                  _results2 = [];
                  for (_k = 0, _len1 = l.length; _k < _len1; _k++) {
                    j = l[_k];
                    _results2.push({
                      score: createScore(i, j),
                      pos: [i, j],
                      selectable: true
                    });
                  }
                  return _results2;
                })());
              }
              return _results1;
            })();
            return function(p) {
              if (!isInside(p)) {
                return {
                  score: outside,
                  pos: [p[_white], p[_black]],
                  selectable: false
                };
              }
              return t[p[_white]][p[_black]];
            };
          })();
          players = (function(p, p1, p2) {
            p[_black] = p1;
            p[_white] = p2;
            return p;
          })([], p1, p2);
          turn = _black;
          score = [0, 0];
          pos = [];
          stack = [];
          return self = {
            "const": {
              rank: function() {
                return rank;
              },
              TURN: {
                BLACK: _black,
                WHITE: _white
              }
            },
            current: {
              player: function() {
                return players[turn];
              },
              turn: function(t) {
                if (t === void 0) {
                  return turn;
                }
                return turn === t;
              },
              value: function(t) {
                return score[t] - score[getOther(t)];
              },
              score: function(t) {
                return score[t];
              },
              getSelectableList: function() {
                var i;
                if (pos[turn] === void 0) {
                  return (function() {
                    var _j, _ref1, _results1;
                    _results1 = [];
                    for (i = _j = 0, _ref1 = rank * rank - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                      _results1.push([Math.floor(i / rank), i % rank]);
                    }
                    return _results1;
                  })();
                }
                if (turn === _black) {
                  return (function() {
                    var _j, _len, _results1;
                    _results1 = [];
                    for (_j = 0, _len = l.length; _j < _len; _j++) {
                      i = l[_j];
                      if (scoreTable([pos[_white], i]).selectable) {
                        _results1.push([pos[_white], i]);
                      }
                    }
                    return _results1;
                  })();
                } else {
                  return (function() {
                    var _j, _len, _results1;
                    _results1 = [];
                    for (_j = 0, _len = l.length; _j < _len; _j++) {
                      i = l[_j];
                      if (scoreTable([i, pos[_black]]).selectable) {
                        _results1.push([i, pos[_black]]);
                      }
                    }
                    return _results1;
                  })();
                }
              }
            },
            get: function(p) {
              return scoreTable(p).score;
            },
            used: function(p) {
              return !scoreTable(p).selectable;
            },
            selectable: function(p) {
              var t;
              if (!isInside(p)) {
                return false;
              }
              t = getOther(turn);
              if (pos[turn] === void 0) {
                return true;
              }
              if (p[t] !== pos[t]) {
                return false;
              }
              return scoreTable(p).selectable;
            },
            select: function(p) {
              var oldPos, s, t;
              if (!self.selectable(p)) {
                return false;
              }
              s = scoreTable(p);
              oldPos = pos;
              pos = s.pos;
              score[turn] += s.score;
              s.selectable = false;
              t = turn;
              turn = getOther(turn);
              stack.push(function() {
                turn = t;
                s.selectable = true;
                score[turn] -= s.score;
                pos = oldPos;
              });
              return true;
            },
            undo: function(p) {
              var _base;
              return typeof (_base = stack.pop()) === "function" ? _base() : void 0;
            },
            isFinished: function() {
              var i, p, _j, _len;
              if (pos[turn] === void 0) {
                return false;
              }
              p = [pos[_white], pos[_black]];
              for (_j = 0, _len = l.length; _j < _len; _j++) {
                i = l[_j];
                p[turn] = i;
                if (scoreTable(p).selectable) {
                  return false;
                }
              }
              return true;
            }
          };
        };
      }
    ]);
  })("amo.minmax.module.board");

}).call(this);

//# sourceMappingURL=board.js.map
