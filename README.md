# Modal Box for Apps

Modal window (aka lightbox) manager. Supports multipple styles in a single app. Multiple modal popups can be opened at the same time.

## API

* `$.openModal(options)`: Opens modal popup based on provided options.
* `$(selector).openModal(options)`: Read options from HTML element and merges them wiht provided option before opening modal popup.
    * Opens modal popup.
    * `options`: An object literal which defines the settings for modal popup.
        * `title`: popup title.
        * `content`: popup content.
        * `url`: content URL. Content will be loaded via AJAX get method.
        * `width`: number - popup container width in pixels.
        * `height`: number - content container height.
        * `onLoad`: `function (instance) {}` callback function fired after content has been loaded into content container.
        * `onClose`: `function (instance) {}` callback function fired before closing the popup. Return `false` to prevent closing popup.
        * `closeOnEscape`: boolean - indicates whether to close popup when escape is pressed. Default value: `true`.
        * `closeOnClick`: boolean - indicates whether to cloase popup when clicked on overlay. Default value: `true`.
        * `className`: modal container class name. Default value: empty string.
        * `loader`: content to be displayed while content is being loaded. Default value: `<div class="modal-loader">Loading...</div>`.
        * `htmlClass`: class name to be added to HTML element when first modal opens. Class removed when last popup closes. Default value: `modal-on`.
        * `templateId`: custom template container ID.


## Usage

Html setup:

    <a href="/expense-report.html" 
       class="demo" 
       title="Expense Report" 
       data-modal="{ width: 500, closeOnEscape: false }">
        View Expense Report
    </a>

Open modal by reading options from the link:

    // These two expressions bellow are identical:

    $('.demo').openModal();
    
    $.openModal({
        url: '/expense-report.html',
        title: 'Expense Report',
        width: 500,
        closeOnEscape: false
    });

## Modal Template

Default modal template:

    <div class="modal-context">
      <div class="modal-container" data-modal-control="container">
        <div class="modal-title" data-modal-control="title"></div>
        <div class="modal-close" data-modal-control="close"></div>
        <div class="modal-content" data-modal-control="content"></div>
      </div>
    </div>

You may define your own template and pass it as a parameter:

    <script type="text/html" id="modal-template">
        <div class="modal-context">
          <div class="modal-container" data-modal-control="container">
            <div class="modal-title" data-modal-control="title"></div>
            <div class="modal-close" data-modal-control="close"></div>
            <div class="modal-content" data-modal-control="content"></div>
          </div>
        </div>
    </script>

Then specify template ID when initializing popup:

    $('.demo').openModal({ templateId: 'modal-template' });
