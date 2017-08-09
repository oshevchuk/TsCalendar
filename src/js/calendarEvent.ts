/**
 * Created by Oshevchuk on 09.08.2017.
 * http://oshevchuk2016.16mb.com/
 */

//----------------------------------------------------------------------------
//One event object with params to use in Day
//----------------------------------------------------------------------------
export class CalendarEvent {
    public id:Number;
    public startData:Date;
    public endData:Date;
    public description:string;

    constructor(startData:Date, endData:Date, description?:string) {
        this.startData = startData;
        this.endData = endData;
        this.description = description ? description : '';
    }

    //
}