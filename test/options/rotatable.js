(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    rotatable: false,

    built: function () {

      QUnit.test('options.rotatable', function (assert) {
        cropper.rotate(15);

        assert.equal(cropper.image.rotate, 0);
      });

    }
  });

})();
