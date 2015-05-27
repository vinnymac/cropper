$(function () {

  'use strict';

  var $image = window.createCropperImage();

  $($image).get().forEach(function (element) {
    element.addEventListener('dragend.cropper', function (e) {

      QUnit.test('methods.dragend', function (assert) {
        var type = e.type.split('.');
        assert.equal(type[0], 'dragend');
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
    },

    dragend: function (e) {

      QUnit.test('options.dragend', function (assert) {
        var type = e.type.split('.');
        assert.equal(type[0], 'dragend');
        assert.equal(type[1], 'cropper');
      });

    }
  });

  return cropper;

});
