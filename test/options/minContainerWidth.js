$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      minContainerWidth = 641;

  var cropper = new window.Cropper($image, {
    minContainerWidth: minContainerWidth,

    built: function () {
      var container = cropper.container;

      QUnit.test('options.minContainerWidth', function (assert) {
        assert.ok(Math.round(container.width) === minContainerWidth);
      });

    }
  });

});
