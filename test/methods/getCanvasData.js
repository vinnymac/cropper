(function () {

  'use strict';

  var image = window.createCropperCanvas();

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('methods.getCanvasData', function (assert) {
        var data = cropper.getCanvasData();

        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.aspectRatio));
        assert.ok(window.isNumber(data.left));
        assert.ok(window.isNumber(data.top));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));
      });

    }
  });

})();
