/**
 * Created by Oshevchuk on 13.07.2017.
 * http://oshevchuk2016.16mb.com/
 */

declare let $;
// import * as $ from 'jquery';

import {osCalendar} from './calendar/calendar';
var calendar:osCalendar;

$(function () {
    calendar= new osCalendar();


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