$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      minCanvasHeight = 90;

  var cropper = new window.Cropper($image, {
    strict: false,
    minCanvasHeight: minCanvasHeight,

    built: function () {

      QUnit.test('options.minCanvasHeight', function (assert) {

        cropper.setCanvasData({
          height: 45
        });

        var data = cropper.getCanvasData();

        assert.ok(Math.round(data.height) === minCanvasHeight);
      });

    }
  });

});
