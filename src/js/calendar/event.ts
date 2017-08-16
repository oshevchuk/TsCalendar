/**
 * Created by Oshevchuk on 15.08.2017.
 * http://oshevchuk2016.16mb.com/
 */
class osEvent{
    public id:Number;
    public startData:Date;
    public endData:Date;
    public description:string;

    constructor(startData:Date, endData:Date, description?:string) {
        this.startData = startData;
        this.endData = endData;
        this.description = description ? description : '';
    }
}