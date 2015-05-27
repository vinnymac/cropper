$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    modal: false,

    built: function () {

      QUnit.test('options.modal', function (assert) {
        assert.ok(!cropper.$canvas.classList.contains('cropper-modal'));
      });

    }
  });

});
