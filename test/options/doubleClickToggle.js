(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    doubleClickToggle: false,

    built: function () {
      QUnit.test('options.doubleClickToggle', function (assert) {
        var dblClick = document.createEvent('MouseEvents');
        dblClick.initEvent('dblclick', true, true);
        cropper.$cropper.dispatchEvent(dblClick);
        assert.ok(cropper.$dragBox.classList.contains('cropper-crop'));
        assert.equal(cropper.$dragBox.getAttribute('data-drag'), 'crop');
      });

    }
  });

})();
