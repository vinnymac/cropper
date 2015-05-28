(function () {

  'use strict';

  var image = window.createCropperImage();

  QUnit.test('methods.destroy: before built', function (assert) {
    assert.ok(!image.classList.contains('cropper-hidden'));

    var cropper = new window.Cropper(image);
    assert.ok(!image.classList.contains('cropper-hidden'));
    assert.ok(typeof cropper === 'object');

    cropper.destroy();
    cropper = null;
    assert.ok(!image.classList.contains('cropper-hidden'));
    assert.ok(cropper === null);

    QUnit.test('methods.destroy: after built', function (assert) {
      var done = assert.async();

      var cropper = new window.Cropper(image, {
        built: function () {
          assert.ok(image.classList.contains('cropper-hidden'));
          assert.ok(typeof cropper === 'object');

          cropper.destroy();
          cropper = null;
          assert.ok(!image.classList.contains('cropper-hidden'));
          assert.ok(cropper === null);
          done();
        }
      });
    });
  });

})();
