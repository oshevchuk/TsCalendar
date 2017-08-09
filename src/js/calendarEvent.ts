import {PositionProvider} from "./PositionProvider";
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
    public getHtml(){

        var ans= `<div class="os-event"><div class="os-title">03:05-04:55</div><span>Test mission for mission is imposible to posible</span><div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a><a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a></div></div>`;

        console.log( {"m": this.calc(this.startData), "h": this.calc(this.endData)-this.calc(this.startData)});

        console.log(ans);
    }

    private calc(time) {
        var hours = time.getHours() - PositionProvider.minValue;
        var mins = time.getMinutes() - time.getMinutes() % 5;
        var stepi = PositionProvider.stepHeight / 60;

        return Math.round( hours * PositionProvider.stepHeight + mins * stepi);
    }
}