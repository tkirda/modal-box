# Modal Box for Apps

Modal window (aka lightbox) manager. Supports multipple styles in a single app. Multiple modal popups can be opened at the same time.

## API

* `$.openModal(options)`: Opens modal popup based on provided options and returns modal instance.
* `$(selector).openModal(options)`: Reads options from HTML element and merges them with provided options before opening modal popup.
    * Opens modal popup.
    * `options`: An object literal which defines the settings for modal popup.
        * `title`: popup title.
        * `content`: popup content.
        * `url`: content URL. Content will be loaded via AJAX get method.
        * `width`: number - popup container width in pixels.
        * `height`: number - content container height.
        * `onLoad`: `function () {}` callback function fired after content has been loaded into content container.
        * `onClose`: `function () {}` callback function fired before closing the popup. Return `false` to prevent closing popup.
        * `closeOnEscape`: boolean - indicates whether to close popup when escape is pressed. Default value: `true`.
        * `closeOnClick`: boolean - indicates whether to close popup when clicked on overlay. Default value: `true`.
        * `className`: modal container class name. Default value: empty string.
        * `loader`: content to be displayed while content is being loaded. Default value: `<div class="modal-loader">Loading...</div>`.
        * `htmlClass`: class name to be added to HTML element when first modal opens. Class removed when last popup closes. Default value: `modal-on`.
        * `templateId`: custom template container ID.
        * `openEffect`: jQuery effect method used to open modal. Default value: `fadeIn`.
        * `openDuration`: jQuery openEffect duration. A string or number determining how long the animation will run. Default value: `100`.
        * `closeEffect`: jQuery effect method used to close modal. Default value: `fadeOut`.
        * `closeDuration`: jQuery closeEffect duration. A string or number determining how long the animation will run. Default value: `100`.
        * `autofocus`: indicates whether to focus first input field if any. Default value: `true`.
        * `keepPosition`: indicates if window's scroll bar should go back to the position when it was opened after last modal is closed. Default value: `true`.

In the callback `this` refers to modal instance.

## Usage

Html setup:

    <a href="/expense-report.html" 
       class="demo" 
       title="Expense Report" 
       data-modal="{ closeOnEscape: false }">
        View Expense Report
    </a>

Open modal by reading options from the link:

    // These two expressions bellow are identical:
    $('.demo').openModal();
    
    $.openModal({
        url: '/expense-report.html',
        title: 'Expense Report',
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

You can use any classes. Modal popup controls are defined by `data-modal-control` attribute as you see in samples above. Valid attribute values are:

* `container`: popup container element (required).
* `title`: popup title element (optional).
* `close`: popup close button (optional). Also, if popup content has elements that are 
   marked with this attribute value, clicking on those elements will trigger close event.
* `content`: popup content container (required).

Then specify template ID when initializing popup:

    $('.demo').openModal({ templateId: 'modal-template' });
