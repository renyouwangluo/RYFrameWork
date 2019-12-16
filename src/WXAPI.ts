export default class WXAPI {
    public static readonly adUnitId = "adunit-eef36f84c44bbdc1"
    public static readonly bannerAdUnitId = "adunit-440e21cc02c0d282"
    public static readonly InsAdUnitId = "adunit-440e21cc02c0d282"
    

    public static wxLogin(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.login(
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
        if (WXAPI._onRewardedVideoAdFailed) {
            WXAPI._onRewardedVideoAdFailed();
        }
    }
    protected static onRewardedVideoAdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (WXAPI._onRewardedVideoAdClose) {
                WXAPI._onRewardedVideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (WXAPI._onRewardedVideoAdClose) {
                WXAPI._onRewardedVideoAdClose(false)
            }
        }
    }
    protected static regRewardedVideoAdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(WXAPI.onRewardedVideoAdLoad)
        rewardedVideoAd.onError(WXAPI.onRewardedVideoAdError)
        rewardedVideoAd.onClose(WXAPI.onRewardedVideoAdClose)

        WXAPI._isRegRewardedVideoAdEvent = true;
    }
    public static showRewardedVideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onMiniGame) {
            WXAPI._onRewardedVideoAdClose = onAdClose;
            WXAPI._onRewardedVideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd(
                {
                    adUnitId: WXAPI.adUnitId,
                }
            );

            if (!WXAPI._isRegRewardedVideoAdEvent) {
                WXAPI.regRewardedVideoAdEvent(rewardedVideoAd);
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


    //-------------------------小游戏跳转---------------------------
    public static navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["wx"].navigateToMiniProgram(
                {
                    appId: appId,
                    path: path,
                    extraData: {
                        foo: 'bar'
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res)
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res)
                        }
                    },
                    complete(res) {
                        if (onComplate) {
                            onComplate(res)
                        }
                    }
                })

        }
    }
    //----------------------------------------------------------------------

    //---------------------分享----------------------------------------
    protected static _onShow: Function = null;
    protected static _lastShareTime: number = 0;
    public static share(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onMiniGame) {
            WXAPI._onShow = () => {
                Laya.Browser.window["wx"].offShow(WXAPI._onShow)
                WXAPI._onShow = null;
                var c = Date.now() - this._lastShareTime;
                if (complate) {
                    if (Date.now() - this._lastShareTime > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["wx"].onShow(WXAPI._onShow)
            this._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage(
                {
                    title: titel,
                    imageUrl: imageUrl
                }
            );
        }
    }
    //----------------------------------------------------------------------


    //--------------------插屏幕广告---------------------------------------
    public static showInterstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WXAPI.InsAdUnitId,
            })

            interstitialAd.onLoad(() => {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch((err) => {
                    console.log('插屏广告 显示失败 ：' + err)
                    if (onFailed) {
                        onFailed();
                    }
                })
            })

            interstitialAd.onError((err) => {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            })

            interstitialAd.onClose(() => {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            })
        }
        else {
            onAdClose();
        }
    }
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof WXAPI
     */
    public static getLaunchOptionsSync() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onMiniGame) {
            let obj = Laya.Browser.window["wx"].getLaunchOptionsSync()
            console.log("场景值 " + obj.scene);
            let str = JSON.stringify(obj.query);
            console.log("Query参数 " + str);
            let key = obj.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj.shareTicket);
            console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
            return obj;
        }
        let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
        return obj;
    }

    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     * 
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof WXAPI
     */
    public static SetShareMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["wx"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["wx"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                }
            });
        }
    }
}