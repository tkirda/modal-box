/*jslint evil: true*/
/*global jQuery, window, modal, console, Modal */

jQuery(function ($) {
    'use strict';
    console.log('Init modal');

    $(document).on('click', '[data-modal]', function (e) {
        console.log('Open modal');
        e.preventDefault();
        var options = new Function('return ' + $(this).data('modal'))();
        console.log(options);
        //modal.open(options, this);

        new Modal(this);
    });
});