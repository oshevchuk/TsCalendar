//----------------------------------------------------------------------------
//Provide object position on container and returns offset value
//between min - max
//----------------------------------------------------------------------------
import {osEvent} from "./event";
export class osPositionProvider {
    public container:any;
    static minValue:number;
    static maxValue:number;

    private timespan:number;
    private step:number;
    static stepHeight:number;
    private containerHeight:any;
    private containerOffset;

    constructor(container:any, minValue?:number, maxValue?:number, step?:number) {
        this.container = container;
        this.containerHeight = this.container.height();
        this.containerOffset = this.container.offset();

        osPositionProvider.minValue = minValue ? minValue : 0;
        osPositionProvider.maxValue = maxValue ? maxValue : 0;
        this.step = step ? step : 1;

        this.timespan = osPositionProvider.maxValue - osPositionProvider.minValue + 1;

        osPositionProvider.stepHeight = this.containerHeight / this.timespan;
    }

    // todo : calendarEvent
    getValue(object) {
        var objOffset = $(object).offset().top - this.containerOffset.top;
        var el = object.find('.os-title');
        el.html(this.getTimeFromValue(objOffset) + "-" + this.getTimeFromValue(objOffset + object.height()));
    }

    //todo: grid position by 5min(fixed)
    private getTimeFromValue(objOffset):string {
        var res = this.timespan * objOffset / this.containerHeight + osPositionProvider.minValue;
        var hours:number | string = Math.floor(res);
        hours = hours.toString().length > 1 ? hours : "0" + hours.toString();
        var min:number | string = Math.floor((res - <number>hours) * 60);
        min = min - min % this.step;
        min = min.toString().length > 1 ? min : "0" + min.toString();
        return hours + ":" + min;
    }

    getPositionFromTime(time:osEvent) {
        return {"m": this.calc(time.startData), "h": this.calc(time.endData)-this.calc(time.startData)};
    }

    private calc(time) {
        var hours = time.getHours() - osPositionProvider.minValue;
        var mins = time.getMinutes() - time.getMinutes() % 5;
        var stepi = osPositionProvider.stepHeight / 60;

        return hours * osPositionProvider.stepHeight + mins * stepi;
    }
}