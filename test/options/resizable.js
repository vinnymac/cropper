$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    resizable: false,

    built: function () {

      QUnit.test('options.resizable', function (assert) {
        assert.ok($(cropper.$cropper).find('.cropper-line, .cropper-point').hasClass('cropper-hidden'));
      });

    }
  });

});
