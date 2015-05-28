(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    mouseWheelZoom: false,

    built: function () {
      var _ratio = cropper.image.ratio;

      QUnit.test('options.mouseWheelZoom', function (assert) {
        var event = document.createEvent('CustomEvent');
        var data = {
          originalEvent: {
            wheelDelta: -120
          }
        };
        event.initCustomEvent('wheel', true, true, data);
        cropper.$cropper.dispatchEvent(event);

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

})();
