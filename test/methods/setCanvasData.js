$(function () {

  'use strict';

  var $image = $(window.createCropperImage()),
      isNumber = function (n) {
        return typeof n === 'number' && !isNaN(n);
      };

  var cropper = new window.Cropper($image.get(0), {
    built: function () {
      var _data = cropper.getImageData();

      QUnit.test('methods.setCanvasData', function (assert) {
        cropper.setCanvasData({
          left: 16,
          height: 120
        });

        var data = cropper.getCanvasData();

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.notEqual(data.left, _data.left);
        assert.equal(data.top, _data.top);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

      QUnit.test('methods.setCanvasData: move', function (assert) {
        cropper.reset();

        cropper.setCanvasData({
          left: 16,
          top: 9
        });

        var data = cropper.getCanvasData();

        assert.notEqual(data.left, _data.left);
        assert.notEqual(data.top, _data.top);
        assert.equal(data.width, _data.width);
        assert.equal(data.height, _data.height);
      });


      QUnit.test('methods.setCanvasData: resize', function (assert) {
        cropper.reset();

        cropper.setCanvasData({
          width: 320,
          height: 180
        });

        var data = cropper.getCanvasData();

        assert.equal(data.left, _data.left);
        assert.equal(data.top, _data.top);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

    }
  });

});
