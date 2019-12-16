import Utilit from "../Utilit";
import ViewMgr, { ViewDef } from "./ViewMgr";
import User from "../User/User";
import HttpUnit from "../Net/HttpUnit";
import MaiLiang from "../MaiLiangAPI/MaiLiang";
import EventMgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";
import WXAPI from "../WXAPI";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WudianMgr from "./WudianMgr";
import CachedWXBannerAd from "../CachedWXBannerAd";

//游戏管理器，游戏代码的入口
export default class GameMgr extends Laya.Script {

    private static _instance: GameMgr = null;
    public static getInstance(): GameMgr { return GameMgr._instance; }

    constructor() {
        super();
        GameMgr._instance = this;
    }

    onAwake()  {
        MaiLiang.GetMaiLiangOpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang.GetMaiLiangOpenId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang.ReportStayTime(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        WXAPI.SetShareMenu("", "",
            () =>  {

            },
            () =>  {

            },
            () =>  {

            })
        

        WudianMgr.UpdateIpBlockState();
        CachedWXBannerAd.preloadBanner();
    }

    onStart()  {
        this.preCreateGame();
    }

    private preCreateGame(): void {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public saveGameData()  {
        HttpUnit.saveGameData(User.getSaveData(),
            (res) => {
                if (res.code == 1) {
                    console.log("存档成功")
                }
                else {
                    console.log("存档失败")
                }
            },
            (res) => {
                console.log("存档失败")
            })
    }
}