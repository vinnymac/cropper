$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    guides: false,

    built: function () {

      QUnit.test('options.guides', function (assert) {
        assert.ok($(cropper.$cropper).find('.cropper-dashed').hasClass('cropper-hidden'));
      });

    }
  });

});
