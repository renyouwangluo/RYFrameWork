import AppConfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class AppSwitchData
{
    public version : string = "";
    public banner : number = 0;
    public wudian: number = 0;
    private wudianAvailableTime: object = {
        "0": 0, "1": 0, "2": 0, "3": 0,
        "4": 0, "5": 0, "6": 0, "7": 0,
        "8": 0, "9": 0, "10": 0, "11": 0,
        "12": 0, "13": 0, "14": 0, "15": 0,
        "16": 0, "17": 0, "18": 0, "19": 0,
        "20": 0, "21": 0, "22": 0, "23": 0
    }
    /**
     * 得到当前时间开关是否打开
     * 
     * @readonly
     * @type {boolean}
     * @memberof AppSwitchData
     */
    public get wudianTimeAvaliable(): boolean{
        return this.wudianAvailableTime[new Date().getHours()] == 1;
    }
    public mailiang: number = 1;
    public readonly mailianglist : Array<number> = new Array<number>();
    public readonly mailiangSceneList : Array<number> = new Array<number>();

    public readonly wxWuDianBanners : Array<string> = new Array<string>();
    public btnMoveTimer : number = 1;
    public bannerMoveTimer : number = 0.5;
    public bannerFreshTimer : number = 200;
    public bannerCreateFailNum : number = 3;
    public bannerTodayBannerMax : number = 10;

    public adSwitch : number = 1;
}

export default class AppSwitchConfig
{   
    public static getInstance() : AppSwitchConfig
    {
        if(null == AppSwitchConfig._instance)
        {
            AppSwitchConfig._instance = AppSwitchConfig.load();
        }
        return AppSwitchConfig._instance
    }
    protected static _instance: AppSwitchConfig;

    protected static load() : AppSwitchConfig
    {
        var config = new AppSwitchConfig();
        var json: any = Laya.loader.getRes(AppConfig.ResServer + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: AppSwitchData = new AppSwitchData();
                rowData.version = String(row["version"]);
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mailiang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.mailianglist.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if(null != mailiangScenelist)
                {
                    for (var j = 0; j < mailiangScenelist.length; ++j)  
                    {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailiangSceneList.push(sceneValue);
                    }
                }

                var wxwudianbanners = row["wxwudianbanners"];
                if(null != wxwudianbanners)
                {
                    for (var j = 0; j < wxwudianbanners.length; ++j)  
                    {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wxWuDianBanners.push(bannerid);
                    }
                }
                rowData.btnMoveTimer = Number(row["btnMoveTimer"]);
                rowData.bannerMoveTimer = Number(row["bannerMoveTimer"]);
                rowData.bannerCreateFailNum = Number(row["createFailNum"]);
                rowData.bannerFreshTimer = Number(row["bannerFreshTimer"]);
                rowData.bannerTodayBannerMax = Number(row["todayBannerMax"]);
                
                rowData.adSwitch = Number(row["adSwitch"]);
                config._data.push(rowData);
            }
            return config;
        }
        else{
            config._data.push(new AppSwitchData());
            return config;
        }
    }

    protected readonly _data : Array<AppSwitchData> = new Array<AppSwitchData>();

    public getAppSwitchData(): AppSwitchData
    {
        return this._data[0];
    }
}