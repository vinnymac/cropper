$(function () {

  'use strict';

  var $image = window.createCropperImage();

  $($image).get().forEach(function (element) {
    element.addEventListener('dragmove.cropper', function (e) {

      QUnit.test('methods.dragmove', function (assert) {
        var type = e.type.split('.');
        assert.equal(type[0], 'dragmove');
        assert.equal(type[1], 'cropper');
      });

    });
  });

  var cropper = new window.Cropper($image, {
    built: function () {
      var $dragBox = cropper.$dragBox;

      // Triggers events manually when built

      var mouseDown = document.createEvent('MouseEvents');
      mouseDown.initEvent('mousedown', true, true);
      $dragBox.dispatchEvent(mouseDown);

      var mouseUp = document.createEvent('MouseEvents');
      mouseUp.initEvent('mouseup', true, true);
      $dragBox.dispatchEvent(mouseUp);

      var mouseMove = document.createEvent('MouseEvents');
      mouseMove.initEvent('mousemove', true, true);
      $dragBox.dispatchEvent(mouseMove);
    },

    dragmove: function (e) {

      QUnit.test('options.dragmove', function (assert) {
        assert.equal(e.type, 'dragmove');
        assert.equal(e.namespace, 'cropper');
      });

    }
  });

  return cropper;

});
