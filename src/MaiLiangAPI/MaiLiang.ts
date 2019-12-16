import { requestData } from "../Net/HttpUnit";
import AppConfig from "../AppConfig";
import WXAPI from "../WXAPI";
import User from "../User/User";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class MaiLiang {
    public static mainUrl: string = "https://swtj.mrkzx.cn";
    public static uclick: string = "/v1.1/api/Activity/uclick.html";
    public static stay: string = "/v1.1/api/Activity/stay.html";

    public static key: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static MaiLiangOpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static time: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {requestData} req 
     * @memberof MaiLiang
     */
    protected static request(req: requestData) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = MaiLiang.mainUrl + req.url;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    MaiLiang.MaiLiangOpenId = res.Result["OpenId"];
                    MaiLiang.time = req.data.posttime;
                    console.log("获得买量系统OpenId " + MaiLiang.MaiLiangOpenId);

                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.onSuccess) {
                    req.onSuccess(res);
                }
            }
            else {
                if (req.onFail) {
                    req.onFail(res);
                }
            }

            req.onSuccess = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "MaiLiang http fail")
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);

        if (req.meth == "get") {
            var para = "";
            for (const key of Object.keys(req.data)) {
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            xhr.send(req.url, null, req.meth);
        }
        else {
            var para = "";
            for (const key of Object.keys(req.data)) {
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url, para, req.meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static GetMaiLiangOpenId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = WXAPI.getLaunchOptionsSync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && User.openId != "") {
                    MaiLiang.key = key;
                    let req = new requestData();
                    req.url = MaiLiang.uclick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppConfig.AppID;
                    req.data.openid = "";
                    let time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = User.openId;
                    req.meth = "POST";
                    console.log("发送买量数据接口")
                    MaiLiang.request(req);
                }
            }
            else {
                console.log("上报买量数据失败")
                onFail(null);
            }

        }
        else {
            console.log("不在微信模式下调用，默认上报买量数据失败")
            onFail(null);
        }
    }
    /**
     * 上报买量接口停留时间
     * 
        appid －主体小程序appid
        openid －买量系统唯一标识（不可空）
        posttime － 请求时间刻度（精确到秒）
        time － 停留时长（精确到秒）
     * @static
     * @memberof MaiLiang
     */
    public static ReportStayTime(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (MaiLiang.MaiLiangOpenId != "") {
                let req = new requestData();
                req.url = MaiLiang.stay;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppConfig.AppID;
                req.data.openid = MaiLiang.MaiLiangOpenId;
                let time = new Date().getTime() / 1000;
                req.data.posttime = time;
                let staytime = MaiLiang.time != 0 ? time - MaiLiang.time : 0;
                req.data.time = staytime;
                req.meth = "POST";
                console.log("发送停留时间至买量接口")
                MaiLiang.request(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}