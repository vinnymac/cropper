$(function () {

  'use strict';

  var $image = window.createCropperImage();

  $($image).one('zoomout.cropper', function (e) {

    QUnit.test('methods.zoomout', function (assert) {
      assert.ok(e.type === 'zoomout' && e.namespace === 'cropper');
    });

  });

  var cropper = new window.Cropper($image, {
    zoomout: function (e) {

      QUnit.test('options.zoomout', function (assert) {
        assert.ok(e.type === 'zoomout' && e.namespace === 'cropper');
      });

    }
  });

  return cropper;

});
