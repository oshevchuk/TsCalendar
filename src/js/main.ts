/**
 * Created by Oshevchuk on 13.07.2017.
 * http://oshevchuk2016.16mb.com/
 */

declare let $;

let provide;
let data_height = 0;
let data_offset;
let timespan = 13;
let data_start = 8;
let data_end = 21;

class positionProvider {
    public container;
    public minValue;
    public maxValue;

    private containerHeight:number;
    private containerOffset;

    constructor(container, minValue?:number, maxValue?:number) {
        this.container = container;
        this.containerHeight = this.container.height();
        this.containerOffset = this.container.offset();

        this.minValue = minValue ? minValue : 0;
        this.maxValue = maxValue ? maxValue : 0;
    }
}

$(function () {
    timespan = data_end - data_start + 1;
    data_height = $('.os-dhx-holder').height() - 6;
    data_offset = $('.os-dhx-holder').offset().top;

    $('.os-dhx-holder').droppable();
    $('.os-event').draggable({
        containment: '#os-root',
        axis: "y",
        drag: function (event, ui) {
            var offset = $(this).offset();
            offset.top -= data_offset + 3;
            var element_height = $(this).height();

            var pos = (offset.top);
            var res = timespan * offset.top / data_height + data_start;

            var delta = ((offset.top) / (data_height)) * timespan;

            var hours = Math.floor(res);
            var min = Math.floor((res - hours) * 60);

            var el = $(this).find('.os-title');
            el.html(hours + ":" + min + "-" + (hours + 1) + ":" + min);
            // console.log(res, data_height, offset.top);
            // ui.position.top=event.offset.top;
            // console.log(event.target, ui);
            // ui.position.top=ui
            ui.offset.top = ui.position.top;
        }

    }).resizable({
        containment: '#os-root',
        grid: [20, 20],
        resize: function (event, ui) {
            // ui.size.width = ui.originalSize.width;
            $(this).css('width', '');
        }
    });

    provide = new DateProvide(new Date());
    provide.ShowHeaders();
    // provide.ShowHeaders();
    // provide.NextWeek(); п
    // provide.NextWeek();
    // provide.ShowHeaders();

    // console.log(1);

    $('.os-dhx-holder').dblclick(function (e) {
        $('.os-modal-overlay').fadeIn(400);
        $(e.target).html(' <div class="os-event">            <div class="os-title">03:05-04:55</div>        <span>Test mission for mission is imposible to posible</span>        <div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a>       <a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a>            </div>            </div>')
            .find('.os-event')
            .draggable({
                containment: '#os-root',
                axis: "y",
                drag: function (event, ui) {
                }
            }).resizable({
            containment: '#os-root',
            grid: [20, 20],
            resize: function (event, ui) {
                $(this).css('width', '');
            }
        })
            .css({"top": e.offsetY});
    });
});

$('.os-dhx-holder').on('click', '.os-remove', function (e) {
    $(this).parent().parent().remove();
});
$('.os-dhx-holder').on('click', '.os-event', function (e) {
    // console.log(this);
    $('.os-controlls').hide();
    $(this).find('.os-controlls').show();
});
$('.os-close-modal').on('click', function () {
    $('.os-modal-overlay').fadeOut(400);
});

function nextWeek() {
    provide.NextWeek();
}

function prevWeek() {
    provide.NextWeek(-1);
}

$(".er").show();


class DateProvide {
    static days = ["Sun", 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    static mons = ["January", 'February', 'March', 'Aprill', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    private related_day;
    public Curent_day;

    constructor(date) {
        this.related_day = new Date();
        this.Curent_day = date ? date : new Date();
    }

    public ShowHeaders() {
        // let related_day = this.related_day;

        //day of fisrst day on week
        let cur_day = this.Curent_day.getDay() == 0 ? 7 : this.Curent_day.getDay();
        this.related_day.setDate(this.Curent_day.getDate() - cur_day + 1);

        let related_day = this.related_day;
        let start = new Date(related_day);


        // let day = this.Curent_day.getDay();
        $('.os-head-day').eq(cur_day - 1).css({'color': 'red', 'background-color': 'rgb(220,220,220)'});

        // let tmp=this.related_day;
        $('.os-head-day').each(function (a) {

            $(this).html(DateProvide.days[a + 1] + ", " + related_day.getDate() + "-" + DateProvide.mons[related_day.getMonth()] + "-" + related_day.getFullYear());
            related_day.setDate(related_day.getDate() + 1);
        });
        let tmp = new Date();
        tmp.setDate(related_day.getDate() - 1);
        // console.log(related_day);
        // console.log(this.Curent_day);
        // $('.os-cal-date').html($('.os-head-day:first-child').html().substr(5) + '-' + $('.os-head-day:last-child').html().substr(5))
        $('.os-cal-date').html(start.getDate() + " " + DateProvide.mons[start.getMonth()] + " " + start.getFullYear() + " - " + tmp.getDate() + " " + DateProvide.mons[tmp.getMonth()] + " " + tmp.getFullYear());
        // console.log(start, tmp);
    }

    public NextWeek(factor) {
        factor = factor ? factor : 1;
        this.Curent_day.setDate(this.Curent_day.getDate() + 7 * factor);
        this.ShowHeaders();
    }
}

class Day {
    start:number = 9;
    end:number = 18;
    public Day:Date;
    public events:CalendarEvent[];

    constructor() {
        this.events = [];
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

class CalendarEvent {
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

class Modal {
    constructor() {

    }

    public Show() {

    }
}