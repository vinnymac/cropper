$(function () {

  'use strict';

  var $image = $(window.createCropperImage());

  $image.cropper({
    built: function () {
      var cropper = $image.data('cropper');

      QUnit.test('methods.clear', function (assert) {
        $image.cropper('clear');
        assert.ok(!cropper.cropped);
        assert.ok(!(cropper.$cropBox.offsetWidth > 0 && cropper.$cropBox.offsetHeight > 0));
        assert.deepEqual($image.cropper('getCropBoxData'), {});
      });

    }
  });

});
