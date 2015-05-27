$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      isNumber = function (n) {
        return typeof n === 'number' && !isNaN(n);
      };

  var cropper = new window.Cropper($image, {
    built: function () {

      QUnit.test('methods.getData', function (assert) {
        var data = cropper.getData();

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.x));
        assert.ok(isNumber(data.y));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));
      });

    }
  });

});
