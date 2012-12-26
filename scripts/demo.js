$(function (){

    $(document).on('click', '.modal-button', function (e){
        e.preventDefault();
        $(this).openModal();
    });

});