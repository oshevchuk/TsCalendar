import {osEvent} from "./event";
/**
 * Created by Oshevchuk on 15.08.2017.
 * http://oshevchuk2016.16mb.com/
 */
export class osDay{
    start:number = 9;
    end:number = 18;
    public Day:Date;
    public events:osEvent[];

    constructor(event?:osEvent) {
        this.events = [];
        event ? this.events.push(event) : null;
    }

    addEvent(event:osEvent) {
        this.events.push(event);
    }

    editEventTime(event:osEvent, start, end) {
        let index = this.events.indexOf(event);
        if (index > -1) {

        }
    }

    removeEvent(event:osEvent) {
        let index = this.events.indexOf(event);
        if (index > -1) {
            this.events.splice(index, 1);
        }
    }

    checkAviability() {

    }
}