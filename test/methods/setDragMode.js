$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  $image.cropper({
    built: function () {
      var $dragBox = $image.data('cropper').$dragBox;

      QUnit.test('methods.setDragMode', function (assert) {
        assert.equal($dragBox.get(0).getAttribute('data-drag'), 'crop');
      });

      QUnit.test('methods.setDragMode: move', function (assert) {
        $image.cropper('setDragMode', 'move');
        assert.equal($dragBox.get(0).getAttribute('data-drag'), 'move');
      });

      QUnit.test('methods.setDragMode: crop', function (assert) {
        $image.cropper('setDragMode', 'crop');
        assert.equal($dragBox.get(0).getAttribute('data-drag'), 'crop');
      });

    }
  });

});
