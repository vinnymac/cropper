(function () {

  'use strict';

  var image = window.createCropperImage();

  image.addEventListener('change.cropper', function (e) {
    var type = e.type.split('.');
    QUnit.test('methods.change', function (assert) {
      assert.equal(type[0], 'change');
      assert.equal(type[1], 'cropper');
    });
  });

  var cropper = new window.Cropper(image, {
    built: function () {
      var dragBox = cropper.$dragBox;

      // Triggers events manually when built
      var mouseDown = document.createEvent('MouseEvents');
      mouseDown.initEvent('mousedown', true, true);
      dragBox.dispatchEvent(mouseDown);

      var mouseMove = document.createEvent('MouseEvents');
      mouseMove.initEvent('mousemove', true, true);
      dragBox.dispatchEvent(mouseMove);

      var mouseUp = document.createEvent('MouseEvents');
      mouseUp.initEvent('mouseup', true, true);
      dragBox.dispatchEvent(mouseUp);
    },

    change: function (e) {
      var type = e.type.split('.');
      QUnit.test('options.change', function (assert) {
        assert.equal(type[0], 'change');
        assert.equal(type[1], 'cropper');
      });

    }
  });

})();
