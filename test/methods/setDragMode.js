$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  var cropper = new window.Cropper($image.get(0), {
    built: function () {
      var $dragBox = cropper.$dragBox;

      QUnit.test('methods.setDragMode', function (assert) {
        assert.equal($dragBox.getAttribute('data-drag'), 'crop');
      });

      QUnit.test('methods.setDragMode: move', function (assert) {
        cropper.setDragMode('move');
        assert.equal($dragBox.getAttribute('data-drag'), 'move');
      });

      QUnit.test('methods.setDragMode: crop', function (assert) {
        cropper.setDragMode('crop');
        assert.equal($dragBox.getAttribute('data-drag'), 'crop');
      });

    }
  });

});
