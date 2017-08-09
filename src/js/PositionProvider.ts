//----------------------------------------------------------------------------
//Provide object position on container and returns offset value
//between min - max
//----------------------------------------------------------------------------
import {CalendarEvent} from "./calendarEvent";
export class PositionProvider {
    public container:any;
    public minValue:number;
    public maxValue:number;

    private timespan:number;
    private step:number;
    private stepHeight:number;
    private containerHeight:any;
    private containerOffset;

    constructor(container:any, minValue?:number, maxValue?:number, step?:number) {
        this.container = container;
        this.containerHeight = this.container.height();
        this.containerOffset = this.container.offset();

        this.minValue = minValue ? minValue : 0;
        this.maxValue = maxValue ? maxValue : 0;
        this.step = step ? step : 1;

        this.timespan = this.maxValue - this.minValue + 1;

        this.stepHeight = this.containerHeight / this.timespan;
    }

    // todo : calendarEvent
    getValue(object) {
        var objOffset = $(object).offset().top - this.containerOffset.top;
        var el = object.find('.os-title');
        el.html(this.getTimeFromValue(objOffset) + "-" + this.getTimeFromValue(objOffset + object.height()));
    }

    //todo: grid position by 5min(fixed)
    private getTimeFromValue(objOffset):string {
        var res = this.timespan * objOffset / this.containerHeight + this.minValue;
        var hours:number | string = Math.floor(res);
        hours = hours.toString().length > 1 ? hours : "0" + hours.toString();
        var min:number | string = Math.floor((res - <number>hours) * 60);
        min = min - min % this.step;
        min = min.toString().length > 1 ? min : "0" + min.toString();
        return hours + ":" + min;
    }

    getPositionFromTime(time:CalendarEvent) {
        // var hours=time.startData.getHours()-this.minValue;
        // var mins=time.startData.getMinutes()-time.startData.getMinutes()%5;
        //
        // var stepi=this.stepHeight/60;

        // console.log(this.calc(time.startData), this.calc(time.endData));


        // return { 'm': hours*this.stepHeight+mins*stepi, "h": 20};

        return {"m": this.calc(time.startData), "h": this.calc(time.endData)-this.calc(time.startData)};
    }

    private calc(time) {
        var hours = time.getHours() - this.minValue;
        var mins = time.getMinutes() - time.getMinutes() % 5;
        var stepi = this.stepHeight / 60;

        return hours * this.stepHeight + mins * stepi;
    }
}