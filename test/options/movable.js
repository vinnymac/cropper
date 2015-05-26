(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    movable: false,

    built: function () {
      var cropBox = cropper.cropBox,
          _left = cropBox.left,
          _top = cropBox.top;

      QUnit.test('methods.move', function (assert) {

        cropper.move(10, 10);

        assert.equal(cropBox.left, _left);
        assert.equal(cropBox.top, _top);
      });

      QUnit.test('options.movable', function (assert) {
        assert.notEqual(cropper.$cropper.querySelectorAll('.cropper-face')[0].getAttribute('directive'), 'all');
      });

    }
  });

})();
