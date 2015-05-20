$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  $image.cropper({
    autoCrop: false,

    built: function () {
      var cropper = $image.data('cropper');

      QUnit.test('methods.crop', function (assert) {
        $image.cropper('crop');
        assert.ok(cropper.cropped);
        assert.ok(cropper.$cropBox.offsetWidth > 0 && cropper.$cropBox.offsetHeight > 0);
      });

    }
  });

});
