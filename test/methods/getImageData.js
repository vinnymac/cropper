(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('methods.getImageData', function (assert) {
        var data = cropper.getImageData();

        // Not rotate
        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.naturalWidth));
        assert.ok(window.isNumber(data.naturalHeight));
        assert.ok(window.isNumber(data.aspectRatio));
        assert.ok(window.isNumber(data.left));
        assert.ok(window.isNumber(data.top));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));
        assert.ok(window.isNumber(data.rotate));
      });

    }
  });

})();
