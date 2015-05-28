(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {
      var _data = cropper.getCropBoxData();

      QUnit.test('methods.setCropBoxData', function (assert) {
        cropper.setCropBoxData({
          left: 16,
          height: 120
        });

        var data = cropper.getCropBoxData();

        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.left));
        assert.ok(window.isNumber(data.top));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));

        assert.notEqual(data.left, _data.left);
        assert.equal(data.top, _data.top);
        assert.equal(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

      QUnit.test('methods.setCropBoxData: move', function (assert) {
        cropper.reset();
        cropper.setCropBoxData({
          left: 16,
          top: 9
        });

        var data = cropper.getCropBoxData();

        assert.notEqual(data.left, _data.left);
        assert.notEqual(data.top, _data.top);
        assert.equal(data.width, _data.width);
        assert.equal(data.height, _data.height);
      });


      QUnit.test('methods.setCropBoxData: resize', function (assert) {
        cropper.reset();
        cropper.setCropBoxData({
          width: 320,
          height: 180
        });

        var data = cropper.getCropBoxData();

        assert.equal(data.left, _data.left);
        assert.equal(data.top, _data.top);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

    }
  });

})();
