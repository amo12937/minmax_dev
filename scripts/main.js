"use strict";

require.config({"baseUrl":"scripts","shim":{"modules/player/man":["modules/player/player"],"modules/player/com/base":["modules/player/player"],"modules/player/alphaBeta":["modules/player/com/base"],"modules/player/com":["modules/player/com/base"],"modules/player/doubleChecker":["modules/player/com/base","modules/player/alphaBeta","modules/player/com"],"minmax/translator/translator":["modules/translator/translatorCollection"],"minmax/translator/apis/getRule":["minmax/translator/translator"],"minmax/translator/transResolver":["minmax/translator/translator","minmax/translator/apis/getRule"],"controllers/minmax":["modules/boardMaster/boardMaster","modules/gameMaster/gameMaster","modules/player/man","modules/player/alphaBeta","modules/player/com","modules/player/doubleChecker"],"controllers/route":["controllers/minmax","minmax/translator/transResolver"],"app":["controllers/minmax","controllers/route","modules/ngLoadScript/ngLoadScript"],"bootstrap":["app"]},"deps":["bootstrap"]});