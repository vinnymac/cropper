$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    highlight: false,

    built: function () {

      QUnit.test('options.highlight', function (assert) {
        assert.ok($(cropper.$cropper).find('.cropper-face').hasClass('cropper-invisible'));
      });

    }
  });

});
