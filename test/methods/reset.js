(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    strict: false,

    built: function () {
      var canvasData = cropper.getCanvasData(),
          cropBoxData = cropper.getCropBoxData();

      QUnit.test('methods.reset', function (assert) {
        cropper.setCanvasData({
          top: canvasData.top + 10,
          width: canvasData.width - 10
        });

        assert.notDeepEqual(cropper.getCanvasData(), canvasData);

        cropper.setCropBoxData({
          left: cropBoxData.left + 10,
          height: cropBoxData.height - 10
        });

        assert.notDeepEqual(cropper.getCropBoxData(), cropBoxData);

        cropper.reset();
        assert.deepEqual(cropper.getCanvasData(), canvasData);
        assert.deepEqual(cropper.getCropBoxData(), cropBoxData);
      });

    }
  });

})();
