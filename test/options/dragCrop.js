$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    dragCrop: false,

    built: function () {

      QUnit.test('options.dragCrop', function (assert) {
        assert.notEqual(cropper.$canvas.getAttribute('directive'), 'crop');
      });

    }
  });

});
