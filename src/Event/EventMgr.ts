import EventDispatcher = laya.events.EventDispatcher;
export default class EventMgr extends EventDispatcher {
    static eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly instance: EventMgr = new EventMgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dispatch(InName, agv?: any) {
        EventMgr.eventDispatcher.event(InName, agv);
    }
    //注册事件
    public regEvemt(InName, caller, listener: Function, arg?: any[]): void {
        EventMgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public regOnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        EventMgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public removeEvent(InName, caller, listener: Function, arg?: any[]): void {
        EventMgr.eventDispatcher.off(InName, caller, listener);
    }
}