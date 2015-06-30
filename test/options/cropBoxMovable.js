(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    cropBoxMovable: false,

    built: function () {
      QUnit.test('options.cropBoxMovable', function (assert) {
        assert.notEqual(cropper.$cropper.querySelectorAll('.cropper-face')[0].getAttribute('data-drag'), 'all');
      });

    }
  });

})();
