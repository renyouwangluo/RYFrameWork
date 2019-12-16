export enum ALDEventDef
{
    None = "",
    ReportAdClickSuccess = "广告导出成功",
    ReportAdClickFail = "广告导出失败",
    //todo:添加你自己的阿拉丁事件
}

//阿拉丁相关接口
export default class ALD 
{
    public static aldSendOpenId(openid : string)
    {   
        if(Laya.Browser.onMiniGame)
        {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ",openid);
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ",openid);
        }
    }

    public static aldSendEvent(event : ALDEventDef,data : any)
    {
        var eventName : string = event;
        if(Laya.Browser.onMiniGame)
        {
            Laya.Browser.window["wx"].aldSendEvent(eventName,data);
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            Laya.Browser.window["qq"].aldSendEvent(eventName,data);
        }
    }

    public static aldSendReportAdClickSuccess(data : any)
    {
        var type = ALDEventDef.ReportAdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        var ald = ALD as any;
        ald.aldSendEvent(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSendReportAdClickFail(data : any)
    {
        var type = ALDEventDef.ReportAdClickFail  + " " +  data.title + ":" + String(data.appid)
        var ald = ALD as any;
        ald.aldSendEvent(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }
}