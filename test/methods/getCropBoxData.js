(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('methods.getCropBoxData', function (assert) {
        var data = cropper.getCropBoxData();

        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.left));
        assert.ok(window.isNumber(data.top));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));
      });

    }
  });

})();
