import HttpUnit from "../Net/HttpUnit";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WXAPI from "../WXAPI";

export default class WudianMgr {
    private static _ipBlockFlag: number = -1;
    public static IpBlockFlag(): number {
        return this._ipBlockFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static UpdateIpBlockState() {
        HttpUnit.GetIpBlock(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                WudianMgr._ipBlockFlag = res.code;
            },
            null
        )
    }
    /**
     * IP是否被屏蔽
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static GetIpBlocked(): boolean {
        return this._ipBlockFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static GetEntryScene(): boolean {
        return WXAPI.getLaunchOptionsSync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static IsSwitchOpen(): boolean {
        let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
        let isOpenTime = AppSwitchConfig.getInstance().getAppSwitchData().wudianTimeAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    }
    /**
     * 完全封装好的误点Flag
     * 
     * @readonly
     * @static
     * @type {boolean}
     * @memberof WudianMgr
     */
    public static get WudianFlag(): boolean {
        let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
        let noEnterBySearch: boolean = WXAPI.getLaunchOptionsSync().scene != 1006;
        let isOpenTime = AppSwitchConfig.getInstance().getAppSwitchData().wudianTimeAvaliable;
        let ipnotBlock = this._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
            isOpenTime);
        return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
    }
    /**
     * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static get NoTimeWudianFlag(): boolean {
        let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
        let noEnterBySearch: boolean = WXAPI.getLaunchOptionsSync().scene != 1006;
        let ipnotBlock = this._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}