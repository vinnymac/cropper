$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    built: function () {
      var canvasData,
          cropBoxData;

      QUnit.test('options.strict: true', function (assert) {
        cropper.zoom(-0.5); // Zoom out
        canvasData = cropper.getCanvasData();
        cropBoxData = cropper.getCropBoxData();
        assert.equal(Math.round(canvasData.width), Math.round(cropBoxData.width));
        assert.equal(Math.round(canvasData.height), Math.round(cropBoxData.height));
        assert.equal(Math.round(canvasData.left), Math.round(cropBoxData.left));
        assert.equal(Math.round(canvasData.top), Math.round(cropBoxData.top));
      });

    }
  });

  (function () {
    var $image = window.createCropperImage();

    var cropper = new window.Cropper($image, {
      strict: false,

      built: function () {
        var canvasData = {
              left: 100,
              top: 100,
              width: 160,
              height: 90
            };

        QUnit.test('options.strict: false', function (assert) {
          cropper.setCanvasData(canvasData);
          assert.deepEqual(cropper.getCanvasData(), canvasData);
        });

      }
    });
  })();

});
