(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    cropBoxResizable: false,

    built: function () {

      QUnit.test('options.cropBoxResizable', function (assert) {
        assert.ok(cropper.$cropper.querySelectorAll('.cropper-line, .cropper-point')[0].classList.contains('cropper-hidden'));
      });

    }
  });

})();
