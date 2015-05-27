$(function () {

  'use strict';

  var $image = window.createCropperCanvas(),
      isNumber = function (n) {
        return typeof n === 'number' && !isNaN(n);
      };

  var cropper = new window.Cropper($image, {
    built: function () {

      QUnit.test('methods.getContainerData', function (assert) {
        var data = cropper.getContainerData();

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));
      });

    }
  });

});
