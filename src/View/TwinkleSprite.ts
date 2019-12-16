export default class TwinkleSprite extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _ownerSprite: Laya.Sprite;
    protected _displaySp: Laya.Sprite;
    protected _disText: Laya.Text;
    protected _aniForward: boolean = false;
    protected _fontSize = 25;
    protected _originSize = 1;
    constructor() {
        super();
    }
    onAwake() {
        this._displaySp = this.owner as Laya.Sprite;
        this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this._originSize = this._displaySp.scaleX;
        if (this._disText != null) {
            this._disText.text = "";
            this._fontSize = this._disText.fontSize;
        }
    }
    onEnable(): void {
        this._displaySp.scale(this._originSize, this._originSize);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.displayAni();
    }

    protected displayAni() {
        if (!this._aniForward) {
            var scale = this._displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX <= this.TwinkleMinSize * this._originSize) {
                this._aniForward = true;
            }
        }
        else {
            var scale = this._displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX >= this.TwinkleMaxSize * this._originSize) {
                this._aniForward = false;
            }
        }
    }
}