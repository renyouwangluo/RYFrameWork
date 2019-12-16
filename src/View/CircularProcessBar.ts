//环形进度条，只支持纯色
export default class CircularProcessBar extends Laya.Script
{
    public color : string = "#7CFC00";
    public lineColor : string = "";
    public lineWidth : number = 0;
    protected _ownerSprite : Laya.Sprite = null;
    protected _value = 0;

    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {

    }

    onDisable(): void 
    {

    }

    public setValue(value : number)
    {
        if(value > 1)
            value = 1;
        if(value < 0)
            value = 0;
        var angle = 360 * (1 -  value) - 90;
        if(null == this._ownerSprite)
            this._ownerSprite =  this.owner as Laya.Sprite;
        this._ownerSprite.graphics.clear();
        this._ownerSprite.graphics.drawPie(this._ownerSprite.width/ 2,this._ownerSprite.height / 2,this._ownerSprite.width / 2,
                angle,
                270,
                this.color,this.lineColor,this.lineWidth);
    }
}