$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    autoCrop: false,

    built: function () {

      QUnit.test('methods.crop', function (assert) {
        cropper.crop();
        assert.ok(cropper.cropped);
        assert.ok(cropper.$cropBox.offsetWidth > 0 && cropper.$cropBox.offsetHeight > 0);
      });

    }
  });

});
