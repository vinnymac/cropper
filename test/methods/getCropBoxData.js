$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      isNumber = function (n) {
        return typeof n === 'number' && !isNaN(n);
      };

  var cropper = new window.Cropper($image, {
    built: function () {

      QUnit.test('methods.getCropBoxData', function (assert) {
        var data = cropper.getCropBoxData();

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));
      });

    }
  });

});
