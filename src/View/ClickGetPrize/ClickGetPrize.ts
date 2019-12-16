import ViewBase from "../../View/ViewBase";
import { EventDef } from "../../Event/EventDef";
import EventMgr from "../../Event/EventMgr";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import WudianMgr from "../../Mgr/WudianMgr";
import CachedWXBannerAd from "../../CachedWXBannerAd";
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
export default class ClickGetPrize extends ViewBase {
    constructor() {
        super();
    }
    private _click_Btn: Laya.Button;//给用户狂点的按钮
    private _arrow_Img: Laya.Image;//箭头，用于给用户提示
    private _open_Btn: Laya.Sprite;
    private _bannerAd_View: Laya.UIComponent;
    private _clickTime_PBar: Laya.Image;//进度条背景
    private _clickTime_PBar$Bar: Laya.Image;//进度条组件
    private _getPrize_View: Laya.UIComponent;
    private _prizeCount_Text: Laya.Text;
    private _confirm_Btn: Laya.Sprite;
    private _bg: Laya.UIComponent;
    private _clickProgress: number;//进度条组件的宽度，注意Ide中一定要填写进度条组件的Width属性
    private _clickBarOriginalWidth: number;
    private _clickTime: number;//用来保存用户当前点击次数
    private _totalClickTime: number;//用于计算客户总共点击了多少次按钮
    private _totalClickTimer: number = 22;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    private _needClickTime: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    private _bannerClickTime: number = 7;//点多少次开始显示bannerr套路用户，可微调    
    private _prizeCount: number;//获得的奖励数量，需要在打开窗口时传入参数
    private _arrowUp: boolean;
    private _bannerClicked: boolean;
    private _compeletFunction: Function;
    // private _wudianLoadFlag: boolean;
    onAwake() {
        this._click_Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img = this._click_Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._bg = this.owner.getChildByName("BG") as Laya.UIComponent;
        this._open_Btn = this._bg.getChildByName("Open_Btn") as Laya.Sprite;
        this._getPrize_View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prizeCount_Text = this._getPrize_View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_Btn = this._getPrize_View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_View.visible = false;
        this._clickTime_PBar = this._bg.getChildByName("ClickTime_PBar") as Laya.Image;
        this._clickTime_PBar$Bar = this._clickTime_PBar.getChildByName("ClickTime_PBar$Bar") as Laya.Image;
        this._clickBarOriginalWidth = this._clickTime_PBar$Bar.width;
        this._bannerAd_View = this.owner.getChildByName("BannerAd_View") as Laya.UIComponent;
        this._clickTime_PBar$Bar.width = 0;
        this._clickTime = 0;
        this._totalClickTime = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    }

    onUpdate() {
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
            let spd = 2 + (this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) * 6;
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
    }
    /**
     * 打开Banner
     * 
     * @param {*} [data] 
     * @memberof ClickGetPrize
     */
    openView(data?: any) {
        this._compeletFunction = data.Complete;
        this._prizeCount = data.PrizeCount;
        super.openView(data);
    }
    /**
     * 用户成功获得奖励
     * 
     * @memberof ClickGetPrize
     */
    OpenPrizeWindow() {
        this._bg.visible = false;
        let self = this;
        this._prizeCount_Text.text = this._prizeCount.toString();
        this._getPrize_View.visible = true;
        /* 确认按钮 */
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.closeView();
        });
    }
    /**
     * 误点预加载完成
     * 
     * @memberof ClickGetPrize
     */
    // WudianLoadComplete() {
    //     console.log("WudianBanner预加载完毕");
    //     this._wudianLoadFlag = true;
    // }
    /**
     * 将Banner显示
     * 
     * @memberof ClickGetPrize
     */
    ShowBanner() {
        console.log("AD_WudianBanner_Show");
        CachedWXBannerAd.show();
    }
    /**
     * 狂点按钮逻辑
     * 
     * 
     * @memberof ClickGetPrize
     */
    ButtonClicked() {
        this._clickTime++;
        this._totalClickTime++;
        //nanner一直没加载成功,保持进度条
        if (this._clickTime > this._needClickTime) {
            this._clickTime = this._needClickTime;
        }
        if (this._clickTime >= this._bannerClickTime /*&& this._wudianLoadFlag*/) {
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
        let progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickTime_PBar$Bar.width = progress;
    }
    /**
     * Banner已经点击之后，让用户获得奖励
     * 
     * @memberof ClickGetPrize
     */
    BannerClicked() {
        EventMgr.instance.dispatch(EventDef.AD_WudianBanner_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
        this._click_Btn.visible = false;
        this._open_Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.OpenPrizeWindow();
    }

    onDestroy()
    {
        super.onDestroy();
        CachedWXBannerAd.hide();
    }
}