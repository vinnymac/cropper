(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    guides: false,

    built: function () {

      QUnit.test('options.guides', function (assert) {
        assert.ok(cropper.$cropper.querySelectorAll('.cropper-dashed')[0].classList.contains('cropper-hidden'));
      });

    }
  });

})();
