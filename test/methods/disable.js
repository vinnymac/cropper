$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    built: function () {
      var options = cropper.options;

      cropper.disable();

      QUnit.test('methods.disable', function (assert) {
        assert.ok(cropper.disabled);
        assert.ok($(cropper.$cropper).hasClass('cropper-disabled'));
      });

      QUnit.test('methods.disable: setAspectRatio', function (assert) {
        cropper.setAspectRatio(1.618);
        assert.ok(isNaN(options.aspectRatio));
        assert.notEqual(options.aspectRatio, 1.618);
      });

      QUnit.test('methods.disable: move', function (assert) {
        var imageData = cropper.getImageData();

        cropper.move(10, 10);
        assert.deepEqual(cropper.getImageData(), imageData);
      });

      QUnit.test('methods.disable: zoom', function (assert) {
        var ratio = cropper.image.ratio;

        cropper.zoom(0.5);
        assert.equal(cropper.image.ratio, ratio);
      });

      QUnit.test('methods.disable: rotate', function (assert) {
        var rotate = cropper.image.rotate;

        cropper.rotate(15);
        assert.equal(cropper.image.rotate, rotate);
      });

      QUnit.test('methods.disable: setCanvasData', function (assert) {
        var imageData = cropper.getImageData();

        cropper.setCanvasData({
          width: imageData.width - 160
        });

        assert.deepEqual(cropper.getImageData(), imageData);
      });

      QUnit.test('methods.disable: setCropBoxData', function (assert) {
        var cropBoxData = cropper.getCropBoxData();

        cropper.setCropBoxData({
          height: cropBoxData.height - 90
        });

        assert.deepEqual(cropper.getCropBoxData(), cropBoxData);
      });

    }
  });

});
