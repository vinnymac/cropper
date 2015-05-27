$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    crop: function (data) {

      QUnit.test('options.crop', function (assert) {
        assert.ok($.isPlainObject(data));
        assert.ok(typeof data.x === 'number');
        assert.ok(typeof data.y === 'number');
        assert.ok(typeof data.width === 'number');
        assert.ok(typeof data.height === 'number');
      });

    }
  });

  return cropper;

});
