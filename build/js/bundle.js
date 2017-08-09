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
var PositionProvider = (function () {
    function PositionProvider(container, minValue, maxValue, step) {
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
    PositionProvider.prototype.getValue = function (object) {
        var objOffset = $(object).offset().top - this.containerOffset.top;
        var el = object.find('.os-title');
        el.html(this.getTimeFromValue(objOffset) + "-" + this.getTimeFromValue(objOffset + object.height()));
    };
    //todo: grid position by 5min(fixed)
    PositionProvider.prototype.getTimeFromValue = function (objOffset) {
        var res = this.timespan * objOffset / this.containerHeight + this.minValue;
        var hours = Math.floor(res);
        hours = hours.toString().length > 1 ? hours : "0" + hours.toString();
        var min = Math.floor((res - hours) * 60);
        min = min - min % this.step;
        min = min.toString().length > 1 ? min : "0" + min.toString();
        return hours + ":" + min;
    };
    PositionProvider.prototype.getPositionFromTime = function (time) {
        // var hours=time.startData.getHours()-this.minValue;
        // var mins=time.startData.getMinutes()-time.startData.getMinutes()%5;
        //
        // var stepi=this.stepHeight/60;
        // console.log(this.calc(time.startData), this.calc(time.endData));
        // return { 'm': hours*this.stepHeight+mins*stepi, "h": 20};
        return { "m": this.calc(time.startData), "h": this.calc(time.endData) - this.calc(time.startData) };
    };
    PositionProvider.prototype.calc = function (time) {
        var hours = time.getHours() - this.minValue;
        var mins = time.getMinutes() - time.getMinutes() % 5;
        var stepi = this.stepHeight / 60;
        return hours * this.stepHeight + mins * stepi;
    };
    return PositionProvider;
}());
exports.PositionProvider = PositionProvider;

},{}],3:[function(require,module,exports){
"use strict";
/**
 * Created by Oshevchuk on 09.08.2017.
 * http://oshevchuk2016.16mb.com/
 */
Object.defineProperty(exports, "__esModule", { value: true });
//----------------------------------------------------------------------------
//One event object with params to use in Day
//----------------------------------------------------------------------------
var CalendarEvent = (function () {
    function CalendarEvent(startData, endData, description) {
        this.startData = startData;
        this.endData = endData;
        this.description = description ? description : '';
    }
    return CalendarEvent;
}());
exports.CalendarEvent = CalendarEvent;

},{}],4:[function(require,module,exports){
"use strict";
/**
 * Created by Oshevchuk on 13.07.2017.
 * http://oshevchuk2016.16mb.com/
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import * as $ from 'jquery';
var PositionProvider_1 = require("./PositionProvider");
var calendarEvent_1 = require("./calendarEvent");
var DateProvide_1 = require("./DateProvide");
var positionProvider;
var day = [];
var provide;
$(function () {
    positionProvider = new PositionProvider_1.PositionProvider($('.os-dhx-holder'), 8, 21, 5);
    day.push(new calendarEvent_1.CalendarEvent(new Date('2017-08-09T08:00:00'), new Date('2017-08-09T12:27:00'), 'text event'));
    ShowEvents();
    $('.os-dhx-holder').droppable();
    $('.os-event').draggable({
        containment: '#os-root',
        axis: "y",
        drag: function (event, ui) {
            positionProvider.getValue($(this));
            ui.position.top = ui.position.top < 0 ? 0 : ui.position.top;
        }
    }).resizable({
        containment: '#os-root',
        resize: function (event, ui) {
            positionProvider.getValue($(this));
            // ui.size.width = ui.originalSize.width;
            $(this).css('width', '');
        }
    });
    provide = new DateProvide_1.DateProvide(new Date());
    provide.ShowHeaders();
    // provide.ShowHeaders();
    // provide.NextWeek(); п
    // provide.NextWeek();
    // provide.ShowHeaders();
    // console.log(1);
    $('.os-dhx-holder').dblclick(function (e) {
        $('.os-modal-overlay').fadeIn(400);
        // console.log($(event.target.hash).parent(), $(e.target).parent());
        $(e.target).html(' <div class="os-event">            <div class="os-title">03:05-04:55</div>        <span>Test mission for mission is imposible to posible</span>        <div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a>       <a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a>            </div>            </div>')
            .find('.os-event')
            .draggable({
            containment: '#os-root',
            axis: "y",
            drag: function (event, ui) {
                positionProvider.getValue($(this));
                ui.position.top = ui.position.top < 0 ? 0 : ui.position.top;
            }
        }).resizable({
            containment: '#os-root',
            resize: function (event, ui) {
                positionProvider.getValue($(this));
                $(this).css('width', '');
            }
        })
            .css({ "top": e.offsetY });
    });
});
function ShowEvents() {
    var contain = $('.os-dhx-holder')[0];
    // console.log(contain);
    day.forEach(function (a, b) {
        var pos = positionProvider.getPositionFromTime(a);
        $(contain).html('<div class="os-event"><div class="os-title">03:05-04:55</div><span>Test mission for mission is imposible to posible</span><div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a><a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a></div></div>')
            .find('.os-event')
            .css({ 'top': pos.m + "px", 'height': pos.h });
        console.log(pos);
    });
}
$('.os-dhx-holder').on('click', '.os-remove', function (e) {
    $(this).parent().parent().remove();
});
$('.os-dhx-holder').on('click', '.os-event', function (e) {
    // console.log(this);
    $('.os-event').draggable('disable');
    $('.os-controlls').hide();
    $(this).find('.os-controlls').show();
    $(this).draggable('enable');
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

},{"./DateProvide":1,"./PositionProvider":2,"./calendarEvent":3}]},{},[4]);
