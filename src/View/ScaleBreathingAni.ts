export default class ScaleBreathingAni extends Laya.Script 
{

    public breathingSpeed = 500;
    public maxScale = 1;
    public minScale = 0.9;
    protected _add : boolean = false;
    protected _ownerSprite : Laya.Sprite;
    
    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this._ownerSprite.scale(this.maxScale,this.maxScale);
    }
    
    onEnable()
    {
        this._ownerSprite.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onDisable()
    {
        this._ownerSprite.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onUpdate()
    {
        if(this._ownerSprite.visible)
        {
            this.bgAni();
        }
    }

    protected bgAni()
    {
        if(!this._add)
        {
            var value = this._ownerSprite.scaleX - Math.min(50,Laya.timer.delta) / this.breathingSpeed  * 1
            value = Math.max(this.minScale,value)
            this._ownerSprite.scale(value,value);
            if(this._ownerSprite.scaleX <= this.minScale)
            {
                this._add = true;
            }
        }
        else
        {
            var value = this._ownerSprite.scaleX + Math.min(50,Laya.timer.delta) / this.breathingSpeed  * 1;
            value = Math.min(this.maxScale,value)
            this._ownerSprite.scale(value,value);
            if(this._ownerSprite.scaleX >= this.maxScale)
            {
                this._add = false;
            }
        }
    }

    protected onFocusChange()
    {
        this._ownerSprite.scale(this.maxScale,this.maxScale);
        this._add = false;
    }
}