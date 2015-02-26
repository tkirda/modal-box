/*jslint evil: true*/
/*global jQuery, window, modal, console, Modal, confirm, alert */

jQuery(function ($) {
    'use strict';

    var counter = 0,
        setupConfirmation = function (confirmation, instance) {
            $('button', confirmation.context).on('click', function () {
                var shouldClose = $(this).text() === 'Yes';
                confirmation.close(true);
                if (shouldClose) {
                    instance.close(true);
                }
            });
        };

    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();
        counter += 1;

        $(this).openModal({
            title: 'Window #' + counter,
            htmlClass: 'modal-on',
            onLoad: function () {
                var instance = this;
                console.log('Log: Content loaded for ' + instance.title());
            },
            onClose: function () {
                var instance = this;
                $.openModal({
                    title: 'Close widnow?',
                    content: '<button>Yes</button> <button>No</button>',
                    onLoad: function () {
                        var confirmation = this;
                        $('button:first', confirmation.context).focus();
                        setupConfirmation(confirmation, instance);
                    }
                });
                return false;
            }
        });
    });

});