import ViewBase from "../ViewBase";

export default class LoadingView extends ViewBase
{
    protected _processBarBg : Laya.Clip;
    protected _processBar : Laya.Clip;
    protected _bg : Laya.Clip;

    protected _processWidth : number = 0;

    onAwake()
    {
        this._bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this._processBarBg = this._bg.getChildByName("processBarBg") as Laya.Clip;
        if(this._processBarBg)
        {
            this._processBar = this._processBarBg.getChildByName("processBar") as Laya.Clip;
            this._processWidth = this._processBar.width;
        }
        else
        {
            this._processBar = this._bg.getChildByName("processBar") as Laya.Clip;
            this._processWidth = Laya.stage.width;
        }
    }

    onEnable()
    {
        super.onEnable();
    }

    addEvent()
    {
        super.addEvent();
        
    }

    removeEvent()
    {
        super.removeEvent();
    }

    onUpdate()
    {
        this._bg.width = Laya.stage.width;
        this._bg.height = Laya.stage.height;
        if(!this._processBarBg)
        {
            this._processWidth = Laya.stage.width;
        }
    }

    public setProcess(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this._processWidth * process;
        if(width < 1)
            width = 1;
        this._processBar.width = width;
    }
    
}