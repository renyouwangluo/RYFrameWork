import ViewBase from "../ViewBase";

export default class TipsView extends ViewBase
{
    protected _bg : Laya.Sprite;
    protected _tipsText : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this._bg = this.owner.getChildByName("Bg") as Laya.Sprite;
        this._bg.x = Laya.stage.width / 2 - this._bg.width / 2;
        this._tipsText = this._bg.getChildByName("Text") as Laya.Text;
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this.setTipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.closeView();
        })
    }

    public setTipsMsg(msg : string)
    {
        this._tipsText.text = msg;
    }
}