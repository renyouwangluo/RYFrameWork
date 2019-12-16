import ShareAd from "../ShareAd";
import Utilit from "../../Utilit";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class SingleAniADView extends Laya.Script 
{
    public AdPosID : number = ShareAd.AniAdLocationID;
    protected _ownerSprite :Laya.Sprite;
    protected _animation : Laya.Animation;
    protected _data : any = null;

    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._animation = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.refreshADVDis();
        this._ownerSprite.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    protected refreshADVDis()
    {
        var self = this;
        ShareAd.getADVs(this.AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self._ownerSprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._animation.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self._animation.play(0,true);
                }));
                self._data = data;
            }
            else
            {
                self._ownerSprite.visible = false;
            }
        },false)
    }

    protected onSpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ShareAd.reportUserClick(data.appid);
                    ALD.aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD.aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPOAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ShareAd.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ShareAd.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}