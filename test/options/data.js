$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      _data = {
        x: 360,
        y: 450,
        width: 640,
        height: 360,
        rotate: 45
      };

  var cropper = new window.Cropper($image, {
    data: _data,

    built: function () {
      var data = cropper.getData();

      QUnit.test('options.data', function (assert) {
        assert.equal(Math.round(data.x), _data.x);
        assert.equal(Math.round(data.y), _data.y);
        assert.equal(Math.round(data.width), _data.width);
        assert.equal(Math.round(data.height), _data.height);
        assert.equal(Math.round(data.rotate), _data.rotate);
      });

    }
  });

});
