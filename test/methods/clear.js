$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    built: function () {

      QUnit.test('methods.clear', function (assert) {
        cropper.clear();
        assert.ok(!cropper.cropped);
        assert.ok(!(cropper.$cropBox.offsetWidth > 0 && cropper.$cropBox.offsetHeight > 0));
        assert.deepEqual(cropper.getCropBoxData(), {});
      });

    }
  });

  return cropper;

});
