$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    minCropBoxWidth: 300,

    built: function () {

      QUnit.test('options.minCropBoxWidth', function (assert) {
        cropper.setCropBoxData({
          width: 250
        });

        var data = cropper.getCropBoxData();

        assert.ok(Math.round(data.width) === 300);
      });

    }
  });

});
