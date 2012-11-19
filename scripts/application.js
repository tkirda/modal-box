/*jslint evil: true*/
/*global jQuery, window, modal, console, Modal, confirm, alert */

jQuery(function ($) {
    'use strict';

    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();
        var modal = new Modal(this);

        modal.on('beforeclose', function () {
            // If returned value is false, it will stay open:
            return confirm('Should I close this?');
        }).on('loaded', function () {
            alert('Modal window content just loaded');
        });
    });
});