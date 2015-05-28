(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {
      var _data = cropper.getData();

      QUnit.test('methods.setData', function (assert) {
        cropper.setData({
          x: 16,
          height: 120
        });

        var data = cropper.getData();

        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.x));
        assert.ok(window.isNumber(data.y));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));

        assert.notEqual(data.x, _data.x);
        assert.equal(data.y, _data.y);
        assert.equal(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

      QUnit.test('methods.setData: move', function (assert) {
        cropper.reset();

        cropper.setData({
          x: 16,
          y: 9
        });

        var data = cropper.getData();

        assert.notEqual(data.x, _data.x);
        assert.notEqual(data.y, _data.y);
        assert.equal(data.width, _data.width);
        assert.equal(data.height, _data.height);
      });


      QUnit.test('methods.setData: resize', function (assert) {
        cropper.reset();

        cropper.setData({
          width: 320,
          height: 180
        });

        var data = cropper.getData();

        assert.equal(data.x, _data.x);
        assert.equal(data.y, _data.y);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

    }
  });

})();
