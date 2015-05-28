(function () {

  'use strict';

  var image = window.createCropperImage(),
      minCanvasWidth = 160;

  var cropper = new window.Cropper(image, {
    strict: false,
    minCanvasWidth: minCanvasWidth,

    built: function () {

      QUnit.test('options.minCanvasWidth', function (assert) {
        cropper.setCanvasData({
          width: 80
        });

        var data = cropper.getCanvasData();

        assert.ok(Math.round(data.width) === minCanvasWidth);
      });

    }
  });

})();
