$(function () {

  'use strict';

  var $image = window.createCropperImage(),
      pageX = window.innerWidth / 2,
      pageY = window.innerHeight / 2;

  var cropper = new window.Cropper($image, {
    touchDragZoom: false,

    built: function () {
      var _ratio = cropper.image.ratio;

      QUnit.test('options.touchDragZoom', function (assert) {
        $(cropper.$cropper).trigger($.Event('touchstart', {
          originalEvent: {
            touches: [
              {
                pageX: pageX,
                pageY: pageY
              },
              {
                pageX: pageX,
                pageY: pageY
              }
            ]
          }
        })).trigger($.Event('touchmove', {
          originalEvent: {
            touches: [
              {
                pageX: pageX - 10,
                pageY: pageY - 10
              },
              {
                pageX: pageX + 10,
                pageY: pageY + 10
              }
            ]
          }
        })).trigger('touchend');

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

});
