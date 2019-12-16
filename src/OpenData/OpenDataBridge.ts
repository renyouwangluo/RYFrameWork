import OpenMsg from "./OpenMsg";
import { OpenDataMsgDef } from "./OpenDataMsgDef";
import { OpenDataKeyDef } from "./OpenDataKeyDef";

export default class OpenDataBridge 
{

    public static postSelfData(key : OpenDataKeyDef,value : any)
    {
        var msg = new OpenMsg(OpenDataMsgDef.setSelfData);
        msg.data.key = key;
        msg.data.value = value;
        OpenDataBridge.sendMsgToOpenDataContext(msg);
    }

    public static openFriendRank()
    {
        var msg = new OpenMsg(OpenDataMsgDef.OpenFriendRank);
        msg.data.width = Laya.stage.width;
        msg.data.height = Laya.stage.height;
        OpenDataBridge.sendMsgToOpenDataContext(msg);
    }

    public static sendMsgToOpenDataContext(msg : OpenMsg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}