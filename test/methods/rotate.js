$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  var cropper = new window.Cropper($image, {
    built: function () {
      var image = cropper.image;

      QUnit.test('methods.rotate', function (assert) {
        assert.ok(image.rotate === 0);
        cropper.rotate(360);
        assert.ok(image.rotate === 0);
        cropper.rotate(30);
        assert.ok(image.rotate === 30);
        cropper.rotate(-15);
        assert.ok(image.rotate === 15);
        cropper.rotate(-15);
        assert.ok(image.rotate === 0);
      });

    }
  });

});
