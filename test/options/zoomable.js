(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    zoomable: false,

    built: function () {
      var _ratio = cropper.image.ratio;

      QUnit.test('options.zoomable', function (assert) {
        cropper.zoom(1);

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

})();
