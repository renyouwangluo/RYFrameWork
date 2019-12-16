import ViewMgr, { ViewDef } from "../Mgr/ViewMgr";
import EventMgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";

//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class ViewBase extends Laya.Script 
{
    public onCloseEvent : Function = null;
    public onOpenEvent : Function = null;
    
    protected readonly _viewBase : boolean  = true
    protected _viewDef : ViewDef = ViewDef.None;
    protected _data : any = {};

    onAwake(): void {
        //删除时自动释放
        (this.owner as Laya.View).autoDestroyAtClosed = true;
        (this.owner as Laya.View).height = Laya.stage.height;
    }

    onEnable(): void {
        this.addEvent();
    }
    onDisable(): void {
        this.removeEvent();
    }
    onDestroy(): void {
        this.removeEvent();
    }
    
    public openView(data?: any): void {
        this._data = data;
        this.show()
        EventMgr.instance.dispatch(EventDef.Game_OnViewOpen,{view:this._viewDef})
        if(this.onOpenEvent)
        {
            this.onOpenEvent();
        }
    }

    public addEvent() {

    }

    public removeEvent() {
        Laya.timer.clearAll(this);
    }

    public closeView() 
    {
        ViewMgr.instance.closeView(this._viewDef);
    }

    public hide()
    {
        (this.owner as Laya.View).visible = false;
        this.onHide();
    }

    public show()
    {
        (this.owner as Laya.View).visible = true;
        this.onShow();
    }

    public viewIsHide()
    {
        return (this.owner as Laya.View).alpha == 0;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr.instance.dispatch(EventDef.Game_OnViewClose,{view:this._viewDef})
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}