import BannerAdView from "../../ShareAd/View/BannerAdView";

export default class UniversalBottomZone extends Laya.Script 
{

    protected _ownerSprite : Laya.Sprite;
    protected _autoZone: Laya.UIComponent;
    protected _loopADZone: Laya.UIComponent;
    protected _bannerADZone: Laya.UIComponent;
    protected _bannerAd : BannerAdView;

    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._autoZone = this._ownerSprite.getChildByName("AutoZone") as Laya.UIComponent;
        this._loopADZone = this._ownerSprite.getChildByName("LoopAD") as Laya.UIComponent; 
        this._bannerADZone = this._ownerSprite.getChildByName("BannerAD") as Laya.UIComponent; 
        this._bannerAd = this._bannerADZone.getComponent(BannerAdView);
    }
    
    onEnable(): void 
    {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5)
        {
            this._autoZone.bottom = this._loopADZone.height + this._bannerADZone.height;
            this._loopADZone.bottom = this._bannerADZone.height;
            this._bannerADZone.visible = true;
        }
        else
        {
            this._autoZone.bottom = this._loopADZone.height;
            this._loopADZone.bottom = 0;
            this._bannerADZone.visible = false;
        }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(!this._bannerADZone.visible)
        {
            this._bannerAd.clearWXBaner();
        }
    }
}