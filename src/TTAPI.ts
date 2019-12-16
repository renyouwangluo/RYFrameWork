import AppConfig from "./AppConfig";

export default class TTAPI
{
    public static readonly adUnitId = ""   
    public static readonly bannerAdUnitId = ""   
    public static readonly InsAdUnitId = ""
    public static readonly _templateId = ""       //分享素材id
    
    private static recordRes:string = ""
    private static record:any;

    protected static _banner : any = null;    

    public static ttLogin(onSuccess: Function, onFail: Function) {
        if (AppConfig.onTTMiniGame) {
            Laya.Browser.window.tt.login(
                {
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code)
                        }
                    }
                })
        }
        TTAPI.initRecord();
    }

    //-------------------------激励视频---------------------------------
    protected static _isRegRewardedVideoAdEvent = false;
    protected static _onRewardedVideoAdFailed: Function = null;
    protected static _onRewardedVideoAdClose: Function = null;
    protected static onRewardedVideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewardedVideoAdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (TTAPI._onRewardedVideoAdFailed) {
            TTAPI._onRewardedVideoAdFailed();
        }
    }
    protected static onRewardedVideoAdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (TTAPI._onRewardedVideoAdClose) {
                TTAPI._onRewardedVideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (TTAPI._onRewardedVideoAdClose) {
                TTAPI._onRewardedVideoAdClose(false)
            }
        }
    }
    protected static regRewardedVideoAdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(TTAPI.onRewardedVideoAdLoad)
        rewardedVideoAd.onError(TTAPI.onRewardedVideoAdError)
        rewardedVideoAd.onClose(TTAPI.onRewardedVideoAdClose)
        TTAPI._isRegRewardedVideoAdEvent = true;
    }
    public static showRewardedVideoAd(onAdClose: Function, onFailed: Function) {
        if (AppConfig.onTTMiniGame) {
            TTAPI._onRewardedVideoAdClose = onAdClose;
            TTAPI._onRewardedVideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd(
                {
                    adUnitId: TTAPI.adUnitId,
                }
            );

            if (!TTAPI._isRegRewardedVideoAdEvent) {
                TTAPI.regRewardedVideoAdEvent(rewardedVideoAd);
            }

            rewardedVideoAd.load().then(() => {
                var promise = rewardedVideoAd.show();
                promise.then(() => console.log('激励视频 广告显示成功'));
                promise.catch((err) => {
                    rewardedVideoAd.load()
                        .then(() => rewardedVideoAd.show())
                        .catch(err => {
                            console.log('激励视频 广告显示失败')
                            if (onFailed) {
                                onFailed();
                            }
                        })
                });
            }).catch(err => {
                console.log('激励视频 广告加载失败')
                if (onFailed) {
                    onFailed();
                }
            })
        }
        else {
            onAdClose(true);
        }
    }
    //----------------------------------------------------------------


    //-------------------------小游戏跳转---------------------------TODO
    // public static navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("跳转游戏： " + appId);
    //         Laya.Browser.window["tt"].navigateToMiniProgram(
    //             {
    //                 appId: appId,
    //                 path: path,
    //                 extraData: {
    //                     foo: 'bar'
    //                 },
    //                 envVersion: 'release',
    //                 success(res) {
    //                     if (onSuccess) {
    //                         onSuccess(res)
    //                     }
    //                 },
    //                 fail(res) {
    //                     if (onFail) {
    //                         onFail(res)
    //                     }
    //                 },
    //                 complete(res) {
    //                     if (onComplate) {
    //                         onComplate(res)
    //                     }
    //                 }
    //             })

    //     }
    // }
    //-------------------------------------------------------------

    //-------------------录屏-------------------------------------------
    /**
     * 配置录屏
     */
    
    private static initRecord(){
        TTAPI.record = Laya.Browser.window["tt"].getGameRecorderManager();  
        if(TTAPI.record!=null){
            TTAPI.record.onStart(res =>{
                console.log("录屏开始");
                TTAPI.recordRes="";        
            })

            TTAPI.record.onStop(res =>{
                console.log("录屏结束");
                TTAPI.recordRes = res.videoPath;
            })
        }
    }

    /**
     * 开始录屏
     */
    public static startRecord(duration = 300){
        if(!AppConfig.onTTMiniGame)return;
        TTAPI.record.start({
            duration
        })
    }

     /**
     * 停止录屏
     */
    public static stopRecord() {
        if(!AppConfig.onTTMiniGame)return;                     
        TTAPI.record.stop();
    }

    //----------------------------------------------------------------------

    //---------------------分享录屏----------------------------------------
    public static shareRecord(callback:Function=null){
        if(!AppConfig.onTTMiniGame)return;   
        if(TTAPI.recordRes!=""){
            window["tt"].shareAppMessage({
                channel:"video",
                extra: {
                    videoPath: TTAPI.recordRes, // 可替换成录屏得到的视频地址
                    videoTopics: ["快来和我一起玩吧！"]
                },
                success() {
                    if(callback!=null){
                        callback();
                    }
                    console.log("分享视频成功");
                },
                fail(e) {
                    console.log("分享视频失败");
                }
              });
        }else{
            console.log("分享视频为空");
        }
    }
    //----------------------------------------------------------------------


    //----------------------------------------------------------------------

    //---------------------分享好友----------------------------------------
    public static share(complate:Function=null){
        if(!AppConfig.onTTMiniGame)return;   
        window["tt"].shareAppMessage({
            templateId:this._templateId,
            success() {
                if(complate!=null){
                    complate();
                }
            },
            fail() {
                console.log("分享失败");
            }
            });

    }

    //------------------------------------------------------------------

    //-------------------------banner-------------------------------------------

    public static showBanner():any
    {
        if(!AppConfig.onTTMiniGame)return;
        if(!TTAPI._banner){
            const { windowWidth, windowHeight } = Laya.Browser.window["tt"].getSystemInfoSync();
            var targetBannerAdWidth = 150;
            // 创建一个居于屏幕底部正中的广告
            TTAPI._banner = Laya.Browser.window["tt"].createBannerAd({
                adUnitId: TTAPI.bannerAdUnitId,
                adIntervals:30,                
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight - (targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                }
                });
            TTAPI._banner.onResize(size => {
                console.log(size.width, size.height);
                TTAPI._banner.style.top = windowHeight - size.height;
                TTAPI._banner.style.left = (windowWidth - size.width) / 2;
            });
            TTAPI._banner.show();
        }
    }


    //----------------------------------------------------------------------

    // //--------------------插屏幕广告---------------------------------------  
    // public static showInterstitialAd(onAdClose: Function, onFailed: Function)  {
    //     if (Laya.Browser.onMiniGame) {
    //         var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
    //             adUnitId: TTAPI.InsAdUnitId,
    //         })

    //         interstitialAd.onLoad(() => {
    //             console.log('插屏广告 加载完成');
    //             interstitialAd.show().catch((err) => {
    //                 console.log('插屏广告 显示失败 ：' + err)
    //                 if (onFailed) {
    //                     onFailed();
    //                 }
    //             })
    //         })

    //         interstitialAd.onError((err) => {
    //             console.log('插屏广告 加载失败' + err);
    //             if (onFailed) {
    //                 onFailed();
    //             }
    //         })

    //         interstitialAd.onClose(() => {
    //             console.log('插屏广告 关闭');
    //             if (onAdClose) {
    //                 onAdClose();
    //             }
    //         })
    //     }
    //     else {
    //         onAdClose();
    //     }
    // }
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof TTAPI
     */
    // public static getLaunchOptionsSync() {
    //     // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
    //     if (Laya.Browser.onMiniGame) {
    //         let obj = Laya.Browser.window["wx"].getLaunchOptionsSync()
    //         console.log("场景值 " + obj.scene);
    //         let str = JSON.stringify(obj.query);
    //         console.log("Query参数 " + str);
    //         let key = obj.query["key"];
    //         console.log("Query参数：key " + key);
    //         console.log("ShareTicket " + obj.shareTicket);
    //         console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
    //         console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
    //         return obj;
    //     }
    //     let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
    //     return obj;
    // }

    //----------------------------------------------------------------------
    // /**
    //  * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
    //  * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
    //  * 
    //  * @static
    //  * @param {string} titel 分享标题
    //  * @param {string} imageUrl 分享图片地址
    //  * @param {Function} [success] 成功回调函数(可不填)
    //  * @param {Function} [fail] 失败回调函数(可不填)
    //  * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
    //  * @memberof TTAPI
    //  */
    // public static SetShareMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("小游戏设置转发按钮");
    //         Laya.Browser.window["wx"].showShareMenu({
    //             withShareTicket: false,
    //             success: success,
    //             fail: fail,
    //             complete: complate
    //         });
    //         Laya.Browser.window["wx"].onShareAppMessage(function () {
    //             return {
    //                 title: titel,
    //                 imageUrl: imageUrl
    //             }
    //         });
    //     }
    // }


}