/**
 * Created by Oshevchuk on 13.07.2017.
 * http://oshevchuk2016.16mb.com/
 */

declare let $;
// import * as $ from 'jquery';

import {PositionProvider} from "./PositionProvider";
import {Day} from "./Day";
import {CalendarEvent} from './calendarEvent';
import {DateProvide} from './DateProvide';


var positionProvider:PositionProvider;
var day:CalendarEvent[]=[];
var provide:DateProvide;

$(function () {

    positionProvider = new PositionProvider($('.os-dhx-holder'), 8, 21, 5);
    day.push(new CalendarEvent(
        new Date('2017-08-09T08:30:00'),
        new Date('2017-08-09T12:27:00'),
        'text event'
    ));

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

    provide = new DateProvide(new Date());
    provide.ShowHeaders();
    // provide.ShowHeaders();
    // provide.NextWeek(); п
    // provide.NextWeek();
    // provide.ShowHeaders();

    // console.log(1);

    $('.os-dhx-holder').dblclick(function (e) {
        $('.os-modal-overlay').fadeIn(400);
        // console.log($(event.target.hash).parent(), $(e.target).parent());
        $(e.target).append(' <div class="os-event">            <div class="os-title">03:05-04:55</div>        <span>Test mission for mission is imposible to posible</span>        <div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a>       <a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a>            </div>            </div>')
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
            .css({"top": e.offsetY});
    });
});

function ShowEvents(){
    var contain=$('.os-dhx-holder')[0];
    // console.log(contain);

    day.forEach(function (a, b) {
        let pos=positionProvider.getPositionFromTime(a);

        $(contain).append('<div class="os-event"><div class="os-title">03:05-04:55</div><span>Test mission for mission is imposible to posible</span><div class="os-resize"></div>        <div class="os-controlls">        <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a>        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a><a class="os-remove"><i class="fa fa-trash" aria-hidden="true"></i></a></div></div>')
            .find('.os-event')
            .css({'top':pos.m+"px", 'height':pos.h});

        a.getHtml();
        console.log(pos);
    })
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

