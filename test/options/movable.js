(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    movable: false,

    built: function () {
      var canvas = cropper.canvas,
          _left = canvas.left,
          _top = canvas.top;

      QUnit.test('options.movable', function (assert) {
        cropper.move(10, 10);
        assert.equal(canvas.left, _left);
        assert.equal(canvas.top, _top);
      });
    }
  });

})();
