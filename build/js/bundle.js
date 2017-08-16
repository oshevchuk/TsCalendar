(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Oshevchuk on 08.08.2017.
 * http://oshevchuk2016.16mb.com/
 */
var DateProvide = (function () {
    function DateProvide(date) {
        this.related_day = new Date();
        this.Curent_day = date ? date : new Date();
    }
    DateProvide.prototype.ShowHeaders = function () {
        // let related_day = this.related_day;
        //day of fisrst day on week
        var cur_day = this.Curent_day.getDay() == 0 ? 7 : this.Curent_day.getDay();
        this.related_day.setDate(this.Curent_day.getDate() - cur_day + 1);
        var related_day = this.related_day;
        var start = new Date(related_day);
        // let day = this.Curent_day.getDay();
        $('.os-head-day').eq(cur_day - 1).css({ 'color': 'red', 'background-color': 'rgb(220,220,220)' });
        // let tmp=this.related_day;
        $('.os-head-day').each(function (a) {
            $(this).html(DateProvide.days[a + 1] + ", " + related_day.getDate() + "-" + DateProvide.mons[related_day.getMonth()] + "-" + related_day.getFullYear());
            related_day.setDate(related_day.getDate() + 1);
        });
        var tmp = new Date();
        tmp.setDate(related_day.getDate() - 1);
        // console.log(related_day);
        // console.log(this.Curent_day);
        // $('.os-cal-date').html($('.os-head-day:first-child').html().substr(5) + '-' + $('.os-head-day:last-child').html().substr(5))
        $('.os-cal-date').html(start.getDate() + " " + DateProvide.mons[start.getMonth()] + " " + start.getFullYear() + " - " + tmp.getDate() + " " + DateProvide.mons[tmp.getMonth()] + " " + tmp.getFullYear());
        // console.log(start, tmp);
    };
    DateProvide.prototype.NextWeek = function (factor) {
        factor = factor ? factor : 1;
        this.Curent_day.setDate(this.Curent_day.getDate() + 7 * factor);
        this.ShowHeaders();
    };
    DateProvide.days = ["Sun", 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    DateProvide.mons = ["January", 'February', 'March', 'Aprill', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return DateProvide;
}());
exports.DateProvide = DateProvide;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day_1 = require("./day");
var event_1 = require("./event");
var positionProvider_1 = require("./positionProvider");
var DateProvide_1 = require("../DateProvide");
var osCalendar = (function () {
    function osCalendar() {
        this.week = [];
        for (var i = 0; i < 7; i++) {
            this.week.push(new day_1.osDay(new event_1.osEvent(new Date('2017-08-09T08:30:00'), new Date('2017-08-09T12:27:00'), 'text event')));
        }
        this.provide = new DateProvide_1.DateProvide(new Date());
        this.provide.ShowHeaders();
        this.positionProvider = new positionProvider_1.osPositionProvider($('.os-dhx-holder'), 8, 21, 5);
        this.ShowWeekEvents();
        this.BindEvents();
        // console.log(this.week);
    }
    osCalendar.prototype.nextWeek = function () {
        this.provide.NextWeek();
    };
    osCalendar.prototype.prevWeek = function () {
        this.provide.NextWeek(-1);
    };
    osCalendar.prototype.BindEvents = function () {
        var self = this;
        $('.os-dhx-holder').droppable();
        $('.os-event').draggable({
            containment: '#os-root',
            axis: "y",
            drag: function (event, ui) {
                self.positionProvider.getValue($(this));
                ui.position.top = ui.position.top < 0 ? 0 : ui.position.top;
            }
        }).resizable({
            containment: '#os-root',
            resize: function (event, ui) {
                self.positionProvider.getValue($(this));
                // ui.size.width = ui.originalSize.width;
                $(this).css('width', '');
            }
        });
        $('.os-dhx-holder').on('click', '.os-remove', function (e) {
            $(this).parent().parent().remove();
        });
        $('.os-dhx-holder').on('click', '.os-event', function (e) {
            $('.os-event').draggable('disable');
            $('.os-controlls').hide();
            $(this).find('.os-controlls').show();
            $(this).draggable('enable');
        });
        $('.os-close-modal').on('click', function () {
            $('.os-modal-overlay').fadeOut(400);
        });
        $('.os-dhx-holder').dblclick(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var select = $(e.target).data('num');
            if (select) {
                $('.os-modal-overlay').fadeIn(400);
                // console.log($(event.target.hash).parent(), $(e.target).parent());
                $(e.target).append(' <div class="os-event">            <div class="os-title">03:05-04:55</div>        <span>Test mission for mission is imposible to posible</span>        <div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a>       <a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a>            </div>            </div>')
                    .find('.os-event')
                    .draggable({
                    containment: '#os-root',
                    axis: "y",
                    drag: function (event, ui) {
                        self.positionProvider.getValue($(this));
                        ui.position.top = ui.position.top < 0 ? 0 : ui.position.top;
                    }
                }).resizable({
                    containment: '#os-root',
                    resize: function (event, ui) {
                        self.positionProvider.getValue($(this));
                        $(this).css('width', '');
                    }
                })
                    .css({ "top": e.offsetY });
            }
        });
    };
    osCalendar.prototype.ShowGrid = function () {
    };
    osCalendar.prototype.SelectWeek = function () {
    };
    osCalendar.prototype.getWeekEvents = function () {
    };
    osCalendar.prototype.ShowWeekEvents = function () {
        var contain = $('.os-dhx-holder');
        this.week.forEach(function (a, b) {
            $(contain)[b].append(a.events[0].getHtml());
        });
    };
    return osCalendar;
}());
exports.osCalendar = osCalendar;

},{"../DateProvide":1,"./day":3,"./event":4,"./positionProvider":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Oshevchuk on 15.08.2017.
 * http://oshevchuk2016.16mb.com/
 */
var osDay = (function () {
    function osDay(event) {
        this.start = 9;
        this.end = 18;
        this.events = [];
        event ? this.events.push(event) : null;
    }
    osDay.prototype.addEvent = function (event) {
        this.events.push(event);
    };
    osDay.prototype.editEventTime = function (event, start, end) {
        var index = this.events.indexOf(event);
        if (index > -1) {
        }
    };
    osDay.prototype.removeEvent = function (event) {
        var index = this.events.indexOf(event);
        if (index > -1) {
            this.events.splice(index, 1);
        }
    };
    osDay.prototype.checkAviability = function () {
    };
    return osDay;
}());
exports.osDay = osDay;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Oshevchuk on 15.08.2017.
 * http://oshevchuk2016.16mb.com/
 */
var osEvent = (function () {
    function osEvent(startData, endData, description) {
        this.startData = startData;
        this.endData = endData;
        this.description = description ? description : '';
    }
    osEvent.prototype.getHtml = function () {
        var ans = '<div class="os-event"><div class="os-title">03:05-04:55</div><span>Test mission for mission is imposible to posible</span><div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a><a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a></div></div>';
        // console.log( {"m": this.calc(this.startData), "h": this.calc(this.endData)-this.calc(this.startData)});
        // console.log(ans);
        var t = document.createElement("p");
        t.className = "os-event";
        t.innerHTML = '<div class="os-title">03:05-04:55</div><span>Test mission for mission is imposible to posible</span><div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a><a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a></div>';
        return t;
    };
    return osEvent;
}());
exports.osEvent = osEvent;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osPositionProvider = (function () {
    function osPositionProvider(container, minValue, maxValue, step) {
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
    osPositionProvider.prototype.getValue = function (object) {
        var objOffset = $(object).offset().top - this.containerOffset.top;
        var el = object.find('.os-title');
        el.html(this.getTimeFromValue(objOffset) + "-" + this.getTimeFromValue(objOffset + object.height()));
    };
    //todo: grid position by 5min(fixed)
    osPositionProvider.prototype.getTimeFromValue = function (objOffset) {
        var res = this.timespan * objOffset / this.containerHeight + osPositionProvider.minValue;
        var hours = Math.floor(res);
        hours = hours.toString().length > 1 ? hours : "0" + hours.toString();
        var min = Math.floor((res - hours) * 60);
        min = min - min % this.step;
        min = min.toString().length > 1 ? min : "0" + min.toString();
        return hours + ":" + min;
    };
    osPositionProvider.prototype.getPositionFromTime = function (time) {
        return { "m": this.calc(time.startData), "h": this.calc(time.endData) - this.calc(time.startData) };
    };
    osPositionProvider.prototype.calc = function (time) {
        var hours = time.getHours() - osPositionProvider.minValue;
        var mins = time.getMinutes() - time.getMinutes() % 5;
        var stepi = osPositionProvider.stepHeight / 60;
        return hours * osPositionProvider.stepHeight + mins * stepi;
    };
    return osPositionProvider;
}());
exports.osPositionProvider = osPositionProvider;

},{}],6:[function(require,module,exports){
"use strict";
/**
 * Created by Oshevchuk on 13.07.2017.
 * http://oshevchuk2016.16mb.com/
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import * as $ from 'jquery';
var calendar_1 = require("./calendar/calendar");
var calendar;
$(function () {
    calendar = new calendar_1.osCalendar();
    // provide = new DateProvide(new Date());
    // provide.ShowHeaders();
    // provide.ShowHeaders();
    // provide.NextWeek(); п
    // provide.NextWeek();
    // provide.ShowHeaders();
});
// $(".er").show();
function nextWeek() {
    calendar.nextWeek();
}
function prevWeek() {
    calendar.prevWeek();
}

},{"./calendar/calendar":2}]},{},[6]);
