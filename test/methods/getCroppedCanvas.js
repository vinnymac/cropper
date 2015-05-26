$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    strict: false,

    built: function () {

      QUnit.test('methods.getCroppedCanvas', function (assert) {
        var canvas = cropper.getCroppedCanvas();

        assert.ok(canvas instanceof HTMLCanvasElement);
      });

      QUnit.test('methods.getCroppedCanvas: resize', function (assert) {
        var canvas = cropper.getCroppedCanvas({
              width: 160,
              height: 90
            });

        assert.equal(canvas.width, 160);
        assert.equal(canvas.height, 90);
      });

      QUnit.test('methods.getCroppedCanvas: fillColor', function (assert) {
        cropper.rotate(90);
        var canvas = cropper.getCroppedCanvas({
              fillColor: '#010101'
            }),
            pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;

        assert.strictEqual(pixelData[0], 1, 'red is 1');
        assert.strictEqual(pixelData[1], 1, 'green is 1');
        assert.strictEqual(pixelData[2], 1, 'blue is 1');
        assert.strictEqual(pixelData[3], 255, 'color is opaque');

      });

    }
  });

});
