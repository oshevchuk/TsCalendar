/**
 * Created by Oshevchuk on 08.08.2017.
 * http://oshevchuk2016.16mb.com/
 */

//----------------------------------------------------------------------------
//One Day with events and controls
//----------------------------------------------------------------------------

    import  {CalendarEvent} from './calendarEvent';
export class Day {
    start:number = 9;
    end:number = 18;
    public Day:Date;
    public events:CalendarEvent[];

    constructor(event?:CalendarEvent) {
        this.events = [];
        event ? this.events.push(event) : null;
    }

    addEvent(event:CalendarEvent) {
        this.events.push(event);
    }

    editEventTime(event:CalendarEvent, start, end) {
        let index = this.events.indexOf(event);
        if (index > -1) {

        }
    }

    removeEvent(event:CalendarEvent) {
        let index = this.events.indexOf(event);
        if (index > -1) {
            this.events.splice(index, 1);
        }
    }

    checkAviability() {

    }
}
