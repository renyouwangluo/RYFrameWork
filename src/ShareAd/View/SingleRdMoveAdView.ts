import ShareAd from "../ShareAd";
import Utilit from "../../Utilit";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
/**
 * 会随机移动的单个广告和SinpleAdView不同之处在于需要有一个Sprite作为父部件，并且设置好Sprite的Width和Height属性
 * 该广告会在父部件的内部随机(Width和Height属性)移动
 * _moveSpd属性为移动速度，根据需要自行修改
 * 
 * @export
 * @class SingleRdMoveAdView
 * @extends {Laya.Script}
 */
export default class SingleRdMoveAdView extends Laya.Script {
    public AdPosID: number = ShareAd.LoopAdLocationID;
    protected _ownerSprite: Laya.Sprite;
    protected _displaySp: Laya.Sprite;
    protected _disText: Laya.Text;
    protected _aniForward: boolean = false;
    protected _data: any = null;
    protected _fontSize = 25;
    protected _originSize = 1;
    protected _originW: number = 150;
    protected _originH: number = 150;
    protected _rdPoint_X: number;
    protected _rdPoint_Y: number;
    /* 移动速度 */
    protected _moveSpd: number = 1000;
    onAwake() {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
        this._originSize = this._displaySp.scaleX;
    }
    /**
     * 
     * 
     * @memberof SingleAdView
     */
    onEnable(): void {
        this.refreshADVDis();
        Laya.timer.loop(3000, this, this.refreshADVDis);
        this._rdPoint_X = this._ownerSprite.x;
        this._rdPoint_Y = this._ownerSprite.y;
        this._ownerSprite.on(Laya.Event.CLICK, this, this.onSpClick);
    }

    onDisable(): void {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK, this, this.onSpClick);
    }

    protected refreshADVDis() {
        var self = this;
        ShareAd.getADVs(this.AdPosID, (datas) => {
            if (datas && datas.length > 0) {
                (self.owner as Laya.Sprite).visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = self._originW;
                        self._displaySp.height = self._originH;
                        self._displaySp.scale(self._originSize, self._originSize);
                    }
                }));
                var str = String(data.title);
                var num = str.length;
                var fontSize = Math.floor((5 / num) * this._fontSize);
                self._disText.fontSize = fontSize;
                self._disText.text = str;
                self._data = data;
            }
            else {
                (this.owner as Laya.Sprite).visible = false;
            }
        })
    }

    onUpdate() {
        this.displayAni();
        this.RandonMove();
    }

    protected displayAni() {
        if (!this._aniForward) {
            var scale = this._displaySp.scaleX - Laya.timer.delta / 3000 * 1;
            scale = Math.max(scale, 0);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX <= 0.95 * this._originSize) {
                this._aniForward = true;
            }
        }
        else {
            var scale = this._displaySp.scaleX + Laya.timer.delta / 3000 * 1;
            scale = Math.min(scale, 1 * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX >= this._originSize) {
                this._aniForward = false;
            }
        }
    }
    protected RandonMove() {
        let x = Math.abs(this._ownerSprite.x - this._rdPoint_X);
        let y = Math.abs(this._ownerSprite.y - this._rdPoint_Y);
        if (x <= 1 || y <= 1) {
            let pt = this._ownerSprite.parent as Laya.Sprite;
            this._rdPoint_X = (Math.random() * pt.width);
            this._rdPoint_Y = (Math.random() * pt.height);
            x = this._ownerSprite.x - this._rdPoint_X;
            y = this._ownerSprite.y - this._rdPoint_Y;
            let distance = Math.sqrt(x * x + y * y);
            let time = 1000 * (distance / 100);
            Laya.Tween.to(this._ownerSprite, { x: this._rdPoint_X, y: this._rdPoint_Y }, time);
            return;
        }
    }
    protected onSpClick() {
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
        }
    }
}