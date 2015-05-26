(function () {

  'use strict';

  var image = window.createCropperImage();

  image.addEventListener('built.cropper', function y(e) {
    image.removeEventListener(e.type, y);

    QUnit.test('methods.replace', function (assert) {
      var done = assert.async();

      image.addEventListener('built.cropper', function y(e) {
        image.removeEventListener(e.type, y);
        assert.ok(true);
        done();
      });

      cropper.replace('../assets/img/picture-2.jpg');

    });

  });

  var cropper = new window.Cropper(image);

  return cropper;

})();
