$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  var cropper = new window.Cropper($image.get(0), {
    autoCrop: false,

    crop: function () {
      QUnit.test('options.autoCrop', function (assert) {
        assert.ok(false);
      });
    },

    built: function () {

      QUnit.test('options.autoCrop', function (assert) {
        assert.notEqual(cropper.cropped, true);
      });

    }
  });

});
