var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ALDEventDef;
(function (ALDEventDef) {
    ALDEventDef["None"] = "";
    ALDEventDef["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
    ALDEventDef["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    //todo:添加你自己的阿拉丁事件
})(ALDEventDef = exports.ALDEventDef || (exports.ALDEventDef = {}));
//阿拉丁相关接口
var ALD = /** @class */ (function () {
    function ALD() {
    }
    ALD.aldSendEvent = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
    };
    ALD.aldSendReportAdClickSuccess = function (data) {
        var type = ALDEventDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
        var ald = ALD;
        ald.aldSendEvent(type, {
            "导出成功": data.title + ":" + String(data.appid)
        });
    };
    ALD.aldSendReportAdClickFail = function (data) {
        var type = ALDEventDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
        var ald = ALD;
        ald.aldSendEvent(type, {
            "导出失败": data.title + ":" + String(data.appid)
        });
    };
    return ALD;
}());
exports.default = ALD;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.AppID = "";
    AppConfig.ResServer = "https://oss.renyouwangluo.cn/"; //资源服务器地址
    AppConfig.LocalTestReServer = "subRes"; //本地测试资源服务器地址
    AppConfig.Versions = "0.0.0";
    return AppConfig;
}());
exports.default = AppConfig;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var AppSwitchData = /** @class */ (function () {
    function AppSwitchData() {
        this.banner = 0;
        this.wudian = 0;
        this.wudianTime_01 = 2000;
        this.wudianTime_01PreLoad = 500;
        this.shipintubiao = 1;
        this.wudianAvailableTime = {
            "0": 0, "1": 0, "2": 0, "3": 0,
            "4": 0, "5": 0, "6": 0, "7": 0,
            "8": 0, "9": 0, "10": 0, "11": 0,
            "12": 0, "13": 0, "14": 0, "15": 0,
            "16": 0, "17": 0, "18": 0, "19": 0,
            "20": 0, "21": 0, "22": 0, "23": 0
        };
        this.mailiang = 1;
        this.mailianglist = new Array();
    }
    Object.defineProperty(AppSwitchData.prototype, "wudianTimeAvaliable", {
        /**
         * 得到当前时间开关是否打开
         *
         * @readonly
         * @type {boolean}
         * @memberof AppSwitchData
         */
        get: function () {
            return this.wudianAvailableTime[new Date().getHours()] == 1;
        },
        enumerable: true,
        configurable: true
    });
    return AppSwitchData;
}());
exports.AppSwitchData = AppSwitchData;
var AppSwitchConfig = /** @class */ (function () {
    function AppSwitchConfig() {
        this._data = new Array();
    }
    AppSwitchConfig.getInstance = function () {
        if (null == AppSwitchConfig._instance) {
            AppSwitchConfig._instance = AppSwitchConfig.load();
        }
        return AppSwitchConfig._instance;
    };
    AppSwitchConfig.load = function () {
        var config = new AppSwitchConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResServer + "/json/appswitch.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new AppSwitchData();
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                rowData.wudianTime_01 = Number(row["wudianTime_01"]); //????这个字段是啥
                rowData.wudianTime_01PreLoad = Number(row["wudianTime_01PreLoad"]); //????这个字段是啥
                rowData.shipintubiao = Number(row["shipintubiao"]); //????这个字段是啥
                rowData.wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mailiang = Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if (null != mailianglist) {
                    for (var j = 0; j < mailianglist.length; ++j) {
                        var flag = Number(mailianglist[j]);
                        rowData.mailianglist.push(flag);
                    }
                }
                config._data.push(rowData);
            }
            return config;
        }
        else {
            config._data.push(new AppSwitchData());
            return config;
        }
    };
    AppSwitchConfig.prototype.getAppSwitchData = function () {
        return this._data[0];
    };
    return AppSwitchConfig;
}());
exports.default = AppSwitchConfig;
},{"../AppConfig":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef;
(function (EventDef) {
    EventDef[EventDef["None"] = 0] = "None";
    EventDef[EventDef["App_CloseFirstLoadingView"] = 500] = "App_CloseFirstLoadingView";
    EventDef[EventDef["AD_OnShareAdFail"] = 501] = "AD_OnShareAdFail";
    //当界面打开
    EventDef[EventDef["Game_OnViewOpen"] = 600] = "Game_OnViewOpen";
    //当界面关闭
    EventDef[EventDef["Game_OnViewClose"] = 601] = "Game_OnViewClose";
    //当玩家金币变动
    EventDef[EventDef["Game_OnUserMoneyChange"] = 701] = "Game_OnUserMoneyChange";
    //当玩家钻石变动
    EventDef[EventDef["Game_OnUserCrystalChange"] = 702] = "Game_OnUserCrystalChange";
    //当关卡开始
    EventDef[EventDef["Game_OnLevelStart"] = 1000] = "Game_OnLevelStart";
    //当关卡结束
    EventDef[EventDef["Game_OnLevelComplate"] = 1001] = "Game_OnLevelComplate";
    //误点预加载完毕
    EventDef[EventDef["AD_WudianBanner_LoadComplete"] = 2217] = "AD_WudianBanner_LoadComplete";
    //显示误点Banner
    EventDef[EventDef["AD_WudianBanner_Show"] = 2218] = "AD_WudianBanner_Show";
    //影藏误点Banner
    EventDef[EventDef["AD_WudianBanner_Hide"] = 2219] = "AD_WudianBanner_Hide";
    //预加载Banner
    EventDef[EventDef["AD_WudianBanner_PreLoad"] = 2220] = "AD_WudianBanner_PreLoad";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
})(EventDef = exports.EventDef || (exports.EventDef = {}));
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = laya.events.EventDispatcher;
var EventMgr = /** @class */ (function (_super) {
    __extends(EventMgr, _super);
    function EventMgr() {
        return _super.call(this) || this;
    }
    ;
    //广播事件
    EventMgr.prototype.dispatch = function (InName, agv) {
        EventMgr.eventDispatcher.event(InName, agv);
    };
    //注册事件
    EventMgr.prototype.regEvemt = function (InName, caller, listener, arg) {
        EventMgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    EventMgr.prototype.regOnceEvent = function (InName, caller, listener, arg) {
        EventMgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    EventMgr.prototype.removeEvent = function (InName, caller, listener, arg) {
        EventMgr.eventDispatcher.off(InName, caller, listener);
    };
    EventMgr.eventDispatcher = new EventDispatcher();
    EventMgr.instance = new EventMgr();
    return EventMgr;
}(EventDispatcher));
exports.default = EventMgr;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameMgr_1 = require("./Mgr/GameMgr");
var TwinkleSprite_1 = require("./View/TwinkleSprite");
var WuDianBannerAdView_1 = require("./ShareAd/View/WuDianBannerAdView");
var ClickGetPrize_1 = require("./View/ClickGetPrize/ClickGetPrize");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var TipsView_1 = require("./View/TipsView/TipsView");
var LoopAdBox_1 = require("./ShareAd/View/LoopAdBox");
var HorizontalLoopAdView_1 = require("./ShareAd/View/HorizontalLoopAdView");
var BannerAdView_1 = require("./ShareAd/View/BannerAdView");
var UniversalBottomZone_1 = require("./View/Common/UniversalBottomZone");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("Mgr/GameMgr.ts", GameMgr_1.default);
        reg("View/TwinkleSprite.ts", TwinkleSprite_1.default);
        reg("ShareAd/View/WuDianBannerAdView.ts", WuDianBannerAdView_1.default);
        reg("View/ClickGetPrize/ClickGetPrize.ts", ClickGetPrize_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("View/TipsView/TipsView.ts", TipsView_1.default);
        reg("ShareAd/View/LoopAdBox.ts", LoopAdBox_1.default);
        reg("ShareAd/View/HorizontalLoopAdView.ts", HorizontalLoopAdView_1.default);
        reg("ShareAd/View/BannerAdView.ts", BannerAdView_1.default);
        reg("View/Common/UniversalBottomZone.ts", UniversalBottomZone_1.default);
    };
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "GameMain.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./Mgr/GameMgr":9,"./ShareAd/View/BannerAdView":18,"./ShareAd/View/HorizontalLoopAdView":19,"./ShareAd/View/LoopAdBox":20,"./ShareAd/View/WuDianBannerAdView":21,"./View/ClickGetPrize/ClickGetPrize":24,"./View/Common/UniversalBottomZone":25,"./View/LoadingView/LoadingView":26,"./View/TipsView/TipsView":27,"./View/TwinkleSprite":28}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppConfig_1 = require("../AppConfig");
var WXAPI_1 = require("../WXAPI");
var User_1 = require("../User/User");
/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 *
 * @export
 * @class MaiLiang
 */
var MaiLiang = /** @class */ (function () {
    function MaiLiang() {
    }
    /**
     * 发送数据的类
     *
     * @protected
     * @static
     * @param {requestData} req
     * @memberof MaiLiang
     */
    MaiLiang.request = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = MaiLiang.mainUrl + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "MaiLiang http Success");
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    MaiLiang.MaiLiangOpenId = res.Result["OpenId"];
                    MaiLiang.time = req.data.posttime;
                    console.log("获得买量系统OpenId " + MaiLiang.MaiLiangOpenId);
                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.onSuccess) {
                    req.onSuccess(res);
                }
            }
            else {
                if (req.onFail) {
                    req.onFail(res);
                }
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "MaiLiang http fail");
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);
        if (req.meth == "get") {
            var para = "";
            for (var _i = 0, _a = Object.keys(req.data); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            xhr.send(req.url, null, req.meth);
        }
        else {
            var para = "";
            for (var _b = 0, _c = Object.keys(req.data); _b < _c.length; _b++) {
                var key = _c[_b];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url, para, req.meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }
    };
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     *
     * @param {Function} res
     * @memberof MaiLiang
     */
    MaiLiang.GetMaiLiangOpenId = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            var option = WXAPI_1.default.getLaunchOptionsSync();
            if (option != null) {
                var key = option.query["key"];
                if (key != null && key != "" && User_1.default.openId != "") {
                    MaiLiang.key = key;
                    var req = new HttpUnit_1.requestData();
                    req.url = MaiLiang.uclick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppConfig_1.default.AppID;
                    req.data.openid = "";
                    var time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = User_1.default.openId;
                    req.meth = "POST";
                    console.log("发送买量数据接口");
                    MaiLiang.request(req);
                }
            }
            else {
                console.log("上报买量数据失败");
                onFail(null);
            }
        }
        else {
            console.log("不在微信模式下调用，默认上报买量数据失败");
            onFail(null);
        }
    };
    /**
     * 上报买量接口停留时间
     *
        appid －主体小程序appid
        openid －买量系统唯一标识（不可空）
        posttime － 请求时间刻度（精确到秒）
        time － 停留时长（精确到秒）
     * @static
     * @memberof MaiLiang
     */
    MaiLiang.ReportStayTime = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            if (MaiLiang.MaiLiangOpenId != "") {
                var req = new HttpUnit_1.requestData();
                req.url = MaiLiang.stay;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppConfig_1.default.AppID;
                req.data.openid = MaiLiang.MaiLiangOpenId;
                var time = new Date().getTime() / 1000;
                req.data.posttime = time;
                var staytime = MaiLiang.time != 0 ? time - MaiLiang.time : 0;
                req.data.time = staytime;
                req.meth = "POST";
                console.log("发送停留时间至买量接口");
                MaiLiang.request(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
            onFail(null);
        }
    };
    MaiLiang.mainUrl = "https://swtj.mrkzx.cn";
    MaiLiang.uclick = "/v1.1/api/Activity/uclick.html";
    MaiLiang.stay = "/v1.1/api/Activity/stay.html";
    MaiLiang.key = ""; //推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    MaiLiang.MaiLiangOpenId = ""; //买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    MaiLiang.time = 0; //买量系统唯一标识后，记录当前时间（精确到秒）。
    return MaiLiang;
}());
exports.default = MaiLiang;
},{"../AppConfig":2,"../Net/HttpUnit":12,"../User/User":22,"../WXAPI":30}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var User_1 = require("./User/User");
var layaMaxUI_1 = require("./ui/layaMaxUI");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var HttpUnit_1 = require("./Net/HttpUnit");
var WXAPI_1 = require("./WXAPI");
var AppConfig_1 = require("./AppConfig");
var EventMgr_1 = require("./Event/EventMgr");
var EventDef_1 = require("./Event/EventDef");
var OPPOAPI_1 = require("./OPPOAPI");
var QQMiniGameAPI_1 = require("./QQMiniGameAPI");
var Main = /** @class */ (function () {
    function Main() {
        this._loadingUI = null;
        this._loadingView = null;
        //预加载列表
        this._preLoadRes = new Array();
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        if (!Laya.Browser.onMiniGame && !Laya.Browser.onQGMiniGame && !Laya.Browser.onQQMiniGame) //如果不是小游戏，资源服务器设置为本地测试地址
         {
            AppConfig_1.default.ResServer = AppConfig_1.default.LocalTestReServer;
        }
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        Laya.loader.maxLoader = 50;
        this.initLoadingView();
        //加载重要配置，这些配置必须在游戏启动前加载完成
        var firstConfigs = [
            { url: AppConfig_1.default.ResServer + "/json/appswitch.json", type: Laya.Loader.JSON }
        ];
        var self = this;
        Laya.loader.load(firstConfigs, Laya.Handler.create(this, function () {
            self.loadRes(); //加载资源
        }));
        EventMgr_1.default.instance.regOnceEvent(EventDef_1.EventDef.App_CloseFirstLoadingView, this, this.closeloadingUI);
    };
    Main.prototype.initLoadingView = function () {
        this._loadingUI = new layaMaxUI_1.ui.View.LoadingUI();
        Laya.stage.addChild(this._loadingUI);
        this._loadingUI.width = Laya.stage.width;
        this._loadingUI.height = Laya.stage.height;
        this._loadingView = this._loadingUI.getComponent(LoadingView_1.default);
        this._loadingView.setProcess(0);
    };
    Main.prototype.postResToOpenDataContext = function (onComplate) {
        if (Laya.Browser.onMiniGame) {
            console.log("开始透传资源数据到开放域");
            Laya.loader.load([
                "openRes/Rank.atlas",
            ], Laya.Handler.create(null, function () {
                Laya.MiniAdpter.sendAtlasToOpenDataContext("openRes/Rank.atlas");
                console.log("透传资源数据到开放域  完毕！！！");
                if (onComplate) {
                    onComplate();
                }
            }));
        }
        else {
            if (onComplate) {
                onComplate();
            }
        }
    };
    Main.prototype.preLoad = function () {
        //这里添加你需要预加载的资源
        //this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });
    };
    Main.prototype.loadRes = function () {
        var _this = this;
        this.preLoad();
        var resource = this._preLoadRes;
        var self = this;
        if (Laya.Browser.onMiniGame) {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["wx"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                self._loadingView.setProcess(res / 2);
            });
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["qg"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                // 加载进度百分比
                var progress = res["progress"];
                // 下载数据
                var totalBytesWritten = res["totalBytesWritten"];
                // 总长度
                var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
                self._loadingView.setProcess(progress / 2);
            });
        }
        else if (Laya.Browser.onQGMiniGame) {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["qq"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                self._loadingView.setProcess(res / 2);
            });
        }
        else {
            if (resource.length > 0) {
                Laya.loader.load(resource, Laya.Handler.create(this, function () {
                    self.onLoadResComplate();
                }), Laya.Handler.create(this, function (res) {
                    self._loadingView.setProcess(res);
                }));
            }
            else {
                self.onLoadResComplate();
            }
        }
    };
    Main.prototype.onLoadResComplate = function () {
        var self = this;
        this._loadingView.setProcess(1);
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default.wxLogin(function (code) {
                var _this = this;
                User_1.default.code = code;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            OPPOAPI_1.default.initAdService(function () {
            }, function () {
            }, function () {
            });
            OPPOAPI_1.default.Login(function (token) {
                var _this = this;
                User_1.default.code = token;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                                console.log("获取用户数据--------------------Start");
                                for (var key in res.data) {
                                    console.log(key, res.data[key]);
                                }
                                console.log("获取用户数据--------------------End");
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！", res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI_1.default.Login(function (code) {
                var _this = this;
                User_1.default.code = code;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else {
            User_1.default.testInitUser(); //测试
            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(this, function () {
            }));
        }
    };
    Main.prototype.closeloadingUI = function () {
        if (this._loadingUI && !this._loadingUI.destroyed) {
            this._loadingUI.destroy();
        }
    };
    return Main;
}());
//激活启动类
new Main();
},{"./AppConfig":2,"./Event/EventDef":4,"./Event/EventMgr":5,"./GameConfig":6,"./Net/HttpUnit":12,"./OPPOAPI":15,"./QQMiniGameAPI":16,"./User/User":22,"./View/LoadingView/LoadingView":26,"./WXAPI":30,"./ui/layaMaxUI":31}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../User/User");
var HttpUnit_1 = require("../Net/HttpUnit");
var MaiLiang_1 = require("../MaiLiangAPI/MaiLiang");
var WXAPI_1 = require("../WXAPI");
//游戏管理器，游戏代码的入口
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super.call(this) || this;
        GameMgr._instance = _this;
        return _this;
    }
    GameMgr.getInstance = function () { return GameMgr._instance; };
    GameMgr.prototype.onAwake = function () {
        console.log("------------------------- 现在是什么平台:" + Laya.Browser.onQQMiniGame);
        MaiLiang_1.default.GetMaiLiangOpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang_1.default.GetMaiLiangOpenId(null, null);
            });
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang_1.default.ReportStayTime(null, null);
            });
        }, function (res) {
            console.log("GameUI 买量数据上报失败");
        });
        WXAPI_1.default.SetShareMenu("", "", function () {
        }, function () {
        }, function () {
        });
    };
    GameMgr.prototype.onStart = function () {
        this.preCreateGame();
    };
    GameMgr.prototype.preCreateGame = function () {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
    };
    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    GameMgr.prototype.saveGameData = function () {
        HttpUnit_1.default.saveGameData(User_1.default.getSaveData(), function (res) {
            if (res.code == 1) {
                console.log("存档成功");
            }
            else {
                console.log("存档失败");
            }
        }, function (res) {
            console.log("存档失败");
        });
    };
    GameMgr._instance = null;
    return GameMgr;
}(Laya.Script));
exports.default = GameMgr;
},{"../MaiLiangAPI/MaiLiang":7,"../Net/HttpUnit":12,"../User/User":22,"../WXAPI":30}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewDef;
(function (ViewDef) {
    ViewDef["None"] = "";
    ViewDef["TipsView"] = "View/TipsView.json";
    ViewDef["ClickGetPrize"] = "View/ClickGetPrize.json";
    //todo:添加你的界面
})(ViewDef = exports.ViewDef || (exports.ViewDef = {}));
//界面管理器
var ViewMgr = /** @class */ (function () {
    function ViewMgr() {
        this._views = {};
    }
    ViewMgr.prototype.openView = function (viewType, data, oncomplate) {
        if (this._views[viewType]) {
            var view = this._views[viewType];
            var coms = view._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
            return;
        }
        var viewUrl = String(viewType);
        var self = this;
        Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner) {
            Laya.stage.addChild(owner);
            var view = owner;
            self._views[viewType] = view;
            var coms = owner._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        element._viewDef = viewType;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
        }));
    };
    ViewMgr.prototype.closeView = function (viewType) {
        var view = this._views[viewType];
        if (view) {
            var owner = view;
            var coms = owner._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this._views[viewType] = null;
        }
    };
    ViewMgr.prototype.ShowView = function (viewType) {
        var view = this._views[viewType];
        if (view) {
            var coms = view._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.show();
                        break;
                    }
                }
            }
        }
    };
    ViewMgr.prototype.hideView = function (viewType) {
        var view = this._views[viewType];
        if (view) {
            var coms = view._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.hide();
                        break;
                    }
                }
            }
        }
    };
    ViewMgr.prototype.getView = function (viewType) {
        return this._views[viewType];
    };
    ViewMgr.prototype.showTips = function (msg) {
        this.openView(ViewDef.TipsView, msg);
    };
    ViewMgr.instance = new ViewMgr();
    return ViewMgr;
}());
exports.default = ViewMgr;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("./aes.js");
var AesTools = /** @class */ (function () {
    function AesTools() {
    }
    //加密
    AesTools.encrypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools.IV); //向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    //解密
    AesTools.decrypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools.IV); //向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    AesTools.KEY = 'b#63fFJ6AvkK3YT*';
    AesTools.IV = 'J$f4DU%sNL73M&Go';
    return AesTools;
}());
exports.default = AesTools;
},{"./aes.js":14}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
var requestData = /** @class */ (function () {
    function requestData() {
        this.meth = "post";
        this.url = "";
        this.onSuccess = null;
        this.onFail = null;
        this.data = {};
    }
    return requestData;
}());
exports.requestData = requestData;
var HttpUnit = /** @class */ (function () {
    function HttpUnit() {
    }
    HttpUnit.request = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = NetConfig_1.default.serverUrl + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "http Success");
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "http fail");
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);
        var dataStr = JSON.stringify(req.data);
        if (Laya.Browser.onMiniGame) {
            req.data.code = User_1.default.code;
        }
        else if (Laya.Browser.onQGMiniGame) {
            req.data.oppotoken = User_1.default.code;
        }
        else if (Laya.Browser.onQQMiniGame) {
            req.data.qqtoken = User_1.default.code;
        }
        var time = "time=" + String(Date.now());
        var header = [
            "Content-Type", "application/json",
            "state", NetConfig_1.default.state,
            "gameid", NetConfig_1.default.gameid,
            "sign", AesTools_1.default.encrypt(time),
        ];
        if (User_1.default.token) {
            header.push("token");
            header.push(User_1.default.token);
        }
        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json", header);
    };
    //todo:这里添加你们和服务器相互的接口
    HttpUnit.login = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    HttpUnit.saveGameData = function (gameData, onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    HttpUnit.getGameData = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    HttpUnit.GetIpBlock = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.IpBlock;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    return HttpUnit;
}());
exports.default = HttpUnit;
},{"../User/User":22,"./AesTools":11,"./NetConfig":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig = /** @class */ (function () {
    function NetConfig() {
    }
    NetConfig.state = 0;
    NetConfig.gameid = -1;
    NetConfig.serverUrl = "https://sysxue.5iape.com";
    NetConfig.Login = "";
    NetConfig.SaveGameData = "";
    NetConfig.GetUser = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    NetConfig.IpBlock = "https://sysxue.5iape.com/api/share/ip_select";
    return NetConfig;
}());
exports.default = NetConfig;
},{}],14:[function(require,module,exports){
var CryptoJS = CryptoJS || function (u, p) {
  var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
  r = l.WordArray = t.extend({
    init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length }, toString: function (a) { return (a || v).stringify(this) }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4) for (var k = 0; k < a; k++)c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4)c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e); this.sigBytes += a; return this }, clamp: function () {
      var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
        32 - 8 * (c % 4); a.length = u.ceil(c / 4)
    }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], e = 0; e < a; e += 4)c.push(4294967296 * u.random() | 0); return new r.init(c, a) }
  }), w = d.enc = {}, v = w.Hex = {
    stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) { var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255; e.push((k >>> 4).toString(16)); e.push((k & 15).toString(16)) } return e.join("") }, parse: function (a) {
      for (var c = a.length, e = [], j = 0; j < c; j += 2)e[j >>> 3] |= parseInt(a.substr(j,
        2), 16) << 24 - 4 * (j % 8); return new r.init(e, c / 2)
    }
  }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++)e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join("") }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++)e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c) } }, x = w.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(b.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))) } },
  q = l.BufferedBlockAlgorithm = t.extend({
    reset: function () { this._data = new r.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) { for (var q = 0; q < a; q += k)this._doProcessBlock(e, q); q = e.splice(0, a); c.sigBytes -= j } return new r.init(q, j) }, clone: function () {
      var a = t.clone.call(this);
      a._data = this._data.clone(); return a
    }, _minBufferSize: 0
  }); l.Hasher = q.extend({
    cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b) } }, _createHmacHelper: function (a) {
      return function (b, e) {
        return (new n.HMAC.init(a,
          e)).finalize(b)
      }
    }
  }); var n = d.algo = {}; return d
}(Math);
(function () {
  var u = CryptoJS, p = u.lib.WordArray; u.enc.Base64 = {
    stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3)for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++)d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64)) for (; d.length % 4;)d.push(l); return d.join("") }, parse: function (d) {
      var l = d.length, s = this._map, t = s.charAt(64); t && (t = d.indexOf(t), -1 != t && (l = t)); for (var t = [], r = 0, w = 0; w <
        l; w++)if (w % 4) { var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4); t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4); r++ } return p.create(t, r)
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  }
})();
(function (u) {
  function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n } function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n } function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n } function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n } for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++)b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0; r = r.MD5 = v.extend({
    _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]) },
    _doProcessBlock: function (q, n) {
      for (var a = 0; 16 > a; a++) { var c = n + a, e = q[c]; q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360 } var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]),
        f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f,
          m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m,
            E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]); a[0] = a[0] + f | 0; a[1] = a[1] + m | 0; a[2] = a[2] + g | 0; a[3] = a[3] + h | 0
    }, _doFinalize: function () {
      var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes; n[c >>> 5] |= 128 << 24 - c % 32; var e = u.floor(a /
        4294967296); n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360; n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360; b.sigBytes = 4 * (n.length + 1); this._process(); b = this._hash; n = b.words; for (a = 0; 4 > a; a++)c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360; return b
    }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b }
  }); t.MD5 = v._createHelper(r); t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
  var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) { n && s.update(n); var n = s.update(d).finalize(r); s.reset(); for (var a = 1; a < p; a++)n = s.finalize(n), s.reset(); b.concat(n) } b.sigBytes = 4 * q; return b } }); u.EvpKDF = function (d, l, p) {
    return s.create(p).compute(d,
      l)
  }
})();
CryptoJS.lib.Cipher || function (u) {
  var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
    cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a) }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a) }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset() }, reset: function () { t.reset.call(this); this._doReset() }, process: function (e) { this._append(e); return this._process() },
    finalize: function (e) { e && this._append(e); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d) }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d) } } }
  }); d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var b = p.mode = {}, x = function (e, a, b) {
    var c = this._iv; c ? this._iv = u : c = this._prevBlock; for (var d = 0; d < b; d++)e[a + d] ^=
      c[d]
  }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a) }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a) }, init: function (e, a) { this._cipher = e; this._iv = a } })).extend(); q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c) } }); q.Decryptor = q.extend({
    processBlock: function (e, a) {
      var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c); b.decryptBlock(e, a); x.call(this,
        e, a, c); this._prevBlock = d
    }
  }); b = b.CBC = q; q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4)l.push(d); c = s.create(l, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; d.BlockCipher = v.extend({
    cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
      v.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1; this._mode = c.call(a,
        this, b && b.words)
    }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
  }); var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), b = (p.format = {}).OpenSSL = {
    stringify: function (a) {
      var b = a.ciphertext; a = a.salt; return (a ? s.create([1398893684,
        1701076831]).concat(a).concat(b) : b).toString(r)
    }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = s.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return n.create({ ciphertext: a, salt: c }) }
  }, a = d.SerializableCipher = l.extend({
    cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }) },
    decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
  }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }) } }, c = d.PasswordBasedCipher = a.extend({
    cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
      l = this.cfg.extend(l); d = l.kdf.execute(d,
        b.keySize, b.ivSize); l.iv = d.iv; b = a.encrypt.call(this, b, c, d.key, l); b.mixIn(d); return b
    }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l) }
  })
}();
(function () {
  for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++)a[c] = 128 > c ? c << 1 : c << 1 ^ 283; for (var e = 0, j = 0, c = 0; 256 > c; c++) { var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99; l[e] = k; s[k] = e; var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k; t[e] = y << 24 | y >>> 8; r[e] = y << 16 | y >>> 16; w[e] = y << 8 | y >>> 24; v[e] = y; y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e; b[k] = y << 24 | y >>> 8; x[k] = y << 16 | y >>> 16; q[k] = y << 8 | y >>> 24; n[k] = y; e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1 } var H = [0, 1, 2, 4, 8,
    16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
      _doReset: function () {
        for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)if (j < d) e[j] = c[j]; else { var k = e[j - 1]; j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24); e[j] = e[j - d] ^ k } c = this._invKeySchedule = []; for (d = 0; d < a; d++)j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
          8 & 255]] ^ n[l[k & 255]]
      }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l) }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
        for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++)var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
          d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t; q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++]; s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++]; t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++]; n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++]; a[b] = q; a[b + 1] = s; a[b + 2] = t; a[b + 3] = n
      }, keySize: 8
    }); u.AES = p._createHelper(d)
})();

module.exports = CryptoJS;
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var OPPOAPI = /** @class */ (function () {
    function OPPOAPI() {
    }
    Object.defineProperty(OPPOAPI, "BannerInstance", {
        get: function () {
            return this._banner;
        },
        enumerable: true,
        configurable: true
    });
    OPPOAPI.Login = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].login({
                success: function (res) {
                    var token = res.data.token;
                    onSuccess(token);
                    console.log("OPPO 登陆成功,获取到 token : " + token);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                },
                fail: function (res) {
                    console.log("OPPO 登陆失败", res);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                }
            });
        }
    };
    OPPOAPI.initAdService = function (onSuccess, onFail, onComplete) {
        Laya.Browser.window["qg"].initAdService({
            appId: AppConfig_1.default.AppID,
            isDebug: false,
            success: function (res) {
                console.log("oppo initAdService success");
                if (onSuccess) {
                    onSuccess(res);
                }
            },
            fail: function (res) {
                console.log("oppo initAdService fail: ", res.code, res.msg);
                if (onFail) {
                    onFail(res);
                }
            },
            complete: function (res) {
                console.log("oppo initAdService complete");
                if (onComplete) {
                    onComplete(res);
                }
            }
        });
    };
    OPPOAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPOAPI.adUnitId,
            });
            videoAd.onLoad(function () {
                console.log("oppo 视频广告加载完成");
                videoAd.show();
            });
            videoAd.onVideoStart(function () {
                console.log("oppo 视频广告开始播放");
            });
            videoAd.onClose(function (res) {
                if (res.isEnded) {
                    console.log("oppo 视频广告观看 完成");
                    onAdClose(true);
                }
                else {
                    console.log("oppo 视频广告观看 未完成");
                    onAdClose(false);
                }
                videoAd.destroy();
            });
            videoAd.onError(function (err) {
                console.log("oppo 视频广告获取失败", err);
                videoAd.destroy();
                onFailed();
            });
            videoAd.load();
        }
        else {
            onAdClose(true);
        }
    };
    OPPOAPI.navigateToMiniProgram = function (pkgName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: AppConfig_1.default.AppID
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    OPPOAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var insertAd = qg.createInsertAd({
                posId: OPPOAPI.InsAdUnitId
            });
            insertAd.load();
            insertAd.onLoad(function () {
                console.log("插屏广告加载完成");
                insertAd.show();
            });
            insertAd.onShow(function () {
                console.log("插屏广告显示成功");
            });
            insertAd.onError(function (err) {
                console.log("插屏广告拉取失败", err);
                insertAd.destroy();
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose();
        }
    };
    OPPOAPI.showBannaer = function () {
        if (OPPOAPI._banner) {
            OPPOAPI._banner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPOAPI.bannerAdUnitId
        });
        bannerAd.show();
        OPPOAPI._banner = bannerAd;
    };
    OPPOAPI.hideBanner = function () {
        if (OPPOAPI._banner) {
            OPPOAPI._banner.hide();
        }
    };
    OPPOAPI.getLaunchOptionsSync = function () {
        return {};
    };
    OPPOAPI.share = function (complate, titel, imageUrl) {
        complate(false);
    };
    OPPOAPI.createDesktopIcon = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut({
                            success: function () {
                                if (onSuccess) {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail) {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！", err);
                                for (var key in err) {
                                    console.log(key, err);
                                }
                            },
                            complete: function () {
                            }
                        });
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onFail) {
                            onFail();
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    OPPOAPI.adUnitId = "134292";
    OPPOAPI.bannerAdUnitId = "134291";
    OPPOAPI.InsAdUnitId = "134294";
    OPPOAPI.OpenScreenAdUnitId = "134293";
    OPPOAPI._banner = null;
    return OPPOAPI;
}());
exports.default = OPPOAPI;
},{"./AppConfig":2}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QQMiniGameAPI = /** @class */ (function () {
    function QQMiniGameAPI() {
    }
    QQMiniGameAPI.Login = function (onSuccess, onFail) {
        if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].login({
                success: function (res) {
                    if (res.code) {
                        var code = res.code;
                        onSuccess(code);
                        console.log("登陆成功,获取到code : " + code);
                    }
                }
            });
        }
    };
    QQMiniGameAPI.onRewardedVideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    QQMiniGameAPI.onRewardedVideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (QQMiniGameAPI._onRewardedVideoAdFailed) {
            QQMiniGameAPI._onRewardedVideoAdFailed();
        }
    };
    QQMiniGameAPI.onRewardedVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (QQMiniGameAPI._onRewardedVideoAdClose) {
                QQMiniGameAPI._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (QQMiniGameAPI._onRewardedVideoAdClose) {
                QQMiniGameAPI._onRewardedVideoAdClose(false);
            }
        }
    };
    QQMiniGameAPI.regRewardedVideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(QQMiniGameAPI.onRewardedVideoAdLoad);
        rewardedVideoAd.onError(QQMiniGameAPI.onRewardedVideoAdError);
        rewardedVideoAd.onClose(QQMiniGameAPI.onRewardedVideoAdClose);
        QQMiniGameAPI._isRegRewardedVideoAdEvent = true;
    };
    QQMiniGameAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI._onRewardedVideoAdClose = onAdClose;
            QQMiniGameAPI._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                adUnitId: QQMiniGameAPI.adUnitId,
            });
            if (!QQMiniGameAPI._isRegRewardedVideoAdEvent) {
                QQMiniGameAPI.regRewardedVideoAdEvent(rewardedVideoAd);
            }
            rewardedVideoAd.load().then(function () {
                var promise = rewardedVideoAd.show();
                promise.then(function () { return console.log('激励视频 广告显示成功'); });
                promise.catch(function (err) {
                    rewardedVideoAd.load()
                        .then(function () { return rewardedVideoAd.show(); })
                        .catch(function (err) {
                        console.log('激励视频 广告显示失败');
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
            }).catch(function (err) {
                console.log('激励视频 广告加载失败');
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    //----------------------------------------------------------------
    //-------------------------小游戏跳转---------------------------
    QQMiniGameAPI.navigateToMiniProgram = function (appId, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["qq"].navigateToMiniProgram({
                appId: appId,
                path: path,
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    QQMiniGameAPI.share = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI._onShow = function () {
                Laya.Browser.window["qq"].offShow(QQMiniGameAPI._onShow);
                QQMiniGameAPI._onShow = null;
                var c = Date.now() - _this._lastShareTime;
                if (complate) {
                    if (Date.now() - _this._lastShareTime > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["qq"].onShow(QQMiniGameAPI._onShow);
            this._lastShareTime = Date.now();
            Laya.Browser.window["qq"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    QQMiniGameAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMiniGameAPI.InsAdUnitId,
            });
            interstitialAd.onLoad(function () {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch(function (err) {
                    console.log('插屏广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            });
            interstitialAd.onError(function (err) {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            });
            interstitialAd.onClose(function () {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            });
        }
        else {
            onAdClose();
        }
    };
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof QQMiniGameAPI
     */
    QQMiniGameAPI.getLaunchOptionsSync = function () {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            var obj_1 = Laya.Browser.window["qq"].getLaunchOptionsSync();
            console.log("场景值 " + obj_1.scene);
            var str = JSON.stringify(obj_1.query);
            console.log("Query参数 " + str);
            var key = obj_1.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj_1.shareTicket);
            console.log("ReferrerInfo.appId " + obj_1.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj_1.referrerInfo.extraData);
            return obj_1;
        }
        var obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
        return obj;
    };
    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     *
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof QQMiniGameAPI
     */
    QQMiniGameAPI.SetShareMenu = function (titel, imageUrl, success, fail, complate) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["qq"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["qq"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                };
            });
        }
    };
    QQMiniGameAPI.adUnitId = "adunit-eef36f84c44bbdc1";
    QQMiniGameAPI.bannerAdUnitId = "adunit-440e21cc02c0d282";
    QQMiniGameAPI.InsAdUnitId = "adunit-440e21cc02c0d282";
    //-------------------------激励视频---------------------------------
    QQMiniGameAPI._isRegRewardedVideoAdEvent = false;
    QQMiniGameAPI._onRewardedVideoAdFailed = null;
    QQMiniGameAPI._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    QQMiniGameAPI._onShow = null;
    QQMiniGameAPI._lastShareTime = 0;
    return QQMiniGameAPI;
}());
exports.default = QQMiniGameAPI;
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppConfig_1 = require("../AppConfig");
var User_1 = require("../User/User");
var Utilit_1 = require("../Utilit");
var ALD_1 = require("../ALD");
var WXAPI_1 = require("../WXAPI");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var ShareAd = /** @class */ (function () {
    function ShareAd() {
    }
    ShareAd.refreshAd = function (complate) {
        ShareAd.getAdPosData(function (res) {
            if (1 == res.code) {
                console.log("获取分享广告数据成功");
                ShareAd._adPosition = res.result;
                if (complate) {
                    complate(true);
                }
            }
            else {
                console.log("获取分享广告数据失败 ： " + res.msg);
                if (complate) {
                    complate(false);
                }
            }
        }, function (res) {
            console.log("获取分享广告数据失败");
            if (complate) {
                complate(false);
            }
        });
    };
    ShareAd.getADVs = function (locationid, complate, useRandom, useLocalRandom) {
        if (!ShareAd.isNeedShowAd()) {
            complate(null);
            return;
        }
        useRandom = null == useRandom ? this.UseRandomAdPos : useRandom;
        useLocalRandom = null == useLocalRandom ? true : useRandom;
        if (useRandom) {
            locationid = this.getRandomADPosID();
        }
        var datas = ShareAd._adv[locationid];
        if (datas) {
            for (var i = datas.length - 1; i >= 0; --i) {
                var randomIndex = Math.floor(Math.random() * datas.length);
                var curValue = datas[i];
                var randomValue = datas[randomIndex];
                datas[randomIndex] = curValue;
                datas[i] = randomValue;
            }
            complate(datas);
        }
        else {
            ShareAd.getADVData(locationid, function (res) {
                if (1 == res.code) {
                    ShareAd._adv[locationid] = res.result;
                    datas = ShareAd._adv[locationid];
                    if (datas && Utilit_1.default.isIphone()) {
                        for (var i = 0; i < datas.length; ++i) {
                            var data = datas[i];
                            for (var j = 0; j < ShareAd._iphoneIgnoreAppIds.length; ++j) {
                                if (data.appid == ShareAd._iphoneIgnoreAppIds[j]) {
                                    datas.splice(i, 1);
                                    --i;
                                    break;
                                }
                            }
                        }
                    }
                    if (datas && useLocalRandom) {
                        for (var i = datas.length - 1; i >= 0; --i) {
                            var randomIndex = Math.floor(Math.random() * datas.length);
                            var curValue = datas[i];
                            var randomValue = datas[randomIndex];
                            datas[randomIndex] = curValue;
                            datas[i] = randomValue;
                        }
                    }
                    if (complate) {
                        complate(datas);
                    }
                }
                else {
                    if (complate) {
                        complate(null);
                    }
                }
            }, function (res) {
                if (complate) {
                    complate(null);
                }
            });
        }
    };
    ShareAd.reportUserClick = function (advid) {
        ShareAd.reqUserClick(advid, function (res) {
            if (1 == res.code) {
                console.log("点击广告上报成功");
            }
            else {
                console.log("点击广告上报失败");
            }
        }, function (res) {
            console.log("点击广告上报失败");
        });
    };
    ShareAd.getRandomADPosID = function () {
        return this.AdLocationids[Math.floor(Math.random() * this.AdLocationids.length)];
    };
    ShareAd.request = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = ShareAd.mainUrl + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "http Success");
            res = JSON.parse(res);
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "http fail");
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);
        if (req.meth == "get") {
            var para = "";
            for (var _i = 0, _a = Object.keys(req.data); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            var header = [
                "versions", AppConfig_1.default.Versions,
            ];
            xhr.send(req.url, null, req.meth, null, header);
        }
        else {
            var para = "";
            for (var _b = 0, _c = Object.keys(req.data); _b < _c.length; _b++) {
                var key = _c[_b];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            var header = [
                "Content-Type", "application/x-www-form-urlencoded",
                "versions", AppConfig_1.default.Versions,
            ];
            xhr.send(req.url, para, req.meth, null, header);
        }
    };
    ShareAd.getAdPosData = function (onSuccess, onFail) {
        var req = new HttpUnit_1.requestData();
        req.url = ShareAd.getAdPostion;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.softid = AppConfig_1.default.AppID;
        req.meth = "get";
        ShareAd.request(req);
    };
    ShareAd.reqUserClick = function (advid, onSuccess, onFail) {
        var req = new HttpUnit_1.requestData();
        req.url = ShareAd.userClick;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.softid = AppConfig_1.default.AppID;
        req.data.uid = User_1.default.openId;
        req.data.advid = advid;
        ShareAd.request(req);
    };
    ShareAd.getADVData = function (locationid, onSuccess, onFail) {
        var req = new HttpUnit_1.requestData();
        req.url = ShareAd.getAdv;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.softid = AppConfig_1.default.AppID;
        req.data.locationid = locationid;
        req.data.preview = 0;
        ShareAd.request(req);
    };
    /**
         * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
         * 如果概率大于1，则自动将其除以100，所以千万注意！
         *
         * @static
         * @param {number} [rate=1]
         * @memberof ShareAd
         */
    ShareAd.RandomJump = function (rate) {
        if (rate === void 0) { rate = 1; }
        console.log("随机跳转,rate：" + rate);
        if (rate > 1) {
            rate = rate / 100;
        }
        var rd = Math.random();
        if (rd <= rate) {
            var adLocationID = ShareAd.LoopAdLocationID;
            var Locations = [
                ShareAd.LoopAdLocationID,
                ShareAd.InsertAdLocationID,
                ShareAd.BannerAdLocationID,
                ShareAd.AniAdLocationID,
            ];
            if (ShareAd.UseRandomAdPos) {
                for (var i = 0; i < ShareAd.AdLocationids.length; ++i) {
                    Locations.push(ShareAd.AdLocationids[i]);
                }
            }
            adLocationID = Locations[Math.floor(Math.random() * Locations.length)];
            var datas = ShareAd.getADVs(adLocationID, function (datas) {
                if (datas) {
                    var rd_1 = Math.floor(datas.length * Math.random());
                    var data_1 = datas[rd_1];
                    console.log("跳转游戏： " + data_1.title);
                    WXAPI_1.default.navigateToMiniProgram(data_1.appid, data_1.url, function (res) {
                        console.log("跳转成功");
                        ShareAd.reportUserClick(data_1.appid);
                        ALD_1.default.aldSendReportAdClickSuccess(data_1);
                    }, function (res) {
                        console.log("跳转失败");
                        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD_1.default.aldSendReportAdClickFail(data_1);
                        }
                    }, function (res) {
                        console.log("跳转完成");
                    });
                }
            }, true);
        }
    };
    ShareAd.isNeedShowAd = function () {
        var mailiang = AppSwitchConfig_1.default.getInstance().getAppSwitchData().mailiang;
        var mailianglist = AppSwitchConfig_1.default.getInstance().getAppSwitchData().mailianglist;
        if (1 == mailiang) {
            if (Laya.Browser.onMiniGame) {
                var flag = WXAPI_1.default.getLaunchOptionsSync().query['chid'];
                if (null != flag && null != mailianglist && mailianglist.length > 0) {
                    for (var i = 0; i < mailianglist.length; ++i) {
                        if (flag == mailianglist[i]) {
                            return false;
                        }
                    }
                }
            }
            else if (Laya.Browser.onQGMiniGame) {
                return false;
            }
            else if (Laya.Browser.onQQBrowser) {
                return false;
            }
        }
        return true;
    };
    ShareAd.mainUrl = "https://swwww.mrkzx.cn";
    ShareAd.getAdPostion = "/v1.1/api/getAdPosition.html"; //获取广告位列表
    ShareAd.getAdv = "/v1.1/api/getAdv.html"; //获取第三方广告列表
    ShareAd.userClick = "/v1.1/api/userclick.html"; //用户点击上报
    ShareAd.LoopAdLocationID = 0;
    ShareAd.BannerAdLocationID = 0;
    ShareAd.InsertAdLocationID = 0;
    ShareAd.AniAdLocationID = 0;
    ShareAd.UseRandomAdPos = true;
    ShareAd.AdLocationids = [];
    ShareAd._adPosition = {};
    ShareAd._adv = {};
    ShareAd._iphoneIgnoreAppIds = [
        "wx2d2acce3c45f4ddf",
        "wxeb93c1298ec7c62b"
    ];
    return ShareAd;
}());
exports.default = ShareAd;
},{"../ALD":1,"../AppConfig":2,"../Config/AppSwitchConfig":3,"../Event/EventDef":4,"../Event/EventMgr":5,"../Net/HttpUnit":12,"../User/User":22,"../Utilit":23,"../WXAPI":30}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var WXAPI_1 = require("../../WXAPI");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var BannerAdView = /** @class */ (function (_super) {
    __extends(BannerAdView, _super);
    function BannerAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.BannerAdLocationID;
        _this._data = null;
        _this._wxBanner = null;
        return _this;
    }
    BannerAdView.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        if (null == this._displaySp) {
            this._displaySp = this.owner;
        }
    };
    BannerAdView.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (0 == banner) {
            this.refreshBannerDis();
        }
        else if (1 == banner) {
            this.refreshWXBanner();
        }
    };
    BannerAdView.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        this.clearWXBaner();
    };
    BannerAdView.prototype.refreshBannerDis = function () {
        var self = this;
        ShareAd_1.default.getADVs(this.AdPosID, function (datas) {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = 750;
                        self._displaySp.height = 256;
                    }
                }));
                self._data = data;
            }
        }, false);
    };
    BannerAdView.prototype.onSpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSendReportAdClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    BannerAdView.prototype.refreshWXBanner = function () {
        if (!Laya.Browser.onMiniGame || !this.owner.visible)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        this._wxBanner = Laya.Browser.window["wx"].createBannerAd({
            adUnitId: WXAPI_1.default.bannerAdUnitId,
            adIntervals: 30,
            style: {
                left: left,
                top: top,
                width: width,
            }
        });
        self._wxBanner.onLoad(function (res) {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        });
        this._wxBanner.onError(function (err) {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            self.refreshBannerDis();
            self.clearWXBaner();
        });
        this._wxBanner.onResize(function (res) {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight);
        });
        self._wxBanner.show();
    };
    BannerAdView.prototype.clearWXBaner = function () {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    };
    return BannerAdView;
}(Laya.Script));
exports.default = BannerAdView;
},{"../../ALD":1,"../../Config/AppSwitchConfig":3,"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../OPPOAPI":15,"../../QQMiniGameAPI":16,"../../WXAPI":30,"../ShareAd":17}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var HorizontalLoopAdView = /** @class */ (function (_super) {
    __extends(HorizontalLoopAdView, _super);
    function HorizontalLoopAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.LoopAdLocationID;
        _this._scrollForward = true;
        return _this;
    }
    HorizontalLoopAdView.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.hScrollBarSkin = "";
    };
    HorizontalLoopAdView.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.getADVs(this.AdPosID, function (datas) {
            if (self.owner && !self.owner.destroyed) {
                if (datas && datas.length > 0 && datas.length < 50) {
                    var temp = [];
                    var counter = 0;
                    for (var i = 0; i < 50; ++i) {
                        if (counter >= datas.length) {
                            counter = 0;
                        }
                        temp.push(datas[counter]);
                        ++counter;
                    }
                    var groupLen = datas.length;
                    for (var i = 0; i < temp.length; ++i) {
                        var group = Math.floor(i / groupLen);
                        var startIndex = group * groupLen;
                        var randomIndex = Math.floor(Math.random() * groupLen) + startIndex;
                        var curValue = temp[i];
                        var randomValue = temp[randomIndex];
                        temp[randomIndex] = curValue;
                        temp[i] = randomValue;
                    }
                    _this._list.array = temp;
                }
                else {
                    _this._list.array = datas;
                }
            }
        });
    };
    HorizontalLoopAdView.prototype.onDisable = function () {
    };
    HorizontalLoopAdView.prototype.onUpdate = function () {
        if (this._scrollForward) {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value >= this._list.scrollBar.max) {
                this._scrollForward = false;
            }
        }
        else {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value <= 0) {
                this._scrollForward = true;
            }
        }
    };
    HorizontalLoopAdView.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.setData(data);
    };
    return HorizontalLoopAdView;
}(Laya.Script));
exports.default = HorizontalLoopAdView;
},{"../ShareAd":17,"./LoopAdBox":20}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var LoopAdBox = /** @class */ (function (_super) {
    __extends(LoopAdBox, _super);
    function LoopAdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._originW = 150;
        _this._originH = 150;
        _this._fontSize = 25;
        return _this;
    }
    LoopAdBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText");
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    };
    LoopAdBox.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
    };
    LoopAdBox.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    };
    LoopAdBox.prototype.setData = function (data) {
        if (data) {
            var self = this;
            this._displaySp.loadImage(data.logo, Laya.Handler.create(this, function () {
                if (!self._displaySp.destroyed) {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5, num);
            var fontSize = Math.floor((5 / num) * this._fontSize);
            this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
    };
    LoopAdBox.prototype.onSpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSendReportAdClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    return LoopAdBox;
}(Laya.Script));
exports.default = LoopAdBox;
},{"../../ALD":1,"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../OPPOAPI":15,"../../QQMiniGameAPI":16,"../../WXAPI":30,"../ShareAd":17}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var WXAPI_1 = require("../../WXAPI");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var WudianBannerAdView = /** @class */ (function (_super) {
    __extends(WudianBannerAdView, _super);
    function WudianBannerAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.BannerAdLocationID;
        _this._data = null;
        _this._wxBanner = null;
        return _this;
    }
    WudianBannerAdView.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        this._displaySp.visible = false;
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.AD_WudianBanner_Show, this, this.ShowBanner);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.AD_WudianBanner_Hide, this, this.HideBanner);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.AD_WudianBanner_PreLoad, this, this.PreloadBanner);
    };
    WudianBannerAdView.prototype.onEnable = function () {
        this.PreloadBanner();
    };
    WudianBannerAdView.prototype.PreloadBanner = function () {
        if (this.owner.visible == false)
            return;
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.refreshWXBanner();
        }
        else {
            this.refreshBannerDis();
        }
    };
    WudianBannerAdView.prototype.ShowBanner = function () {
        if (this.owner.visible == false)
            return;
        console.log("showBanner");
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (1 == banner && Laya.Browser.onMiniGame && this._wxBanner) {
            console.log("WxshowBanner");
            this._wxBanner.show();
        }
        else if (this._data != null) {
            this._displaySp.visible = true;
            this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        }
    };
    WudianBannerAdView.prototype.HideBanner = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        this._displaySp.visible = false;
        this.clearWXBaner();
    };
    WudianBannerAdView.prototype.onDestroy = function () {
        this.HideBanner();
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.AD_WudianBanner_Show, this, this.ShowBanner);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.AD_WudianBanner_Hide, this, this.HideBanner);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.AD_WudianBanner_PreLoad, this, this.PreloadBanner);
    };
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }
    WudianBannerAdView.prototype.refreshBannerDis = function () {
        var self = this;
        ShareAd_1.default.getADVs(this.AdPosID, function (datas) {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = 750;
                        self._displaySp.height = 256;
                        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_WudianBanner_LoadComplete);
                    }
                }));
                self._data = data;
            }
        }, false);
    };
    WudianBannerAdView.prototype.onSpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSendReportAdClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    WudianBannerAdView.prototype.refreshWXBanner = function () {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        this._wxBanner = Laya.Browser.window["wx"].createBannerAd({
            adUnitId: WXAPI_1.default.bannerAdUnitId,
            adIntervals: 30,
            style: {
                left: left,
                top: top,
                width: width,
            }
        });
        self._wxBanner.onLoad(function (res) {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_WudianBanner_LoadComplete);
        });
        this._wxBanner.onError(function (err) {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.refreshBannerDis();
            self.clearWXBaner();
        });
        this._wxBanner.onResize(function (res) {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight);
        });
        self._wxBanner.hide();
    };
    WudianBannerAdView.prototype.clearWXBaner = function () {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    };
    return WudianBannerAdView;
}(Laya.Script));
exports.default = WudianBannerAdView;
},{"../../ALD":1,"../../Config/AppSwitchConfig":3,"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../OPPOAPI":15,"../../QQMiniGameAPI":16,"../../WXAPI":30,"../ShareAd":17}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
//游戏数据,为保持版本兼容，建议不要删除和修改字段名
var UserGameData = /** @class */ (function () {
    function UserGameData() {
        this.levelNum = 1; //当前关卡
        this.moneyNum = 0; //金币数量
        this.crystalNum = 0; //钻石数量    
    }
    return UserGameData;
}());
exports.UserGameData = UserGameData;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.getSaveData = function () {
        return JSON.stringify(User._gameData);
    };
    User.testInitUser = function () {
        User._gameData.levelNum = 1;
        User._gameData.moneyNum = 10000000;
        User._gameData.crystalNum = 10000000;
    };
    User.initiUser = function (data) {
        if (data && 0 != data) {
            User._gameData.levelNum = data.levelNum;
            User._gameData.moneyNum = data.moneyNum;
            User._gameData.crystalNum = data.crystalNum;
        }
        else {
            //todo：处理没有获取到玩家数据的情况
        }
    };
    User.setLeveNum = function (levelNum) {
        User._gameData.levelNum = levelNum;
    };
    User.getLeveNum = function () {
        return User._gameData.levelNum;
    };
    User.addMoney = function (add) {
        add = Math.ceil(add);
        var last = User._gameData.moneyNum;
        User._gameData.moneyNum += add;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserMoneyChange, {
            curr: User._gameData.moneyNum,
            last: last
        });
    };
    User.subMoney = function (sub) {
        sub = Math.ceil(sub);
        var last = User._gameData.moneyNum;
        User._gameData.moneyNum -= sub;
        if (User._gameData.moneyNum < 0) {
            User._gameData.moneyNum = 0;
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserMoneyChange, {
            curr: User._gameData.moneyNum,
            last: last
        });
    };
    User.getMoney = function () {
        return User._gameData.moneyNum;
    };
    User.addCrystal = function (add) {
        add = Math.ceil(add);
        var last = User._gameData.crystalNum;
        User._gameData.crystalNum += add;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserCrystalChange, {
            curr: User._gameData.crystalNum,
            last: last
        });
    };
    User.subCrystal = function (sub) {
        sub = Math.ceil(sub);
        var last = User._gameData.crystalNum;
        User._gameData.crystalNum -= sub;
        if (User._gameData.crystalNum < 0) {
            User._gameData.crystalNum = 0;
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserCrystalChange, {
            curr: User._gameData.crystalNum,
            last: last
        });
    };
    User.getCrystal = function () {
        return User._gameData.crystalNum;
    };
    User.code = "";
    User.openId = "";
    User.token = null;
    User.nickName = "";
    User.gender = 0;
    User.isLogin = false;
    User._gameData = new UserGameData();
    return User;
}(Laya.Script));
exports.default = User;
},{"../Event/EventDef":4,"../Event/EventMgr":5}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit = /** @class */ (function () {
    function Utilit() {
    }
    Utilit.Lerp = function (form, to, delta) {
        if (form == to)
            return to;
        if (form > to) {
            var next = form - delta;
            if (next <= to)
                return to;
            return next;
        }
        else if (form < to) {
            var next = form + delta;
            if (next >= to)
                return to;
            return next;
        }
    };
    Utilit.lerpEulerAngle = function (form, to, delta) {
        var form = form % 360;
        form = form >= 0 ? form : (360 + form);
        var to = to % 360;
        to = to >= 0 ? to : (360 + to);
        var dis = Math.abs(to - form);
        if (dis > 180) {
            if (form < to)
                to = to - 360;
            else if (form > to)
                to = to + 360;
        }
        var next = Utilit.Lerp(form, to, delta);
        return next;
    };
    Utilit.getRotationByDir = function (v) {
        var dotValue = (v.x * Utilit.poinDown.x) + (v.y * Utilit.poinDown.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit.poinDown.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    };
    Utilit.getRotationByDirOn3DSpace = function (v) {
        var dotValue = (v.x * Utilit.poinUp.x) + (v.y * Utilit.poinUp.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit.poinUp.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    };
    Utilit.getDirByRotation = function (rotation) {
        var radian = (rotation - 90) * Math.PI / 180; // -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    };
    Utilit.getDirDirAngle = function (dir1, dir2) {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos);
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    };
    Utilit.getDirScalarLength = function (dir) {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    };
    Utilit.setSpOnParentCenter = function (sp) {
        if (null == sp.parent)
            return;
        var psp = sp.parent;
        var x = 0;
        var y = 0;
        var x = x - sp.width / 2 * sp.scaleX + psp.width / 2;
        var y = y - sp.height / 2 * sp.scaleY + psp.height / 2;
        sp.x = x;
        sp.y = y;
    };
    Utilit.getPointToLineDistance = function (x, y, LineStart, LineEnd) {
        var toStartDir = new Laya.Point(x - LineStart.x, y - LineStart.y);
        var toEndDir = new Laya.Point(x - LineEnd.x, y - LineEnd.y);
        var lineDir = new Laya.Point(LineEnd.x - LineStart.y, LineEnd.y - LineStart.y);
        var dotToStartDir = (lineDir.x * toStartDir.x) + (lineDir.y * toStartDir.y);
        if (dotToStartDir <= 0) {
            return toStartDir.distance(0, 0);
        }
        var dotToEndDir = (lineDir.x * toEndDir.x) + (lineDir.y * toEndDir.y);
        if (dotToEndDir <= 0) {
            return toEndDir.distance(0, 0);
        }
        var toStartDis = toStartDir.distance(0, 0);
        var lineDirDis = lineDir.distance(0, 0);
        var cos = dotToStartDir / (toStartDis * lineDirDis);
        var radians = Math.acos(cos);
        var dis = Math.sin(radians) * toStartDis;
        return dis;
    };
    Utilit.isIphoneX = function () {
        if (!Laya.Browser.onIPhone)
            return false;
        if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
            return true;
        }
        return false;
    };
    Utilit.isIphone = function () {
        return Laya.Browser.onIPhone;
    };
    Utilit.getChild = function (node, name) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Utilit.getChild(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Utilit.OriginStageWidth = 1334;
    Utilit.OriginStageHeight = 750;
    Utilit.grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit.grayscaleFilter = new Laya.ColorFilter(Utilit.grayscaleMat);
    Utilit.poinDown = new Laya.Point(0, -1);
    Utilit.poinUp = new Laya.Point(0, 1);
    return Utilit;
}());
exports.default = Utilit;
},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var EventDef_1 = require("../../Event/EventDef");
var EventMgr_1 = require("../../Event/EventMgr");
/**
 * 狂点窗口使用范例如下
    //首先判断狂点功能开关WudianMgr.WudianFlag是否打开，如果没打开就直接跳过整个逻辑
    WudianMgr.GetIpBlockState();//在游戏里初始化的时候调用这个方法初始化Ip屏蔽flag
    //将这段代码插入需要调用狂点窗口的地方
    let data : any = {};
    //狂点逻辑完成后的回调方法
    data.Complete = function(){
        console.log("狂点按钮结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
    }
    // 完成点击之后获得的奖励数量，依照各项目不同自行实现
    data.PrizeCount = 30;
    // 在调用窗口前必须关闭当前正在显示的官方Banner广告，这个窗口才能正常运行，具体的逻辑各人需自行实现
    // 而且关闭官方Banner可以稍微提早一些，避免频繁调用出错或者不稳定
    Event_PK_Mgr.instance.dispatch(Event_PK_Def.AD_CloseBanner, true);//这句代码是我用来关闭官方Banner，各项目自行实现
    ViewMgr.instance.openView(ViewDef.ClickGetPrize,data);
 *
 * @export
 * @class ClickGetPrize
 * @extends {ViewBase}
 */
var ClickGetPrize = /** @class */ (function (_super) {
    __extends(ClickGetPrize, _super);
    function ClickGetPrize() {
        var _this = _super.call(this) || this;
        _this._totalClickTimer = 22; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime = 7; //点多少次开始显示bannerr套路用户，可微调    
        return _this;
    }
    ClickGetPrize.prototype.onAwake = function () {
        this._click_Btn = this.owner.getChildByName("Click_Btn");
        this._click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img = this._click_Btn.getChildByName("Arrow_Img");
        this._bg = this.owner.getChildByName("BG");
        this._open_Btn = this._bg.getChildByName("Open_Btn");
        this._getPrize_View = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_Text = this._getPrize_View.getChildByName("PrizeCount_Text");
        this._confirm_Btn = this._getPrize_View.getChildByName("Confirm_Btn");
        this._getPrize_View.visible = false;
        this._clickTime_PBar = this._bg.getChildByName("ClickTime_PBar");
        this._clickTime_PBar$Bar = this._clickTime_PBar.getChildByName("ClickTime_PBar$Bar");
        this._clickBarOriginalWidth = this._clickTime_PBar$Bar.width;
        this._bannerAd_View = this.owner.getChildByName("BannerAd_View");
        this._clickTime_PBar$Bar.width = 0;
        this._clickTime = 0;
        this._totalClickTime = 0;
        EventMgr_1.default.instance.regOnceEvent(EventDef_1.EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    };
    ClickGetPrize.prototype.onUpdate = function () {
        /* 箭头上下移动 */
        if (this._arrowUp) {
            this._arrow_Img.top += Laya.timer.delta / 5;
            if (this._arrow_Img.top > -140) {
                this._arrowUp = false;
            }
        }
        else {
            this._arrow_Img.top -= Laya.timer.delta / 5;
            if (this._arrow_Img.top < -180) {
                this._arrowUp = true;
            }
        }
        /* 按钮不按，进度条自动退回 */
        if (!this._bannerClicked) {
            var spd = 2 + (this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) * 6;
            if (this._clickTime_PBar$Bar.width >= spd) {
                this._clickTime_PBar$Bar.width -= spd;
            }
            if ((this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) + 0.1 < (this._clickTime / this._needClickTime)) {
                this._clickTime--;
            }
        }
        // else {
        //     if (this._clickTime_PBar$Bar.width <= this._clickBarOriginalWidth) {
        //         this._clickTime_PBar$Bar.width += 2;
        //         if (this._clickTime_PBar$Bar.width > this._clickBarOriginalWidth) {
        //             this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth
        //         }
        //     }
        // }
    };
    /**
     * 打开Banner
     *
     * @param {*} [data]
     * @memberof ClickGetPrize
     */
    ClickGetPrize.prototype.openView = function (data) {
        this._compeletFunction = data.Complete;
        this._prizeCount = data.PrizeCount;
        _super.prototype.openView.call(this, data);
    };
    /**
     * 用户成功获得奖励
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize.prototype.OpenPrizeWindow = function () {
        this._bg.visible = false;
        var self = this;
        this._prizeCount_Text.text = this._prizeCount.toString();
        this._getPrize_View.visible = true;
        /* 确认按钮 */
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.closeView();
        });
    };
    /**
     * 误点预加载完成
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize.prototype.WudianLoadComplete = function () {
        console.log("WudianBanner预加载完毕");
        this._wudianLoadFlag = true;
    };
    /**
     * 将Banner显示
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize.prototype.ShowBanner = function () {
        console.log("AD_WudianBanner_Show");
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_WudianBanner_Show);
    };
    /**
     * 狂点按钮逻辑
     *
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize.prototype.ButtonClicked = function () {
        this._clickTime++;
        this._totalClickTime++;
        //nanner一直没加载成功,保持进度条
        if (this._clickTime > this._needClickTime) {
            this._clickTime = this._needClickTime;
        }
        if (this._clickTime >= this._bannerClickTime && this._wudianLoadFlag) {
            if (this._clickTime >= this._needClickTime) {
                this._clickTime = this._needClickTime - 1;
            }
            this._bannerClicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this._totalClickTime > this._totalClickTimer) {
            console.log("用户一直没点到，放他一马", this._totalClickTime);
            this.BannerClicked();
        }
        var progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickTime_PBar$Bar.width = progress;
    };
    /**
     * Banner已经点击之后，让用户获得奖励
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_WudianBanner_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
        this._click_Btn.visible = false;
        this._open_Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.OpenPrizeWindow();
    };
    return ClickGetPrize;
}(ViewBase_1.default));
exports.default = ClickGetPrize;
},{"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../View/ViewBase":29}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BannerAdView_1 = require("../../ShareAd/View/BannerAdView");
var UniversalBottomZone = /** @class */ (function (_super) {
    __extends(UniversalBottomZone, _super);
    function UniversalBottomZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniversalBottomZone.prototype.onAwake = function () {
        this._ownerSprite = this.owner;
        this._autoZone = this._ownerSprite.getChildByName("AutoZone");
        this._loopADZone = this._ownerSprite.getChildByName("LoopAD");
        this._bannerADZone = this._ownerSprite.getChildByName("BannerAD");
        this._bannerAd = this._bannerADZone.getComponent(BannerAdView_1.default);
    };
    UniversalBottomZone.prototype.onEnable = function () {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._autoZone.bottom = this._loopADZone.height + this._bannerADZone.height;
            this._loopADZone.bottom = this._bannerADZone.height;
            this._bannerADZone.visible = true;
        }
        else {
            this._autoZone.bottom = this._loopADZone.height;
            this._loopADZone.bottom = 0;
            this._bannerADZone.visible = false;
        }
    };
    UniversalBottomZone.prototype.onDisable = function () {
    };
    UniversalBottomZone.prototype.onUpdate = function () {
        if (!this._bannerADZone.visible) {
            this._bannerAd.clearWXBaner();
        }
    };
    return UniversalBottomZone;
}(Laya.Script));
exports.default = UniversalBottomZone;
},{"../../ShareAd/View/BannerAdView":18}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var LoadingView = /** @class */ (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._processWidth = 0;
        return _this;
    }
    LoadingView.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._processBarBg = this._bg.getChildByName("processBarBg");
        if (this._processBarBg) {
            this._processBar = this._processBarBg.getChildByName("processBar");
            this._processWidth = this._processBar.width;
        }
        else {
            this._processBar = this._bg.getChildByName("processBar");
            this._processWidth = Laya.stage.width;
        }
    };
    LoadingView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    LoadingView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    LoadingView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    LoadingView.prototype.onUpdate = function () {
        this._bg.width = Laya.stage.width;
        this._bg.height = Laya.stage.height;
        if (!this._processBarBg) {
            this._processWidth = Laya.stage.width;
        }
    };
    LoadingView.prototype.setProcess = function (process) {
        if (process < 0)
            process = 0;
        if (process > 1)
            process = 1;
        var width = this._processWidth * process;
        if (width < 1)
            width = 1;
        this._processBar.width = width;
    };
    return LoadingView;
}(ViewBase_1.default));
exports.default = LoadingView;
},{"../ViewBase":29}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var TipsView = /** @class */ (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        return _super.call(this) || this;
    }
    TipsView.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._bg.x = Laya.stage.width / 2 - this._bg.width / 2;
        this._tipsText = this._bg.getChildByName("Text");
    };
    TipsView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this.setTipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000, this, function () {
            self.closeView();
        });
    };
    TipsView.prototype.setTipsMsg = function (msg) {
        this._tipsText.text = msg;
    };
    return TipsView;
}(ViewBase_1.default));
exports.default = TipsView;
},{"../ViewBase":29}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TwinkleSprite = /** @class */ (function (_super) {
    __extends(TwinkleSprite, _super);
    function TwinkleSprite() {
        var _this = _super.call(this) || this;
        /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
        _this.TwinkleSpeed = 1000;
        /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
        _this.TwinkleMinSize = 0.95;
        /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
        _this.TwinkleMaxSize = 1.05;
        _this._aniForward = false;
        _this._fontSize = 25;
        _this._originSize = 1;
        return _this;
    }
    TwinkleSprite.prototype.onAwake = function () {
        this._displaySp = this.owner;
        this._disText = this.owner.getChildByName("TitelText");
        this._originSize = this._displaySp.scaleX;
        if (this._disText != null) {
            this._disText.text = "";
            this._fontSize = this._disText.fontSize;
        }
    };
    TwinkleSprite.prototype.onEnable = function () {
        this._displaySp.scale(this._originSize, this._originSize);
    };
    TwinkleSprite.prototype.onDisable = function () {
    };
    TwinkleSprite.prototype.onUpdate = function () {
        this.displayAni();
    };
    TwinkleSprite.prototype.displayAni = function () {
        if (!this._aniForward) {
            var scale = this._displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX <= this.TwinkleMinSize * this._originSize) {
                this._aniForward = true;
            }
        }
        else {
            var scale = this._displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX >= this.TwinkleMaxSize * this._originSize) {
                this._aniForward = false;
            }
        }
    };
    return TwinkleSprite;
}(Laya.Script));
exports.default = TwinkleSprite;
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../Mgr/ViewMgr");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCloseEvent = null;
        _this.onOpenEvent = null;
        _this._viewBase = true;
        _this._viewDef = ViewMgr_1.ViewDef.None;
        _this._data = {};
        return _this;
    }
    ViewBase.prototype.onAwake = function () {
        //删除时自动释放
        this.owner.autoDestroyAtClosed = true;
        this.owner.height = Laya.stage.height;
    };
    ViewBase.prototype.onEnable = function () {
        this.addEvent();
    };
    ViewBase.prototype.onDisable = function () {
        this.removeEvent();
    };
    ViewBase.prototype.onDestroy = function () {
        this.removeEvent();
    };
    ViewBase.prototype.openView = function (data) {
        this._data = data;
        this.show();
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnViewOpen, { view: this._viewDef });
        if (this.onOpenEvent) {
            this.onOpenEvent();
        }
    };
    ViewBase.prototype.addEvent = function () {
    };
    ViewBase.prototype.removeEvent = function () {
        Laya.timer.clearAll(this);
    };
    ViewBase.prototype.closeView = function () {
        ViewMgr_1.default.instance.closeView(this._viewDef);
    };
    ViewBase.prototype.hide = function () {
        this.owner.visible = false;
        this.onHide();
    };
    ViewBase.prototype.show = function () {
        this.owner.visible = true;
        this.onShow();
    };
    ViewBase.prototype.viewIsHide = function () {
        return this.owner.alpha == 0;
    };
    ViewBase.prototype.onHide = function () { };
    ViewBase.prototype.onShow = function () { };
    ViewBase.prototype.onClose = function () {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnViewClose, { view: this._viewDef });
        if (this.onCloseEvent) {
            this.onCloseEvent();
        }
    };
    return ViewBase;
}(Laya.Script));
exports.default = ViewBase;
},{"../Event/EventDef":4,"../Event/EventMgr":5,"../Mgr/ViewMgr":10}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI = /** @class */ (function () {
    function WXAPI() {
    }
    WXAPI.wxLogin = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.login({
                success: function (res) {
                    if (res.code) {
                        var code = res.code;
                        onSuccess(code);
                        console.log("登陆成功,获取到code : " + code);
                    }
                }
            });
        }
    };
    WXAPI.onRewardedVideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    WXAPI.onRewardedVideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (WXAPI._onRewardedVideoAdFailed) {
            WXAPI._onRewardedVideoAdFailed();
        }
    };
    WXAPI.onRewardedVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (WXAPI._onRewardedVideoAdClose) {
                WXAPI._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (WXAPI._onRewardedVideoAdClose) {
                WXAPI._onRewardedVideoAdClose(false);
            }
        }
    };
    WXAPI.regRewardedVideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(WXAPI.onRewardedVideoAdLoad);
        rewardedVideoAd.onError(WXAPI.onRewardedVideoAdError);
        rewardedVideoAd.onClose(WXAPI.onRewardedVideoAdClose);
        WXAPI._isRegRewardedVideoAdEvent = true;
    };
    WXAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            WXAPI._onRewardedVideoAdClose = onAdClose;
            WXAPI._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                adUnitId: WXAPI.adUnitId,
            });
            if (!WXAPI._isRegRewardedVideoAdEvent) {
                WXAPI.regRewardedVideoAdEvent(rewardedVideoAd);
            }
            rewardedVideoAd.load().then(function () {
                var promise = rewardedVideoAd.show();
                promise.then(function () { return console.log('激励视频 广告显示成功'); });
                promise.catch(function (err) {
                    rewardedVideoAd.load()
                        .then(function () { return rewardedVideoAd.show(); })
                        .catch(function (err) {
                        console.log('激励视频 广告显示失败');
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
            }).catch(function (err) {
                console.log('激励视频 广告加载失败');
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    //----------------------------------------------------------------
    //-------------------------小游戏跳转---------------------------
    WXAPI.navigateToMiniProgram = function (appId, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["wx"].navigateToMiniProgram({
                appId: appId,
                path: path,
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    WXAPI.share = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            WXAPI._onShow = function () {
                Laya.Browser.window["wx"].offShow(WXAPI._onShow);
                WXAPI._onShow = null;
                var c = Date.now() - _this._lastShareTime;
                if (complate) {
                    if (Date.now() - _this._lastShareTime > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["wx"].onShow(WXAPI._onShow);
            this._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    WXAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WXAPI.InsAdUnitId,
            });
            interstitialAd.onLoad(function () {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch(function (err) {
                    console.log('插屏广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            });
            interstitialAd.onError(function (err) {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            });
            interstitialAd.onClose(function () {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            });
        }
        else {
            onAdClose();
        }
    };
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof WXAPI
     */
    WXAPI.getLaunchOptionsSync = function () {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onMiniGame) {
            var obj_1 = Laya.Browser.window["wx"].getLaunchOptionsSync();
            console.log("场景值 " + obj_1.scene);
            var str = JSON.stringify(obj_1.query);
            console.log("Query参数 " + str);
            var key = obj_1.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj_1.shareTicket);
            console.log("ReferrerInfo.appId " + obj_1.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj_1.referrerInfo.extraData);
            return obj_1;
        }
        var obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
        return obj;
    };
    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     *
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof WXAPI
     */
    WXAPI.SetShareMenu = function (titel, imageUrl, success, fail, complate) {
        if (Laya.Browser.onMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["wx"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["wx"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                };
            });
        }
    };
    WXAPI.adUnitId = "adunit-eef36f84c44bbdc1";
    WXAPI.bannerAdUnitId = "adunit-440e21cc02c0d282";
    WXAPI.InsAdUnitId = "adunit-440e21cc02c0d282";
    //-------------------------激励视频---------------------------------
    WXAPI._isRegRewardedVideoAdEvent = false;
    WXAPI._onRewardedVideoAdFailed = null;
    WXAPI._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    WXAPI._onShow = null;
    WXAPI._lastShareTime = 0;
    return WXAPI;
}());
exports.default = WXAPI;
},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var View;
    (function (View) {
        var LoadingUI = /** @class */ (function (_super) {
            __extends(LoadingUI, _super);
            function LoadingUI() {
                return _super.call(this) || this;
            }
            LoadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(LoadingUI.uiView);
            };
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 1920, "top": 0, "right": 0, "left": 0, "height": 1080, "bottom": 0 }, "compId": 2, "child": [{ "type": "Clip", "props": { "y": 0, "x": 0, "skin": "Loading/1_0001_图层-3.jpg", "name": "Bg" }, "compId": 6, "child": [{ "type": "Clip", "props": { "width": 1920, "skin": "Loading/图层 1.png", "pivotY": 22, "name": "processBar", "left": 0, "height": 22, "bottom": 98 }, "compId": 5 }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["Loading/1_0001_图层-3.jpg", "Loading/图层 1.png"], "loadList3D": [] };
            return LoadingUI;
        }(Scene));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6L0xheWFBaXIgSURFIDIuMS4xLjEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FMRC50cyIsInNyYy9BcHBDb25maWcudHMiLCJzcmMvQ29uZmlnL0FwcFN3aXRjaENvbmZpZy50cyIsInNyYy9FdmVudC9FdmVudERlZi50cyIsInNyYy9FdmVudC9FdmVudE1nci50cyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL01haUxpYW5nQVBJL01haUxpYW5nLnRzIiwic3JjL01haW4udHMiLCJzcmMvTWdyL0dhbWVNZ3IudHMiLCJzcmMvTWdyL1ZpZXdNZ3IudHMiLCJzcmMvTmV0L0Flc1Rvb2xzLnRzIiwic3JjL05ldC9IdHRwVW5pdC50cyIsInNyYy9OZXQvTmV0Q29uZmlnLnRzIiwic3JjL05ldC9hZXMuanMiLCJzcmMvT1BQT0FQSS50cyIsInNyYy9RUU1pbmlHYW1lQVBJLnRzIiwic3JjL1NoYXJlQWQvU2hhcmVBZC50cyIsInNyYy9TaGFyZUFkL1ZpZXcvQmFubmVyQWRWaWV3LnRzIiwic3JjL1NoYXJlQWQvVmlldy9Ib3Jpem9udGFsTG9vcEFkVmlldy50cyIsInNyYy9TaGFyZUFkL1ZpZXcvTG9vcEFkQm94LnRzIiwic3JjL1NoYXJlQWQvVmlldy9XdURpYW5CYW5uZXJBZFZpZXcudHMiLCJzcmMvVXNlci9Vc2VyLnRzIiwic3JjL1V0aWxpdC50cyIsInNyYy9WaWV3L0NsaWNrR2V0UHJpemUvQ2xpY2tHZXRQcml6ZS50cyIsInNyYy9WaWV3L0NvbW1vbi9Vbml2ZXJzYWxCb3R0b21ab25lLnRzIiwic3JjL1ZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXcudHMiLCJzcmMvVmlldy9UaXBzVmlldy9UaXBzVmlldy50cyIsInNyYy9WaWV3L1R3aW5rbGVTcHJpdGUudHMiLCJzcmMvVmlldy9WaWV3QmFzZS50cyIsInNyYy9XWEFQSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFt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QUosT0FBSSxLQUFKLE9BQUksUUFVcEI7QUFBRCxDQUFDLEVBVmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBVWYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGVudW0gQUxERXZlbnREZWZcclxue1xyXG4gICAgTm9uZSA9IFwiXCIsXHJcbiAgICBSZXBvcnRBZENsaWNrU3VjY2VzcyA9IFwi5bm/5ZGK5a+85Ye65oiQ5YqfXCIsXHJcbiAgICBSZXBvcnRBZENsaWNrRmFpbCA9IFwi5bm/5ZGK5a+85Ye65aSx6LSlXCIsXHJcbiAgICAvL3RvZG865re75Yqg5L2g6Ieq5bex55qE6Zi/5ouJ5LiB5LqL5Lu2XHJcbn1cclxuXHJcbi8v6Zi/5ouJ5LiB55u45YWz5o6l5Y+jXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFMRCBcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBhbGRTZW5kRXZlbnQoZXZlbnQgOiBBTERFdmVudERlZixkYXRhIDogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBldmVudE5hbWUgOiBzdHJpbmcgPSBldmVudDtcclxuICAgICAgICBpZihMYXlhLkJyb3dzZXIub25NaW5pR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5hbGRTZW5kRXZlbnQoZXZlbnROYW1lLGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFsZFNlbmRSZXBvcnRBZENsaWNrU3VjY2VzcyhkYXRhIDogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0eXBlID0gQUxERXZlbnREZWYuUmVwb3J0QWRDbGlja1N1Y2Nlc3MgICsgXCIgXCIgKyAgZGF0YS50aXRsZSArIFwiOlwiICsgU3RyaW5nKGRhdGEuYXBwaWQpXHJcbiAgICAgICAgdmFyIGFsZCA9IEFMRCBhcyBhbnk7XHJcbiAgICAgICAgYWxkLmFsZFNlbmRFdmVudCh0eXBlLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIuWvvOWHuuaIkOWKn1wiIDogZGF0YS50aXRsZSArIFwiOlwiICsgU3RyaW5nKGRhdGEuYXBwaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhbGRTZW5kUmVwb3J0QWRDbGlja0ZhaWwoZGF0YSA6IGFueSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdHlwZSA9IEFMREV2ZW50RGVmLlJlcG9ydEFkQ2xpY2tGYWlsICArIFwiIFwiICsgIGRhdGEudGl0bGUgKyBcIjpcIiArIFN0cmluZyhkYXRhLmFwcGlkKVxyXG4gICAgICAgIHZhciBhbGQgPSBBTEQgYXMgYW55O1xyXG4gICAgICAgIGFsZC5hbGRTZW5kRXZlbnQodHlwZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCLlr7zlh7rlpLHotKVcIiAgOiAgZGF0YS50aXRsZSArIFwiOlwiICsgU3RyaW5nKGRhdGEuYXBwaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb25maWdcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBcHBJRCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlc1NlcnZlciA6IHN0cmluZyA9IFwiaHR0cHM6Ly9vc3MucmVueW91d2FuZ2x1by5jbi9cIjsvL+i1hOa6kOacjeWKoeWZqOWcsOWdgFxyXG4gICAgcHVibGljIHN0YXRpYyBMb2NhbFRlc3RSZVNlcnZlciA6IHN0cmluZyA9IFwic3ViUmVzXCI7Ly/mnKzlnLDmtYvor5XotYTmupDmnI3liqHlmajlnLDlnYBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVmVyc2lvbnMgOiBzdHJpbmcgPSBcIjAuMC4wXCI7XHJcbn0iLCJpbXBvcnQgQXBwQ29uZmlnIGZyb20gXCIuLi9BcHBDb25maWdcIjtcclxuaW1wb3J0IFdYQVBJIGZyb20gXCIuLi9XWEFQSVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFN3aXRjaERhdGFcclxue1xyXG4gICAgcHVibGljIGJhbm5lciA6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgd3VkaWFuOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHd1ZGlhblRpbWVfMDE6IG51bWJlciA9IDIwMDA7XHJcbiAgICBwdWJsaWMgd3VkaWFuVGltZV8wMVByZUxvYWQ6IG51bWJlciA9IDUwMDtcclxuICAgIHB1YmxpYyBzaGlwaW50dWJpYW86IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHd1ZGlhbkF2YWlsYWJsZVRpbWU6IG9iamVjdCA9IHtcclxuICAgICAgICBcIjBcIjogMCwgXCIxXCI6IDAsIFwiMlwiOiAwLCBcIjNcIjogMCxcclxuICAgICAgICBcIjRcIjogMCwgXCI1XCI6IDAsIFwiNlwiOiAwLCBcIjdcIjogMCxcclxuICAgICAgICBcIjhcIjogMCwgXCI5XCI6IDAsIFwiMTBcIjogMCwgXCIxMVwiOiAwLFxyXG4gICAgICAgIFwiMTJcIjogMCwgXCIxM1wiOiAwLCBcIjE0XCI6IDAsIFwiMTVcIjogMCxcclxuICAgICAgICBcIjE2XCI6IDAsIFwiMTdcIjogMCwgXCIxOFwiOiAwLCBcIjE5XCI6IDAsXHJcbiAgICAgICAgXCIyMFwiOiAwLCBcIjIxXCI6IDAsIFwiMjJcIjogMCwgXCIyM1wiOiAwXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW+l+WIsOW9k+WJjeaXtumXtOW8gOWFs+aYr+WQpuaJk+W8gFxyXG4gICAgICogXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEFwcFN3aXRjaERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB3dWRpYW5UaW1lQXZhbGlhYmxlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud3VkaWFuQXZhaWxhYmxlVGltZVtuZXcgRGF0ZSgpLmdldEhvdXJzKCldID09IDE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbWFpbGlhbmc6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFpbGlhbmdsaXN0IDogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFN3aXRjaENvbmZpZ1xyXG57ICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkgOiBBcHBTd2l0Y2hDb25maWdcclxuICAgIHtcclxuICAgICAgICBpZihudWxsID09IEFwcFN3aXRjaENvbmZpZy5faW5zdGFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBcHBTd2l0Y2hDb25maWcuX2luc3RhbmNlID0gQXBwU3dpdGNoQ29uZmlnLmxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFwcFN3aXRjaENvbmZpZy5faW5zdGFuY2VcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX2luc3RhbmNlOiBBcHBTd2l0Y2hDb25maWc7XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBsb2FkKCkgOiBBcHBTd2l0Y2hDb25maWdcclxuICAgIHtcclxuICAgICAgICB2YXIgY29uZmlnID0gbmV3IEFwcFN3aXRjaENvbmZpZygpO1xyXG4gICAgICAgIHZhciBqc29uOiBhbnkgPSBMYXlhLmxvYWRlci5nZXRSZXMoQXBwQ29uZmlnLlJlc1NlcnZlciArIFwiL2pzb24vYXBwc3dpdGNoLmpzb25cIik7XHJcbiAgICAgICAgaWYoanNvbil7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGpzb24ubGVuZ3RoOysraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IGpzb25baV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93RGF0YTogQXBwU3dpdGNoRGF0YSA9IG5ldyBBcHBTd2l0Y2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICByb3dEYXRhLmJhbm5lciA9IE51bWJlcihyb3dbXCJiYW5uZXJcIl0pO1xyXG4gICAgICAgICAgICAgICAgcm93RGF0YS53dWRpYW4gPSBOdW1iZXIocm93W1wid3VkaWFuXCJdKTtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGEud3VkaWFuVGltZV8wMSA9IE51bWJlcihyb3dbXCJ3dWRpYW5UaW1lXzAxXCJdKTsvLz8/Pz/ov5nkuKrlrZfmrrXmmK/llaVcclxuICAgICAgICAgICAgICAgIHJvd0RhdGEud3VkaWFuVGltZV8wMVByZUxvYWQgPSBOdW1iZXIocm93W1wid3VkaWFuVGltZV8wMVByZUxvYWRcIl0pOy8vPz8/P+i/meS4quWtl+auteaYr+WVpVxyXG4gICAgICAgICAgICAgICAgcm93RGF0YS5zaGlwaW50dWJpYW8gPSBOdW1iZXIocm93W1wic2hpcGludHViaWFvXCJdKTsvLz8/Pz/ov5nkuKrlrZfmrrXmmK/llaVcclxuICAgICAgICAgICAgICAgIChyb3dEYXRhIGFzIGFueSkud3VkaWFuQXZhaWxhYmxlVGltZSA9IE9iamVjdChyb3dbXCJ3dWRpYW5UaW1lXCJdKTtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGEubWFpbGlhbmcgPSAgTnVtYmVyKHJvd1tcIm1haWxpYW5nXCJdKTtcclxuICAgICAgICAgICAgICAgIHZhciBtYWlsaWFuZ2xpc3QgPSByb3dbXCJtYWlsaWFuZ2xpc3RcIl07XHJcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IG1haWxpYW5nbGlzdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1haWxpYW5nbGlzdC5sZW5ndGg7ICsraikgIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWcgPSBOdW1iZXIobWFpbGlhbmdsaXN0W2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93RGF0YS5tYWlsaWFuZ2xpc3QucHVzaChmbGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2RhdGEucHVzaChyb3dEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25maWcuX2RhdGEucHVzaChuZXcgQXBwU3dpdGNoRGF0YSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kYXRhIDogQXJyYXk8QXBwU3dpdGNoRGF0YT4gPSBuZXcgQXJyYXk8QXBwU3dpdGNoRGF0YT4oKTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwU3dpdGNoRGF0YSgpOiBBcHBTd2l0Y2hEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMF07XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBFdmVudERlZiBcclxue1xyXG4gICAgTm9uZSA9IDAsXHJcbiAgICBBcHBfQ2xvc2VGaXJzdExvYWRpbmdWaWV3ID0gNTAwLFxyXG4gICAgQURfT25TaGFyZUFkRmFpbCA9IDUwMSxcclxuXHJcbiAgICAvL+W9k+eVjOmdouaJk+W8gFxyXG4gICAgR2FtZV9PblZpZXdPcGVuID0gNjAwLC8ve3ZpZXcgOiBWaWV3RGVmfVxyXG4gICAgLy/lvZPnlYzpnaLlhbPpl61cclxuICAgIEdhbWVfT25WaWV3Q2xvc2UgPSA2MDEsLy97dmlldyA6IFZpZXdEZWZ9XHJcbiAgICAvL+W9k+eOqeWutumHkeW4geWPmOWKqFxyXG4gICAgR2FtZV9PblVzZXJNb25leUNoYW5nZSA9IDcwMSwvL3tjdXJyOm51bWJlcixsYXN0Om51bWJlcn1cclxuICAgIC8v5b2T546p5a626ZK755+z5Y+Y5YqoXHJcbiAgICBHYW1lX09uVXNlckNyeXN0YWxDaGFuZ2UgPSA3MDIsLy97Y3VycjpudW1iZXIsbGFzdDpudW1iZXJ9XHJcbiAgICAvL+W9k+WFs+WNoeW8gOWni1xyXG4gICAgR2FtZV9PbkxldmVsU3RhcnQgPSAxMDAwLFxyXG4gICAgLy/lvZPlhbPljaHnu5PmnZ9cclxuICAgIEdhbWVfT25MZXZlbENvbXBsYXRlID0gMTAwMSxcclxuICAgIC8v6K+v54K56aKE5Yqg6L295a6M5q+VXHJcbiAgICBBRF9XdWRpYW5CYW5uZXJfTG9hZENvbXBsZXRlID0gMjIxNyxcclxuICAgIC8v5pi+56S66K+v54K5QmFubmVyXHJcbiAgICBBRF9XdWRpYW5CYW5uZXJfU2hvdyA9IDIyMTgsXHJcbiAgICAvL+W9seiXj+ivr+eCuUJhbm5lclxyXG4gICAgQURfV3VkaWFuQmFubmVyX0hpZGUgPSAyMjE5LFxyXG4gICAgLy/pooTliqDovb1CYW5uZXJcclxuICAgIEFEX1d1ZGlhbkJhbm5lcl9QcmVMb2FkID0yMjIwLCAgICBcclxuICAgIC8vVGlwczrlnKjov5nmnaHmt7vliqDlrprkuYnkvaDoh6rlt7HpnIDopoHnmoTkuovku7bvvIzku44xMDAwMOWPt+W8gOWni+OAguiusOW+l+WIhuauteWIhuexu+euoeeQhuS4jeWQjOexu+Wei+S6i+S7tuOAguWmguaenOS6i+S7tuacieS8oOmAkuWPguaVsCBcIuW/hemhu1wiIOWcqOS6i+S7tuWQjumdoueUqOazqOmHiuWGmeaYjuS6i+S7tuWPguaVsOe7k+aehOOAglxyXG4gICAgXHJcbn0iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyID0gbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE1nciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBzdGF0aWMgZXZlbnREaXNwYXRjaGVyOiBFdmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGluc3RhbmNlOiBFdmVudE1nciA9IG5ldyBFdmVudE1ncigpOztcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W5v+aSreS6i+S7tlxyXG4gICAgcHVibGljIGRpc3BhdGNoKEluTmFtZSwgYWd2PzogYW55KSB7XHJcbiAgICAgICAgRXZlbnRNZ3IuZXZlbnREaXNwYXRjaGVyLmV2ZW50KEluTmFtZSwgYWd2KTtcclxuICAgIH1cclxuICAgIC8v5rOo5YaM5LqL5Lu2XHJcbiAgICBwdWJsaWMgcmVnRXZlbXQoSW5OYW1lLCBjYWxsZXIsIGxpc3RlbmVyOiBGdW5jdGlvbiwgYXJnPzogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5ldmVudERpc3BhdGNoZXIub24oSW5OYW1lLCBjYWxsZXIsIGxpc3RlbmVyLCAoYXJnID09IG51bGwpID8gbnVsbCA6IChbYXJnXSkpO1xyXG4gICAgfVxyXG4gICAgLy/ms6jlhozljZXmrKHkuovku7ZcclxuICAgIHB1YmxpYyByZWdPbmNlRXZlbnQoSW5OYW1lLCBjYWxsZXIsIGxpc3RlbmVyOiBGdW5jdGlvbiwgYXJnPzogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5ldmVudERpc3BhdGNoZXIub25jZShJbk5hbWUsIGNhbGxlciwgbGlzdGVuZXIsIChhcmcgPT0gbnVsbCkgPyBudWxsIDogKFthcmddKSk7XHJcbiAgICB9XHJcbiAgICAvL+enu+mZpOS6i+S7tuazqOWGjFxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50KEluTmFtZSwgY2FsbGVyLCBsaXN0ZW5lcjogRnVuY3Rpb24sIGFyZz86IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRNZ3IuZXZlbnREaXNwYXRjaGVyLm9mZihJbk5hbWUsIGNhbGxlciwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lTWdyIGZyb20gXCIuL01nci9HYW1lTWdyXCJcbmltcG9ydCBUd2lua2xlU3ByaXRlIGZyb20gXCIuL1ZpZXcvVHdpbmtsZVNwcml0ZVwiXG5pbXBvcnQgV3VEaWFuQmFubmVyQWRWaWV3IGZyb20gXCIuL1NoYXJlQWQvVmlldy9XdURpYW5CYW5uZXJBZFZpZXdcIlxuaW1wb3J0IENsaWNrR2V0UHJpemUgZnJvbSBcIi4vVmlldy9DbGlja0dldFByaXplL0NsaWNrR2V0UHJpemVcIlxuaW1wb3J0IExvYWRpbmdWaWV3IGZyb20gXCIuL1ZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXdcIlxuaW1wb3J0IFRpcHNWaWV3IGZyb20gXCIuL1ZpZXcvVGlwc1ZpZXcvVGlwc1ZpZXdcIlxuaW1wb3J0IExvb3BBZEJveCBmcm9tIFwiLi9TaGFyZUFkL1ZpZXcvTG9vcEFkQm94XCJcbmltcG9ydCBIb3Jpem9udGFsTG9vcEFkVmlldyBmcm9tIFwiLi9TaGFyZUFkL1ZpZXcvSG9yaXpvbnRhbExvb3BBZFZpZXdcIlxuaW1wb3J0IEJhbm5lckFkVmlldyBmcm9tIFwiLi9TaGFyZUFkL1ZpZXcvQmFubmVyQWRWaWV3XCJcbmltcG9ydCBVbml2ZXJzYWxCb3R0b21ab25lIGZyb20gXCIuL1ZpZXcvQ29tbW9uL1VuaXZlcnNhbEJvdHRvbVpvbmVcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NzUwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTMzNDtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwidmVydGljYWxcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwibWlkZGxlXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImNlbnRlclwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiR2FtZU1haW4uc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIk1nci9HYW1lTWdyLnRzXCIsR2FtZU1ncik7XG4gICAgICAgIHJlZyhcIlZpZXcvVHdpbmtsZVNwcml0ZS50c1wiLFR3aW5rbGVTcHJpdGUpO1xuICAgICAgICByZWcoXCJTaGFyZUFkL1ZpZXcvV3VEaWFuQmFubmVyQWRWaWV3LnRzXCIsV3VEaWFuQmFubmVyQWRWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9DbGlja0dldFByaXplL0NsaWNrR2V0UHJpemUudHNcIixDbGlja0dldFByaXplKTtcbiAgICAgICAgcmVnKFwiVmlldy9Mb2FkaW5nVmlldy9Mb2FkaW5nVmlldy50c1wiLExvYWRpbmdWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9UaXBzVmlldy9UaXBzVmlldy50c1wiLFRpcHNWaWV3KTtcbiAgICAgICAgcmVnKFwiU2hhcmVBZC9WaWV3L0xvb3BBZEJveC50c1wiLExvb3BBZEJveCk7XG4gICAgICAgIHJlZyhcIlNoYXJlQWQvVmlldy9Ib3Jpem9udGFsTG9vcEFkVmlldy50c1wiLEhvcml6b250YWxMb29wQWRWaWV3KTtcbiAgICAgICAgcmVnKFwiU2hhcmVBZC9WaWV3L0Jhbm5lckFkVmlldy50c1wiLEJhbm5lckFkVmlldyk7XG4gICAgICAgIHJlZyhcIlZpZXcvQ29tbW9uL1VuaXZlcnNhbEJvdHRvbVpvbmUudHNcIixVbml2ZXJzYWxCb3R0b21ab25lKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gXCIuLi9OZXQvSHR0cFVuaXRcIjtcclxuaW1wb3J0IEFwcENvbmZpZyBmcm9tIFwiLi4vQXBwQ29uZmlnXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vV1hBUElcIjtcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL1VzZXIvVXNlclwiO1xyXG5cclxuLyoqXHJcbiAqIOeUqOS6juS5sOmHj+S4iuaKpSzku6Xlj4rlgZznlZnml7bpl7TkuIrmiqXnmoTnmoTnsbvvvIzmnKzotKjkuIrmmK/lr7l3eOWSjOS5sOmHj+aOpeWPo+WBmuS4gOS4qumbhuaIkOWMlueahOWwgeijheaWueS+v+S9v+eUqFxyXG4gKiBcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTWFpTGlhbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haUxpYW5nIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgbWFpblVybDogc3RyaW5nID0gXCJodHRwczovL3N3dGoubXJrenguY25cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgdWNsaWNrOiBzdHJpbmcgPSBcIi92MS4xL2FwaS9BY3Rpdml0eS91Y2xpY2suaHRtbFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBzdGF5OiBzdHJpbmcgPSBcIi92MS4xL2FwaS9BY3Rpdml0eS9zdGF5Lmh0bWxcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGtleTogc3RyaW5nID0gXCJcIjsvL+aOqOW5v+i3r+W+hOS4reWQjOWQjeWPguaVsO+8jOmcgOimgeiwg+eUqOaWueazlVdYQVBpLmdldExhdW5jaE9wdGlvbnNTeW5jKCnvvIzku47ov5Tlm57nmoTlj4LmlbDkuK3ojrflvpfjgIJcclxuICAgIHB1YmxpYyBzdGF0aWMgTWFpTGlhbmdPcGVuSWQ6IHN0cmluZyA9IFwiXCI7Ly/kubDph4/ns7vnu5/llK/kuIDmoIfor4Ys5omn6KGMR2V0TWFpTGlhbmdPcGVuSWQoKeaWueazleaIkOWKn+WQjuiHquWKqOiOt+W+l+OAglxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdGltZTogbnVtYmVyID0gMDsvL+S5sOmHj+ezu+e7n+WUr+S4gOagh+ivhuWQju+8jOiusOW9leW9k+WJjeaXtumXtO+8iOeyvuehruWIsOenku+8ieOAglxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB5pWw5o2u55qE57G7XHJcbiAgICAgKiBcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7cmVxdWVzdERhdGF9IHJlcSBcclxuICAgICAqIEBtZW1iZXJvZiBNYWlMaWFuZ1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlcXVlc3QocmVxOiByZXF1ZXN0RGF0YSkge1xyXG4gICAgICAgIGlmIChyZXEudXJsLmluZGV4T2YoXCJodHRwczovL1wiKSA+IC0xIHx8XHJcbiAgICAgICAgICAgIHJlcS51cmwuaW5kZXhPZihcImh0dHA6Ly9cIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXEudXJsID0gcmVxLnVybDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXEudXJsID0gTWFpTGlhbmcubWFpblVybCArIHJlcS51cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb21wbGV0ZUZ1bmMgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCJNYWlMaWFuZyBodHRwIFN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAgICAgICBpZiAocmVzLlN0YXR1cyA9PSBcIjIwMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLlJlc3VsdFtcIk9wZW5JZFwiXSAhPSBudWxsICYmIHJlcy5SZXN1bHRbXCJPcGVuSWRcIl0gIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIE1haUxpYW5nLk1haUxpYW5nT3BlbklkID0gcmVzLlJlc3VsdFtcIk9wZW5JZFwiXTtcclxuICAgICAgICAgICAgICAgICAgICBNYWlMaWFuZy50aW1lID0gcmVxLmRhdGEucG9zdHRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflvpfkubDph4/ns7vnu59PcGVuSWQgXCIgKyBNYWlMaWFuZy5NYWlMaWFuZ09wZW5JZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrmiqXkubDph4/ns7vnu5/lgZznlZnml7bpl7TmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxLm9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vblN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXEub25GYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uRmFpbChyZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXEub25TdWNjZXNzID0gbnVsbDtcclxuICAgICAgICAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBlcnJvckZ1bmMgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCJNYWlMaWFuZyBodHRwIGZhaWxcIilcclxuICAgICAgICAgICAgaWYgKHJlcS5vbkZhaWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcS5vbkZhaWwocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXEub25GYWlsID0gbnVsbDtcclxuICAgICAgICAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgeGhyOiBMYXlhLkh0dHBSZXF1ZXN0ID0gbmV3IExheWEuSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCBjb21wbGV0ZUZ1bmMpO1xyXG4gICAgICAgIHhoci5vbmNlKExheWEuRXZlbnQuRVJST1IsIHRoaXMsIGVycm9yRnVuYyk7XHJcblxyXG4gICAgICAgIGlmIChyZXEubWV0aCA9PSBcImdldFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVxLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZXEuZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgcGFyYSArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxLnVybCA9IHJlcS51cmwgKyBcIj9cIiArIHBhcmE7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHJlcS51cmwsIG51bGwsIHJlcS5tZXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVxLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZXEuZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgcGFyYSArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeGhyLnNlbmQocmVxLnVybCwgcGFyYSwgcmVxLm1ldGgsIG51bGwsIFtcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X5Lmw6YeP57O757uf5ZSv5LiA5qCH6K+GSUQs5q2kSUTnmoTkvZznlKjmmK/nlKjmnaXkuIrmiqXmuLjmiI/ml7bpl7RcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzIFxyXG4gICAgICogQG1lbWJlcm9mIE1haUxpYW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0TWFpTGlhbmdPcGVuSWQob25TdWNjZXNzOiBGdW5jdGlvbiwgb25GYWlsOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gV1hBUEkuZ2V0TGF1bmNoT3B0aW9uc1N5bmMoKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gb3B0aW9uLnF1ZXJ5W1wia2V5XCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSBcIlwiICYmIFVzZXIub3BlbklkICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBNYWlMaWFuZy5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS51cmwgPSBNYWlMaWFuZy51Y2xpY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLmFwcGlkID0gQXBwQ29uZmlnLkFwcElEO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLm9wZW5pZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmRhdGEucG9zdHRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLmF1dGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLmtleSA9IGtleTtcclxuICAgICAgICAgICAgICAgICAgICByZXEuZGF0YS53eG9wZW5pZCA9IFVzZXIub3BlbklkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5tZXRoID0gXCJQT1NUXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHkubDph4/mlbDmja7mjqXlj6NcIilcclxuICAgICAgICAgICAgICAgICAgICBNYWlMaWFuZy5yZXF1ZXN0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuaKpeS5sOmHj+aVsOaNruWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgb25GYWlsKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuI3lnKjlvq7kv6HmqKHlvI/kuIvosIPnlKjvvIzpu5jorqTkuIrmiqXkubDph4/mlbDmja7lpLHotKVcIilcclxuICAgICAgICAgICAgb25GYWlsKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5Lmw6YeP5o6l5Y+j5YGc55WZ5pe26Ze0XHJcbiAgICAgKiBcclxuICAgICAgICBhcHBpZCDvvI3kuLvkvZPlsI/nqIvluo9hcHBpZFxyXG4gICAgICAgIG9wZW5pZCDvvI3kubDph4/ns7vnu5/llK/kuIDmoIfor4bvvIjkuI3lj6/nqbrvvIlcclxuICAgICAgICBwb3N0dGltZSDvvI0g6K+35rGC5pe26Ze05Yi75bqm77yI57K+56Gu5Yiw56eS77yJXHJcbiAgICAgICAgdGltZSDvvI0g5YGc55WZ5pe26ZW/77yI57K+56Gu5Yiw56eS77yJXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpTGlhbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXBvcnRTdGF5VGltZShvblN1Y2Nlc3M6IEZ1bmN0aW9uLCBvbkZhaWw6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWlMaWFuZy5NYWlMaWFuZ09wZW5JZCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICByZXEudXJsID0gTWFpTGlhbmcuc3RheTtcclxuICAgICAgICAgICAgICAgIHJlcS5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgICAgICAgICAgcmVxLmRhdGEuYXBwaWQgPSBBcHBDb25maWcuQXBwSUQ7XHJcbiAgICAgICAgICAgICAgICByZXEuZGF0YS5vcGVuaWQgPSBNYWlMaWFuZy5NYWlMaWFuZ09wZW5JZDtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgcmVxLmRhdGEucG9zdHRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXl0aW1lID0gTWFpTGlhbmcudGltZSAhPSAwID8gdGltZSAtIE1haUxpYW5nLnRpbWUgOiAwO1xyXG4gICAgICAgICAgICAgICAgcmVxLmRhdGEudGltZSA9IHN0YXl0aW1lO1xyXG4gICAgICAgICAgICAgICAgcmVxLm1ldGggPSBcIlBPU1RcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB5YGc55WZ5pe26Ze06Iez5Lmw6YeP5o6l5Y+jXCIpXHJcbiAgICAgICAgICAgICAgICBNYWlMaWFuZy5yZXF1ZXN0KHJlcSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiN5Zyo5b6u5L+h5qih5byP5LiL6LCD55So77yM6buY6K6k5Y+R6YCB5YGc55WZ5pe26Ze06Iez5Lmw6YeP5o6l5Y+j5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIG9uRmFpbChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IExvYWRpbmdWaWV3IGZyb20gXCIuL1ZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXdcIjtcclxuaW1wb3J0IEFlc1Rvb2xzIGZyb20gXCIuL05ldC9BZXNUb29sc1wiO1xyXG5pbXBvcnQgSHR0cFVuaXQgZnJvbSBcIi4vTmV0L0h0dHBVbml0XCI7XHJcbmltcG9ydCBOZXRDb25maWcgZnJvbSBcIi4vTmV0L05ldENvbmZpZ1wiO1xyXG5pbXBvcnQgV1hBUEkgZnJvbSBcIi4vV1hBUElcIjtcclxuaW1wb3J0IEFwcENvbmZpZyBmcm9tIFwiLi9BcHBDb25maWdcIjtcclxuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IE9QUE9BUEkgZnJvbSBcIi4vT1BQT0FQSVwiO1xyXG5pbXBvcnQgUVFNaW5pR2FtZUFQSSBmcm9tIFwiLi9RUU1pbmlHYW1lQVBJXCI7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHJcblx0cHJvdGVjdGVkIF9sb2FkaW5nVUkgOiB1aS5WaWV3LkxvYWRpbmdVSSA9IG51bGw7XHJcblx0cHJvdGVjdGVkIF9sb2FkaW5nVmlldyA6IExvYWRpbmdWaWV3ID0gbnVsbDtcclxuXHQvL+mihOWKoOi9veWIl+ihqFxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX3ByZUxvYWRSZXMgOiBBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4gKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHRpZighTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUgJiYgIUxheWEuQnJvd3Nlci5vblFHTWluaUdhbWUgJiYgIUxheWEuQnJvd3Nlci5vblFRTWluaUdhbWUpLy/lpoLmnpzkuI3mmK/lsI/muLjmiI/vvIzotYTmupDmnI3liqHlmajorr7nva7kuLrmnKzlnLDmtYvor5XlnLDlnYBcclxuXHRcdHtcclxuXHRcdFx0QXBwQ29uZmlnLlJlc1NlcnZlciA9IEFwcENvbmZpZy5Mb2NhbFRlc3RSZVNlcnZlcjtcclxuXHRcdH1cclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHRMYXlhLmxvYWRlci5tYXhMb2FkZXIgPSA1MDtcclxuXHRcdHRoaXMuaW5pdExvYWRpbmdWaWV3KClcclxuXHRcdC8v5Yqg6L296YeN6KaB6YWN572u77yM6L+Z5Lqb6YWN572u5b+F6aG75Zyo5ri45oiP5ZCv5Yqo5YmN5Yqg6L295a6M5oiQXHJcblx0XHR2YXIgZmlyc3RDb25maWdzID0gXHJcblx0XHRbXHJcblx0XHRcdHsgdXJsOiBBcHBDb25maWcuUmVzU2VydmVyICsgXCIvanNvbi9hcHBzd2l0Y2guanNvblwiLCB0eXBlOiBMYXlhLkxvYWRlci5KU09OIH1cclxuXHRcdF1cclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdExheWEubG9hZGVyLmxvYWQoZmlyc3RDb25maWdzLExheWEuSGFuZGxlci5jcmVhdGUodGhpcywoKT0+XHJcblx0XHR7XHJcblx0XHRcdHNlbGYubG9hZFJlcygpOy8v5Yqg6L296LWE5rqQXHJcblx0XHR9KSlcclxuXHRcdEV2ZW50TWdyLmluc3RhbmNlLnJlZ09uY2VFdmVudChFdmVudERlZi5BcHBfQ2xvc2VGaXJzdExvYWRpbmdWaWV3LHRoaXMsdGhpcy5jbG9zZWxvYWRpbmdVSSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGluaXRMb2FkaW5nVmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5fbG9hZGluZ1VJID0gbmV3IHVpLlZpZXcuTG9hZGluZ1VJKCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX2xvYWRpbmdVSSk7XHJcblx0XHR0aGlzLl9sb2FkaW5nVUkud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG5cdFx0dGhpcy5fbG9hZGluZ1VJLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG5cdFx0dGhpcy5fbG9hZGluZ1ZpZXcgPSB0aGlzLl9sb2FkaW5nVUkuZ2V0Q29tcG9uZW50KExvYWRpbmdWaWV3KVxyXG5cdFx0dGhpcy5fbG9hZGluZ1ZpZXcuc2V0UHJvY2VzcygwKTtcclxuXHR9XHJcblxyXG5cclxuXHRwcml2YXRlIHBvc3RSZXNUb09wZW5EYXRhQ29udGV4dChvbkNvbXBsYXRlIDogRnVuY3Rpb24pXHJcblx0e1xyXG5cdFx0aWYoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpXHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwi5byA5aeL6YCP5Lyg6LWE5rqQ5pWw5o2u5Yiw5byA5pS+5Z+fXCIpO1xyXG5cdFx0XHRMYXlhLmxvYWRlci5sb2FkKFxyXG5cdFx0XHRcdFtcclxuXHRcdFx0XHRcdFwib3BlblJlcy9SYW5rLmF0bGFzXCIsXHJcblx0XHRcdFx0XVxyXG5cdFx0XHRcdCxMYXlhLkhhbmRsZXIuY3JlYXRlKG51bGwsZnVuY3Rpb24oKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TGF5YS5NaW5pQWRwdGVyLnNlbmRBdGxhc1RvT3BlbkRhdGFDb250ZXh0KFwib3BlblJlcy9SYW5rLmF0bGFzXCIpOyAgICBcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIumAj+S8oOi1hOa6kOaVsOaNruWIsOW8gOaUvuWfnyAg5a6M5q+V77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdGlmKG9uQ29tcGxhdGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0b25Db21wbGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRpZihvbkNvbXBsYXRlKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0b25Db21wbGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHByZUxvYWQoKVxyXG5cdHtcclxuXHRcdC8v6L+Z6YeM5re75Yqg5L2g6ZyA6KaB6aKE5Yqg6L2955qE6LWE5rqQXHJcblx0XHQvL3RoaXMuX3ByZUxvYWRSZXMucHVzaCh7IHVybDogQXBwQ29uZmlnLlJlc1NlcnZlciArIFwiL2pzb24vZXhhbXBsZS5qc29uXCIsIHR5cGU6IExheWEuTG9hZGVyLkpTT04gfSk7XHJcblx0fVxyXG5cclxuXHRsb2FkUmVzKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5wcmVMb2FkKCk7XHJcblx0XHR2YXIgcmVzb3VyY2U6IEFycmF5PGFueT4gPSB0aGlzLl9wcmVMb2FkUmVzO1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0aWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcblx0XHRcdC8v5byA5aeL5Yqg6L295YiG5YyFXHJcblx0XHRcdHZhciBsb2FkU3ViUmVzVGFzazogYW55ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLmxvYWRTdWJwYWNrYWdlKHtcclxuXHRcdFx0XHRuYW1lOiAnc3ViUmVzJyxcclxuXHRcdFx0XHRzdWNjZXNzOiAocmVzKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0Ly8g5YiG5YyF5Yqg6L295oiQ5YqfLOW8gOWni+mihOWKoOi9vei1hOa6kFxyXG5cdFx0XHRcdFx0aWYocmVzb3VyY2UubGVuZ3RoID4gMClcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0TGF5YS5sb2FkZXIubG9hZChyZXNvdXJjZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5vbkxvYWRSZXNDb21wbGF0ZSgpOy8v6aKE5Yqg6L295a6M5oiQXHJcblx0XHRcdFx0XHRcdH0pLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIChyZXMpID0+IHtcclxuXHRcdFx0XHRcdFx0XHQvL3RvZG866Lef5paw6L+b5bqm5p2hXHJcblx0XHRcdFx0XHRcdFx0c2VsZi5fbG9hZGluZ1ZpZXcuc2V0UHJvY2VzcyhyZXMgLyAyICsgMC41KTtcclxuXHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRzZWxmLm9uTG9hZFJlc0NvbXBsYXRlKCk7Ly/pooTliqDovb3lrozmiJBcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWw6IChyZXMpID0+IFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMubG9hZFJlcygpOy8v5Yqg6L295aSx6LSl77yM6YeN5paw5Yqg6L29XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0bG9hZFN1YlJlc1Rhc2sub25Qcm9ncmVzc1VwZGF0ZShyZXMgPT4gXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxmLl9sb2FkaW5nVmlldy5zZXRQcm9jZXNzKHJlcyAvIDIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gXHJcblx0XHRlbHNlIGlmKExheWEuQnJvd3Nlci5vblFHTWluaUdhbWUpIC8vb3Bwb+Wwj+a4uOaIj1xyXG5cdFx0e1xyXG5cdFx0XHQvL+W8gOWni+WKoOi9veWIhuWMhVxyXG5cdFx0XHR2YXIgbG9hZFN1YlJlc1Rhc2s6IGFueSA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJxZ1wiXS5sb2FkU3VicGFja2FnZSh7XHJcblx0XHRcdFx0bmFtZTogJ3N1YlJlcycsXHJcblx0XHRcdFx0c3VjY2VzczogKHJlcykgPT4ge1xyXG5cclxuXHRcdFx0XHRcdC8vIOWIhuWMheWKoOi9veaIkOWKnyzlvIDlp4vpooTliqDovb3otYTmupBcclxuXHRcdFx0XHRcdGlmIChyZXNvdXJjZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdExheWEubG9hZGVyLmxvYWQocmVzb3VyY2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYub25Mb2FkUmVzQ29tcGxhdGUoKTsvL+mihOWKoOi9veWujOaIkFxyXG5cdFx0XHRcdFx0XHR9KSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAocmVzKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0Ly90b2RvOui3n+aWsOi/m+W6puadoVxyXG5cdFx0XHRcdFx0XHRcdHNlbGYuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MocmVzIC8gMiArIDAuNSk7XHJcblx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzZWxmLm9uTG9hZFJlc0NvbXBsYXRlKCk7Ly/pooTliqDovb3lrozmiJBcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWw6IChyZXMpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMubG9hZFJlcygpOy8v5Yqg6L295aSx6LSl77yM6YeN5paw5Yqg6L29XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0bG9hZFN1YlJlc1Rhc2sub25Qcm9ncmVzc1VwZGF0ZShyZXMgPT4ge1xyXG5cdFx0XHRcdC8vIOWKoOi9vei/m+W6pueZvuWIhuavlFxyXG5cdFx0XHRcdHZhciBwcm9ncmVzcyA9IHJlc1tcInByb2dyZXNzXCJdO1xyXG5cdFx0XHRcdC8vIOS4i+i9veaVsOaNrlxyXG5cdFx0XHRcdHZhciB0b3RhbEJ5dGVzV3JpdHRlbiA9IHJlc1tcInRvdGFsQnl0ZXNXcml0dGVuXCJdO1xyXG5cdFx0XHRcdC8vIOaAu+mVv+W6plxyXG5cdFx0XHRcdHZhciB0b3RhbEJ5dGVzRXhwZWN0ZWRUb1dyaXRlID0gcmVzW1widG90YWxCeXRlc0V4cGVjdGVkVG9Xcml0ZVwiXTtcclxuXHRcdFx0XHRzZWxmLl9sb2FkaW5nVmlldy5zZXRQcm9jZXNzKHByb2dyZXNzIC8gMik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSkge1xyXG5cdFx0XHQvL+W8gOWni+WKoOi9veWIhuWMhVxyXG5cdFx0XHR2YXIgbG9hZFN1YlJlc1Rhc2s6IGFueSA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJxcVwiXS5sb2FkU3VicGFja2FnZSh7XHJcblx0XHRcdFx0bmFtZTogJ3N1YlJlcycsXHJcblx0XHRcdFx0c3VjY2VzczogKHJlcykgPT4ge1xyXG5cclxuXHRcdFx0XHRcdC8vIOWIhuWMheWKoOi9veaIkOWKnyzlvIDlp4vpooTliqDovb3otYTmupBcclxuXHRcdFx0XHRcdGlmKHJlc291cmNlLmxlbmd0aCA+IDApXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdExheWEubG9hZGVyLmxvYWQocmVzb3VyY2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYub25Mb2FkUmVzQ29tcGxhdGUoKTsvL+mihOWKoOi9veWujOaIkFxyXG5cdFx0XHRcdFx0XHR9KSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAocmVzKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0Ly90b2RvOui3n+aWsOi/m+W6puadoVxyXG5cdFx0XHRcdFx0XHRcdHNlbGYuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MocmVzIC8gMiArIDAuNSk7XHJcblx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c2VsZi5vbkxvYWRSZXNDb21wbGF0ZSgpOy8v6aKE5Yqg6L295a6M5oiQXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWlsOiAocmVzKSA9PiBcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLmxvYWRSZXMoKTsvL+WKoOi9veWksei0pe+8jOmHjeaWsOWKoOi9vVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdGxvYWRTdWJSZXNUYXNrLm9uUHJvZ3Jlc3NVcGRhdGUocmVzID0+IFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5fbG9hZGluZ1ZpZXcuc2V0UHJvY2VzcyhyZXMgLyAyKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSAge1xyXG5cdFx0XHRpZiAocmVzb3VyY2UubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdExheWEubG9hZGVyLmxvYWQocmVzb3VyY2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0c2VsZi5vbkxvYWRSZXNDb21wbGF0ZSgpO1xyXG5cdFx0XHRcdH0pLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIChyZXMpID0+IHtcclxuXHRcdFx0XHRcdHNlbGYuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MocmVzKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0c2VsZi5vbkxvYWRSZXNDb21wbGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkxvYWRSZXNDb21wbGF0ZSgpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MoMSk7XHJcblx0XHRpZihMYXlhLkJyb3dzZXIub25NaW5pR2FtZSlcclxuXHRcdHtcclxuXHRcdFx0V1hBUEkud3hMb2dpbihmdW5jdGlvbiAoY29kZSkge1xyXG5cdFx0XHRcdFVzZXIuY29kZSA9IGNvZGVcclxuXHRcdFx0XHRIdHRwVW5pdC5sb2dpbihcclxuXHRcdFx0XHQocmVzKT0+IFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGlmKHJlcy5jb2RlID09IDEpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi55m76ZmG5oiQ5Yqf77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRVc2VyLnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcblx0XHRcdFx0XHRcdFVzZXIub3BlbklkID0gcmVzLmRhdGEub3BlbmlkO1xyXG5cdFx0XHRcdFx0XHRIdHRwVW5pdC5nZXRHYW1lRGF0YSgocmVzKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35pWw5o2u5oiQ5Yqf77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRcdGlmKDEgPT0gcmVzLmNvZGUpXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0VXNlci5pbml0aVVzZXIocmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0VXNlci5pbml0aVVzZXIobnVsbCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHRcdH0sKHJlcyk9PntcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuiOt+WPlueUqOaIt+aVsOaNruWksei0pe+8ge+8ge+8gVwiKTtcclxuXHRcdFx0XHRcdFx0XHRVc2VyLmluaXRpVXNlcihudWxsKTtcclxuXHRcdFx0XHRcdFx0XHRHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSwgZmFsc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0KHJlcykgPT4gXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCLnmbvpmYblpLHotKXvvIHvvIHvvIFcIiArIHJlcyk7XHJcblx0XHRcdFx0XHRVc2VyLmluaXRpVXNlcihudWxsKTtcclxuXHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sIG51bGwpXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKExheWEuQnJvd3Nlci5vblFHTWluaUdhbWUpIC8vb3Bwb+Wwj+a4uOaIj1xyXG5cdFx0e1xyXG5cdFx0XHRPUFBPQVBJLmluaXRBZFNlcnZpY2UoKCk9PntcclxuXHRcclxuXHRcdFx0fSwoKT0+XHJcblx0XHRcdHtcclxuXHJcblx0XHRcdH0sKCk9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0T1BQT0FQSS5Mb2dpbihmdW5jdGlvbiAodG9rZW4pIHtcclxuXHRcdFx0XHRVc2VyLmNvZGUgPSB0b2tlbjtcclxuXHRcdFx0XHRIdHRwVW5pdC5sb2dpbihcclxuXHRcdFx0XHRcdChyZXMpPT4gXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09IDEpXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIueZu+mZhuaIkOWKn++8ge+8ge+8gVwiKTtcclxuXHRcdFx0XHRcdFx0XHRVc2VyLnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcblx0XHRcdFx0XHRcdFx0VXNlci5vcGVuSWQgPSByZXMuZGF0YS5vcGVuaWQ7XHJcblx0XHRcdFx0XHRcdFx0SHR0cFVuaXQuZ2V0R2FtZURhdGEoKHJlcyk9PntcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35pWw5o2u5oiQ5Yqf77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoMSA9PSByZXMuY29kZSlcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0VXNlci5pbml0aVVzZXIocmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuiOt+WPlueUqOaIt+aVsOaNri0tLS0tLS0tLS0tLS0tLS0tLS0tU3RhcnRcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZvcih2YXIga2V5IGluIHJlcy5kYXRhKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coa2V5LCByZXMuZGF0YVtrZXldKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuiOt+WPlueUqOaIt+aVsOaNri0tLS0tLS0tLS0tLS0tLS0tLS0tRW5kXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRVc2VyLmluaXRpVXNlcihudWxsKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0XHRcdH0sKHJlcyk9PntcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35pWw5o2u5aSx6LSl77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0VXNlci5pbml0aVVzZXIobnVsbCk7XHJcblx0XHRcdFx0XHRcdFx0XHRHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSwgZmFsc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0KHJlcykgPT4gXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi55m76ZmG5aSx6LSl77yB77yB77yBXCIscmVzKTtcclxuXHRcdFx0XHRcdFx0VXNlci5pbml0aVVzZXIobnVsbCk7XHJcblx0XHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHR9LCBudWxsKVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihMYXlhLkJyb3dzZXIub25RUU1pbmlHYW1lKVxyXG5cdFx0e1xyXG5cdFx0XHRRUU1pbmlHYW1lQVBJLkxvZ2luKGZ1bmN0aW9uIChjb2RlKSB7XHJcblx0XHRcdFx0VXNlci5jb2RlID0gY29kZVxyXG5cdFx0XHRcdEh0dHBVbml0LmxvZ2luKFxyXG5cdFx0XHRcdChyZXMpPT4gXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aWYocmVzLmNvZGUgPT0gMSlcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCLnmbvpmYbmiJDlip/vvIHvvIHvvIFcIik7XHJcblx0XHRcdFx0XHRcdFVzZXIudG9rZW4gPSByZXMuZGF0YS50b2tlbjtcclxuXHRcdFx0XHRcdFx0VXNlci5vcGVuSWQgPSByZXMuZGF0YS5vcGVuaWQ7XHJcblx0XHRcdFx0XHRcdEh0dHBVbml0LmdldEdhbWVEYXRhKChyZXMpPT57XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCLojrflj5bnlKjmiLfmlbDmja7miJDlip/vvIHvvIHvvIFcIik7XHJcblx0XHRcdFx0XHRcdFx0aWYoMSA9PSByZXMuY29kZSlcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRVc2VyLmluaXRpVXNlcihyZXMuZGF0YSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRVc2VyLmluaXRpVXNlcihudWxsKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUsIGZhbHNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdFx0fSwocmVzKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35pWw5o2u5aSx6LSl77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFVzZXIuaW5pdGlVc2VyKG51bGwpO1xyXG5cdFx0XHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQocmVzKSA9PiBcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIueZu+mZhuWksei0pe+8ge+8ge+8gVwiICsgcmVzKTtcclxuXHRcdFx0XHRcdFVzZXIuaW5pdGlVc2VyKG51bGwpO1xyXG5cdFx0XHRcdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUsIGZhbHNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSwgbnVsbClcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0VXNlci50ZXN0SW5pdFVzZXIoKTsvL+a1i+ivlVxyXG5cdFx0XHRHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSwgZmFsc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2xvc2Vsb2FkaW5nVUkoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuX2xvYWRpbmdVSSAmJiAhdGhpcy5fbG9hZGluZ1VJLmRlc3Ryb3llZClcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5fbG9hZGluZ1VJLmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiaW1wb3J0IFV0aWxpdCBmcm9tIFwiLi4vVXRpbGl0XCI7XHJcbmltcG9ydCBWaWV3TWdyLCB7IFZpZXdEZWYgfSBmcm9tIFwiLi9WaWV3TWdyXCI7XHJcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IEh0dHBVbml0IGZyb20gXCIuLi9OZXQvSHR0cFVuaXRcIjtcclxuaW1wb3J0IE1haUxpYW5nIGZyb20gXCIuLi9NYWlMaWFuZ0FQSS9NYWlMaWFuZ1wiO1xyXG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vV1hBUElcIjtcclxuaW1wb3J0IEFwcFN3aXRjaENvbmZpZyBmcm9tIFwiLi4vQ29uZmlnL0FwcFN3aXRjaENvbmZpZ1wiO1xyXG5pbXBvcnQgV3VkaWFuTWdyIGZyb20gXCIuL1d1ZGlhbk1nclwiO1xyXG5cclxuLy/muLjmiI/nrqHnkIblmajvvIzmuLjmiI/ku6PnoIHnmoTlhaXlj6NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1nciBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNZ3IgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lTWdyIHsgcmV0dXJuIEdhbWVNZ3IuX2luc3RhbmNlOyB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBHYW1lTWdyLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgb25Bd2FrZSgpICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIOeOsOWcqOaYr+S7gOS5iOW5s+WPsDpcIiArIExheWEuQnJvd3Nlci5vblFRTWluaUdhbWUpXHJcbiAgICAgICAgTWFpTGlhbmcuR2V0TWFpTGlhbmdPcGVuSWQoZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVVSSDkubDph4/mlbDmja7kuIrmiqXmiJDlip9cIik7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5vblNob3coZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgTWFpTGlhbmcuR2V0TWFpTGlhbmdPcGVuSWQobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5vbkhpZGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgTWFpTGlhbmcuUmVwb3J0U3RheVRpbWUobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lVUkg5Lmw6YeP5pWw5o2u5LiK5oql5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgV1hBUEkuU2V0U2hhcmVNZW51KFwiXCIsIFwiXCIsXHJcbiAgICAgICAgICAgICgpID0+ICB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiAge1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4gIHtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFydCgpICB7XHJcbiAgICAgICAgdGhpcy5wcmVDcmVhdGVHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVDcmVhdGVHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIC8vdG9kb++8mui/memHjOa3u+WKoOWIneWni+WMluS4u+WcuuaZr+eahOS7o+eggeOAgkV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFwcF9DbG9zZUZpcnN0TG9hZGluZ1ZpZXcpOyDmt7vliqDliLDkvaDnmoTlhbPljaHliqDovb3lrozmiJDnmoTlm57osIPkuK3vvIzlhbPpl63liqDovb3nlYzpnaJcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WtmOahoyzku4XlvZPkvZznpLrkvovvvIzlrp7pmYXlrZjmoaPmoLnmja7lrp7pmYXpobnnm67lkIToh6rlrp7njrBcclxuICAgIHB1YmxpYyBzYXZlR2FtZURhdGEoKSAge1xyXG4gICAgICAgIEh0dHBVbml0LnNhdmVHYW1lRGF0YShVc2VyLmdldFNhdmVEYXRhKCksXHJcbiAgICAgICAgICAgIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrZjmoaPmiJDlip9cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5a2Y5qGj5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5a2Y5qGj5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi9WaWV3L1ZpZXdCYXNlXCI7XHJcblxyXG5leHBvcnQgZW51bSBWaWV3RGVmXHJcbntcclxuICAgIE5vbmUgPSBcIlwiLFxyXG4gICAgVGlwc1ZpZXcgPSBcIlZpZXcvVGlwc1ZpZXcuanNvblwiLFxyXG4gICAgQ2xpY2tHZXRQcml6ZSA9IFwiVmlldy9DbGlja0dldFByaXplLmpzb25cIlxyXG4gICAgLy90b2RvOua3u+WKoOS9oOeahOeVjOmdolxyXG59XHJcblxyXG4vL+eVjOmdoueuoeeQhuWZqFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWdyIFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGluc3RhbmNlOiBWaWV3TWdyID0gbmV3IFZpZXdNZ3IoKTtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBfdmlld3MgOiBhbnkgPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgb3BlblZpZXcodmlld1R5cGUgOlZpZXdEZWYsZGF0YT8gOiBhbnksb25jb21wbGF0ZT8gOiBGdW5jdGlvbik6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fdmlld3Nbdmlld1R5cGVdKVxyXG4gICAgICAgIHsgIFxyXG4gICAgICAgICAgICB2YXIgdmlldyA9IHRoaXMuX3ZpZXdzW3ZpZXdUeXBlXTtcclxuICAgICAgICAgICAgbGV0IGNvbXMgPSB2aWV3Ll9jb21wb25lbnRzO1xyXG4gICAgICAgICAgICBsZXQgdmlld0Jhc2UgOiBWaWV3QmFzZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKGNvbXMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuX3ZpZXdCYXNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0Jhc2UgPSBlbGVtZW50IGFzIFZpZXdCYXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdCYXNlLm9wZW5WaWV3KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYob25jb21wbGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb25jb21wbGF0ZSh2aWV3QmFzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdmlld1VybCA9IFN0cmluZyh2aWV3VHlwZSlcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5sb2FkKHZpZXdVcmwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAob3duZXI6IGFueSkge1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKG93bmVyKTtcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBvd25lciBhcyBMYXlhLlZpZXc7XHJcbiAgICAgICAgICAgIHNlbGYuX3ZpZXdzW3ZpZXdUeXBlXSA9IHZpZXc7XHJcbiAgICAgICAgICAgIGxldCBjb21zID0gb3duZXIuX2NvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIGxldCB2aWV3QmFzZSA6IFZpZXdCYXNlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYoY29tcyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY29tc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5fdmlld0Jhc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3QmFzZSA9IGVsZW1lbnQgYXMgVmlld0Jhc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuX3ZpZXdEZWYgPSB2aWV3VHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0Jhc2Uub3BlblZpZXcoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihvbmNvbXBsYXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvbmNvbXBsYXRlKHZpZXdCYXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VWaWV3KHZpZXdUeXBlIDpWaWV3RGVmKSBcclxuICAgIHtcclxuICAgICAgICB2YXIgdmlldyA6IExheWEuVmlldyA9IHRoaXMuX3ZpZXdzW3ZpZXdUeXBlXTtcclxuICAgICAgICBpZih2aWV3KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG93bmVyID0gdmlldyBhcyBhbnk7XHJcbiAgICAgICAgICAgIGxldCBjb21zID0gb3duZXIuX2NvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIGlmKGNvbXMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuX3ZpZXdCYXNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2aWV3LnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmlldy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdzW3ZpZXdUeXBlXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93Vmlldyh2aWV3VHlwZSA6Vmlld0RlZikgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZpZXcgID0gdGhpcy5fdmlld3Nbdmlld1R5cGVdO1xyXG4gICAgICAgIGlmKHZpZXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY29tcyA9IHZpZXcuX2NvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIGlmKGNvbXMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuX3ZpZXdCYXNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZVZpZXcodmlld1R5cGUgOlZpZXdEZWYpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciB2aWV3ID0gdGhpcy5fdmlld3Nbdmlld1R5cGVdO1xyXG4gICAgICAgIGlmKHZpZXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY29tcyA9IHZpZXcuX2NvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIGlmKGNvbXMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuX3ZpZXdCYXNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Vmlldyh2aWV3VHlwZSA6Vmlld0RlZikgOiBMYXlhLlZpZXdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlld3Nbdmlld1R5cGVdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VGlwcyhtc2cgOiBzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LG1zZyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBDcnlwdG9KUyBmcm9tIFwiLi9hZXMuanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWVzVG9vbHNcclxue1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgS0VZID0gJ2IjNjNmRko2QXZrSzNZVConO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSVYgPSAnSiRmNERVJXNOTDczTSZHbyc7XHJcblxyXG4gICAgLy/liqDlr4ZcclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jcnlwdChzdHI6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBrZXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZShBZXNUb29scy5LRVkpOy8vIOenmOmSpVxyXG4gICAgICAgIHZhciBpdiA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKEFlc1Rvb2xzLklWKTsvL+WQkemHj2l2XHJcbiAgICAgICAgdmFyIGVuY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KHN0ciwga2V5LCB7IGl2OiBpdiwgbW9kZTogQ3J5cHRvSlMubW9kZS5DQkMsIHBhZGRpbmc6IENyeXB0b0pTLnBhZC5Qa2NzNyB9KTtcclxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/op6Plr4ZcclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjcnlwdChzdHI6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBrZXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZShBZXNUb29scy5LRVkpOy8vIOenmOmSpVxyXG4gICAgICAgIHZhciBpdiA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKEFlc1Rvb2xzLklWKTsvL+WQkemHj2l2XHJcbiAgICAgICAgdmFyIGRlY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KHN0ciwga2V5LCB7IGl2OiBpdiwgcGFkZGluZzogQ3J5cHRvSlMucGFkLlBrY3M3IH0pO1xyXG4gICAgICAgIHJldHVybiBkZWNyeXB0ZWQudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufSIsImltcG9ydCBOZXRDb25maWcgZnJvbSBcIi4vTmV0Q29uZmlnXCI7XHJcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IEFlc1Rvb2xzIGZyb20gXCIuL0Flc1Rvb2xzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcmVxdWVzdERhdGFcclxue1xyXG4gICAgcHVibGljIG1ldGggOiBzdHJpbmcgPSBcInBvc3RcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBkYXRhIDogYW55O1xyXG4gICAgcHVibGljIHVybCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgb25TdWNjZXNzIDogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHVibGljIG9uRmFpbCA6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0dHBVbml0IFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcXVlc3QocmVxIDogcmVxdWVzdERhdGEpIHtcclxuICAgICAgICBpZiAocmVxLnVybC5pbmRleE9mKFwiaHR0cHM6Ly9cIikgPiAtMSB8fFxyXG4gICAgICAgICAgICByZXEudXJsLmluZGV4T2YoXCJodHRwOi8vXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgcmVxLnVybCA9IHJlcS51cmw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVxLnVybCA9IE5ldENvbmZpZy5zZXJ2ZXJVcmwgKyByZXEudXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvbXBsZXRlRnVuYyA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLFwiaHR0cCBTdWNjZXNzXCIpXHJcbiAgICAgICAgICAgIGlmIChyZXEub25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXEub25TdWNjZXNzKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlcSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGVycm9yRnVuYyA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLFwiaHR0cCBmYWlsXCIpXHJcbiAgICAgICAgICAgIGlmIChyZXEub25GYWlsKSAge1xyXG4gICAgICAgICAgICAgICAgcmVxLm9uRmFpbChyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcS5vbkZhaWwgPSBudWxsO1xyXG4gICAgICAgICAgICByZXEgPSBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB4aHI6IExheWEuSHR0cFJlcXVlc3QgPSBuZXcgTGF5YS5IdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsIHRoaXMsIGNvbXBsZXRlRnVuYyk7XHJcbiAgICAgICAgeGhyLm9uY2UoTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgZXJyb3JGdW5jKTtcclxuICAgICAgICBsZXQgZGF0YVN0cjpzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyZXEuZGF0YSk7XHJcblxyXG4gICAgICAgIGlmKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVxLmRhdGEuY29kZSA9IFVzZXIuY29kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihMYXlhLkJyb3dzZXIub25RR01pbmlHYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVxLmRhdGEub3Bwb3Rva2VuID0gVXNlci5jb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKExheWEuQnJvd3Nlci5vblFRTWluaUdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXEuZGF0YS5xcXRva2VuID0gVXNlci5jb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRpbWUgPSBcInRpbWU9XCIgKyBTdHJpbmcoRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgdmFyIGhlYWRlciA9IFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIFwic3RhdGVcIiAsIE5ldENvbmZpZy5zdGF0ZSxcclxuICAgICAgICAgICAgXCJnYW1laWRcIiAsTmV0Q29uZmlnLmdhbWVpZCxcclxuICAgICAgICAgICAgXCJzaWduXCIgLEFlc1Rvb2xzLmVuY3J5cHQodGltZSksXHJcbiAgICAgICAgXVxyXG4gICAgICAgIGlmKFVzZXIudG9rZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoZWFkZXIucHVzaChcInRva2VuXCIpO1xyXG4gICAgICAgICAgICBoZWFkZXIucHVzaChVc2VyLnRva2VuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHhoci5zZW5kKHJlcS51cmwsIEpTT04uc3RyaW5naWZ5KHJlcS5kYXRhKSwgcmVxLm1ldGgsIFwianNvblwiLGhlYWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy90b2RvOui/memHjOa3u+WKoOS9oOS7rOWSjOacjeWKoeWZqOebuOS6kueahOaOpeWPo1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9naW4ob25TdWNjZXNzIDogRnVuY3Rpb24sb25GYWlsIDogRnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIHJlcS51cmwgPSBOZXRDb25maWcuTG9naW47XHJcbiAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgIEh0dHBVbml0LnJlcXVlc3QocmVxKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlR2FtZURhdGEoZ2FtZURhdGEgOiBhbnksb25TdWNjZXNzIDogRnVuY3Rpb24sb25GYWlsIDogRnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIHJlcS51cmwgPSBOZXRDb25maWcuU2F2ZUdhbWVEYXRhO1xyXG4gICAgICAgIHJlcS5kYXRhLmdhbWVEYXRhID0gZ2FtZURhdGE7XHJcbiAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgIEh0dHBVbml0LnJlcXVlc3QocmVxKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRHYW1lRGF0YShvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgcmVxLnVybCA9IE5ldENvbmZpZy5HZXRVc2VyO1xyXG4gICAgICAgIHJlcS5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgcmVxLm9uRmFpbCA9IG9uRmFpbDtcclxuICAgICAgICBIdHRwVW5pdC5yZXF1ZXN0KHJlcSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSVDlsY/olL3mlrnms5XvvIzpnIDopoHlnKhOZXRDb25maWfnsbvkuK3orr7nva5JcEJsb2Nr55qE5o6l5Y+j5Zyw5Z2AXHJcbiAgICAgKiBvblN1Y2Nlc3Pmlrnms5Xov5Tlm57lj4LmlbDnmoTojIPkvovkuLogT2JqZWN0IHtjb2RlOiAwLCBtc2c6IFwi5YeG5LiA57q/XCIsIHRpbWU6IFwiMTU3MTAzNDQ0N1wiLCBkYXRhOiBudWxsfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIEh0dHBVbml0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0SXBCbG9jayhvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbil7XHJcbiAgICAgICAgdmFyIHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIHJlcS51cmwgPSBOZXRDb25maWcuSXBCbG9jaztcclxuICAgICAgICByZXEub25TdWNjZXNzID0gb25TdWNjZXNzO1xyXG4gICAgICAgIHJlcS5vbkZhaWwgPSBvbkZhaWw7XHJcbiAgICAgICAgSHR0cFVuaXQucmVxdWVzdChyZXEpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldENvbmZpZ1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHN0YXRlID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZWlkIDogbnVtYmVyID0gLTE7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNlcnZlclVybCA6IHN0cmluZyA9IFwiaHR0cHM6Ly9zeXN4dWUuNWlhcGUuY29tXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExvZ2luIDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU2F2ZUdhbWVEYXRhIDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0VXNlciA9IFwiXCI7XHJcbiAgICAvKiDnlKjmnaXlr7lJUOWcsOWdgOi/m+ihjOWxj+iUveeahOaOpeWPo+WcsOWdgO+8jOWPr+S7peS9v+eUqOaOpeWPo+eahOi/lOWbnuWAvOiuqeafkOS6m+W5v+WRiumAu+i+keWcqOW+ruS/oeeahOWuoeaguOWcsOWMuijlub/lt54p5Y+R55Sf5Y+Y5YyWICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElwQmxvY2sgPSBcImh0dHBzOi8vc3lzeHVlLjVpYXBlLmNvbS9hcGkvc2hhcmUvaXBfc2VsZWN0XCI7XHJcbn0iLCJ2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCBmdW5jdGlvbiAodSwgcCkge1xyXG4gIHZhciBkID0ge30sIGwgPSBkLmxpYiA9IHt9LCBzID0gZnVuY3Rpb24gKCkgeyB9LCB0ID0gbC5CYXNlID0geyBleHRlbmQ6IGZ1bmN0aW9uIChhKSB7IHMucHJvdG90eXBlID0gdGhpczsgdmFyIGMgPSBuZXcgczsgYSAmJiBjLm1peEluKGEpOyBjLmhhc093blByb3BlcnR5KFwiaW5pdFwiKSB8fCAoYy5pbml0ID0gZnVuY3Rpb24gKCkgeyBjLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfSk7IGMuaW5pdC5wcm90b3R5cGUgPSBjOyBjLiRzdXBlciA9IHRoaXM7IHJldHVybiBjIH0sIGNyZWF0ZTogZnVuY3Rpb24gKCkgeyB2YXIgYSA9IHRoaXMuZXh0ZW5kKCk7IGEuaW5pdC5hcHBseShhLCBhcmd1bWVudHMpOyByZXR1cm4gYSB9LCBpbml0OiBmdW5jdGlvbiAoKSB7IH0sIG1peEluOiBmdW5jdGlvbiAoYSkgeyBmb3IgKHZhciBjIGluIGEpIGEuaGFzT3duUHJvcGVydHkoYykgJiYgKHRoaXNbY10gPSBhW2NdKTsgYS5oYXNPd25Qcm9wZXJ0eShcInRvU3RyaW5nXCIpICYmICh0aGlzLnRvU3RyaW5nID0gYS50b1N0cmluZykgfSwgY2xvbmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpIH0gfSxcclxuICByID0gbC5Xb3JkQXJyYXkgPSB0LmV4dGVuZCh7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoYSwgYykgeyBhID0gdGhpcy53b3JkcyA9IGEgfHwgW107IHRoaXMuc2lnQnl0ZXMgPSBjICE9IHAgPyBjIDogNCAqIGEubGVuZ3RoIH0sIHRvU3RyaW5nOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gKGEgfHwgdikuc3RyaW5naWZ5KHRoaXMpIH0sIGNvbmNhdDogZnVuY3Rpb24gKGEpIHsgdmFyIGMgPSB0aGlzLndvcmRzLCBlID0gYS53b3JkcywgaiA9IHRoaXMuc2lnQnl0ZXM7IGEgPSBhLnNpZ0J5dGVzOyB0aGlzLmNsYW1wKCk7IGlmIChqICUgNCkgZm9yICh2YXIgayA9IDA7IGsgPCBhOyBrKyspY1tqICsgayA+Pj4gMl0gfD0gKGVbayA+Pj4gMl0gPj4+IDI0IC0gOCAqIChrICUgNCkgJiAyNTUpIDw8IDI0IC0gOCAqICgoaiArIGspICUgNCk7IGVsc2UgaWYgKDY1NTM1IDwgZS5sZW5ndGgpIGZvciAoayA9IDA7IGsgPCBhOyBrICs9IDQpY1tqICsgayA+Pj4gMl0gPSBlW2sgPj4+IDJdOyBlbHNlIGMucHVzaC5hcHBseShjLCBlKTsgdGhpcy5zaWdCeXRlcyArPSBhOyByZXR1cm4gdGhpcyB9LCBjbGFtcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgYSA9IHRoaXMud29yZHMsIGMgPSB0aGlzLnNpZ0J5dGVzOyBhW2MgPj4+IDJdICY9IDQyOTQ5NjcyOTUgPDxcclxuICAgICAgICAzMiAtIDggKiAoYyAlIDQpOyBhLmxlbmd0aCA9IHUuY2VpbChjIC8gNClcclxuICAgIH0sIGNsb25lOiBmdW5jdGlvbiAoKSB7IHZhciBhID0gdC5jbG9uZS5jYWxsKHRoaXMpOyBhLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTsgcmV0dXJuIGEgfSwgcmFuZG9tOiBmdW5jdGlvbiAoYSkgeyBmb3IgKHZhciBjID0gW10sIGUgPSAwOyBlIDwgYTsgZSArPSA0KWMucHVzaCg0Mjk0OTY3Mjk2ICogdS5yYW5kb20oKSB8IDApOyByZXR1cm4gbmV3IHIuaW5pdChjLCBhKSB9XHJcbiAgfSksIHcgPSBkLmVuYyA9IHt9LCB2ID0gdy5IZXggPSB7XHJcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChhKSB7IHZhciBjID0gYS53b3JkczsgYSA9IGEuc2lnQnl0ZXM7IGZvciAodmFyIGUgPSBbXSwgaiA9IDA7IGogPCBhOyBqKyspIHsgdmFyIGsgPSBjW2ogPj4+IDJdID4+PiAyNCAtIDggKiAoaiAlIDQpICYgMjU1OyBlLnB1c2goKGsgPj4+IDQpLnRvU3RyaW5nKDE2KSk7IGUucHVzaCgoayAmIDE1KS50b1N0cmluZygxNikpIH0gcmV0dXJuIGUuam9pbihcIlwiKSB9LCBwYXJzZTogZnVuY3Rpb24gKGEpIHtcclxuICAgICAgZm9yICh2YXIgYyA9IGEubGVuZ3RoLCBlID0gW10sIGogPSAwOyBqIDwgYzsgaiArPSAyKWVbaiA+Pj4gM10gfD0gcGFyc2VJbnQoYS5zdWJzdHIoaixcclxuICAgICAgICAyKSwgMTYpIDw8IDI0IC0gNCAqIChqICUgOCk7IHJldHVybiBuZXcgci5pbml0KGUsIGMgLyAyKVxyXG4gICAgfVxyXG4gIH0sIGIgPSB3LkxhdGluMSA9IHsgc3RyaW5naWZ5OiBmdW5jdGlvbiAoYSkgeyB2YXIgYyA9IGEud29yZHM7IGEgPSBhLnNpZ0J5dGVzOyBmb3IgKHZhciBlID0gW10sIGogPSAwOyBqIDwgYTsgaisrKWUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNbaiA+Pj4gMl0gPj4+IDI0IC0gOCAqIChqICUgNCkgJiAyNTUpKTsgcmV0dXJuIGUuam9pbihcIlwiKSB9LCBwYXJzZTogZnVuY3Rpb24gKGEpIHsgZm9yICh2YXIgYyA9IGEubGVuZ3RoLCBlID0gW10sIGogPSAwOyBqIDwgYzsgaisrKWVbaiA+Pj4gMl0gfD0gKGEuY2hhckNvZGVBdChqKSAmIDI1NSkgPDwgMjQgLSA4ICogKGogJSA0KTsgcmV0dXJuIG5ldyByLmluaXQoZSwgYykgfSB9LCB4ID0gdy5VdGY4ID0geyBzdHJpbmdpZnk6IGZ1bmN0aW9uIChhKSB7IHRyeSB7IHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGIuc3RyaW5naWZ5KGEpKSkgfSBjYXRjaCAoYykgeyB0aHJvdyBFcnJvcihcIk1hbGZvcm1lZCBVVEYtOCBkYXRhXCIpOyB9IH0sIHBhcnNlOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYi5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYSkpKSB9IH0sXHJcbiAgcSA9IGwuQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IHQuZXh0ZW5kKHtcclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7IHRoaXMuX2RhdGEgPSBuZXcgci5pbml0OyB0aGlzLl9uRGF0YUJ5dGVzID0gMCB9LCBfYXBwZW5kOiBmdW5jdGlvbiAoYSkgeyBcInN0cmluZ1wiID09IHR5cGVvZiBhICYmIChhID0geC5wYXJzZShhKSk7IHRoaXMuX2RhdGEuY29uY2F0KGEpOyB0aGlzLl9uRGF0YUJ5dGVzICs9IGEuc2lnQnl0ZXMgfSwgX3Byb2Nlc3M6IGZ1bmN0aW9uIChhKSB7IHZhciBjID0gdGhpcy5fZGF0YSwgZSA9IGMud29yZHMsIGogPSBjLnNpZ0J5dGVzLCBrID0gdGhpcy5ibG9ja1NpemUsIGIgPSBqIC8gKDQgKiBrKSwgYiA9IGEgPyB1LmNlaWwoYikgOiB1Lm1heCgoYiB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7IGEgPSBiICogazsgaiA9IHUubWluKDQgKiBhLCBqKTsgaWYgKGEpIHsgZm9yICh2YXIgcSA9IDA7IHEgPCBhOyBxICs9IGspdGhpcy5fZG9Qcm9jZXNzQmxvY2soZSwgcSk7IHEgPSBlLnNwbGljZSgwLCBhKTsgYy5zaWdCeXRlcyAtPSBqIH0gcmV0dXJuIG5ldyByLmluaXQocSwgaikgfSwgY2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGEgPSB0LmNsb25lLmNhbGwodGhpcyk7XHJcbiAgICAgIGEuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7IHJldHVybiBhXHJcbiAgICB9LCBfbWluQnVmZmVyU2l6ZTogMFxyXG4gIH0pOyBsLkhhc2hlciA9IHEuZXh0ZW5kKHtcclxuICAgIGNmZzogdC5leHRlbmQoKSwgaW5pdDogZnVuY3Rpb24gKGEpIHsgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoYSk7IHRoaXMucmVzZXQoKSB9LCByZXNldDogZnVuY3Rpb24gKCkgeyBxLnJlc2V0LmNhbGwodGhpcyk7IHRoaXMuX2RvUmVzZXQoKSB9LCB1cGRhdGU6IGZ1bmN0aW9uIChhKSB7IHRoaXMuX2FwcGVuZChhKTsgdGhpcy5fcHJvY2VzcygpOyByZXR1cm4gdGhpcyB9LCBmaW5hbGl6ZTogZnVuY3Rpb24gKGEpIHsgYSAmJiB0aGlzLl9hcHBlbmQoYSk7IHJldHVybiB0aGlzLl9kb0ZpbmFsaXplKCkgfSwgYmxvY2tTaXplOiAxNiwgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGZ1bmN0aW9uIChiLCBlKSB7IHJldHVybiAobmV3IGEuaW5pdChlKSkuZmluYWxpemUoYikgfSB9LCBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGEpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChiLCBlKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgbi5ITUFDLmluaXQoYSxcclxuICAgICAgICAgIGUpKS5maW5hbGl6ZShiKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7IHZhciBuID0gZC5hbGdvID0ge307IHJldHVybiBkXHJcbn0oTWF0aCk7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHUgPSBDcnlwdG9KUywgcCA9IHUubGliLldvcmRBcnJheTsgdS5lbmMuQmFzZTY0ID0ge1xyXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoZCkgeyB2YXIgbCA9IGQud29yZHMsIHAgPSBkLnNpZ0J5dGVzLCB0ID0gdGhpcy5fbWFwOyBkLmNsYW1wKCk7IGQgPSBbXTsgZm9yICh2YXIgciA9IDA7IHIgPCBwOyByICs9IDMpZm9yICh2YXIgdyA9IChsW3IgPj4+IDJdID4+PiAyNCAtIDggKiAociAlIDQpICYgMjU1KSA8PCAxNiB8IChsW3IgKyAxID4+PiAyXSA+Pj4gMjQgLSA4ICogKChyICsgMSkgJSA0KSAmIDI1NSkgPDwgOCB8IGxbciArIDIgPj4+IDJdID4+PiAyNCAtIDggKiAoKHIgKyAyKSAlIDQpICYgMjU1LCB2ID0gMDsgNCA+IHYgJiYgciArIDAuNzUgKiB2IDwgcDsgdisrKWQucHVzaCh0LmNoYXJBdCh3ID4+PiA2ICogKDMgLSB2KSAmIDYzKSk7IGlmIChsID0gdC5jaGFyQXQoNjQpKSBmb3IgKDsgZC5sZW5ndGggJSA0OylkLnB1c2gobCk7IHJldHVybiBkLmpvaW4oXCJcIikgfSwgcGFyc2U6IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgIHZhciBsID0gZC5sZW5ndGgsIHMgPSB0aGlzLl9tYXAsIHQgPSBzLmNoYXJBdCg2NCk7IHQgJiYgKHQgPSBkLmluZGV4T2YodCksIC0xICE9IHQgJiYgKGwgPSB0KSk7IGZvciAodmFyIHQgPSBbXSwgciA9IDAsIHcgPSAwOyB3IDxcclxuICAgICAgICBsOyB3KyspaWYgKHcgJSA0KSB7IHZhciB2ID0gcy5pbmRleE9mKGQuY2hhckF0KHcgLSAxKSkgPDwgMiAqICh3ICUgNCksIGIgPSBzLmluZGV4T2YoZC5jaGFyQXQodykpID4+PiA2IC0gMiAqICh3ICUgNCk7IHRbciA+Pj4gMl0gfD0gKHYgfCBiKSA8PCAyNCAtIDggKiAociAlIDQpOyByKysgfSByZXR1cm4gcC5jcmVhdGUodCwgcilcclxuICAgIH0sIF9tYXA6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIlxyXG4gIH1cclxufSkoKTtcclxuKGZ1bmN0aW9uICh1KSB7XHJcbiAgZnVuY3Rpb24gcChiLCBuLCBhLCBjLCBlLCBqLCBrKSB7IGIgPSBiICsgKG4gJiBhIHwgfm4gJiBjKSArIGUgKyBrOyByZXR1cm4gKGIgPDwgaiB8IGIgPj4+IDMyIC0gaikgKyBuIH0gZnVuY3Rpb24gZChiLCBuLCBhLCBjLCBlLCBqLCBrKSB7IGIgPSBiICsgKG4gJiBjIHwgYSAmIH5jKSArIGUgKyBrOyByZXR1cm4gKGIgPDwgaiB8IGIgPj4+IDMyIC0gaikgKyBuIH0gZnVuY3Rpb24gbChiLCBuLCBhLCBjLCBlLCBqLCBrKSB7IGIgPSBiICsgKG4gXiBhIF4gYykgKyBlICsgazsgcmV0dXJuIChiIDw8IGogfCBiID4+PiAzMiAtIGopICsgbiB9IGZ1bmN0aW9uIHMoYiwgbiwgYSwgYywgZSwgaiwgaykgeyBiID0gYiArIChhIF4gKG4gfCB+YykpICsgZSArIGs7IHJldHVybiAoYiA8PCBqIHwgYiA+Pj4gMzIgLSBqKSArIG4gfSBmb3IgKHZhciB0ID0gQ3J5cHRvSlMsIHIgPSB0LmxpYiwgdyA9IHIuV29yZEFycmF5LCB2ID0gci5IYXNoZXIsIHIgPSB0LmFsZ28sIGIgPSBbXSwgeCA9IDA7IDY0ID4geDsgeCsrKWJbeF0gPSA0Mjk0OTY3Mjk2ICogdS5hYnModS5zaW4oeCArIDEpKSB8IDA7IHIgPSByLk1ENSA9IHYuZXh0ZW5kKHtcclxuICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7IHRoaXMuX2hhc2ggPSBuZXcgdy5pbml0KFsxNzMyNTg0MTkzLCA0MDIzMjMzNDE3LCAyNTYyMzgzMTAyLCAyNzE3MzM4NzhdKSB9LFxyXG4gICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAocSwgbikge1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgMTYgPiBhOyBhKyspIHsgdmFyIGMgPSBuICsgYSwgZSA9IHFbY107IHFbY10gPSAoZSA8PCA4IHwgZSA+Pj4gMjQpICYgMTY3MTE5MzUgfCAoZSA8PCAyNCB8IGUgPj4+IDgpICYgNDI3ODI1NTM2MCB9IHZhciBhID0gdGhpcy5faGFzaC53b3JkcywgYyA9IHFbbiArIDBdLCBlID0gcVtuICsgMV0sIGogPSBxW24gKyAyXSwgayA9IHFbbiArIDNdLCB6ID0gcVtuICsgNF0sIHIgPSBxW24gKyA1XSwgdCA9IHFbbiArIDZdLCB3ID0gcVtuICsgN10sIHYgPSBxW24gKyA4XSwgQSA9IHFbbiArIDldLCBCID0gcVtuICsgMTBdLCBDID0gcVtuICsgMTFdLCB1ID0gcVtuICsgMTJdLCBEID0gcVtuICsgMTNdLCBFID0gcVtuICsgMTRdLCB4ID0gcVtuICsgMTVdLCBmID0gYVswXSwgbSA9IGFbMV0sIGcgPSBhWzJdLCBoID0gYVszXSwgZiA9IHAoZiwgbSwgZywgaCwgYywgNywgYlswXSksIGggPSBwKGgsIGYsIG0sIGcsIGUsIDEyLCBiWzFdKSwgZyA9IHAoZywgaCwgZiwgbSwgaiwgMTcsIGJbMl0pLCBtID0gcChtLCBnLCBoLCBmLCBrLCAyMiwgYlszXSksIGYgPSBwKGYsIG0sIGcsIGgsIHosIDcsIGJbNF0pLCBoID0gcChoLCBmLCBtLCBnLCByLCAxMiwgYls1XSksIGcgPSBwKGcsIGgsIGYsIG0sIHQsIDE3LCBiWzZdKSwgbSA9IHAobSwgZywgaCwgZiwgdywgMjIsIGJbN10pLFxyXG4gICAgICAgIGYgPSBwKGYsIG0sIGcsIGgsIHYsIDcsIGJbOF0pLCBoID0gcChoLCBmLCBtLCBnLCBBLCAxMiwgYls5XSksIGcgPSBwKGcsIGgsIGYsIG0sIEIsIDE3LCBiWzEwXSksIG0gPSBwKG0sIGcsIGgsIGYsIEMsIDIyLCBiWzExXSksIGYgPSBwKGYsIG0sIGcsIGgsIHUsIDcsIGJbMTJdKSwgaCA9IHAoaCwgZiwgbSwgZywgRCwgMTIsIGJbMTNdKSwgZyA9IHAoZywgaCwgZiwgbSwgRSwgMTcsIGJbMTRdKSwgbSA9IHAobSwgZywgaCwgZiwgeCwgMjIsIGJbMTVdKSwgZiA9IGQoZiwgbSwgZywgaCwgZSwgNSwgYlsxNl0pLCBoID0gZChoLCBmLCBtLCBnLCB0LCA5LCBiWzE3XSksIGcgPSBkKGcsIGgsIGYsIG0sIEMsIDE0LCBiWzE4XSksIG0gPSBkKG0sIGcsIGgsIGYsIGMsIDIwLCBiWzE5XSksIGYgPSBkKGYsIG0sIGcsIGgsIHIsIDUsIGJbMjBdKSwgaCA9IGQoaCwgZiwgbSwgZywgQiwgOSwgYlsyMV0pLCBnID0gZChnLCBoLCBmLCBtLCB4LCAxNCwgYlsyMl0pLCBtID0gZChtLCBnLCBoLCBmLCB6LCAyMCwgYlsyM10pLCBmID0gZChmLCBtLCBnLCBoLCBBLCA1LCBiWzI0XSksIGggPSBkKGgsIGYsIG0sIGcsIEUsIDksIGJbMjVdKSwgZyA9IGQoZywgaCwgZiwgbSwgaywgMTQsIGJbMjZdKSwgbSA9IGQobSwgZywgaCwgZiwgdiwgMjAsIGJbMjddKSwgZiA9IGQoZiwgbSwgZywgaCwgRCwgNSwgYlsyOF0pLCBoID0gZChoLCBmLFxyXG4gICAgICAgICAgbSwgZywgaiwgOSwgYlsyOV0pLCBnID0gZChnLCBoLCBmLCBtLCB3LCAxNCwgYlszMF0pLCBtID0gZChtLCBnLCBoLCBmLCB1LCAyMCwgYlszMV0pLCBmID0gbChmLCBtLCBnLCBoLCByLCA0LCBiWzMyXSksIGggPSBsKGgsIGYsIG0sIGcsIHYsIDExLCBiWzMzXSksIGcgPSBsKGcsIGgsIGYsIG0sIEMsIDE2LCBiWzM0XSksIG0gPSBsKG0sIGcsIGgsIGYsIEUsIDIzLCBiWzM1XSksIGYgPSBsKGYsIG0sIGcsIGgsIGUsIDQsIGJbMzZdKSwgaCA9IGwoaCwgZiwgbSwgZywgeiwgMTEsIGJbMzddKSwgZyA9IGwoZywgaCwgZiwgbSwgdywgMTYsIGJbMzhdKSwgbSA9IGwobSwgZywgaCwgZiwgQiwgMjMsIGJbMzldKSwgZiA9IGwoZiwgbSwgZywgaCwgRCwgNCwgYls0MF0pLCBoID0gbChoLCBmLCBtLCBnLCBjLCAxMSwgYls0MV0pLCBnID0gbChnLCBoLCBmLCBtLCBrLCAxNiwgYls0Ml0pLCBtID0gbChtLCBnLCBoLCBmLCB0LCAyMywgYls0M10pLCBmID0gbChmLCBtLCBnLCBoLCBBLCA0LCBiWzQ0XSksIGggPSBsKGgsIGYsIG0sIGcsIHUsIDExLCBiWzQ1XSksIGcgPSBsKGcsIGgsIGYsIG0sIHgsIDE2LCBiWzQ2XSksIG0gPSBsKG0sIGcsIGgsIGYsIGosIDIzLCBiWzQ3XSksIGYgPSBzKGYsIG0sIGcsIGgsIGMsIDYsIGJbNDhdKSwgaCA9IHMoaCwgZiwgbSwgZywgdywgMTAsIGJbNDldKSwgZyA9IHMoZywgaCwgZiwgbSxcclxuICAgICAgICAgICAgRSwgMTUsIGJbNTBdKSwgbSA9IHMobSwgZywgaCwgZiwgciwgMjEsIGJbNTFdKSwgZiA9IHMoZiwgbSwgZywgaCwgdSwgNiwgYls1Ml0pLCBoID0gcyhoLCBmLCBtLCBnLCBrLCAxMCwgYls1M10pLCBnID0gcyhnLCBoLCBmLCBtLCBCLCAxNSwgYls1NF0pLCBtID0gcyhtLCBnLCBoLCBmLCBlLCAyMSwgYls1NV0pLCBmID0gcyhmLCBtLCBnLCBoLCB2LCA2LCBiWzU2XSksIGggPSBzKGgsIGYsIG0sIGcsIHgsIDEwLCBiWzU3XSksIGcgPSBzKGcsIGgsIGYsIG0sIHQsIDE1LCBiWzU4XSksIG0gPSBzKG0sIGcsIGgsIGYsIEQsIDIxLCBiWzU5XSksIGYgPSBzKGYsIG0sIGcsIGgsIHosIDYsIGJbNjBdKSwgaCA9IHMoaCwgZiwgbSwgZywgQywgMTAsIGJbNjFdKSwgZyA9IHMoZywgaCwgZiwgbSwgaiwgMTUsIGJbNjJdKSwgbSA9IHMobSwgZywgaCwgZiwgQSwgMjEsIGJbNjNdKTsgYVswXSA9IGFbMF0gKyBmIHwgMDsgYVsxXSA9IGFbMV0gKyBtIHwgMDsgYVsyXSA9IGFbMl0gKyBnIHwgMDsgYVszXSA9IGFbM10gKyBoIHwgMFxyXG4gICAgfSwgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGIgPSB0aGlzLl9kYXRhLCBuID0gYi53b3JkcywgYSA9IDggKiB0aGlzLl9uRGF0YUJ5dGVzLCBjID0gOCAqIGIuc2lnQnl0ZXM7IG5bYyA+Pj4gNV0gfD0gMTI4IDw8IDI0IC0gYyAlIDMyOyB2YXIgZSA9IHUuZmxvb3IoYSAvXHJcbiAgICAgICAgNDI5NDk2NzI5Nik7IG5bKGMgKyA2NCA+Pj4gOSA8PCA0KSArIDE1XSA9IChlIDw8IDggfCBlID4+PiAyNCkgJiAxNjcxMTkzNSB8IChlIDw8IDI0IHwgZSA+Pj4gOCkgJiA0Mjc4MjU1MzYwOyBuWyhjICsgNjQgPj4+IDkgPDwgNCkgKyAxNF0gPSAoYSA8PCA4IHwgYSA+Pj4gMjQpICYgMTY3MTE5MzUgfCAoYSA8PCAyNCB8IGEgPj4+IDgpICYgNDI3ODI1NTM2MDsgYi5zaWdCeXRlcyA9IDQgKiAobi5sZW5ndGggKyAxKTsgdGhpcy5fcHJvY2VzcygpOyBiID0gdGhpcy5faGFzaDsgbiA9IGIud29yZHM7IGZvciAoYSA9IDA7IDQgPiBhOyBhKyspYyA9IG5bYV0sIG5bYV0gPSAoYyA8PCA4IHwgYyA+Pj4gMjQpICYgMTY3MTE5MzUgfCAoYyA8PCAyNCB8IGMgPj4+IDgpICYgNDI3ODI1NTM2MDsgcmV0dXJuIGJcclxuICAgIH0sIGNsb25lOiBmdW5jdGlvbiAoKSB7IHZhciBiID0gdi5jbG9uZS5jYWxsKHRoaXMpOyBiLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpOyByZXR1cm4gYiB9XHJcbiAgfSk7IHQuTUQ1ID0gdi5fY3JlYXRlSGVscGVyKHIpOyB0LkhtYWNNRDUgPSB2Ll9jcmVhdGVIbWFjSGVscGVyKHIpXHJcbn0pKE1hdGgpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gIHZhciB1ID0gQ3J5cHRvSlMsIHAgPSB1LmxpYiwgZCA9IHAuQmFzZSwgbCA9IHAuV29yZEFycmF5LCBwID0gdS5hbGdvLCBzID0gcC5FdnBLREYgPSBkLmV4dGVuZCh7IGNmZzogZC5leHRlbmQoeyBrZXlTaXplOiA0LCBoYXNoZXI6IHAuTUQ1LCBpdGVyYXRpb25zOiAxIH0pLCBpbml0OiBmdW5jdGlvbiAoZCkgeyB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChkKSB9LCBjb21wdXRlOiBmdW5jdGlvbiAoZCwgcikgeyBmb3IgKHZhciBwID0gdGhpcy5jZmcsIHMgPSBwLmhhc2hlci5jcmVhdGUoKSwgYiA9IGwuY3JlYXRlKCksIHUgPSBiLndvcmRzLCBxID0gcC5rZXlTaXplLCBwID0gcC5pdGVyYXRpb25zOyB1Lmxlbmd0aCA8IHE7KSB7IG4gJiYgcy51cGRhdGUobik7IHZhciBuID0gcy51cGRhdGUoZCkuZmluYWxpemUocik7IHMucmVzZXQoKTsgZm9yICh2YXIgYSA9IDE7IGEgPCBwOyBhKyspbiA9IHMuZmluYWxpemUobiksIHMucmVzZXQoKTsgYi5jb25jYXQobikgfSBiLnNpZ0J5dGVzID0gNCAqIHE7IHJldHVybiBiIH0gfSk7IHUuRXZwS0RGID0gZnVuY3Rpb24gKGQsIGwsIHApIHtcclxuICAgIHJldHVybiBzLmNyZWF0ZShwKS5jb21wdXRlKGQsXHJcbiAgICAgIGwpXHJcbiAgfVxyXG59KSgpO1xyXG5DcnlwdG9KUy5saWIuQ2lwaGVyIHx8IGZ1bmN0aW9uICh1KSB7XHJcbiAgdmFyIHAgPSBDcnlwdG9KUywgZCA9IHAubGliLCBsID0gZC5CYXNlLCBzID0gZC5Xb3JkQXJyYXksIHQgPSBkLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0sIHIgPSBwLmVuYy5CYXNlNjQsIHcgPSBwLmFsZ28uRXZwS0RGLCB2ID0gZC5DaXBoZXIgPSB0LmV4dGVuZCh7XHJcbiAgICBjZmc6IGwuZXh0ZW5kKCksIGNyZWF0ZUVuY3J5cHRvcjogZnVuY3Rpb24gKGUsIGEpIHsgcmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuX0VOQ19YRk9STV9NT0RFLCBlLCBhKSB9LCBjcmVhdGVEZWNyeXB0b3I6IGZ1bmN0aW9uIChlLCBhKSB7IHJldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9ERUNfWEZPUk1fTU9ERSwgZSwgYSkgfSwgaW5pdDogZnVuY3Rpb24gKGUsIGEsIGIpIHsgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoYik7IHRoaXMuX3hmb3JtTW9kZSA9IGU7IHRoaXMuX2tleSA9IGE7IHRoaXMucmVzZXQoKSB9LCByZXNldDogZnVuY3Rpb24gKCkgeyB0LnJlc2V0LmNhbGwodGhpcyk7IHRoaXMuX2RvUmVzZXQoKSB9LCBwcm9jZXNzOiBmdW5jdGlvbiAoZSkgeyB0aGlzLl9hcHBlbmQoZSk7IHJldHVybiB0aGlzLl9wcm9jZXNzKCkgfSxcclxuICAgIGZpbmFsaXplOiBmdW5jdGlvbiAoZSkgeyBlICYmIHRoaXMuX2FwcGVuZChlKTsgcmV0dXJuIHRoaXMuX2RvRmluYWxpemUoKSB9LCBrZXlTaXplOiA0LCBpdlNpemU6IDQsIF9FTkNfWEZPUk1fTU9ERTogMSwgX0RFQ19YRk9STV9NT0RFOiAyLCBfY3JlYXRlSGVscGVyOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4geyBlbmNyeXB0OiBmdW5jdGlvbiAoYiwgaywgZCkgeyByZXR1cm4gKFwic3RyaW5nXCIgPT0gdHlwZW9mIGsgPyBjIDogYSkuZW5jcnlwdChlLCBiLCBrLCBkKSB9LCBkZWNyeXB0OiBmdW5jdGlvbiAoYiwgaywgZCkgeyByZXR1cm4gKFwic3RyaW5nXCIgPT0gdHlwZW9mIGsgPyBjIDogYSkuZGVjcnlwdChlLCBiLCBrLCBkKSB9IH0gfVxyXG4gIH0pOyBkLlN0cmVhbUNpcGhlciA9IHYuZXh0ZW5kKHsgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3Byb2Nlc3MoITApIH0sIGJsb2NrU2l6ZTogMSB9KTsgdmFyIGIgPSBwLm1vZGUgPSB7fSwgeCA9IGZ1bmN0aW9uIChlLCBhLCBiKSB7XHJcbiAgICB2YXIgYyA9IHRoaXMuX2l2OyBjID8gdGhpcy5faXYgPSB1IDogYyA9IHRoaXMuX3ByZXZCbG9jazsgZm9yICh2YXIgZCA9IDA7IGQgPCBiOyBkKyspZVthICsgZF0gXj1cclxuICAgICAgY1tkXVxyXG4gIH0sIHEgPSAoZC5CbG9ja0NpcGhlck1vZGUgPSBsLmV4dGVuZCh7IGNyZWF0ZUVuY3J5cHRvcjogZnVuY3Rpb24gKGUsIGEpIHsgcmV0dXJuIHRoaXMuRW5jcnlwdG9yLmNyZWF0ZShlLCBhKSB9LCBjcmVhdGVEZWNyeXB0b3I6IGZ1bmN0aW9uIChlLCBhKSB7IHJldHVybiB0aGlzLkRlY3J5cHRvci5jcmVhdGUoZSwgYSkgfSwgaW5pdDogZnVuY3Rpb24gKGUsIGEpIHsgdGhpcy5fY2lwaGVyID0gZTsgdGhpcy5faXYgPSBhIH0gfSkpLmV4dGVuZCgpOyBxLkVuY3J5cHRvciA9IHEuZXh0ZW5kKHsgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoZSwgYSkgeyB2YXIgYiA9IHRoaXMuX2NpcGhlciwgYyA9IGIuYmxvY2tTaXplOyB4LmNhbGwodGhpcywgZSwgYSwgYyk7IGIuZW5jcnlwdEJsb2NrKGUsIGEpOyB0aGlzLl9wcmV2QmxvY2sgPSBlLnNsaWNlKGEsIGEgKyBjKSB9IH0pOyBxLkRlY3J5cHRvciA9IHEuZXh0ZW5kKHtcclxuICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKGUsIGEpIHtcclxuICAgICAgdmFyIGIgPSB0aGlzLl9jaXBoZXIsIGMgPSBiLmJsb2NrU2l6ZSwgZCA9IGUuc2xpY2UoYSwgYSArIGMpOyBiLmRlY3J5cHRCbG9jayhlLCBhKTsgeC5jYWxsKHRoaXMsXHJcbiAgICAgICAgZSwgYSwgYyk7IHRoaXMuX3ByZXZCbG9jayA9IGRcclxuICAgIH1cclxuICB9KTsgYiA9IGIuQ0JDID0gcTsgcSA9IChwLnBhZCA9IHt9KS5Qa2NzNyA9IHsgcGFkOiBmdW5jdGlvbiAoYSwgYikgeyBmb3IgKHZhciBjID0gNCAqIGIsIGMgPSBjIC0gYS5zaWdCeXRlcyAlIGMsIGQgPSBjIDw8IDI0IHwgYyA8PCAxNiB8IGMgPDwgOCB8IGMsIGwgPSBbXSwgbiA9IDA7IG4gPCBjOyBuICs9IDQpbC5wdXNoKGQpOyBjID0gcy5jcmVhdGUobCwgYyk7IGEuY29uY2F0KGMpIH0sIHVucGFkOiBmdW5jdGlvbiAoYSkgeyBhLnNpZ0J5dGVzIC09IGEud29yZHNbYS5zaWdCeXRlcyAtIDEgPj4+IDJdICYgMjU1IH0gfTsgZC5CbG9ja0NpcGhlciA9IHYuZXh0ZW5kKHtcclxuICAgIGNmZzogdi5jZmcuZXh0ZW5kKHsgbW9kZTogYiwgcGFkZGluZzogcSB9KSwgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdi5yZXNldC5jYWxsKHRoaXMpOyB2YXIgYSA9IHRoaXMuY2ZnLCBiID0gYS5pdiwgYSA9IGEubW9kZTsgaWYgKHRoaXMuX3hmb3JtTW9kZSA9PSB0aGlzLl9FTkNfWEZPUk1fTU9ERSkgdmFyIGMgPSBhLmNyZWF0ZUVuY3J5cHRvcjsgZWxzZSBjID0gYS5jcmVhdGVEZWNyeXB0b3IsIHRoaXMuX21pbkJ1ZmZlclNpemUgPSAxOyB0aGlzLl9tb2RlID0gYy5jYWxsKGEsXHJcbiAgICAgICAgdGhpcywgYiAmJiBiLndvcmRzKVxyXG4gICAgfSwgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoYSwgYikgeyB0aGlzLl9tb2RlLnByb2Nlc3NCbG9jayhhLCBiKSB9LCBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkgeyB2YXIgYSA9IHRoaXMuY2ZnLnBhZGRpbmc7IGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fRU5DX1hGT1JNX01PREUpIHsgYS5wYWQodGhpcy5fZGF0YSwgdGhpcy5ibG9ja1NpemUpOyB2YXIgYiA9IHRoaXMuX3Byb2Nlc3MoITApIH0gZWxzZSBiID0gdGhpcy5fcHJvY2VzcyghMCksIGEudW5wYWQoYik7IHJldHVybiBiIH0sIGJsb2NrU2l6ZTogNFxyXG4gIH0pOyB2YXIgbiA9IGQuQ2lwaGVyUGFyYW1zID0gbC5leHRlbmQoeyBpbml0OiBmdW5jdGlvbiAoYSkgeyB0aGlzLm1peEluKGEpIH0sIHRvU3RyaW5nOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gKGEgfHwgdGhpcy5mb3JtYXR0ZXIpLnN0cmluZ2lmeSh0aGlzKSB9IH0pLCBiID0gKHAuZm9ybWF0ID0ge30pLk9wZW5TU0wgPSB7XHJcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgIHZhciBiID0gYS5jaXBoZXJ0ZXh0OyBhID0gYS5zYWx0OyByZXR1cm4gKGEgPyBzLmNyZWF0ZShbMTM5ODg5MzY4NCxcclxuICAgICAgICAxNzAxMDc2ODMxXSkuY29uY2F0KGEpLmNvbmNhdChiKSA6IGIpLnRvU3RyaW5nKHIpXHJcbiAgICB9LCBwYXJzZTogZnVuY3Rpb24gKGEpIHsgYSA9IHIucGFyc2UoYSk7IHZhciBiID0gYS53b3JkczsgaWYgKDEzOTg4OTM2ODQgPT0gYlswXSAmJiAxNzAxMDc2ODMxID09IGJbMV0pIHsgdmFyIGMgPSBzLmNyZWF0ZShiLnNsaWNlKDIsIDQpKTsgYi5zcGxpY2UoMCwgNCk7IGEuc2lnQnl0ZXMgLT0gMTYgfSByZXR1cm4gbi5jcmVhdGUoeyBjaXBoZXJ0ZXh0OiBhLCBzYWx0OiBjIH0pIH1cclxuICB9LCBhID0gZC5TZXJpYWxpemFibGVDaXBoZXIgPSBsLmV4dGVuZCh7XHJcbiAgICBjZmc6IGwuZXh0ZW5kKHsgZm9ybWF0OiBiIH0pLCBlbmNyeXB0OiBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyBkID0gdGhpcy5jZmcuZXh0ZW5kKGQpOyB2YXIgbCA9IGEuY3JlYXRlRW5jcnlwdG9yKGMsIGQpOyBiID0gbC5maW5hbGl6ZShiKTsgbCA9IGwuY2ZnOyByZXR1cm4gbi5jcmVhdGUoeyBjaXBoZXJ0ZXh0OiBiLCBrZXk6IGMsIGl2OiBsLml2LCBhbGdvcml0aG06IGEsIG1vZGU6IGwubW9kZSwgcGFkZGluZzogbC5wYWRkaW5nLCBibG9ja1NpemU6IGEuYmxvY2tTaXplLCBmb3JtYXR0ZXI6IGQuZm9ybWF0IH0pIH0sXHJcbiAgICBkZWNyeXB0OiBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyBkID0gdGhpcy5jZmcuZXh0ZW5kKGQpOyBiID0gdGhpcy5fcGFyc2UoYiwgZC5mb3JtYXQpOyByZXR1cm4gYS5jcmVhdGVEZWNyeXB0b3IoYywgZCkuZmluYWxpemUoYi5jaXBoZXJ0ZXh0KSB9LCBfcGFyc2U6IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiBhID8gYi5wYXJzZShhLCB0aGlzKSA6IGEgfVxyXG4gIH0pLCBwID0gKHAua2RmID0ge30pLk9wZW5TU0wgPSB7IGV4ZWN1dGU6IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IGQgfHwgKGQgPSBzLnJhbmRvbSg4KSk7IGEgPSB3LmNyZWF0ZSh7IGtleVNpemU6IGIgKyBjIH0pLmNvbXB1dGUoYSwgZCk7IGMgPSBzLmNyZWF0ZShhLndvcmRzLnNsaWNlKGIpLCA0ICogYyk7IGEuc2lnQnl0ZXMgPSA0ICogYjsgcmV0dXJuIG4uY3JlYXRlKHsga2V5OiBhLCBpdjogYywgc2FsdDogZCB9KSB9IH0sIGMgPSBkLlBhc3N3b3JkQmFzZWRDaXBoZXIgPSBhLmV4dGVuZCh7XHJcbiAgICBjZmc6IGEuY2ZnLmV4dGVuZCh7IGtkZjogcCB9KSwgZW5jcnlwdDogZnVuY3Rpb24gKGIsIGMsIGQsIGwpIHtcclxuICAgICAgbCA9IHRoaXMuY2ZnLmV4dGVuZChsKTsgZCA9IGwua2RmLmV4ZWN1dGUoZCxcclxuICAgICAgICBiLmtleVNpemUsIGIuaXZTaXplKTsgbC5pdiA9IGQuaXY7IGIgPSBhLmVuY3J5cHQuY2FsbCh0aGlzLCBiLCBjLCBkLmtleSwgbCk7IGIubWl4SW4oZCk7IHJldHVybiBiXHJcbiAgICB9LCBkZWNyeXB0OiBmdW5jdGlvbiAoYiwgYywgZCwgbCkgeyBsID0gdGhpcy5jZmcuZXh0ZW5kKGwpOyBjID0gdGhpcy5fcGFyc2UoYywgbC5mb3JtYXQpOyBkID0gbC5rZGYuZXhlY3V0ZShkLCBiLmtleVNpemUsIGIuaXZTaXplLCBjLnNhbHQpOyBsLml2ID0gZC5pdjsgcmV0dXJuIGEuZGVjcnlwdC5jYWxsKHRoaXMsIGIsIGMsIGQua2V5LCBsKSB9XHJcbiAgfSlcclxufSgpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gIGZvciAodmFyIHUgPSBDcnlwdG9KUywgcCA9IHUubGliLkJsb2NrQ2lwaGVyLCBkID0gdS5hbGdvLCBsID0gW10sIHMgPSBbXSwgdCA9IFtdLCByID0gW10sIHcgPSBbXSwgdiA9IFtdLCBiID0gW10sIHggPSBbXSwgcSA9IFtdLCBuID0gW10sIGEgPSBbXSwgYyA9IDA7IDI1NiA+IGM7IGMrKylhW2NdID0gMTI4ID4gYyA/IGMgPDwgMSA6IGMgPDwgMSBeIDI4MzsgZm9yICh2YXIgZSA9IDAsIGogPSAwLCBjID0gMDsgMjU2ID4gYzsgYysrKSB7IHZhciBrID0gaiBeIGogPDwgMSBeIGogPDwgMiBeIGogPDwgMyBeIGogPDwgNCwgayA9IGsgPj4+IDggXiBrICYgMjU1IF4gOTk7IGxbZV0gPSBrOyBzW2tdID0gZTsgdmFyIHogPSBhW2VdLCBGID0gYVt6XSwgRyA9IGFbRl0sIHkgPSAyNTcgKiBhW2tdIF4gMTY4NDMwMDggKiBrOyB0W2VdID0geSA8PCAyNCB8IHkgPj4+IDg7IHJbZV0gPSB5IDw8IDE2IHwgeSA+Pj4gMTY7IHdbZV0gPSB5IDw8IDggfCB5ID4+PiAyNDsgdltlXSA9IHk7IHkgPSAxNjg0MzAwOSAqIEcgXiA2NTUzNyAqIEYgXiAyNTcgKiB6IF4gMTY4NDMwMDggKiBlOyBiW2tdID0geSA8PCAyNCB8IHkgPj4+IDg7IHhba10gPSB5IDw8IDE2IHwgeSA+Pj4gMTY7IHFba10gPSB5IDw8IDggfCB5ID4+PiAyNDsgbltrXSA9IHk7IGUgPyAoZSA9IHogXiBhW2FbYVtHIF4gel1dXSwgaiBePSBhW2Fbal1dKSA6IGUgPSBqID0gMSB9IHZhciBIID0gWzAsIDEsIDIsIDQsIDgsXHJcbiAgICAxNiwgMzIsIDY0LCAxMjgsIDI3LCA1NF0sIGQgPSBkLkFFUyA9IHAuZXh0ZW5kKHtcclxuICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBhID0gdGhpcy5fa2V5LCBjID0gYS53b3JkcywgZCA9IGEuc2lnQnl0ZXMgLyA0LCBhID0gNCAqICgodGhpcy5fblJvdW5kcyA9IGQgKyA2KSArIDEpLCBlID0gdGhpcy5fa2V5U2NoZWR1bGUgPSBbXSwgaiA9IDA7IGogPCBhOyBqKyspaWYgKGogPCBkKSBlW2pdID0gY1tqXTsgZWxzZSB7IHZhciBrID0gZVtqIC0gMV07IGogJSBkID8gNiA8IGQgJiYgNCA9PSBqICUgZCAmJiAoayA9IGxbayA+Pj4gMjRdIDw8IDI0IHwgbFtrID4+PiAxNiAmIDI1NV0gPDwgMTYgfCBsW2sgPj4+IDggJiAyNTVdIDw8IDggfCBsW2sgJiAyNTVdKSA6IChrID0gayA8PCA4IHwgayA+Pj4gMjQsIGsgPSBsW2sgPj4+IDI0XSA8PCAyNCB8IGxbayA+Pj4gMTYgJiAyNTVdIDw8IDE2IHwgbFtrID4+PiA4ICYgMjU1XSA8PCA4IHwgbFtrICYgMjU1XSwgayBePSBIW2ogLyBkIHwgMF0gPDwgMjQpOyBlW2pdID0gZVtqIC0gZF0gXiBrIH0gYyA9IHRoaXMuX2ludktleVNjaGVkdWxlID0gW107IGZvciAoZCA9IDA7IGQgPCBhOyBkKyspaiA9IGEgLSBkLCBrID0gZCAlIDQgPyBlW2pdIDogZVtqIC0gNF0sIGNbZF0gPSA0ID4gZCB8fCA0ID49IGogPyBrIDogYltsW2sgPj4+IDI0XV0gXiB4W2xbayA+Pj4gMTYgJiAyNTVdXSBeIHFbbFtrID4+PlxyXG4gICAgICAgICAgOCAmIDI1NV1dIF4gbltsW2sgJiAyNTVdXVxyXG4gICAgICB9LCBlbmNyeXB0QmxvY2s6IGZ1bmN0aW9uIChhLCBiKSB7IHRoaXMuX2RvQ3J5cHRCbG9jayhhLCBiLCB0aGlzLl9rZXlTY2hlZHVsZSwgdCwgciwgdywgdiwgbCkgfSwgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoYSwgYykgeyB2YXIgZCA9IGFbYyArIDFdOyBhW2MgKyAxXSA9IGFbYyArIDNdOyBhW2MgKyAzXSA9IGQ7IHRoaXMuX2RvQ3J5cHRCbG9jayhhLCBjLCB0aGlzLl9pbnZLZXlTY2hlZHVsZSwgYiwgeCwgcSwgbiwgcyk7IGQgPSBhW2MgKyAxXTsgYVtjICsgMV0gPSBhW2MgKyAzXTsgYVtjICsgM10gPSBkIH0sIF9kb0NyeXB0QmxvY2s6IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCBlLCBqLCBsLCBmKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbSA9IHRoaXMuX25Sb3VuZHMsIGcgPSBhW2JdIF4gY1swXSwgaCA9IGFbYiArIDFdIF4gY1sxXSwgayA9IGFbYiArIDJdIF4gY1syXSwgbiA9IGFbYiArIDNdIF4gY1szXSwgcCA9IDQsIHIgPSAxOyByIDwgbTsgcisrKXZhciBxID0gZFtnID4+PiAyNF0gXiBlW2ggPj4+IDE2ICYgMjU1XSBeIGpbayA+Pj4gOCAmIDI1NV0gXiBsW24gJiAyNTVdIF4gY1twKytdLCBzID0gZFtoID4+PiAyNF0gXiBlW2sgPj4+IDE2ICYgMjU1XSBeIGpbbiA+Pj4gOCAmIDI1NV0gXiBsW2cgJiAyNTVdIF4gY1twKytdLCB0ID1cclxuICAgICAgICAgIGRbayA+Pj4gMjRdIF4gZVtuID4+PiAxNiAmIDI1NV0gXiBqW2cgPj4+IDggJiAyNTVdIF4gbFtoICYgMjU1XSBeIGNbcCsrXSwgbiA9IGRbbiA+Pj4gMjRdIF4gZVtnID4+PiAxNiAmIDI1NV0gXiBqW2ggPj4+IDggJiAyNTVdIF4gbFtrICYgMjU1XSBeIGNbcCsrXSwgZyA9IHEsIGggPSBzLCBrID0gdDsgcSA9IChmW2cgPj4+IDI0XSA8PCAyNCB8IGZbaCA+Pj4gMTYgJiAyNTVdIDw8IDE2IHwgZltrID4+PiA4ICYgMjU1XSA8PCA4IHwgZltuICYgMjU1XSkgXiBjW3ArK107IHMgPSAoZltoID4+PiAyNF0gPDwgMjQgfCBmW2sgPj4+IDE2ICYgMjU1XSA8PCAxNiB8IGZbbiA+Pj4gOCAmIDI1NV0gPDwgOCB8IGZbZyAmIDI1NV0pIF4gY1twKytdOyB0ID0gKGZbayA+Pj4gMjRdIDw8IDI0IHwgZltuID4+PiAxNiAmIDI1NV0gPDwgMTYgfCBmW2cgPj4+IDggJiAyNTVdIDw8IDggfCBmW2ggJiAyNTVdKSBeIGNbcCsrXTsgbiA9IChmW24gPj4+IDI0XSA8PCAyNCB8IGZbZyA+Pj4gMTYgJiAyNTVdIDw8IDE2IHwgZltoID4+PiA4ICYgMjU1XSA8PCA4IHwgZltrICYgMjU1XSkgXiBjW3ArK107IGFbYl0gPSBxOyBhW2IgKyAxXSA9IHM7IGFbYiArIDJdID0gdDsgYVtiICsgM10gPSBuXHJcbiAgICAgIH0sIGtleVNpemU6IDhcclxuICAgIH0pOyB1LkFFUyA9IHAuX2NyZWF0ZUhlbHBlcihkKVxyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcnlwdG9KUzsiLCJpbXBvcnQgQXBwX1NTUERfQ29uZmlnX1NTUERfIGZyb20gXCIuL0FwcENvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT1BQT0FQSSBcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhZFVuaXRJZCA9IFwiMTM0MjkyXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGJhbm5lckFkVW5pdElkID0gXCIxMzQyOTFcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSW5zQWRVbml0SWQgPSBcIjEzNDI5NFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBPcGVuU2NyZWVuQWRVbml0SWQgPSBcIjEzNDI5M1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEJhbm5lckluc3RhbmNlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFubmVyO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfYmFubmVyIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvZ2luKG9uU3VjY2VzczogRnVuY3Rpb24sIG9uRmFpbDogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wicWdcIl0ubG9naW4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSByZXMuZGF0YS50b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPUFBPIOeZu+mZhuaIkOWKnyzojrflj5bliLAgdG9rZW4gOiBcIiArIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlcykgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSwgcmVzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1BQTyDnmbvpmYblpLHotKVcIiwgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXksIHJlc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdEFkU2VydmljZShvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbixvbkNvbXBsZXRlIDogRnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInFnXCJdLmluaXRBZFNlcnZpY2UoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFwcElkOiBBcHBfU1NQRF9Db25maWdfU1NQRF8uQXBwSUQsXHJcbiAgICAgICAgICAgICAgICBpc0RlYnVnOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wcG8gaW5pdEFkU2VydmljZSBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKHJlcylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BwbyBpbml0QWRTZXJ2aWNlIGZhaWw6IFwiLCByZXMuY29kZSwgcmVzLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWwocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BwbyBpbml0QWRTZXJ2aWNlIGNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dSZXdhcmRlZFZpZGVvQWQob25BZENsb3NlOiBGdW5jdGlvbiwgb25GYWlsZWQ6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0FkID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcInFnXCJdLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBwb3NJZDogT1BQT0FQSS5hZFVuaXRJZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmlkZW9BZC5vbkxvYWQoKCk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wcG8g6KeG6aKR5bm/5ZGK5Yqg6L295a6M5oiQXCIpO1xyXG4gICAgICAgICAgICAgICAgdmlkZW9BZC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHZpZGVvQWQub25WaWRlb1N0YXJ0KCgpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcHBvIOinhumikeW5v+WRiuW8gOWni+aSreaUvlwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmlkZW9BZC5vbkNsb3NlKChyZXMpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmlzRW5kZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BwbyDop4bpopHlub/lkYrop4LnnIsg5a6M5oiQXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQWRDbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BwbyDop4bpopHlub/lkYrop4LnnIsg5pyq5a6M5oiQXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQWRDbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2aWRlb0FkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmlkZW9BZC5vbkVycm9yKChlcnIpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcHBvIOinhumikeW5v+WRiuiOt+WPluWksei0pVwiLGVycik7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0FkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHZpZGVvQWQubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvbkFkQ2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmF2aWdhdGVUb01pbmlQcm9ncmFtKHBrZ05hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBvblN1Y2Nlc3M6IEZ1bmN0aW9uLCBvbkZhaWw6IEZ1bmN0aW9uLCBvbkNvbXBsYXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25RR01pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1BQTyDot7PovazmuLjmiI/vvJogXCIgKyBwa2dOYW1lKTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInFnXCJdLm5hdmlnYXRlVG9NaW5pR2FtZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwa2dOYW1lOiBwa2dOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gOiBBcHBfU1NQRF9Db25maWdfU1NQRF8uQXBwSURcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWwocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZShyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxhdGUocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0ludGVyc3RpdGlhbEFkKG9uQWRDbG9zZTogRnVuY3Rpb24sIG9uRmFpbGVkOiBGdW5jdGlvbikgIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5zZXJ0QWQgPSBxZy5jcmVhdGVJbnNlcnRBZCh7IFxyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IE9QUE9BUEkuSW5zQWRVbml0SWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaW5zZXJ0QWQubG9hZCgpO1xyXG4gICAgICAgICAgICBpbnNlcnRBZC5vbkxvYWQoKCk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWKoOi9veWujOaIkFwiKTtcclxuICAgICAgICAgICAgICAgIGluc2VydEFkLnNob3coKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaW5zZXJ0QWQub25TaG93KCgpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGluc2VydEFkLm9uRXJyb3IoKGVycik9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuaLieWPluWksei0pVwiLGVycik7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBpZihvbkZhaWxlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvbkFkQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaG93QmFubmFlcigpIDogYW55XHJcbiAgICB7XHJcbiAgICAgICAgaWYoT1BQT0FQSS5fYmFubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT1BQT0FQSS5fYmFubmVyLnNob3coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYmFubmVyQWQgPSBxZy5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgIHBvc0lkOiBPUFBPQVBJLmJhbm5lckFkVW5pdElkXHJcbiAgICAgICAgfSlcclxuICAgICAgICBiYW5uZXJBZC5zaG93KCk7XHJcbiAgICAgICAgT1BQT0FQSS5fYmFubmVyID0gYmFubmVyQWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBoaWRlQmFubmVyKClcclxuICAgIHtcclxuICAgICAgICBpZihPUFBPQVBJLl9iYW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPUFBPQVBJLl9iYW5uZXIuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExhdW5jaE9wdGlvbnNTeW5jKCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNoYXJlKGNvbXBsYXRlOiBGdW5jdGlvbiwgdGl0ZWw6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZykge1xyXG4gICAgICAgIGNvbXBsYXRlKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURlc2t0b3BJY29uKG9uU3VjY2VzcyA6IEZ1bmN0aW9uLG9uRmFpbCA6IEZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25RR01pbmlHYW1lKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJxZ1wiXS5oYXNTaG9ydGN1dEluc3RhbGxlZCh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJxZ1wiXS5pbnN0YWxsU2hvcnRjdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkZhaWwpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIm+W7uuahjOmdouWbvuagh+Wksei0pe+8ge+8ge+8ge+8gVwiLGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5LGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlICBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5qGM6Z2i5Zu+5qCH5bey5a2Y5Zyo77yB77yB77yB77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliKTmlq3moYzpnaLlm77moIfmmK/lkKblrZjlnKjlpLHotKXvvIHvvIHvvIFcIixlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGVycilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSxlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSBcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG9uRmFpbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb25GYWlsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBRUU1pbmlHYW1lQVBJIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWRVbml0SWQgPSBcImFkdW5pdC1lZWYzNmY4NGM0NGJiZGMxXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYmFubmVyQWRVbml0SWQgPSBcImFkdW5pdC00NDBlMjFjYzAyYzBkMjgyXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSW5zQWRVbml0SWQgPSBcImFkdW5pdC00NDBlMjFjYzAyYzBkMjgyXCJcclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9naW4ob25TdWNjZXNzOiBGdW5jdGlvbiwgb25GYWlsOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25RUU1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJxcVwiXS5sb2dpbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSByZXMuY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55m76ZmG5oiQ5YqfLOiOt+WPluWIsGNvZGUgOiBcIiArIGNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5r+A5Yqx6KeG6aKRLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pc1JlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50ID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9vblJld2FyZGVkVmlkZW9BZEZhaWxlZDogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfb25SZXdhcmRlZFZpZGVvQWRDbG9zZTogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvblJld2FyZGVkVmlkZW9BZExvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrliqDovb3lrozmiJAnKVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvblJld2FyZGVkVmlkZW9BZEVycm9yKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295aSx6LSlJyArIGVycilcclxuICAgICAgICBpZiAoUVFNaW5pR2FtZUFQSS5fb25SZXdhcmRlZFZpZGVvQWRGYWlsZWQpIHtcclxuICAgICAgICAgICAgUVFNaW5pR2FtZUFQSS5fb25SZXdhcmRlZFZpZGVvQWRGYWlsZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIG9uUmV3YXJkZWRWaWRlb0FkQ2xvc2UocmVzKSB7XHJcbiAgICAgICAgaWYgKChyZXMgJiYgcmVzLmlzRW5kZWQpIHx8IHJlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bey5a6M5pW06KeC55yLJylcclxuICAgICAgICAgICAgaWYgKFFRTWluaUdhbWVBUEkuX29uUmV3YXJkZWRWaWRlb0FkQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIFFRTWluaUdhbWVBUEkuX29uUmV3YXJkZWRWaWRlb0FkQ2xvc2UodHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDmnKrlrozmlbTop4LnnIsnKVxyXG4gICAgICAgICAgICBpZiAoUVFNaW5pR2FtZUFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgUVFNaW5pR2FtZUFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZShmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVnUmV3YXJkZWRWaWRlb0FkRXZlbnQocmV3YXJkZWRWaWRlb0FkKSB7XHJcblxyXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkxvYWQoUVFNaW5pR2FtZUFQSS5vblJld2FyZGVkVmlkZW9BZExvYWQpXHJcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uRXJyb3IoUVFNaW5pR2FtZUFQSS5vblJld2FyZGVkVmlkZW9BZEVycm9yKVxyXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkNsb3NlKFFRTWluaUdhbWVBUEkub25SZXdhcmRlZFZpZGVvQWRDbG9zZSlcclxuXHJcbiAgICAgICAgUVFNaW5pR2FtZUFQSS5faXNSZWdSZXdhcmRlZFZpZGVvQWRFdmVudCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dSZXdhcmRlZFZpZGVvQWQob25BZENsb3NlOiBGdW5jdGlvbiwgb25GYWlsZWQ6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vblFRTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgUVFNaW5pR2FtZUFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZSA9IG9uQWRDbG9zZTtcclxuICAgICAgICAgICAgUVFNaW5pR2FtZUFQSS5fb25SZXdhcmRlZFZpZGVvQWRGYWlsZWQgPSBvbkZhaWxlZDtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXdhcmRlZFZpZGVvQWQgPSBMYXlhLkJyb3dzZXIud2luZG93W1wicXFcIl0uY3JlYXRlUmV3YXJkZWRWaWRlb0FkKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiBRUU1pbmlHYW1lQVBJLmFkVW5pdElkLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFRUU1pbmlHYW1lQVBJLl9pc1JlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBRUU1pbmlHYW1lQVBJLnJlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50KHJld2FyZGVkVmlkZW9BZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHJld2FyZGVkVmlkZW9BZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrmmL7npLrmiJDlip8nKSk7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJld2FyZGVkVmlkZW9BZC5zaG93KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrmmL7npLrlpLHotKUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrliqDovb3lpLHotKUnKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQWRDbG9zZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5bCP5ri45oiP6Lez6L2sLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgc3RhdGljIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbShhcHBJZDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIG9uU3VjY2VzczogRnVuY3Rpb24sIG9uRmFpbDogRnVuY3Rpb24sIG9uQ29tcGxhdGU6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vblFRTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmuLjmiI/vvJogXCIgKyBhcHBJZCk7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJxcVwiXS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwSWQ6IGFwcElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWwocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZShyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxhdGUocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS3liIbkuqstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9vblNob3c6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX2xhc3RTaGFyZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHNoYXJlKGNvbXBsYXRlOiBGdW5jdGlvbiwgdGl0ZWw6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25RUU1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIFFRTWluaUdhbWVBUEkuX29uU2hvdyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJxcVwiXS5vZmZTaG93KFFRTWluaUdhbWVBUEkuX29uU2hvdylcclxuICAgICAgICAgICAgICAgIFFRTWluaUdhbWVBUEkuX29uU2hvdyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0U2hhcmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLl9sYXN0U2hhcmVUaW1lID4gMjAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGF0ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJxcVwiXS5vblNob3coUVFNaW5pR2FtZUFQSS5fb25TaG93KVxyXG4gICAgICAgICAgICB0aGlzLl9sYXN0U2hhcmVUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInFxXCJdLnNoYXJlQXBwTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0ZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGltYWdlVXJsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS3mj5LlsY/luZXlub/lkYotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0ludGVyc3RpdGlhbEFkKG9uQWRDbG9zZTogRnVuY3Rpb24sIG9uRmFpbGVkOiBGdW5jdGlvbikgIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uUVFNaW5pR2FtZSkge1xyXG4gICAgICAgICAgICB2YXIgaW50ZXJzdGl0aWFsQWQgPSBMYXlhLkJyb3dzZXIud2luZG93W1wicXFcIl0uY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IFFRTWluaUdhbWVBUEkuSW5zQWRVbml0SWQsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpbnRlcnN0aXRpYWxBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDliqDovb3lrozmiJAnKTtcclxuICAgICAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLnNob3coKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDmmL7npLrlpLHotKUg77yaJyArIGVycilcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGKIOWKoOi9veWksei0pScgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLm9uQ2xvc2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDlhbPpl60nKTtcclxuICAgICAgICAgICAgICAgIGlmIChvbkFkQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkFkQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQWRDbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5b6X5Yiw5bCP56iL5bqP5ZCv5Yqo5Y+C5pWw55qE5ZCM5q2l5pa55rOV77yM5Y+v5b6X5Yiw5LiA5LiqT2JqZWN06L+U5Zue5YC877yM6L+U5Zue5YC85YW35L2T55qE5pWw5o2u57uT5p6E5Zyo5LiL6Z2i55qE5YiX6KGo5LitXHJcbiAgICAgKiBzY2VuZVx0bnVtYmVyXHTlkK/liqjlsI/muLjmiI/nmoTlnLrmma/lgLxcclxuICAgICAqIHF1ZXJ5XHRPYmplY3RcdOWQr+WKqOWwj+a4uOaIj+eahCBxdWVyeSDlj4LmlbBcclxuICAgICAqIHNoYXJlVGlja2V0XHRzdHJpbmdcdHNoYXJlVGlja2V077yM6K+m6KeB6I635Y+W5pu05aSa6L2s5Y+R5L+h5oGvXHJcbiAgICAgKiByZWZlcnJlckluZm9cdG9iamVjdFx05p2l5rqQ5L+h5oGv44CC5LuO5Y+m5LiA5Liq5bCP56iL5bqP44CB5YWs5LyX5Y+35oiWIEFwcCDov5vlhaXlsI/nqIvluo/ml7bov5Tlm57jgILlkKbliJnov5Tlm54ge31cclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvYmFzZS9hcHAvbGlmZS1jeWNsZS9xcS5nZXRMYXVuY2hPcHRpb25zU3luYy5odG1sXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7TGF1bmNoT3B0aW9uc30gXHJcbiAgICAgKiBAbWVtYmVyb2YgUVFNaW5pR2FtZUFQSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExhdW5jaE9wdGlvbnNTeW5jKCkge1xyXG4gICAgICAgIC8vIGxldCByZXN1bHQgPSB7IHNjZW5lOiAwLCBxdWVyeTogbnVsbCwgc2hhcmVUaWNrZXQ6IFwiXCIsIHJlZmVycmVySW5mbzogbnVsbCB9O1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25RUU1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBMYXlhLkJyb3dzZXIud2luZG93W1wicXFcIl0uZ2V0TGF1bmNoT3B0aW9uc1N5bmMoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWcuuaZr+WAvCBcIiArIG9iai5zY2VuZSk7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBKU09OLnN0cmluZ2lmeShvYmoucXVlcnkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ55Y+C5pWwIFwiICsgc3RyKTtcclxuICAgICAgICAgICAgbGV0IGtleSA9IG9iai5xdWVyeVtcImtleVwiXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRdWVyeeWPguaVsO+8mmtleSBcIiArIGtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hhcmVUaWNrZXQgXCIgKyBvYmouc2hhcmVUaWNrZXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZmVycmVySW5mby5hcHBJZCBcIiArIG9iai5yZWZlcnJlckluZm8uYXBwSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZmVycmVySW5mby5leHRyYURhdGEgXCIgKyBvYmoucmVmZXJyZXJJbmZvLmV4dHJhRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvYmogPSB7IHNjZW5lOiAxMDAxLCBxdWVyeTogXCJcIiwgc2hhcmVUaWNrZXQ6IFwiXCIsIGFwcElkOiBcIlwiLCBleHRyYURhdGE6IFwiXCIgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOW+ruS/oeW3puS4iuinkuWIhuS6q+i9rOWPkeeCueWHu+S6i+S7tizlnKjmuLjmiI/pgLvovpHkuK3osIPnlKjkuIDmrKHljbPlj69cclxuICAgICAqIOazqOaEj+atpOaWueazleWPquS8muWcqOecn+acuuS4iuaJp+ihjO+8jOWcqOW+ruS/oeaooeaLn+WZqOeOr+Wig+S4i+eCueWHu+i9rOWPkeaMiemSruS7gOS5iOmDveS4jeS8muWPkeeUn1xyXG4gICAgICogXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0ZWwg5YiG5Lqr5qCH6aKYXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VVcmwg5YiG5Lqr5Zu+54mH5Zyw5Z2AXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc3VjY2Vzc10g5oiQ5Yqf5Zue6LCD5Ye95pWwKOWPr+S4jeWhqylcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtmYWlsXSDlpLHotKXlm57osIPlh73mlbAo5Y+v5LiN5aGrKVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBsYXRlXSDlrozmiJDlm57osIPlh73mlbDvvIzmiJDlip/lpLHotKXpg73kvJrmiafooYwo5Y+v5LiN5aGrKVxyXG4gICAgICogQG1lbWJlcm9mIFFRTWluaUdhbWVBUElcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXRTaGFyZU1lbnUodGl0ZWw6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIGNvbXBsYXRlPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uUVFNaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWwj+a4uOaIj+iuvue9rui9rOWPkeaMiemSrlwiKTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInFxXCJdLnNob3dTaGFyZU1lbnUoe1xyXG4gICAgICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBmYWlsLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsYXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wicXFcIl0ub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0ZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGltYWdlVXJsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSBcIi4uL05ldC9IdHRwVW5pdFwiO1xyXG5pbXBvcnQgQXBwQ29uZmlnIGZyb20gXCIuLi9BcHBDb25maWdcIjtcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL1VzZXIvVXNlclwiO1xyXG5pbXBvcnQgVXRpbGl0IGZyb20gXCIuLi9VdGlsaXRcIjtcclxuaW1wb3J0IEFMRCBmcm9tIFwiLi4vQUxEXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vV1hBUElcIjtcclxuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi9FdmVudC9FdmVudE1nclwiO1xyXG5pbXBvcnQgeyBFdmVudERlZiB9IGZyb20gXCIuLi9FdmVudC9FdmVudERlZlwiO1xyXG5pbXBvcnQgQXBwU3dpdGNoQ29uZmlnIGZyb20gXCIuLi9Db25maWcvQXBwU3dpdGNoQ29uZmlnXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZUFkIFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1haW5VcmwgPSBcImh0dHBzOi8vc3d3d3cubXJrenguY25cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2V0QWRQb3N0aW9uID0gXCIvdjEuMS9hcGkvZ2V0QWRQb3NpdGlvbi5odG1sXCI7Ly/ojrflj5blub/lkYrkvY3liJfooahcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2V0QWR2ID0gXCIvdjEuMS9hcGkvZ2V0QWR2Lmh0bWxcIjsvL+iOt+WPluesrOS4ieaWueW5v+WRiuWIl+ihqFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1c2VyQ2xpY2sgPSBcIi92MS4xL2FwaS91c2VyY2xpY2suaHRtbFwiOy8v55So5oi354K55Ye75LiK5oqlXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBMb29wQWRMb2NhdGlvbklEID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQmFubmVyQWRMb2NhdGlvbklEID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSW5zZXJ0QWRMb2NhdGlvbklEID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQW5pQWRMb2NhdGlvbklEID0gMDtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBVc2VSYW5kb21BZFBvcyA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBZExvY2F0aW9uaWRzIDogQXJyYXk8bnVtYmVyPiA9IFxyXG4gICAgW1xyXG5cclxuICAgIF1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9hZFBvc2l0aW9uIDogYW55ID0ge31cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX2FkdiA6IGFueSA9IHt9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBfaXBob25lSWdub3JlQXBwSWRzID0gXHJcbiAgICBbXHJcbiAgICAgICAgXCJ3eDJkMmFjY2UzYzQ1ZjRkZGZcIixcclxuICAgICAgICBcInd4ZWI5M2MxMjk4ZWM3YzYyYlwiXHJcbiAgICBdXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWZyZXNoQWQoY29tcGxhdGUgOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICBTaGFyZUFkLmdldEFkUG9zRGF0YSgocmVzKT0+e1xyXG4gICAgICAgICAgICBpZigxID09IHJlcy5jb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWIhuS6q+W5v+WRiuaVsOaNruaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIFNoYXJlQWQuX2FkUG9zaXRpb24gPSByZXMucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYoY29tcGxhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5YiG5Lqr5bm/5ZGK5pWw5o2u5aSx6LSlIO+8miBcIiArIHJlcy5tc2cpO1xyXG4gICAgICAgICAgICAgICAgaWYoY29tcGxhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LChyZXMpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5YiG5Lqr5bm/5ZGK5pWw5o2u5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICBpZihjb21wbGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGxhdGUoZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QURWcyhsb2NhdGlvbmlkLGNvbXBsYXRlIDogRnVuY3Rpb24sdXNlUmFuZG9tPyA6IGJvb2xlYW4sdXNlTG9jYWxSYW5kb20/IDogYm9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZighU2hhcmVBZC5pc05lZWRTaG93QWQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbXBsYXRlKG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVzZVJhbmRvbSA9IG51bGwgPT0gdXNlUmFuZG9tID8gdGhpcy5Vc2VSYW5kb21BZFBvcyA6IHVzZVJhbmRvbTtcclxuICAgICAgICB1c2VMb2NhbFJhbmRvbSA9ICBudWxsID09IHVzZUxvY2FsUmFuZG9tID8gdHJ1ZSA6IHVzZVJhbmRvbTtcclxuICAgICAgICBpZih1c2VSYW5kb20pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsb2NhdGlvbmlkID0gdGhpcy5nZXRSYW5kb21BRFBvc0lEKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkYXRhcyA9IFNoYXJlQWQuX2Fkdltsb2NhdGlvbmlkXTtcclxuICAgICAgICBpZihkYXRhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkYXRhcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkgIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkYXRhcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1clZhbHVlID0gZGF0YXNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tVmFsdWUgPSBkYXRhc1tyYW5kb21JbmRleF07XHJcbiAgICAgICAgICAgICAgICBkYXRhc1tyYW5kb21JbmRleF0gPSBjdXJWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGRhdGFzW2ldID0gcmFuZG9tVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcGxhdGUoZGF0YXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNoYXJlQWQuZ2V0QURWRGF0YShsb2NhdGlvbmlkLChyZXMpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoMSA9PSByZXMuY29kZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLl9hZHZbbG9jYXRpb25pZF0gPSByZXMucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzID0gU2hhcmVBZC5fYWR2W2xvY2F0aW9uaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFzICYmIFV0aWxpdC5pc0lwaG9uZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7aTwgZGF0YXMubGVuZ3RoOysraSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaj0wO2ogPCBTaGFyZUFkLl9pcGhvbmVJZ25vcmVBcHBJZHMubGVuZ3RoOysrailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmFwcGlkID09IFNoYXJlQWQuX2lwaG9uZUlnbm9yZUFwcElkc1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLWk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhcyAmJiB1c2VMb2NhbFJhbmRvbSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBkYXRhcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkYXRhcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1clZhbHVlID0gZGF0YXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tVmFsdWUgPSBkYXRhc1tyYW5kb21JbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhc1tyYW5kb21JbmRleF0gPSBjdXJWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzW2ldID0gcmFuZG9tVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGF0ZShkYXRhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbXBsYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoY29tcGxhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwb3J0VXNlckNsaWNrKGFkdmlkKVxyXG4gICAge1xyXG4gICAgICAgIFNoYXJlQWQucmVxVXNlckNsaWNrKGFkdmlkLChyZXMpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKDEgPT0gcmVzLmNvZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi54K55Ye75bm/5ZGK5LiK5oql5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLngrnlh7vlub/lkYrkuIrmiqXlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi54K55Ye75bm/5ZGK5LiK5oql5aSx6LSlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmFuZG9tQURQb3NJRCgpIDogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQWRMb2NhdGlvbmlkc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLkFkTG9jYXRpb25pZHMubGVuZ3RoKV1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlcXVlc3QocmVxIDogcmVxdWVzdERhdGEpIHtcclxuICAgICAgICBpZiAocmVxLnVybC5pbmRleE9mKFwiaHR0cHM6Ly9cIikgPiAtMSB8fFxyXG4gICAgICAgICAgICByZXEudXJsLmluZGV4T2YoXCJodHRwOi8vXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgcmVxLnVybCA9IHJlcS51cmw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVxLnVybCA9IFNoYXJlQWQubWFpblVybCArIHJlcS51cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb21wbGV0ZUZ1bmMgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyxcImh0dHAgU3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICAgICAgIGlmIChyZXEub25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXEub25TdWNjZXNzKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlcSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgZXJyb3JGdW5jID0gKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCJodHRwIGZhaWxcIilcclxuICAgICAgICAgICAgaWYgKHJlcS5vbkZhaWwpICB7XHJcbiAgICAgICAgICAgICAgICByZXEub25GYWlsKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxLm9uRmFpbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlcSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHhocjogTGF5YS5IdHRwUmVxdWVzdCA9IG5ldyBMYXlhLkh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgY29tcGxldGVGdW5jKTtcclxuICAgICAgICB4aHIub25jZShMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCBlcnJvckZ1bmMpO1xyXG5cclxuXHJcbiAgICAgICAgaWYocmVxLm1ldGggPT0gXCJnZXRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXEuZGF0YSkpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZXEuZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgcGFyYSArPSAga2V5ICsgXCI9XCIgKyB2YWx1ZSArIFwiJlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcS51cmwgPSByZXEudXJsICsgXCI/XCIgKyBwYXJhO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBcInZlcnNpb25zXCIsIEFwcENvbmZpZy5WZXJzaW9ucyxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgeGhyLnNlbmQocmVxLnVybCxudWxsLHJlcS5tZXRoLG51bGwsaGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhcmEgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlcS5kYXRhKSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlcS5kYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICBwYXJhICs9ICBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGhlYWRlciA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInZlcnNpb25zXCIsIEFwcENvbmZpZy5WZXJzaW9ucyxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgeGhyLnNlbmQocmVxLnVybCxwYXJhLHJlcS5tZXRoLG51bGwsaGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBnZXRBZFBvc0RhdGEob25TdWNjZXNzIDogRnVuY3Rpb24sb25GYWlsIDogRnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIHJlcS51cmwgPSBTaGFyZUFkLmdldEFkUG9zdGlvbjtcclxuICAgICAgICByZXEub25TdWNjZXNzID0gb25TdWNjZXNzO1xyXG4gICAgICAgIHJlcS5vbkZhaWwgPSBvbkZhaWw7XHJcbiAgICAgICAgcmVxLmRhdGEuc29mdGlkID0gQXBwQ29uZmlnLkFwcElEO1xyXG4gICAgICAgIHJlcS5tZXRoID0gXCJnZXRcIjtcclxuICAgICAgICBTaGFyZUFkLnJlcXVlc3QocmVxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlcVVzZXJDbGljayhhZHZpZCxvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgcmVxLnVybCA9IFNoYXJlQWQudXNlckNsaWNrO1xyXG4gICAgICAgIHJlcS5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgcmVxLm9uRmFpbCA9IG9uRmFpbDtcclxuXHJcbiAgICAgICAgcmVxLmRhdGEuc29mdGlkID0gQXBwQ29uZmlnLkFwcElEO1xyXG4gICAgICAgIHJlcS5kYXRhLnVpZCAgPSBVc2VyLm9wZW5JZDtcclxuICAgICAgICByZXEuZGF0YS5hZHZpZCAgPSBhZHZpZCA7XHJcblxyXG4gICAgICAgIFNoYXJlQWQucmVxdWVzdChyZXEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgZ2V0QURWRGF0YShsb2NhdGlvbmlkLG9uU3VjY2VzcyA6IEZ1bmN0aW9uLG9uRmFpbCA6IEZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXEgPSBuZXcgcmVxdWVzdERhdGEoKTtcclxuICAgICAgICByZXEudXJsID0gU2hhcmVBZC5nZXRBZHY7XHJcbiAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgIHJlcS5kYXRhLnNvZnRpZCA9IEFwcENvbmZpZy5BcHBJRDtcclxuICAgICAgICByZXEuZGF0YS5sb2NhdGlvbmlkID0gbG9jYXRpb25pZDtcclxuICAgICAgICByZXEuZGF0YS5wcmV2aWV3ID0gMDtcclxuICAgICAgICBTaGFyZUFkLnJlcXVlc3QocmVxKTtcclxuICAgIH1cclxuXHJcblxyXG4vKipcclxuICAgICAqIOmaj+acuui3s+i9rOeahOaWueazle+8jOS8muS7juW5v+WRiuWIl+ihqOS4remaj+acuuW+l+WIsOS4gOS4qkFwcElk5bm25LiU6Lez6L2sLOi+k+WFpeeahOWPguaVsOS4uuamgueOh++8jOWkp+Wwj+WcqDAtMeS5i+mXtFxyXG4gICAgICog5aaC5p6c5qaC546H5aSn5LqOMe+8jOWImeiHquWKqOWwhuWFtumZpOS7pTEwMO+8jOaJgOS7peWNg+S4h+azqOaEj++8gVxyXG4gICAgICogXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3JhdGU9MV0gXHJcbiAgICAgKiBAbWVtYmVyb2YgU2hhcmVBZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFJhbmRvbUp1bXAocmF0ZTogbnVtYmVyID0gMSkgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLpmo/mnLrot7PovawscmF0Ze+8mlwiICsgcmF0ZSk7XHJcbiAgICAgICAgaWYgKHJhdGUgPiAxKSB7XHJcbiAgICAgICAgICAgIHJhdGUgPSByYXRlIC8gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIGlmIChyZCA8PSByYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBhZExvY2F0aW9uSUQgPSBTaGFyZUFkLkxvb3BBZExvY2F0aW9uSUQ7XHJcbiAgICAgICAgICAgIHZhciBMb2NhdGlvbnMgPSBcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgU2hhcmVBZC5Mb29wQWRMb2NhdGlvbklELCBcclxuICAgICAgICAgICAgICAgIFNoYXJlQWQuSW5zZXJ0QWRMb2NhdGlvbklELCBcclxuICAgICAgICAgICAgICAgIFNoYXJlQWQuQmFubmVyQWRMb2NhdGlvbklELFxyXG4gICAgICAgICAgICAgICAgU2hhcmVBZC5BbmlBZExvY2F0aW9uSUQsXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgaWYoU2hhcmVBZC5Vc2VSYW5kb21BZFBvcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7aSA8IFNoYXJlQWQuQWRMb2NhdGlvbmlkcy5sZW5ndGg7KytpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvY2F0aW9ucy5wdXNoKFNoYXJlQWQuQWRMb2NhdGlvbmlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRMb2NhdGlvbklEID0gTG9jYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIExvY2F0aW9ucy5sZW5ndGgpXVxyXG4gICAgICAgICAgICB2YXIgZGF0YXMgPSBTaGFyZUFkLmdldEFEVnMoYWRMb2NhdGlvbklELCBmdW5jdGlvbiAoZGF0YXM6IEFycmF5PGFueT4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZCA9IE1hdGguZmxvb3IoZGF0YXMubGVuZ3RoICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tyZF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmuLjmiI/vvJogXCIgKyBkYXRhLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICBXWEFQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCwgZGF0YS51cmwsIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2hhcmVBZC5yZXBvcnRVc2VyQ2xpY2soZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFMRC5hbGRTZW5kUmVwb3J0QWRDbGlja1N1Y2Nlc3MoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9PblNoYXJlQWRGYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT0gXCJuYXZpZ2F0ZVRvTWluaVByb2dyYW06ZmFpbCBjYW5jZWxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLflj5bmtojot7PovaxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBTEQuYWxkU2VuZFJlcG9ydEFkQ2xpY2tGYWlsKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc05lZWRTaG93QWQoKSA6IGJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICB2YXIgbWFpbGlhbmcgPSBBcHBTd2l0Y2hDb25maWcuZ2V0SW5zdGFuY2UoKS5nZXRBcHBTd2l0Y2hEYXRhKCkubWFpbGlhbmc7XHJcbiAgICAgICAgdmFyIG1haWxpYW5nbGlzdCA9IEFwcFN3aXRjaENvbmZpZy5nZXRJbnN0YW5jZSgpLmdldEFwcFN3aXRjaERhdGEoKS5tYWlsaWFuZ2xpc3Q7XHJcbiAgICAgICAgaWYoMSA9PSBtYWlsaWFuZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmxhZyA6IG51bWJlciA9IFdYQVBJLmdldExhdW5jaE9wdGlvbnNTeW5jKCkucXVlcnlbJ2NoaWQnXTtcclxuICAgICAgICAgICAgICAgIGlmKG51bGwgIT0gZmxhZyAmJiBudWxsICE9IG1haWxpYW5nbGlzdCAmJiBtYWlsaWFuZ2xpc3QubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpIDwgbWFpbGlhbmdsaXN0Lmxlbmd0aDsrK2kpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmbGFnID09IG1haWxpYW5nbGlzdFtpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoTGF5YS5Ccm93c2VyLm9uUVFCcm93c2VyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgU2hhcmVBZCBmcm9tIFwiLi4vU2hhcmVBZFwiO1xyXG5pbXBvcnQgV1hBUEkgZnJvbSBcIi4uLy4uL1dYQVBJXCI7XHJcbmltcG9ydCBBTEQgZnJvbSBcIi4uLy4uL0FMRFwiO1xyXG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uLy4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcbmltcG9ydCBBcHBTd2l0Y2hDb25maWcgZnJvbSBcIi4uLy4uL0NvbmZpZy9BcHBTd2l0Y2hDb25maWdcIjtcclxuaW1wb3J0IE9QUE9BUEkgZnJvbSBcIi4uLy4uL09QUE9BUElcIjtcclxuaW1wb3J0IFFRTWluaUdhbWVBUEkgZnJvbSBcIi4uLy4uL1FRTWluaUdhbWVBUElcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbm5lckFkVmlldyBleHRlbmRzIExheWEuU2NyaXB0IFxyXG57XHJcbiAgICBwdWJsaWMgQWRQb3NJRCA6IG51bWJlciA9IFNoYXJlQWQuQmFubmVyQWRMb2NhdGlvbklEO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNwbGF5U3AgOiBMYXlhLlNwcml0ZTtcclxuICAgIHByb3RlY3RlZCBfZGF0YSA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIFdYQmFubmVyV2lkdGggOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX3d4QmFubmVyIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBvbkF3YWtlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3AgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiRGlzcGxheVwiKSBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICBpZihudWxsID09IHRoaXMuX2Rpc3BsYXlTcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlTcCA9IHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTcC5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5vblNwQ2xpY2spO1xyXG4gICAgICAgIHZhciBiYW5uZXIgPSBBcHBTd2l0Y2hDb25maWcuZ2V0SW5zdGFuY2UoKS5nZXRBcHBTd2l0Y2hEYXRhKCkuYmFubmVyO1xyXG4gICAgICAgIGlmKDAgPT0gYmFubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQmFubmVyRGlzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKDEgPT0gYmFubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoV1hCYW5uZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheVNwLm9mZihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5vblNwQ2xpY2spO1xyXG4gICAgICAgIHRoaXMuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hCYW5uZXJEaXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBTaGFyZUFkLmdldEFEVnModGhpcy5BZFBvc0lELChkYXRhcyk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZGF0YXMgJiYgZGF0YXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkYXRhcy5sZW5ndGgpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kaXNwbGF5U3AubG9hZEltYWdlKGRhdGEubG9nbyxMYXlhLkhhbmRsZXIuY3JlYXRlKHNlbGYsZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLl9kaXNwbGF5U3AuZGVzdHJveWVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGlzcGxheVNwLndpZHRoID0gNzUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9kaXNwbGF5U3AuaGVpZ2h0ID0gMjU2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TcENsaWNrKClcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5ri45oiP77yaIFwiICsgZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgIGlmKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBXWEFQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCxkYXRhLnVybCwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBBTEQuYWxkU2VuZFJlcG9ydEFkQ2xpY2tTdWNjZXNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9PblNoYXJlQWRGYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuZXJyTXNnID09IFwibmF2aWdhdGVUb01pbmlQcm9ncmFtOmZhaWwgY2FuY2VsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+WPlua2iOi3s+i9rFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQUxELmFsZFNlbmRSZXBvcnRBZENsaWNrRmFpbChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT1BQT0FQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCxkYXRhLnVybCwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuQURfT25TaGFyZUFkRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoTGF5YS5Ccm93c2VyLm9uUVFNaW5pR2FtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUVFNaW5pR2FtZUFQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCxkYXRhLnVybCwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuQURfT25TaGFyZUFkRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hXWEJhbm5lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxheWEuQnJvd3Nlci5vbk1pbmlHYW1lIHx8ICEodGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZSkudmlzaWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzeXNJbmZvID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdmFyIHN3ID0gc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICB2YXIgc2ggPSBzeXNJbmZvLnNjcmVlbkhlaWdodDtcclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5fZGlzcGxheVNwLmxvY2FsVG9HbG9iYWwobmV3IExheWEuUG9pbnQoMCwwKSlcclxuXHJcbiAgICAgICAgdmFyIGxlZnQgPSBwb3MueCAvIExheWEuc3RhZ2Uud2lkdGggKiBzdztcclxuICAgICAgICB2YXIgdG9wID0gcG9zLnkgLyBMYXlhLnN0YWdlLmhlaWdodCAqIHNoO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuV1hCYW5uZXJXaWR0aCA/IHRoaXMuV1hCYW5uZXJXaWR0aCAvIExheWEuc3RhZ2Uud2lkdGggKiBzdyA6IHN3O1xyXG5cclxuICAgICAgICB0aGlzLl93eEJhbm5lciA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5jcmVhdGVCYW5uZXJBZChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQgOiBXWEFQSS5iYW5uZXJBZFVuaXRJZCxcclxuICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzIDogMzAsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA6IFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6bGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6dG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgc2VsZi5fd3hCYW5uZXIub25Mb2FkKChyZXMpID0+ICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV1hCYW5uZXLlub/lkYog5Yqg6L295a6M5oiQXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5fd3hCYW5uZXIub25FcnJvcigoZXJyKSA9PiAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldYQmFubmVy5bm/5ZGKIOWKoOi9veWksei0pVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgc2VsZi5yZWZyZXNoQmFubmVyRGlzKCk7XHJcbiAgICAgICAgICAgIHNlbGYuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl93eEJhbm5lci5vblJlc2l6ZShyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLl93eEJhbm5lci5zdHlsZS5yZWFsV2lkdGgsIHNlbGYuX3d4QmFubmVyLnN0eWxlLnJlYWxIZWlnaHQpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2VsZi5fd3hCYW5uZXIuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgY2xlYXJXWEJhbmVyKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl93eEJhbm5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3d4QmFubmVyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fd3hCYW5uZXIgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNoYXJlQWQgZnJvbSBcIi4uL1NoYXJlQWRcIjtcclxuaW1wb3J0IExvb3BBZEJveCBmcm9tIFwiLi9Mb29wQWRCb3hcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvcml6b250YWxMb29wQWRWaWV3IGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgcHVibGljIEFkUG9zSUQ6IG51bWJlciA9IFNoYXJlQWQuTG9vcEFkTG9jYXRpb25JRDtcclxuICAgIHByb3RlY3RlZCBfbGlzdDogTGF5YS5MaXN0O1xyXG4gICAgcHJvdGVjdGVkIF9zY3JvbGxGb3J3YXJkID0gdHJ1ZTtcclxuXHJcbiAgICBvbkF3YWtlKCkgIHtcclxuICAgICAgICB0aGlzLl9saXN0ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkxpc3RcIikgYXMgTGF5YS5MaXN0O1xyXG4gICAgICAgIHRoaXMuX2xpc3QucmVuZGVySGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxpc3RSZW5kZXIsIG51bGwsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuX2xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBTaGFyZUFkLmdldEFEVnModGhpcy5BZFBvc0lELCAoZGF0YXMpID0+ICB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm93bmVyICYmICFzZWxmLm93bmVyLmRlc3Ryb3llZCkgIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhcyAmJiBkYXRhcy5sZW5ndGggPiAwICYmIGRhdGFzLmxlbmd0aCA8IDUwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gW11cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1MDsgKytpKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA+PSBkYXRhcy5sZW5ndGgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLnB1c2goZGF0YXNbY291bnRlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2NvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBMZW4gPSBkYXRhcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wLmxlbmd0aDsgKytpKSBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cCA9IE1hdGguZmxvb3IoaSAvIGdyb3VwTGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBncm91cCAqIGdyb3VwTGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncm91cExlbikgKyBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyVmFsdWUgPSB0ZW1wW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tVmFsdWUgPSB0ZW1wW3JhbmRvbUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFtyYW5kb21JbmRleF0gPSBjdXJWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFtpXSA9IHJhbmRvbVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0LmFycmF5ID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QuYXJyYXkgPSBkYXRhcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbEZvcndhcmQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3Quc2Nyb2xsQmFyLnZhbHVlICs9IDEwMCAqIExheWEudGltZXIuZGVsdGEgLyAxMDAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5zY3JvbGxCYXIudmFsdWUgPj0gdGhpcy5fbGlzdC5zY3JvbGxCYXIubWF4KSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRm9yd2FyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5zY3JvbGxCYXIudmFsdWUgLT0gMTAwICogTGF5YS50aW1lci5kZWx0YSAvIDEwMDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0LnNjcm9sbEJhci52YWx1ZSA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRm9yd2FyZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTGlzdFJlbmRlcihjZWxsOiBMYXlhLkJveCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fbGlzdC5hcnJheVtpbmRleF07XHJcbiAgICAgICAgdmFyIGxvb3BBZEJveDogTG9vcEFkQm94ID0gY2VsbC5nZXRDb21wb25lbnQoTG9vcEFkQm94KTtcclxuICAgICAgICBsb29wQWRCb3guc2V0RGF0YShkYXRhKTtcclxuICAgIH1cclxufSIsImltcG9ydCBXWEFQSSBmcm9tIFwiLi4vLi4vV1hBUElcIjtcclxuaW1wb3J0IFNoYXJlQWQgZnJvbSBcIi4uL1NoYXJlQWRcIjtcclxuaW1wb3J0IEFMRCBmcm9tIFwiLi4vLi4vQUxEXCI7XHJcbmltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IE9QUE9BUEkgZnJvbSBcIi4uLy4uL09QUE9BUElcIjtcclxuaW1wb3J0IFFRTWluaUdhbWVBUEkgZnJvbSBcIi4uLy4uL1FRTWluaUdhbWVBUElcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3BBZEJveCBleHRlbmRzIExheWEuU2NyaXB0IFxyXG57XHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXlTcCA6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNUZXh0IDogTGF5YS5UZXh0O1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhIDogYW55ID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBfb3JpZ2luVyA6IG51bWJlciA9IDE1MDtcclxuICAgIHByb3RlY3RlZCBfb3JpZ2luSCA6IG51bWJlciA9IDE1MDtcclxuICAgIHByb3RlY3RlZCBfZm9udFNpemUgPSAyNTtcclxuICAgIFxyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTcCA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJEaXNwbGF5XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuX29yaWdpblcgPSB0aGlzLl9kaXNwbGF5U3Aud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luSCA9IHRoaXMuX2Rpc3BsYXlTcC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fZGlzVGV4dCA9ICB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiVGl0ZWxUZXh0XCIpIGFzIExheWEuVGV4dDtcclxuICAgICAgICB0aGlzLl9kaXNUZXh0LnRleHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2ZvbnRTaXplID0gdGhpcy5fZGlzVGV4dC5mb250U2l6ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25FbmFibGUoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Aub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMub25TcENsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Aub2ZmKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLm9uU3BDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERhdGEoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5U3AubG9hZEltYWdlKGRhdGEubG9nbyxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighc2VsZi5fZGlzcGxheVNwLmRlc3Ryb3llZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9kaXNwbGF5U3Aud2lkdGggPSBzZWxmLl9vcmlnaW5XO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BsYXlTcC5oZWlnaHQgPSBzZWxmLl9vcmlnaW5IO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBTdHJpbmcoZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgIHZhciBudW0gPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICBudW0gPSBNYXRoLm1heCg1LG51bSk7XHJcbiAgICAgICAgICAgIHZhciBmb250U2l6ZSA9IE1hdGguZmxvb3IoKDUgLyBudW0pICogdGhpcy5fZm9udFNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNUZXh0LmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc1RleHQudGV4dCA9IHN0cjtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNwQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmuLjmiI/vvJogXCIgKyBkYXRhLnRpdGxlKTtcclxuICAgICAgICAgICAgaWYoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFdYQVBJLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhLmFwcGlkLGRhdGEudXJsLChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIFNoYXJlQWQucmVwb3J0VXNlckNsaWNrKGRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFMRC5hbGRTZW5kUmVwb3J0QWRDbGlja1N1Y2Nlc3MoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFEX09uU2hhcmVBZEZhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5lcnJNc2cgPT0gXCJuYXZpZ2F0ZVRvTWluaVByb2dyYW06ZmFpbCBjYW5jZWxcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35Y+W5raI6Lez6L2sXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBTEQuYWxkU2VuZFJlcG9ydEFkQ2xpY2tGYWlsKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5a6M5oiQXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChMYXlhLkJyb3dzZXIub25RR01pbmlHYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPUFBPQVBJLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhLmFwcGlkLGRhdGEudXJsLChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIFNoYXJlQWQucmVwb3J0VXNlckNsaWNrKGRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgfSwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9PblNoYXJlQWRGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5a6M5oiQXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChMYXlhLkJyb3dzZXIub25RUU1pbmlHYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBRUU1pbmlHYW1lQVBJLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhLmFwcGlkLGRhdGEudXJsLChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIFNoYXJlQWQucmVwb3J0VXNlckNsaWNrKGRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgfSwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9PblNoYXJlQWRGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5a6M5oiQXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBTaGFyZUFkIGZyb20gXCIuLi9TaGFyZUFkXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vLi4vV1hBUElcIjtcclxuaW1wb3J0IEFMRCBmcm9tIFwiLi4vLi4vQUxEXCI7XHJcbmltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IEFwcFN3aXRjaENvbmZpZyBmcm9tIFwiLi4vLi4vQ29uZmlnL0FwcFN3aXRjaENvbmZpZ1wiO1xyXG5pbXBvcnQgT1BQT0FQSSBmcm9tIFwiLi4vLi4vT1BQT0FQSVwiO1xyXG5pbXBvcnQgUVFNaW5pR2FtZUFQSSBmcm9tIFwiLi4vLi4vUVFNaW5pR2FtZUFQSVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3VkaWFuQmFubmVyQWRWaWV3IGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgcHVibGljIEFkUG9zSUQ6IG51bWJlciA9IFNoYXJlQWQuQmFubmVyQWRMb2NhdGlvbklEO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNwbGF5U3A6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBXWEJhbm5lcldpZHRoOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX3d4QmFubmVyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheVNwID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkRpc3BsYXlcIikgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheVNwLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5yZWdFdmVtdChFdmVudERlZi5BRF9XdWRpYW5CYW5uZXJfU2hvdywgdGhpcywgdGhpcy5TaG93QmFubmVyKTtcclxuICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5yZWdFdmVtdChFdmVudERlZi5BRF9XdWRpYW5CYW5uZXJfSGlkZSwgdGhpcywgdGhpcy5IaWRlQmFubmVyKTtcclxuICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5yZWdFdmVtdChFdmVudERlZi5BRF9XdWRpYW5CYW5uZXJfUHJlTG9hZCwgdGhpcywgdGhpcy5QcmVsb2FkQmFubmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlByZWxvYWRCYW5uZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBQcmVsb2FkQmFubmVyKCkge1xyXG4gICAgICAgIGlmICgodGhpcy5vd25lciBhcyBMYXlhLlVJQ29tcG9uZW50KS52aXNpYmxlID09IGZhbHNlKSByZXR1cm47XHJcbiAgICAgICAgdmFyIGJhbm5lciA9IEFwcFN3aXRjaENvbmZpZy5nZXRJbnN0YW5jZSgpLmdldEFwcFN3aXRjaERhdGEoKS5iYW5uZXI7XHJcbiAgICAgICAgaWYgKDEgPT0gYmFubmVyICYmIExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdYQmFubmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hCYW5uZXJEaXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2hvd0Jhbm5lcigpIHtcclxuICAgICAgICBpZiAoKHRoaXMub3duZXIgYXMgTGF5YS5VSUNvbXBvbmVudCkudmlzaWJsZSA9PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvd0Jhbm5lclwiKTtcclxuICAgICAgICB2YXIgYmFubmVyID0gQXBwU3dpdGNoQ29uZmlnLmdldEluc3RhbmNlKCkuZ2V0QXBwU3dpdGNoRGF0YSgpLmJhbm5lcjtcclxuICAgICAgICBpZiAoMSA9PSBiYW5uZXIgJiYgTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUgJiYgdGhpcy5fd3hCYW5uZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXeHNob3dCYW5uZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3d4QmFubmVyLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlTcC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVNwLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TcENsaWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcigpIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Aub2ZmKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TcENsaWNrKTtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3AudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICB9XHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuQURfV3VkaWFuQmFubmVyX1Nob3csIHRoaXMsIHRoaXMuU2hvd0Jhbm5lcik7XHJcbiAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuQURfV3VkaWFuQmFubmVyX0hpZGUsIHRoaXMsIHRoaXMuSGlkZUJhbm5lcik7XHJcbiAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuQURfV3VkaWFuQmFubmVyX1ByZUxvYWQsIHRoaXMsIHRoaXMuUHJlbG9hZEJhbm5lcik7XHJcbiAgICB9XHJcbiAgICAvLyBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAvLyAgICAgdGhpcy5fZGlzcGxheVNwLm9mZihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uU3BDbGljayk7XHJcbiAgICAvLyAgICAgdGhpcy5jbGVhcldYQmFuZXIoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEJhbm5lckRpcygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgU2hhcmVBZC5nZXRBRFZzKHRoaXMuQWRQb3NJRCwgKGRhdGFzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhcyAmJiBkYXRhcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGFzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRhdGFzLmxlbmd0aCldO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGlzcGxheVNwLmxvYWRJbWFnZShkYXRhLmxvZ28sIExheWEuSGFuZGxlci5jcmVhdGUoc2VsZiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5fZGlzcGxheVNwLmRlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9kaXNwbGF5U3Aud2lkdGggPSA3NTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BsYXlTcC5oZWlnaHQgPSAyNTY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFEX1d1ZGlhbkJhbm5lcl9Mb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3BDbGljaygpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5ri45oiP77yaIFwiICsgZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgIGlmKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBXWEFQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCxkYXRhLnVybCwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBBTEQuYWxkU2VuZFJlcG9ydEFkQ2xpY2tTdWNjZXNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9PblNoYXJlQWRGYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuZXJyTXNnID09IFwibmF2aWdhdGVUb01pbmlQcm9ncmFtOmZhaWwgY2FuY2VsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+WPlua2iOi3s+i9rFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQUxELmFsZFNlbmRSZXBvcnRBZENsaWNrRmFpbChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoTGF5YS5Ccm93c2VyLm9uUUdNaW5pR2FtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT1BQT0FQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCxkYXRhLnVybCwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuQURfT25TaGFyZUFkRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoTGF5YS5Ccm93c2VyLm9uUVFNaW5pR2FtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUVFNaW5pR2FtZUFQSS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YS5hcHBpZCxkYXRhLnVybCwocmVzKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBTaGFyZUFkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuQURfT25TaGFyZUFkRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hXWEJhbm5lcigpIHtcclxuICAgICAgICBpZiAoIUxheWEuQnJvd3Nlci5vbk1pbmlHYW1lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jbGVhcldYQmFuZXIoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHN5c0luZm8gPSBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0uZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICB2YXIgc3cgPSBzeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgIHZhciBzaCA9IHN5c0luZm8uc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgIHZhciBwb3MgPSB0aGlzLl9kaXNwbGF5U3AubG9jYWxUb0dsb2JhbChuZXcgTGF5YS5Qb2ludCgwLCAwKSlcclxuXHJcbiAgICAgICAgdmFyIGxlZnQgPSBwb3MueCAvIExheWEuc3RhZ2Uud2lkdGggKiBzdztcclxuICAgICAgICB2YXIgdG9wID0gcG9zLnkgLyBMYXlhLnN0YWdlLmhlaWdodCAqIHNoO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuV1hCYW5uZXJXaWR0aCA/IHRoaXMuV1hCYW5uZXJXaWR0aCAvIExheWEuc3RhZ2Uud2lkdGggKiBzdyA6IHN3O1xyXG5cclxuICAgICAgICB0aGlzLl93eEJhbm5lciA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5jcmVhdGVCYW5uZXJBZChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IFdYQVBJLmJhbm5lckFkVW5pdElkLFxyXG4gICAgICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDMwLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBzZWxmLl93eEJhbm5lci5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivr+eCuUJhbm5lcuW5v+WRiiDliqDovb3lrozmiJBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFEX1d1ZGlhbkJhbm5lcl9Mb2FkQ29tcGxldGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5fd3hCYW5uZXIub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+v54K5QmFubmVy5bm/5ZGKIOWKoOi9veWksei0pVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgc2VsZi5yZWZyZXNoQmFubmVyRGlzKCk7XHJcbiAgICAgICAgICAgIHNlbGYuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl93eEJhbm5lci5vblJlc2l6ZShyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLl93eEJhbm5lci5zdHlsZS5yZWFsV2lkdGgsIHNlbGYuX3d4QmFubmVyLnN0eWxlLnJlYWxIZWlnaHQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBzZWxmLl93eEJhbm5lci5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyV1hCYW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd3hCYW5uZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fd3hCYW5uZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93eEJhbm5lciA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcblxyXG4vL+a4uOaIj+aVsOaNrizkuLrkv53mjIHniYjmnKzlhbzlrrnvvIzlu7rorq7kuI3opoHliKDpmaTlkozkv67mlLnlrZfmrrXlkI1cclxuZXhwb3J0IGNsYXNzIFVzZXJHYW1lRGF0YVxyXG57XHJcbiAgICBwdWJsaWMgIGxldmVsTnVtOiBudW1iZXIgPSAxOy8v5b2T5YmN5YWz5Y2hXHJcbiAgICBwdWJsaWMgIG1vbmV5TnVtOiBudW1iZXIgPSAwOy8v6YeR5biB5pWw6YePXHJcbiAgICBwdWJsaWMgIGNyeXN0YWxOdW06IG51bWJlciA9IDA7Ly/pkrvnn7PmlbDph48gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBMYXlhLlNjcmlwdCBcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjb2RlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBvcGVuSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRva2VuOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBuaWNrTmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2VuZGVyOm51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0xvZ2luOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2dhbWVEYXRhIDogVXNlckdhbWVEYXRhID0gbmV3IFVzZXJHYW1lRGF0YSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2F2ZURhdGEoKSA6IHN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShVc2VyLl9nYW1lRGF0YSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdGVzdEluaXRVc2VyKClcclxuICAgIHtcclxuICAgICAgICBVc2VyLl9nYW1lRGF0YS5sZXZlbE51bSA9IDE7XHJcbiAgICAgICAgVXNlci5fZ2FtZURhdGEubW9uZXlOdW0gPSAxMDAwMDAwMDtcclxuICAgICAgICBVc2VyLl9nYW1lRGF0YS5jcnlzdGFsTnVtID0gMTAwMDAwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbml0aVVzZXIoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihkYXRhICYmIDAgIT0gZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFVzZXIuX2dhbWVEYXRhLmxldmVsTnVtID0gZGF0YS5sZXZlbE51bTtcclxuICAgICAgICAgICAgVXNlci5fZ2FtZURhdGEubW9uZXlOdW0gPSBkYXRhLm1vbmV5TnVtO1xyXG4gICAgICAgICAgICBVc2VyLl9nYW1lRGF0YS5jcnlzdGFsTnVtID0gZGF0YS5jcnlzdGFsTnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RvZG/vvJrlpITnkIbmsqHmnInojrflj5bliLDnjqnlrrbmlbDmja7nmoTmg4XlhrVcclxuICAgICAgICB9ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldExldmVOdW0obGV2ZWxOdW0gOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgVXNlci5fZ2FtZURhdGEubGV2ZWxOdW0gPSBsZXZlbE51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExldmVOdW0oKSA6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBVc2VyLl9nYW1lRGF0YS5sZXZlbE51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZE1vbmV5KGFkZCA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBhZGQgPSBNYXRoLmNlaWwoYWRkKVxyXG4gICAgICAgIHZhciBsYXN0ID0gVXNlci5fZ2FtZURhdGEubW9uZXlOdW1cclxuICAgICAgICBVc2VyLl9nYW1lRGF0YS5tb25leU51bSArPSBhZGQ7XHJcbiAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9PblVzZXJNb25leUNoYW5nZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyciA6IFVzZXIuX2dhbWVEYXRhLm1vbmV5TnVtLFxyXG4gICAgICAgICAgICAgICAgbGFzdCA6IGxhc3RcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc3ViTW9uZXkoc3ViIDogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHN1YiA9IE1hdGguY2VpbChzdWIpXHJcbiAgICAgICAgdmFyIGxhc3QgPSBVc2VyLl9nYW1lRGF0YS5tb25leU51bVxyXG4gICAgICAgIFVzZXIuX2dhbWVEYXRhLm1vbmV5TnVtIC09IHN1YjtcclxuICAgICAgICBpZihVc2VyLl9nYW1lRGF0YS5tb25leU51bSA8IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBVc2VyLl9nYW1lRGF0YS5tb25leU51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfT25Vc2VyTW9uZXlDaGFuZ2UsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnIgOiBVc2VyLl9nYW1lRGF0YS5tb25leU51bSxcclxuICAgICAgICAgICAgICAgIGxhc3QgOiBsYXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1vbmV5KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVXNlci5fZ2FtZURhdGEubW9uZXlOdW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRDcnlzdGFsKGFkZCA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBhZGQgPSBNYXRoLmNlaWwoYWRkKVxyXG4gICAgICAgIHZhciBsYXN0ID0gVXNlci5fZ2FtZURhdGEuY3J5c3RhbE51bVxyXG4gICAgICAgIFVzZXIuX2dhbWVEYXRhLmNyeXN0YWxOdW0gKz0gYWRkO1xyXG4gICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfT25Vc2VyQ3J5c3RhbENoYW5nZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyciA6IFVzZXIuX2dhbWVEYXRhLmNyeXN0YWxOdW0sXHJcbiAgICAgICAgICAgICAgICBsYXN0IDogbGFzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzdWJDcnlzdGFsKHN1YiA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBzdWIgPSBNYXRoLmNlaWwoc3ViKVxyXG4gICAgICAgIHZhciBsYXN0ID0gVXNlci5fZ2FtZURhdGEuY3J5c3RhbE51bVxyXG4gICAgICAgIFVzZXIuX2dhbWVEYXRhLmNyeXN0YWxOdW0gLT0gc3ViO1xyXG4gICAgICAgIGlmKFVzZXIuX2dhbWVEYXRhLmNyeXN0YWxOdW0gPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVXNlci5fZ2FtZURhdGEuY3J5c3RhbE51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfT25Vc2VyQ3J5c3RhbENoYW5nZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyciA6IFVzZXIuX2dhbWVEYXRhLmNyeXN0YWxOdW0sXHJcbiAgICAgICAgICAgICAgICBsYXN0IDogbGFzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDcnlzdGFsKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVXNlci5fZ2FtZURhdGEuY3J5c3RhbE51bTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbGl0XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgT3JpZ2luU3RhZ2VXaWR0aCA9IDEzMzQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE9yaWdpblN0YWdlSGVpZ2h0ID0gNzUwO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXlzY2FsZU1hdDogQXJyYXk8bnVtYmVyPiA9XHJcbiAgICAgICAgWzAuMzA4NiwgMC42MDk0LCAwLjA4MjAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAuMzA4NiwgMC42MDk0LCAwLjA4MjAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAuMzA4NiwgMC42MDk0LCAwLjA4MjAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAsIDAsIDAsIDEsIDBdO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXlzY2FsZUZpbHRlcjogTGF5YS5Db2xvckZpbHRlciA9IG5ldyBMYXlhLkNvbG9yRmlsdGVyKFV0aWxpdC5ncmF5c2NhbGVNYXQpO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHBvaW5Eb3duIDogTGF5YS5Qb2ludCA9IG5ldyBMYXlhLlBvaW50KDAsLTEpO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBwb2luVXAgOiBMYXlhLlBvaW50ID0gbmV3IExheWEuUG9pbnQoMCwxKTtcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgTGVycChmb3JtIDogbnVtYmVyLHRvIDogbnVtYmVyLGRlbHRhIDogbnVtYmVyKSA6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKGZvcm0gPT0gdG8pXHJcbiAgICAgICAgICAgIHJldHVybiB0bztcclxuICAgICAgICBpZihmb3JtID4gdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IGZvcm0gLSBkZWx0YTtcclxuICAgICAgICAgICAgaWYobmV4dCA8PSB0bylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bztcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZm9ybSA8IHRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5leHQgPSBmb3JtICsgZGVsdGE7XHJcbiAgICAgICAgICAgIGlmKG5leHQgPj0gdG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG87XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlcnBFdWxlckFuZ2xlKGZvcm0gOiBudW1iZXIsdG8gOiBudW1iZXIsZGVsdGEpIDogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGZvcm0gPSBmb3JtICUgMzYwO1xyXG4gICAgICAgIGZvcm0gPSBmb3JtID49IDAgPyBmb3JtIDogKDM2MCArIGZvcm0pO1xyXG4gICAgICAgIHZhciB0byA9IHRvICUgMzYwO1xyXG4gICAgICAgIHRvID0gdG8gPj0gMCA/IHRvIDogKDM2MCArIHRvKTtcclxuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnModG8gLSBmb3JtKTtcclxuICAgICAgICBpZihkaXMgPiAxODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihmb3JtIDwgdG8pXHJcbiAgICAgICAgICAgICAgICB0byA9IHRvIC0gMzYwXHJcbiAgICAgICAgICAgIGVsc2UgaWYoZm9ybSA+IHRvKVxyXG4gICAgICAgICAgICAgICAgdG8gPSB0byArIDM2MFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV4dCA9IFV0aWxpdC5MZXJwKGZvcm0sdG8sZGVsdGEpO1xyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Um90YXRpb25CeURpcih2IDogTGF5YS5Qb2ludCkgOiBudW1iZXJcclxuICAgIHsgICBcclxuICAgICAgICB2YXIgZG90VmFsdWUgPSAodi54ICogVXRpbGl0LnBvaW5Eb3duLngpICsgKHYueSAqICBVdGlsaXQucG9pbkRvd24ueSk7XHJcbiAgICAgICAgdmFyIGNvcyA9IGRvdFZhbHVlIC8gKHYuZGlzdGFuY2UoMCwwKSAgKiBVdGlsaXQucG9pbkRvd24uZGlzdGFuY2UoMCwwKSk7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IE1hdGguYWNvcyhjb3MpXHJcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gcmFkaWFuIC8gKDIgKiBNYXRoLlBJKSAgKiAzNjA7XHJcbiAgICAgICAgaWYodi54IDwgMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uID0gLXJvdGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb3RhdGlvbkJ5RGlyT24zRFNwYWNlKHYgOiBMYXlhLlBvaW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkb3RWYWx1ZSA9ICh2LnggKiBVdGlsaXQucG9pblVwLngpICsgKHYueSAqICBVdGlsaXQucG9pblVwLnkpO1xyXG4gICAgICAgIHZhciBjb3MgPSBkb3RWYWx1ZSAvICh2LmRpc3RhbmNlKDAsMCkgICogVXRpbGl0LnBvaW5VcC5kaXN0YW5jZSgwLDApKTtcclxuICAgICAgICB2YXIgcmFkaWFuID0gTWF0aC5hY29zKGNvcylcclxuICAgICAgICB2YXIgcm90YXRpb24gPSByYWRpYW4gLyAoMiAqIE1hdGguUEkpICAqIDM2MDtcclxuICAgICAgICBpZih2LnggPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm90YXRpb24gPSByb3RhdGlvbiArICgxODAgLSByb3RhdGlvbikgKiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJCeVJvdGF0aW9uKHJvdGF0aW9uIDogbnVtYmVyKSA6IExheWEuUG9pbnRcclxuICAgIHsgICBcclxuICAgICAgICB2YXIgcmFkaWFuID0gKHJvdGF0aW9uIC0gOTApICogTWF0aC5QSSAvIDE4MDsvLyAtOTAg5piv6L2s5o2i5Yiw5Zy65pmv5Z2Q5qCH57O7XHJcbiAgICAgICAgdmFyIHggPSBNYXRoLmNvcyhyYWRpYW4pO1xyXG4gICAgICAgIHZhciB5ID0gTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgICAgICB2YXIgcG9pbnQgPSBuZXcgTGF5YS5Qb2ludCh4LHkpO1xyXG4gICAgICAgIHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIHJldHVybiBwb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpckRpckFuZ2xlKGRpcjEgOiBMYXlhLlBvaW50LGRpcjIgOiBMYXlhLlBvaW50KSA6IG51bWJlclxyXG4gICAgeyAgIFxyXG4gICAgICAgIHZhciBkb3RWYWx1ZSA9IChkaXIxLnggKiBkaXIyLngpICsgKGRpcjEueSAqICBkaXIyLnkpO1xyXG4gICAgICAgIHZhciBjb3MgPSBkb3RWYWx1ZSAvIChkaXIxLmRpc3RhbmNlKDAsMCkgICogZGlyMi5kaXN0YW5jZSgwLDApKTtcclxuICAgICAgICB2YXIgcmFkaWFuID0gTWF0aC5hY29zKGNvcylcclxuICAgICAgICB2YXIgYW5nbGUgPSByYWRpYW4gLyAoMiAqIE1hdGguUEkpICAqIDM2MDtcclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJTY2FsYXJMZW5ndGgoZGlyIDogTGF5YS5Qb2ludCkgOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICB2YXIgc2wgPSBNYXRoLnNxcnQoZGlyLnggKiBkaXIueCArIGRpci55ICogZGlyLnkpO1xyXG4gICAgICAgIHJldHVybiBzbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFNwT25QYXJlbnRDZW50ZXIoc3AgOiBMYXlhLlNwcml0ZSlcclxuICAgIHtcclxuICAgICAgICBpZihudWxsID09IHNwLnBhcmVudClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBwc3AgPSBzcC5wYXJlbnQgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdmFyIHggID0gMDtcclxuICAgICAgICB2YXIgeSAgPSAwO1xyXG4gICAgICAgIHZhciB4ICA9IHggLSBzcC53aWR0aCAvIDIgKiBzcC5zY2FsZVggKyBwc3Aud2lkdGggLyAyO1xyXG4gICAgICAgIHZhciB5ICA9IHkgLSBzcC5oZWlnaHQgLyAyICAqIHNwLnNjYWxlWSAgKyBwc3AuaGVpZ2h0IC8gMjtcclxuICAgICAgICBzcC54ID0geDtcclxuICAgICAgICBzcC55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBvaW50VG9MaW5lRGlzdGFuY2UoeCA6IG51bWJlcix5IDogbnVtYmVyLExpbmVTdGFydCA6IExheWEuUG9pbnQsTGluZUVuZCA6IExheWEuUG9pbnQpIDogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRvU3RhcnREaXIgPSBuZXcgTGF5YS5Qb2ludCh4ICAtIExpbmVTdGFydC54LHkgLSBMaW5lU3RhcnQueSk7XHJcbiAgICAgICAgdmFyIHRvRW5kRGlyID0gbmV3IExheWEuUG9pbnQoeCAgLSBMaW5lRW5kLngseSAtIExpbmVFbmQueSk7XHJcbiAgICAgICAgdmFyIGxpbmVEaXIgPSBuZXcgTGF5YS5Qb2ludChMaW5lRW5kLnggLSBMaW5lU3RhcnQueSxMaW5lRW5kLnkgLSBMaW5lU3RhcnQueSlcclxuICAgICAgICB2YXIgZG90VG9TdGFydERpciA9IChsaW5lRGlyLnggKiB0b1N0YXJ0RGlyLngpICsgKGxpbmVEaXIueSAqIHRvU3RhcnREaXIueSlcclxuICAgICAgICBpZihkb3RUb1N0YXJ0RGlyIDw9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9TdGFydERpci5kaXN0YW5jZSgwLDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZG90VG9FbmREaXIgPSAobGluZURpci54ICogdG9FbmREaXIueCkgKyAobGluZURpci55ICogdG9FbmREaXIueSlcclxuICAgICAgICBpZiAoZG90VG9FbmREaXIgPD0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b0VuZERpci5kaXN0YW5jZSgwLDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdG9TdGFydERpcyA9IHRvU3RhcnREaXIuZGlzdGFuY2UoMCwwKTtcclxuICAgICAgICB2YXIgbGluZURpckRpcyA9IGxpbmVEaXIuZGlzdGFuY2UoMCwwKTtcclxuICAgICAgICB2YXIgY29zID0gZG90VG9TdGFydERpciAvICh0b1N0YXJ0RGlzICogbGluZURpckRpcyk7XHJcbiAgICAgICAgdmFyIHJhZGlhbnMgPSBNYXRoLmFjb3MoY29zKVxyXG4gICAgICAgIHZhciBkaXMgPSBNYXRoLnNpbihyYWRpYW5zKSAqIHRvU3RhcnREaXNcclxuICAgICAgICByZXR1cm4gZGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzSXBob25lWCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxheWEuQnJvd3Nlci5vbklQaG9uZSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKChMYXlhLkJyb3dzZXIud2lkdGggPT0gMjQzNiAmJiBMYXlhLkJyb3dzZXIuaGVpZ2h0ID09IDExMjUpIFxyXG4gICAgICAgICAgICB8fCAoTGF5YS5Ccm93c2VyLmhlaWdodCA9PSAyNDM2ICYmIExheWEuQnJvd3Nlci53aWR0aCA9PSAxMTI1KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzSXBob25lKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTGF5YS5Ccm93c2VyLm9uSVBob25lXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGQobm9kZSA6IExheWEuTm9kZSxuYW1lIDogc3RyaW5nKSA6IExheWEuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2kgPCBub2RlLm51bUNoaWxkcmVuOysraSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGUuZ2V0Q2hpbGRBdChpKTtcclxuICAgICAgICAgICAgaWYoY2hpbGQubmFtZSA9PSBuYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gVXRpbGl0LmdldENoaWxkKGNoaWxkLG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL1ZpZXcvVmlld0Jhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi9FdmVudC9FdmVudE1nclwiO1xyXG5pbXBvcnQgQXBwU3dpdGNoQ29uZmlnIGZyb20gXCIuLi8uLi9Db25maWcvQXBwU3dpdGNoQ29uZmlnXCI7XHJcbmltcG9ydCBXdWRpYW5NZ3IgZnJvbSBcIi4uLy4uL01nci9XdWRpYW5NZ3JcIjtcclxuLyoqXHJcbiAqIOeLgueCueeql+WPo+S9v+eUqOiMg+S+i+WmguS4i1xyXG4gICAgLy/pppblhYjliKTmlq3ni4Lngrnlip/og73lvIDlhbNXdWRpYW5NZ3IuV3VkaWFuRmxhZ+aYr+WQpuaJk+W8gO+8jOWmguaenOayoeaJk+W8gOWwseebtOaOpei3s+i/h+aVtOS4qumAu+i+kVxyXG4gICAgV3VkaWFuTWdyLkdldElwQmxvY2tTdGF0ZSgpOy8v5Zyo5ri45oiP6YeM5Yid5aeL5YyW55qE5pe25YCZ6LCD55So6L+Z5Liq5pa55rOV5Yid5aeL5YyWSXDlsY/olL1mbGFnXHJcbiAgICAvL+Wwhui/meauteS7o+eggeaPkuWFpemcgOimgeiwg+eUqOeLgueCueeql+WPo+eahOWcsOaWuVxyXG4gICAgbGV0IGRhdGEgOiBhbnkgPSB7fTtcclxuICAgIC8v54uC54K56YC76L6R5a6M5oiQ5ZCO55qE5Zue6LCD5pa55rOVXHJcbiAgICBkYXRhLkNvbXBsZXRlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIueLgueCueaMiemSrue7k+adn1wiKTsvL+WcqOi/memHjOWGmeWFpeeLgueCueeql+WPo+e7k+adn+WQjumcgOimgeiwg+eUqOeahOmAu+i+ke+8jOS+i+WmguW8ueWHuue7k+eul+mhtemdolxyXG4gICAgfVxyXG4gICAgLy8g5a6M5oiQ54K55Ye75LmL5ZCO6I635b6X55qE5aWW5Yqx5pWw6YeP77yM5L6d54Wn5ZCE6aG555uu5LiN5ZCM6Ieq6KGM5a6e546wXHJcbiAgICBkYXRhLlByaXplQ291bnQgPSAzMDtcclxuICAgIC8vIOWcqOiwg+eUqOeql+WPo+WJjeW/hemhu+WFs+mXreW9k+WJjeato+WcqOaYvuekuueahOWumOaWuUJhbm5lcuW5v+WRiu+8jOi/meS4queql+WPo+aJjeiDveato+W4uOi/kOihjO+8jOWFt+S9k+eahOmAu+i+keWQhOS6uumcgOiHquihjOWunueOsFxyXG4gICAgLy8g6ICM5LiU5YWz6Zet5a6Y5pa5QmFubmVy5Y+v5Lul56iN5b6u5o+Q5pep5LiA5Lqb77yM6YG/5YWN6aKR57mB6LCD55So5Ye66ZSZ5oiW6ICF5LiN56iz5a6aXHJcbiAgICBFdmVudF9QS19NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnRfUEtfRGVmLkFEX0Nsb3NlQmFubmVyLCB0cnVlKTsvL+i/meWPpeS7o+eggeaYr+aIkeeUqOadpeWFs+mXreWumOaWuUJhbm5lcu+8jOWQhOmhueebruiHquihjOWunueOsFxyXG4gICAgVmlld01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLkNsaWNrR2V0UHJpemUsZGF0YSk7XHJcbiAqIFxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDbGlja0dldFByaXplXHJcbiAqIEBleHRlbmRzIHtWaWV3QmFzZX1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWNrR2V0UHJpemUgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY2xpY2tfQnRuOiBMYXlhLkJ1dHRvbjsvL+e7meeUqOaIt+eLgueCueeahOaMiemSrlxyXG4gICAgcHJpdmF0ZSBfYXJyb3dfSW1nOiBMYXlhLkltYWdlOy8v566t5aS077yM55So5LqO57uZ55So5oi35o+Q56S6XHJcbiAgICBwcml2YXRlIF9vcGVuX0J0bjogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9iYW5uZXJBZF9WaWV3OiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBfY2xpY2tUaW1lX1BCYXI6IExheWEuSW1hZ2U7Ly/ov5vluqbmnaHog4zmma9cclxuICAgIHByaXZhdGUgX2NsaWNrVGltZV9QQmFyJEJhcjogTGF5YS5JbWFnZTsvL+i/m+W6puadoee7hOS7tlxyXG4gICAgcHJpdmF0ZSBfZ2V0UHJpemVfVmlldzogTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgX3ByaXplQ291bnRfVGV4dDogTGF5YS5UZXh0O1xyXG4gICAgcHJpdmF0ZSBfY29uZmlybV9CdG46IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfYmc6IExheWEuVUlDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIF9jbGlja1Byb2dyZXNzOiBudW1iZXI7Ly/ov5vluqbmnaHnu4Tku7bnmoTlrr3luqbvvIzms6jmhI9JZGXkuK3kuIDlrpropoHloavlhpnov5vluqbmnaHnu4Tku7bnmoRXaWR0aOWxnuaAp1xyXG4gICAgcHJpdmF0ZSBfY2xpY2tCYXJPcmlnaW5hbFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jbGlja1RpbWU6IG51bWJlcjsvL+eUqOadpeS/neWtmOeUqOaIt+W9k+WJjeeCueWHu+asoeaVsFxyXG4gICAgcHJpdmF0ZSBfdG90YWxDbGlja1RpbWU6IG51bWJlcjsvL+eUqOS6juiuoeeul+WuouaIt+aAu+WFseeCueWHu+S6huWkmuWwkeasoeaMiemSrlxyXG4gICAgcHJpdmF0ZSBfdG90YWxDbGlja1RpbWVyOiBudW1iZXIgPSAyMjsvL+eUqOaIt+S4gOebtOayoeS4reWll+i3r++8jOmCo+S5iOeCueWHu+S6hui/meS5iOWkmuasoemDvei/mOaYr+iuqeS7lue7p+e7reeOqeS4i+WOu++8jOS4jeimgeWNoeatu+eoi+W6j1xyXG4gICAgcHJpdmF0ZSBfbmVlZENsaWNrVGltZTogbnVtYmVyID0gMTA7Ly/kuIDlhbHngrnlpJrlsJHmrKHog73lpJ/ojrflvpflpZblirHvvIznlKjkuo7mmL7npLrov5vluqbmnaFcclxuICAgIHByaXZhdGUgX2Jhbm5lckNsaWNrVGltZTogbnVtYmVyID0gNzsvL+eCueWkmuWwkeasoeW8gOWni+aYvuekumJhbm5lcnLlpZfot6/nlKjmiLfvvIzlj6/lvq7osIMgICAgXHJcbiAgICBwcml2YXRlIF9wcml6ZUNvdW50OiBudW1iZXI7Ly/ojrflvpfnmoTlpZblirHmlbDph4/vvIzpnIDopoHlnKjmiZPlvIDnqpflj6Pml7bkvKDlhaXlj4LmlbBcclxuICAgIHByaXZhdGUgX2Fycm93VXA6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9iYW5uZXJDbGlja2VkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfY29tcGVsZXRGdW5jdGlvbjogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIF93dWRpYW5Mb2FkRmxhZzogYm9vbGVhbjtcclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgdGhpcy5fY2xpY2tfQnRuID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkNsaWNrX0J0blwiKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB0aGlzLl9jbGlja19CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5CdXR0b25DbGlja2VkKTtcclxuICAgICAgICB0aGlzLl9hcnJvd19JbWcgPSB0aGlzLl9jbGlja19CdG4uZ2V0Q2hpbGRCeU5hbWUoXCJBcnJvd19JbWdcIikgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICB0aGlzLl9iZyA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJCR1wiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX29wZW5fQnRuID0gdGhpcy5fYmcuZ2V0Q2hpbGRCeU5hbWUoXCJPcGVuX0J0blwiKSBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICB0aGlzLl9nZXRQcml6ZV9WaWV3ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkdldFByaXplX1ZpZXdcIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLl9wcml6ZUNvdW50X1RleHQgPSB0aGlzLl9nZXRQcml6ZV9WaWV3LmdldENoaWxkQnlOYW1lKFwiUHJpemVDb3VudF9UZXh0XCIpIGFzIExheWEuVGV4dDtcclxuICAgICAgICB0aGlzLl9jb25maXJtX0J0biA9IHRoaXMuX2dldFByaXplX1ZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJDb25maXJtX0J0blwiKSBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICB0aGlzLl9nZXRQcml6ZV9WaWV3LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbGlja1RpbWVfUEJhciA9IHRoaXMuX2JnLmdldENoaWxkQnlOYW1lKFwiQ2xpY2tUaW1lX1BCYXJcIikgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICB0aGlzLl9jbGlja1RpbWVfUEJhciRCYXIgPSB0aGlzLl9jbGlja1RpbWVfUEJhci5nZXRDaGlsZEJ5TmFtZShcIkNsaWNrVGltZV9QQmFyJEJhclwiKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrQmFyT3JpZ2luYWxXaWR0aCA9IHRoaXMuX2NsaWNrVGltZV9QQmFyJEJhci53aWR0aDtcclxuICAgICAgICB0aGlzLl9iYW5uZXJBZF9WaWV3ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkJhbm5lckFkX1ZpZXdcIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLl9jbGlja1RpbWVfUEJhciRCYXIud2lkdGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fdG90YWxDbGlja1RpbWUgPSAwO1xyXG4gICAgICAgIEV2ZW50TWdyLmluc3RhbmNlLnJlZ09uY2VFdmVudChFdmVudERlZi5BRF9XdWRpYW5CYW5uZXJfTG9hZENvbXBsZXRlLCB0aGlzLCB0aGlzLld1ZGlhbkxvYWRDb21wbGV0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgLyog566t5aS05LiK5LiL56e75YqoICovXHJcbiAgICAgICAgaWYgKHRoaXMuX2Fycm93VXApIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJyb3dfSW1nLnRvcCArPSBMYXlhLnRpbWVyLmRlbHRhIC8gNTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fycm93X0ltZy50b3AgPiAtMTQwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcnJvd1VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fycm93X0ltZy50b3AgLT0gTGF5YS50aW1lci5kZWx0YSAvIDU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcnJvd19JbWcudG9wIDwgLTE4MCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyb3dVcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyog5oyJ6ZKu5LiN5oyJ77yM6L+b5bqm5p2h6Ieq5Yqo6YCA5ZueICovXHJcbiAgICAgICAgaWYgKCF0aGlzLl9iYW5uZXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGQgPSAyICsgKHRoaXMuX2NsaWNrVGltZV9QQmFyJEJhci53aWR0aCAvIHRoaXMuX2NsaWNrQmFyT3JpZ2luYWxXaWR0aCkgKiA2O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lX1BCYXIkQmFyLndpZHRoID49IHNwZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpY2tUaW1lX1BCYXIkQmFyLndpZHRoIC09IHNwZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX2NsaWNrVGltZV9QQmFyJEJhci53aWR0aCAvIHRoaXMuX2NsaWNrQmFyT3JpZ2luYWxXaWR0aCkgKyAwLjEgPCAodGhpcy5fY2xpY2tUaW1lIC8gdGhpcy5fbmVlZENsaWNrVGltZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsaWNrVGltZS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5fY2xpY2tUaW1lX1BCYXIkQmFyLndpZHRoIDw9IHRoaXMuX2NsaWNrQmFyT3JpZ2luYWxXaWR0aCkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fY2xpY2tUaW1lX1BCYXIkQmFyLndpZHRoICs9IDI7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lX1BCYXIkQmFyLndpZHRoID4gdGhpcy5fY2xpY2tCYXJPcmlnaW5hbFdpZHRoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5fY2xpY2tUaW1lX1BCYXIkQmFyLndpZHRoID0gdGhpcy5fY2xpY2tCYXJPcmlnaW5hbFdpZHRoXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gEJhbm5lclxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IFtkYXRhXSBcclxuICAgICAqIEBtZW1iZXJvZiBDbGlja0dldFByaXplXHJcbiAgICAgKi9cclxuICAgIG9wZW5WaWV3KGRhdGE/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb21wZWxldEZ1bmN0aW9uID0gZGF0YS5Db21wbGV0ZTtcclxuICAgICAgICB0aGlzLl9wcml6ZUNvdW50ID0gZGF0YS5Qcml6ZUNvdW50O1xyXG4gICAgICAgIHN1cGVyLm9wZW5WaWV3KGRhdGEpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmiLfmiJDlip/ojrflvpflpZblirFcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENsaWNrR2V0UHJpemVcclxuICAgICAqL1xyXG4gICAgT3BlblByaXplV2luZG93KCkge1xyXG4gICAgICAgIHRoaXMuX2JnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fcHJpemVDb3VudF9UZXh0LnRleHQgPSB0aGlzLl9wcml6ZUNvdW50LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5fZ2V0UHJpemVfVmlldy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAvKiDnoa7orqTmjInpkq4gKi9cclxuICAgICAgICB0aGlzLl9jb25maXJtX0J0bi5vbmNlKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX2NvbXBlbGV0RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2NvbXBlbGV0RnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmNsb3NlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDor6/ngrnpooTliqDovb3lrozmiJBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENsaWNrR2V0UHJpemVcclxuICAgICAqL1xyXG4gICAgV3VkaWFuTG9hZENvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV3VkaWFuQmFubmVy6aKE5Yqg6L295a6M5q+VXCIpO1xyXG4gICAgICAgIHRoaXMuX3d1ZGlhbkxvYWRGbGFnID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bCGQmFubmVy5pi+56S6XHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDbGlja0dldFByaXplXHJcbiAgICAgKi9cclxuICAgIFNob3dCYW5uZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBRF9XdWRpYW5CYW5uZXJfU2hvd1wiKTtcclxuICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9XdWRpYW5CYW5uZXJfU2hvdyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeLgueCueaMiemSrumAu+i+kVxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDbGlja0dldFByaXplXHJcbiAgICAgKi9cclxuICAgIEJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2xpY2tUaW1lKys7XHJcbiAgICAgICAgdGhpcy5fdG90YWxDbGlja1RpbWUrKztcclxuICAgICAgICAvL25hbm5lcuS4gOebtOayoeWKoOi9veaIkOWKnyzkv53mjIHov5vluqbmnaFcclxuICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lID4gdGhpcy5fbmVlZENsaWNrVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja1RpbWUgPSB0aGlzLl9uZWVkQ2xpY2tUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lID49IHRoaXMuX2Jhbm5lckNsaWNrVGltZSAmJiB0aGlzLl93dWRpYW5Mb2FkRmxhZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lID49IHRoaXMuX25lZWRDbGlja1RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsaWNrVGltZSA9IHRoaXMuX25lZWRDbGlja1RpbWUgLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivr+eCuUJhbm5lcuWll+i3r+WQr+WKqFwiKTtcclxuICAgICAgICAgICAgLy/nlKjmiLfov57ngrnvvIzlh7piYW5uZXJcclxuICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyKCk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIub25jZSgyMDAwLCB0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJhbm5lckNsaWNrZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55So5oi35LiA55u05rKh6KKr5aWX6Lev5Yiw77yM6K6p5LuW57un57ut546pXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fdG90YWxDbGlja1RpbWUgPiB0aGlzLl90b3RhbENsaWNrVGltZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLfkuIDnm7TmsqHngrnliLDvvIzmlL7ku5bkuIDpqaxcIiwgdGhpcy5fdG90YWxDbGlja1RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLkJhbm5lckNsaWNrZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gKHRoaXMuX2NsaWNrVGltZSAvIHRoaXMuX25lZWRDbGlja1RpbWUpICogdGhpcy5fY2xpY2tCYXJPcmlnaW5hbFdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrVGltZV9QQmFyJEJhci53aWR0aCA9IHByb2dyZXNzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBCYW5uZXLlt7Lnu4/ngrnlh7vkuYvlkI7vvIzorqnnlKjmiLfojrflvpflpZblirFcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENsaWNrR2V0UHJpemVcclxuICAgICAqL1xyXG4gICAgQmFubmVyQ2xpY2tlZCgpIHtcclxuICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BRF9XdWRpYW5CYW5uZXJfSGlkZSk7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2xpY2tUaW1lID0gdGhpcy5fbmVlZENsaWNrVGltZTtcclxuICAgICAgICB0aGlzLl9jbGlja1RpbWVfUEJhciRCYXIud2lkdGggPSB0aGlzLl9jbGlja0Jhck9yaWdpbmFsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5fY2xpY2tfQnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vcGVuX0J0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLl9iYW5uZXJBZF9WaWV3LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLl9iYW5uZXJBZF9WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuT3BlblByaXplV2luZG93KCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFubmVyQWRWaWV3IGZyb20gXCIuLi8uLi9TaGFyZUFkL1ZpZXcvQmFubmVyQWRWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml2ZXJzYWxCb3R0b21ab25lIGV4dGVuZHMgTGF5YS5TY3JpcHQgXHJcbntcclxuXHJcbiAgICBwcm90ZWN0ZWQgX293bmVyU3ByaXRlIDogTGF5YS5TcHJpdGU7XHJcbiAgICBwcm90ZWN0ZWQgX2F1dG9ab25lOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJvdGVjdGVkIF9sb29wQURab25lOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJvdGVjdGVkIF9iYW5uZXJBRFpvbmU6IExheWEuVUlDb21wb25lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgX2Jhbm5lckFkIDogQmFubmVyQWRWaWV3O1xyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX293bmVyU3ByaXRlID0gdGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICB0aGlzLl9hdXRvWm9uZSA9IHRoaXMuX293bmVyU3ByaXRlLmdldENoaWxkQnlOYW1lKFwiQXV0b1pvbmVcIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLl9sb29wQURab25lID0gdGhpcy5fb3duZXJTcHJpdGUuZ2V0Q2hpbGRCeU5hbWUoXCJMb29wQURcIikgYXMgTGF5YS5VSUNvbXBvbmVudDsgXHJcbiAgICAgICAgdGhpcy5fYmFubmVyQURab25lID0gdGhpcy5fb3duZXJTcHJpdGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYW5uZXJBRFwiKSBhcyBMYXlhLlVJQ29tcG9uZW50OyBcclxuICAgICAgICB0aGlzLl9iYW5uZXJBZCA9IHRoaXMuX2Jhbm5lckFEWm9uZS5nZXRDb21wb25lbnQoQmFubmVyQWRWaWV3KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25FbmFibGUoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICB2YXIgYXNwZWN0UmF0aW8gPSBMYXlhLnN0YWdlLndpZHRoIC8gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgaWYoYXNwZWN0UmF0aW8gIDwgMC41KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fYXV0b1pvbmUuYm90dG9tID0gdGhpcy5fbG9vcEFEWm9uZS5oZWlnaHQgKyB0aGlzLl9iYW5uZXJBRFpvbmUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9sb29wQURab25lLmJvdHRvbSA9IHRoaXMuX2Jhbm5lckFEWm9uZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFEWm9uZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fYXV0b1pvbmUuYm90dG9tID0gdGhpcy5fbG9vcEFEWm9uZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvb3BBRFpvbmUuYm90dG9tID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyQURab25lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQgXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fYmFubmVyQURab25lLnZpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5jbGVhcldYQmFuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uL1ZpZXdCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVmlldyBleHRlbmRzIFZpZXdCYXNlXHJcbntcclxuICAgIHByb3RlY3RlZCBfcHJvY2Vzc0JhckJnIDogTGF5YS5DbGlwO1xyXG4gICAgcHJvdGVjdGVkIF9wcm9jZXNzQmFyIDogTGF5YS5DbGlwO1xyXG4gICAgcHJvdGVjdGVkIF9iZyA6IExheWEuQ2xpcDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3Byb2Nlc3NXaWR0aCA6IG51bWJlciA9IDA7XHJcblxyXG4gICAgb25Bd2FrZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fYmcgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiQmdcIikgYXMgTGF5YS5DbGlwO1xyXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NCYXJCZyA9IHRoaXMuX2JnLmdldENoaWxkQnlOYW1lKFwicHJvY2Vzc0JhckJnXCIpIGFzIExheWEuQ2xpcDtcclxuICAgICAgICBpZih0aGlzLl9wcm9jZXNzQmFyQmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzQmFyID0gdGhpcy5fcHJvY2Vzc0JhckJnLmdldENoaWxkQnlOYW1lKFwicHJvY2Vzc0JhclwiKSBhcyBMYXlhLkNsaXA7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NXaWR0aCA9IHRoaXMuX3Byb2Nlc3NCYXIud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NCYXIgPSB0aGlzLl9iZy5nZXRDaGlsZEJ5TmFtZShcInByb2Nlc3NCYXJcIikgYXMgTGF5YS5DbGlwO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzV2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25FbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuYWRkRXZlbnQoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFdmVudCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIucmVtb3ZlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2JnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIGlmKCF0aGlzLl9wcm9jZXNzQmFyQmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzV2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UHJvY2Vzcyhwcm9jZXNzIDogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHByb2Nlc3MgPCAwIClcclxuICAgICAgICAgICAgcHJvY2VzcyA9IDA7XHJcbiAgICAgICAgaWYocHJvY2VzcyA+IDEgKVxyXG4gICAgICAgICAgICBwcm9jZXNzID0gMTtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLl9wcm9jZXNzV2lkdGggKiBwcm9jZXNzO1xyXG4gICAgICAgIGlmKHdpZHRoIDwgMSlcclxuICAgICAgICAgICAgd2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NCYXIud2lkdGggPSB3aWR0aDtcclxuICAgIH1cclxuICAgIFxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi9WaWV3QmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlwc1ZpZXcgZXh0ZW5kcyBWaWV3QmFzZVxyXG57XHJcbiAgICBwcm90ZWN0ZWQgX2JnIDogTGF5YS5TcHJpdGU7XHJcbiAgICBwcm90ZWN0ZWQgX3RpcHNUZXh0IDogTGF5YS5UZXh0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25Bd2FrZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fYmcgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiQmdcIikgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdGhpcy5fYmcueCA9IExheWEuc3RhZ2Uud2lkdGggLyAyIC0gdGhpcy5fYmcud2lkdGggLyAyO1xyXG4gICAgICAgIHRoaXMuX3RpcHNUZXh0ID0gdGhpcy5fYmcuZ2V0Q2hpbGRCeU5hbWUoXCJUZXh0XCIpIGFzIExheWEuVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlblZpZXcoZGF0YT86IGFueSk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub3BlblZpZXcoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zZXRUaXBzTXNnKGRhdGEpO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIExheWEudGltZXIub25jZSgzMDAwLHRoaXMsZnVuY3Rpb24oKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgc2VsZi5jbG9zZVZpZXcoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUaXBzTXNnKG1zZyA6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl90aXBzVGV4dC50ZXh0ID0gbXNnO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHdpbmtsZVNwcml0ZSBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuICAgIC8qKiBAcHJvcCB7bmFtZTpUd2lua2xlU3BlZWQsIHRpcHM6XCLpl6rliqjpgJ/luqZcIiwgdHlwZTpOdW1iZXIsIGRlZmF1bHQ6MTAwMH0qL1xyXG4gICAgcHVibGljIFR3aW5rbGVTcGVlZDogbnVtYmVyID0gMTAwMDtcclxuICAgIC8qKiBAcHJvcCB7bmFtZTpUd2lua2xlTWluU2l6ZSwgdGlwczpcIuacgOWwj+e8qeaUvlwiLCB0eXBlOk51bWJlciwgZGVmYXVsdDowLjk1fSovXHJcbiAgICBwdWJsaWMgVHdpbmtsZU1pblNpemU6IG51bWJlciA9IDAuOTU7XHJcbiAgICAvKiogQHByb3Age25hbWU6VHdpbmtsZU1heFNpemUsIHRpcHM6XCLmnIDlpKfnvKnmlL5cIiwgdHlwZTpOdW1iZXIsIGRlZmF1bHQ6MS4wNX0qL1xyXG4gICAgcHVibGljIFR3aW5rbGVNYXhTaXplOiBudW1iZXIgPSAxLjA1O1xyXG5cclxuICAgIHByb3RlY3RlZCBfb3duZXJTcHJpdGU6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNwbGF5U3A6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNUZXh0OiBMYXlhLlRleHQ7XHJcbiAgICBwcm90ZWN0ZWQgX2FuaUZvcndhcmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBfZm9udFNpemUgPSAyNTtcclxuICAgIHByb3RlY3RlZCBfb3JpZ2luU2l6ZSA9IDE7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgb25Bd2FrZSgpIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3AgPSB0aGlzLm93bmVyIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuX2Rpc1RleHQgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiVGl0ZWxUZXh0XCIpIGFzIExheWEuVGV4dDtcclxuICAgICAgICB0aGlzLl9vcmlnaW5TaXplID0gdGhpcy5fZGlzcGxheVNwLnNjYWxlWDtcclxuICAgICAgICBpZiAodGhpcy5fZGlzVGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc1RleHQudGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvbnRTaXplID0gdGhpcy5fZGlzVGV4dC5mb250U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Auc2NhbGUodGhpcy5fb3JpZ2luU2l6ZSwgdGhpcy5fb3JpZ2luU2l6ZSk7XHJcbiAgICB9XHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5QW5pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BsYXlBbmkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hbmlGb3J3YXJkKSB7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IHRoaXMuX2Rpc3BsYXlTcC5zY2FsZVggLSBMYXlhLnRpbWVyLmRlbHRhIC8gdGhpcy5Ud2lua2xlU3BlZWQ7XHJcbiAgICAgICAgICAgIHNjYWxlID0gTWF0aC5tYXgoc2NhbGUsIHRoaXMuVHdpbmtsZU1pblNpemUgKiB0aGlzLl9vcmlnaW5TaXplKTtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVNwLnNjYWxlKHNjYWxlLCBzY2FsZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXNwbGF5U3Auc2NhbGVYIDw9IHRoaXMuVHdpbmtsZU1pblNpemUgKiB0aGlzLl9vcmlnaW5TaXplKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmlGb3J3YXJkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5fZGlzcGxheVNwLnNjYWxlWCArIExheWEudGltZXIuZGVsdGEgLyB0aGlzLlR3aW5rbGVTcGVlZDtcclxuICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihzY2FsZSwgdGhpcy5Ud2lua2xlTWF4U2l6ZSAqIHRoaXMuX29yaWdpblNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5U3Auc2NhbGUoc2NhbGUsIHNjYWxlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3BsYXlTcC5zY2FsZVggPj0gdGhpcy5Ud2lua2xlTWF4U2l6ZSAqIHRoaXMuX29yaWdpblNpemUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaUZvcndhcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3TWdyLCB7IFZpZXdEZWYgfSBmcm9tIFwiLi4vTWdyL1ZpZXdNZ3JcIjtcclxuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi9FdmVudC9FdmVudE1nclwiO1xyXG5pbXBvcnQgeyBFdmVudERlZiB9IGZyb20gXCIuLi9FdmVudC9FdmVudERlZlwiO1xyXG5cclxuLy/nlYzpnaLln7rnsbvvvIzmiYDmnInlip/og73mqKHlnZfnlYzpnaLnu6fmib/kuo7ov5nkuKrnsbvjgILov5nnp43nsbvlnovnmoTnlYzpnaLkuI3og73ltYzlpZfjgIJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBMYXlhLlNjcmlwdCBcclxue1xyXG4gICAgcHVibGljIG9uQ2xvc2VFdmVudCA6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHB1YmxpYyBvbk9wZW5FdmVudCA6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF92aWV3QmFzZSA6IGJvb2xlYW4gID0gdHJ1ZVxyXG4gICAgcHJvdGVjdGVkIF92aWV3RGVmIDogVmlld0RlZiA9IFZpZXdEZWYuTm9uZTtcclxuICAgIHByb3RlY3RlZCBfZGF0YSA6IGFueSA9IHt9O1xyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy/liKDpmaTml7boh6rliqjph4rmlL5cclxuICAgICAgICAodGhpcy5vd25lciBhcyBMYXlhLlZpZXcpLmF1dG9EZXN0cm95QXRDbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuVmlldykuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQoKTtcclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvcGVuVmlldyhkYXRhPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5zaG93KClcclxuICAgICAgICBFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5HYW1lX09uVmlld09wZW4se3ZpZXc6dGhpcy5fdmlld0RlZn0pXHJcbiAgICAgICAgaWYodGhpcy5vbk9wZW5FdmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25PcGVuRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnQoKSB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VWaWV3KCkgXHJcbiAgICB7XHJcbiAgICAgICAgVmlld01nci5pbnN0YW5jZS5jbG9zZVZpZXcodGhpcy5fdmlld0RlZik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuVmlldykudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25IaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coKVxyXG4gICAge1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuVmlldykudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld0lzSGlkZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm93bmVyIGFzIExheWEuVmlldykuYWxwaGEgPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25IaWRlKCl7fVxyXG4gICAgcHJvdGVjdGVkIG9uU2hvdygpe31cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9PblZpZXdDbG9zZSx7dmlldzp0aGlzLl92aWV3RGVmfSlcclxuICAgICAgICBpZih0aGlzLm9uQ2xvc2VFdmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1hBUEkge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhZFVuaXRJZCA9IFwiYWR1bml0LWVlZjM2Zjg0YzQ0YmJkYzFcIlxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBiYW5uZXJBZFVuaXRJZCA9IFwiYWR1bml0LTQ0MGUyMWNjMDJjMGQyODJcIlxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBJbnNBZFVuaXRJZCA9IFwiYWR1bml0LTQ0MGUyMWNjMDJjMGQyODJcIlxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3eExvZ2luKG9uU3VjY2VzczogRnVuY3Rpb24sIG9uRmFpbDogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvdy53eC5sb2dpbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSByZXMuY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55m76ZmG5oiQ5YqfLOiOt+WPluWIsGNvZGUgOiBcIiArIGNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5r+A5Yqx6KeG6aKRLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pc1JlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50ID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9vblJld2FyZGVkVmlkZW9BZEZhaWxlZDogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfb25SZXdhcmRlZFZpZGVvQWRDbG9zZTogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvblJld2FyZGVkVmlkZW9BZExvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrliqDovb3lrozmiJAnKVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvblJld2FyZGVkVmlkZW9BZEVycm9yKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295aSx6LSlJyArIGVycilcclxuICAgICAgICBpZiAoV1hBUEkuX29uUmV3YXJkZWRWaWRlb0FkRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIFdYQVBJLl9vblJld2FyZGVkVmlkZW9BZEZhaWxlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgb25SZXdhcmRlZFZpZGVvQWRDbG9zZShyZXMpIHtcclxuICAgICAgICBpZiAoKHJlcyAmJiByZXMuaXNFbmRlZCkgfHwgcmVzID09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlt7LlrozmlbTop4LnnIsnKVxyXG4gICAgICAgICAgICBpZiAoV1hBUEkuX29uUmV3YXJkZWRWaWRlb0FkQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIFdYQVBJLl9vblJld2FyZGVkVmlkZW9BZENsb3NlKHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5pyq5a6M5pW06KeC55yLJylcclxuICAgICAgICAgICAgaWYgKFdYQVBJLl9vblJld2FyZGVkVmlkZW9BZENsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBXWEFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZShmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVnUmV3YXJkZWRWaWRlb0FkRXZlbnQocmV3YXJkZWRWaWRlb0FkKSB7XHJcblxyXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkxvYWQoV1hBUEkub25SZXdhcmRlZFZpZGVvQWRMb2FkKVxyXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkVycm9yKFdYQVBJLm9uUmV3YXJkZWRWaWRlb0FkRXJyb3IpXHJcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uQ2xvc2UoV1hBUEkub25SZXdhcmRlZFZpZGVvQWRDbG9zZSlcclxuXHJcbiAgICAgICAgV1hBUEkuX2lzUmVnUmV3YXJkZWRWaWRlb0FkRXZlbnQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzaG93UmV3YXJkZWRWaWRlb0FkKG9uQWRDbG9zZTogRnVuY3Rpb24sIG9uRmFpbGVkOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBXWEFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZSA9IG9uQWRDbG9zZTtcclxuICAgICAgICAgICAgV1hBUEkuX29uUmV3YXJkZWRWaWRlb0FkRmFpbGVkID0gb25GYWlsZWQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmV3YXJkZWRWaWRlb0FkID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLmNyZWF0ZVJld2FyZGVkVmlkZW9BZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogV1hBUEkuYWRVbml0SWQsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVdYQVBJLl9pc1JlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBXWEFQSS5yZWdSZXdhcmRlZFZpZGVvQWRFdmVudChyZXdhcmRlZFZpZGVvQWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSByZXdhcmRlZFZpZGVvQWQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65oiQ5YqfJykpO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLmxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXdhcmRlZFZpZGVvQWQuc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65aSx6LSlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295aSx6LSlJylcclxuICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvbkFkQ2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWwj+a4uOaIj+i3s+i9rC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIHN0YXRpYyBuYXZpZ2F0ZVRvTWluaVByb2dyYW0oYXBwSWQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCBvblN1Y2Nlc3M6IEZ1bmN0aW9uLCBvbkZhaWw6IEZ1bmN0aW9uLCBvbkNvbXBsYXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOa4uOaIj++8miBcIiArIGFwcElkKTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBJZDogYXBwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25Db21wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGF0ZShyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLeWIhuS6qy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX29uU2hvdzogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfbGFzdFNoYXJlVGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgc2hhcmUoY29tcGxhdGU6IEZ1bmN0aW9uLCB0aXRlbDogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIFdYQVBJLl9vblNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0ub2ZmU2hvdyhXWEFQSS5fb25TaG93KVxyXG4gICAgICAgICAgICAgICAgV1hBUEkuX29uU2hvdyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0U2hhcmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLl9sYXN0U2hhcmVUaW1lID4gMjAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGF0ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5vblNob3coV1hBUEkuX29uU2hvdylcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFNoYXJlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5zaGFyZUFwcE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBpbWFnZVVybFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0t5o+S5bGP5bmV5bm/5ZGKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dJbnRlcnN0aXRpYWxBZChvbkFkQ2xvc2U6IEZ1bmN0aW9uLCBvbkZhaWxlZDogRnVuY3Rpb24pICB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnN0aXRpYWxBZCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogV1hBUEkuSW5zQWRVbml0SWQsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpbnRlcnN0aXRpYWxBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDliqDovb3lrozmiJAnKTtcclxuICAgICAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLnNob3coKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDmmL7npLrlpLHotKUg77yaJyArIGVycilcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGKIOWKoOi9veWksei0pScgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLm9uQ2xvc2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDlhbPpl60nKTtcclxuICAgICAgICAgICAgICAgIGlmIChvbkFkQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkFkQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQWRDbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5b6X5Yiw5bCP56iL5bqP5ZCv5Yqo5Y+C5pWw55qE5ZCM5q2l5pa55rOV77yM5Y+v5b6X5Yiw5LiA5LiqT2JqZWN06L+U5Zue5YC877yM6L+U5Zue5YC85YW35L2T55qE5pWw5o2u57uT5p6E5Zyo5LiL6Z2i55qE5YiX6KGo5LitXHJcbiAgICAgKiBzY2VuZVx0bnVtYmVyXHTlkK/liqjlsI/muLjmiI/nmoTlnLrmma/lgLxcclxuICAgICAqIHF1ZXJ5XHRPYmplY3RcdOWQr+WKqOWwj+a4uOaIj+eahCBxdWVyeSDlj4LmlbBcclxuICAgICAqIHNoYXJlVGlja2V0XHRzdHJpbmdcdHNoYXJlVGlja2V077yM6K+m6KeB6I635Y+W5pu05aSa6L2s5Y+R5L+h5oGvXHJcbiAgICAgKiByZWZlcnJlckluZm9cdG9iamVjdFx05p2l5rqQ5L+h5oGv44CC5LuO5Y+m5LiA5Liq5bCP56iL5bqP44CB5YWs5LyX5Y+35oiWIEFwcCDov5vlhaXlsI/nqIvluo/ml7bov5Tlm57jgILlkKbliJnov5Tlm54ge31cclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvYmFzZS9hcHAvbGlmZS1jeWNsZS93eC5nZXRMYXVuY2hPcHRpb25zU3luYy5odG1sXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7TGF1bmNoT3B0aW9uc30gXHJcbiAgICAgKiBAbWVtYmVyb2YgV1hBUElcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRMYXVuY2hPcHRpb25zU3luYygpIHtcclxuICAgICAgICAvLyBsZXQgcmVzdWx0ID0geyBzY2VuZTogMCwgcXVlcnk6IG51bGwsIHNoYXJlVGlja2V0OiBcIlwiLCByZWZlcnJlckluZm86IG51bGwgfTtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5nZXRMYXVuY2hPcHRpb25zU3luYygpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Zy65pmv5YC8IFwiICsgb2JqLnNjZW5lKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iai5xdWVyeSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlcnnlj4LmlbAgXCIgKyBzdHIpO1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gb2JqLnF1ZXJ5W1wia2V5XCJdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ55Y+C5pWw77yaa2V5IFwiICsga2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaGFyZVRpY2tldCBcIiArIG9iai5zaGFyZVRpY2tldCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVmZXJyZXJJbmZvLmFwcElkIFwiICsgb2JqLnJlZmVycmVySW5mby5hcHBJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVmZXJyZXJJbmZvLmV4dHJhRGF0YSBcIiArIG9iai5yZWZlcnJlckluZm8uZXh0cmFEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9iaiA9IHsgc2NlbmU6IDEwMDEsIHF1ZXJ5OiBcIlwiLCBzaGFyZVRpY2tldDogXCJcIiwgYXBwSWQ6IFwiXCIsIGV4dHJhRGF0YTogXCJcIiB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5b6u5L+h5bem5LiK6KeS5YiG5Lqr6L2s5Y+R54K55Ye75LqL5Lu2LOWcqOa4uOaIj+mAu+i+keS4reiwg+eUqOS4gOasoeWNs+WPr1xyXG4gICAgICog5rOo5oSP5q2k5pa55rOV5Y+q5Lya5Zyo55yf5py65LiK5omn6KGM77yM5Zyo5b6u5L+h5qih5ouf5Zmo546v5aKD5LiL54K55Ye76L2s5Y+R5oyJ6ZKu5LuA5LmI6YO95LiN5Lya5Y+R55SfXHJcbiAgICAgKiBcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRlbCDliIbkuqvmoIfpophcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVVybCDliIbkuqvlm77niYflnLDlnYBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzXSDmiJDlip/lm57osIPlh73mlbAo5Y+v5LiN5aGrKVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZhaWxdIOWksei0peWbnuiwg+WHveaVsCjlj6/kuI3loaspXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGxhdGVdIOWujOaIkOWbnuiwg+WHveaVsO+8jOaIkOWKn+Wksei0pemDveS8muaJp+ihjCjlj6/kuI3loaspXHJcbiAgICAgKiBAbWVtYmVyb2YgV1hBUElcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXRTaGFyZU1lbnUodGl0ZWw6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIGNvbXBsYXRlPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlsI/muLjmiI/orr7nva7ovazlj5HmjInpkq5cIik7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZmFpbCxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBjb21wbGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLm9uU2hhcmVBcHBNZXNzYWdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBpbWFnZVVybFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkuVmlldyB7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlNjZW5lXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6MTkyMCxcInRvcFwiOjAsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImhlaWdodFwiOjEwODAsXCJib3R0b21cIjowfSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJDbGlwXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJza2luXCI6XCJMb2FkaW5nLzFfMDAwMV/lm77lsYItMy5qcGdcIixcIm5hbWVcIjpcIkJnXCJ9LFwiY29tcElkXCI6NixcImNoaWxkXCI6W3tcInR5cGVcIjpcIkNsaXBcIixcInByb3BzXCI6e1wid2lkdGhcIjoxOTIwLFwic2tpblwiOlwiTG9hZGluZy/lm77lsYIgMS5wbmdcIixcInBpdm90WVwiOjIyLFwibmFtZVwiOlwicHJvY2Vzc0JhclwiLFwibGVmdFwiOjAsXCJoZWlnaHRcIjoyMixcImJvdHRvbVwiOjk4fSxcImNvbXBJZFwiOjV9XX0se1widHlwZVwiOlwiU2NyaXB0XCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJydW50aW1lXCI6XCJWaWV3L0xvYWRpbmdWaWV3L0xvYWRpbmdWaWV3LnRzXCJ9LFwiY29tcElkXCI6N31dLFwibG9hZExpc3RcIjpbXCJMb2FkaW5nLzFfMDAwMV/lm77lsYItMy5qcGdcIixcIkxvYWRpbmcv5Zu+5bGCIDEucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhMb2FkaW5nVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5WaWV3LkxvYWRpbmdVSVwiLExvYWRpbmdVSSk7XHJcbn1cciJdfQ==
