(function () {

  'use strict';

  var image = window.createCropperImage();

  image.addEventListener('zoomin.cropper', function y(e) {
    image.removeEventListener(e.type, y);

    QUnit.test('methods.zoomin', function (assert) {
      assert.ok(e.type === 'zoomin' && e.namespace === 'cropper');
    });

  });

  var cropper = new window.Cropper(image, {
    zoomin: function (e) {

      QUnit.test('options.zoomin', function (assert) {
        assert.ok(e.type === 'zoomin' && e.namespace === 'cropper');
      });

    }
  });

  return cropper;

})();
