/*jslint plusplus: true*/
/*global $, window, console */

(function () {
    'use strict';

    var count = 0,
        isHtmlElement = function (obj) {
            return obj.nodeType && obj.nodeType === 1;
        },
        getOptions = function (element) {
            /*jslint evil: true*/
            var value = element.getAttribute('data-modal'),
                data = (new Function('return ' + value)()),
                url = element.getAttribute('href');

            // Verify if URL is local link:
            data.url = url;

            return data;
        },
        getDefaultTemplate = function () {
            return $('#modal-template').html();
        };

    function Modal(args) {
        var options = isHtmlElement(args) ? getOptions(args) : args;
        this.template = options.template || getDefaultTemplate();
        this.url = options.url;
        this.context = $(this.template);
        this.container = $('.modal-container', this.context);
        this.content = $('.modal-content', this.context);
        this.title = $('.modal-title', this.context);
        this.closeBtn = $('.modal-close', this.context);
        this.eventHandlers = [];

        if (options.width) {
            this.container.width(options.width);
        }

        this.init().open();
    }

    Modal.prototype = {

        init: function () {
            var that = this;
            this.closeBtn.on('click', function (e) {
                e.preventDefault();
                that.close();
            });

            this.context.on('click', function (e) {
                // Only close if was clicked on
                if (e.target === this) {
                    that.close();
                }
            });

            return that;
        },

        open: function () {
            console.log('Opening...');
            this.context.appendTo('body');
            this.loadContent();
            count++;
            if (count === 1) {
                this.onFirstOpen();
            }
        },

        close: function () {
            var that = this;
            if (that.fire('beforeclose') !== false) {
                that.context.remove();
                count--;
                if (count === 0) {
                    that.onLastClose();
                }
            }
        },

        loadContent: function () {
            console.log('Loading content...' + this.url);
            var that = this;
            if (that.url && that.url[0] === '#') {
                that.setContent($(that.url).html());
                return;
            }

            if (that.url) {
                that.showLoader();
                $.ajax({
                    url: that.url
                }).done(function (data) {
                    that.setContent(data);
                });
            }
        },

        setTitle: function (value) {
            this.title.html(value);
        },

        showLoader: function () {
            this.content.html('Loading...');
        },

        setContent: function (value) {
            this.content.html(value);
            this.fire('loaded');
        },

        on: function (eventName, callback) {
            this.eventHandlers[eventName] = callback;
            return this;
        },

        fire: function (eventName) {
            var fn = this.eventHandlers[eventName] || function () { };
            return fn();
        },

        onFirstOpen: function () {
            $('html').addClass('modal-on');
        },

        onLastClose: function () {
            $('html').removeClass('modal-on');
        }
    };

    window.Modal = Modal;

}());