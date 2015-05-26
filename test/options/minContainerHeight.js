$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      minContainerHeight = 361;

  var cropper = new window.Cropper($image, {
    minContainerHeight: minContainerHeight,

    built: function () {
      var container = cropper.container;

      QUnit.test('options.minContainerHeight', function (assert) {
        assert.ok(Math.round(container.height) === minContainerHeight);
      });

    }
  });

});
