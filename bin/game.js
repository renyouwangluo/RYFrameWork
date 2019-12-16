if (typeof wx!=="undefined") {
	require('utils/wx/ald-game.js')
}
else if (typeof qq!=="undefined"){
	require('utils/qq/ald-game.js')
}
if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
	require("swan-game-adapter.js");
	require("libs/laya.bdmini.js");
} else if (typeof wx!=="undefined") {
	require("weapp-adapter.js");
	require("libs/laya.wxmini.js");
}
window.loadLib = require;
require("index.js");