import { OpenDataMsgDef } from "./OpenDataMsgDef";

export default class OpenMsg 
{
    constructor(type : OpenDataMsgDef)
    {
        this.cmd = type;
    }
    public readonly cmd : OpenDataMsgDef = OpenDataMsgDef.None;
    public data : any = {};
}