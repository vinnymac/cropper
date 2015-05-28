(function () {

  'use strict';

  var image = window.createCropperImage(),
      pageX = window.innerWidth / 2,
      pageY = window.innerHeight / 2;

  var cropper = new window.Cropper(image, {
    touchDragZoom: false,

    built: function () {
      var _ratio = cropper.image.ratio;

      QUnit.test('options.touchDragZoom', function (assert) {

        var touchstart = document.createEvent('CustomEvent');
        var data = {
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
        };
        touchstart.initCustomEvent('touchstart', true, true, data);
        cropper.$cropper.dispatchEvent(touchstart);

        var touchmove = document.createEvent('CustomEvent');
        data = {
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
        };
        touchmove.initCustomEvent('touchmove', true, true, data);
        cropper.$cropper.dispatchEvent(touchmove);

        var touchend = document.createEvent('CustomEvent');
        touchend.initCustomEvent('touchend', true, true, {});
        cropper.$cropper.dispatchEvent(touchend);

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

})();
