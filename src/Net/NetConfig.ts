export default class NetConfig
{
    public static readonly state = 0;
    public static readonly gameid : number = -1;
    public static readonly serverUrl : string = "https://sysxue.5iape.com";
    public static readonly Login : string = "";
    public static readonly SaveGameData : string = "";
    public static readonly GetUser = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    public static readonly IpBlock = "https://sysxue.5iape.com/api/share/ip_select";
}