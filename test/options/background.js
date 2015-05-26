$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  var cropper = new window.Cropper($image.get(0), {
    background: false,

    built: function () {

      QUnit.test('options.background', function (assert) {
        assert.ok(!$(cropper.$cropper).hasClass('cropper-bg'));
      });

    }
  });

});
