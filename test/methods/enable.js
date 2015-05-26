(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('methods.enable', function (assert) {
        cropper.disable();
        cropper.enable();
        assert.ok(!cropper.disabled);
        assert.ok(!cropper.$cropper.classList.contains('cropper-disabled'));
      });

    }
  });

})();
