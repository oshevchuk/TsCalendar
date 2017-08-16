import {osDay} from "./day";
import {osEvent} from "./event";
import {osPositionProvider} from "./positionProvider";
import {DateProvide} from "../DateProvide";
/**
 * Created by Oshevchuk on 15.08.2017.
 * http://oshevchuk2016.16mb.com/
 */

declare let $;

export class osCalendar {
    week = [];
    positionProvider:osPositionProvider;
    public provide:DateProvide;

    constructor() {
        for (var i = 0; i < 7; i++) {
            this.week.push(new osDay(
                new osEvent(new Date('2017-08-09T08:30:00'),
                    new Date('2017-08-09T12:27:00'),
                    'text event')
            ));
        }
        this.provide = new DateProvide(new Date());
        this.provide.ShowHeaders();

        this.positionProvider = new osPositionProvider($('.os-dhx-holder'), 8, 21, 5);


        this.ShowWeekEvents();
        this.BindEvents();
        // console.log(this.week);
    }

    nextWeek() {
        this.provide.NextWeek();
    }

    prevWeek() {
        this.provide.NextWeek(-1);
    }

    private BindEvents() {
        let self = this;

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

            let select=$(e.target).data('num');
            if(select) {

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
                    .css({"top": e.offsetY});
            }
        });
    }

    public ShowGrid() {
    }

    public SelectWeek() {
    }

    public getWeekEvents() {
    }

    public ShowWeekEvents() {
        var contain = $('.os-dhx-holder');
        this.week.forEach(function (a:osDay, b) {
            $(contain)[b].append(a.events[0].getHtml());
        });
    }
}
