(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    background: false,

    built: function () {

      QUnit.test('options.background', function (assert) {
        assert.ok(!cropper.$cropper.classList.contains('cropper-bg'));
      });

    }
  });

})();
