$(function () {

  'use strict';

  var $image = window.createCropperImage();

  var cropper = new window.Cropper($image, {
    mouseWheelZoom: false,

    built: function () {
      var _ratio = cropper.image.ratio;

      QUnit.test('options.mouseWheelZoom', function (assert) {
        $(cropper.$cropper).trigger($.Event('wheel', {
          originalEvent: {
            wheelDelta: -120
          }
        }));

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

});
