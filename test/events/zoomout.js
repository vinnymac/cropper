(function () {

  'use strict';

  var image = window.createCropperImage();

  image.addEventListener('zoomout.cropper', function y(e) {
    image.removeEventListener(e.type, y);

    QUnit.test('methods.zoomout', function (assert) {
      assert.ok(e.type === 'zoomout' && e.namespace === 'cropper');
    });

  });

  var cropper = new window.Cropper(image, {
    zoomout: function (e) {

      QUnit.test('options.zoomout', function (assert) {
        assert.ok(e.type === 'zoomout' && e.namespace === 'cropper');
      });

    }
  });

  return cropper;

})();
