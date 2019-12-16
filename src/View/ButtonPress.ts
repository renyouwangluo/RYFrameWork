export default class ButtonPress extends Laya.Script 
{
    public onPress : Function = null; 
    constructor() { super(); }
    protected _ownerSp : Laya.Sprite;
    protected _press: boolean  = false;
    onAwake()
    {
        this._ownerSp = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._press = false;
        this._ownerSp.on(Laya.Event.MOUSE_DOWN,this,this.onDown)
        this._ownerSp.on(Laya.Event.MOUSE_UP,this,this.onUp)
        this._ownerSp.on(Laya.Event.MOUSE_OUT,this,this.onOut)
        
    }

    
    onDisable(): void 
    {
        this._press = false;
        this._ownerSp.off(Laya.Event.MOUSE_DOWN,this,this.onDown)
        this._ownerSp.off(Laya.Event.MOUSE_UP,this,this.onUp)
        this._ownerSp.off(Laya.Event.MOUSE_OUT,this,this.onOut)
    }

    onUpdate()
    {
        if(this._press && this.onPress)
        {
            this.onPress();
        }
    }
    protected onDown()
    {
        this._press = true;
    }
    protected onUp()
    {
        this._press = false;
    }

    protected onOut()
    {
        this._press = false;
    }
}