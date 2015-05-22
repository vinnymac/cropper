$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  $.each($image.get(), function (i, element) {
    element.addEventListener('dragstart.cropper', function (e) {

      QUnit.test('methods.dragstart', function (assert) {
        var type = e.type.split('.');
        assert.equal(type[0], 'dragstart');
        assert.equal(type[1], 'cropper');
      });

    });
  });

  $image.cropper({
    built: function () {
      var $dragBox = $image.data('cropper').$dragBox;

      // Triggers events manually when built
      var mouseDown = document.createEvent('MouseEvents');
      mouseDown.initEvent('mousedown', true, true);
      $dragBox.dispatchEvent(mouseDown);

      var mouseUp = document.createEvent('MouseEvents');
      mouseUp.initEvent('mouseup', true, true);
      $dragBox.dispatchEvent(mouseUp);
    },

    dragstart: function (e) {

      QUnit.test('options.dragstart', function (assert) {
        var type = e.type.split('.');
        assert.equal(type[0], 'dragstart');
        assert.equal(type[1], 'cropper');
      });

    }
  });

});
