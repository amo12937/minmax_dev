"use strict"

do (moduleName = "amo.module.Translator") ->
  Translator = ($filter, name, rules = {}) ->
    self = (key, context = {}) ->
      result = rules[key] or key
      for k, v of context
        [v, filterNames...] = if v instanceof Array then v else [v]
        for filterName in filterNames
          [filterName, attrs...] = if filterName instanceof Array then filterName else [filterName]
          filter = $filter(filterName)
          v = filter.apply filter, [v, attrs...]
        result = result.split("%#{k}%").join v
      return result
    self.setRules = (r = {}) -> rules = r
    self.getName = -> name
    return self

  angular.module moduleName, ["ng"]
  .provider "#{moduleName}.translatorCollection", ["$filterProvider", ($filterProvider) ->
    _collection = {}

    registerTranslator: (name) ->
      $filterProvider.register name, ["#{moduleName}.translatorCollection", (tc) ->
        translator = tc.getTranslator name
        return -> translator.apply undefined, arguments
      ]
    $get: ["$filter", ($filter) ->
      getTranslator: (name) ->
        _collection[name] ?= Translator $filter, name
    ]
  ]
