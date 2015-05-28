(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    minCropBoxHeight: 150,

    built: function () {

      QUnit.test('options.minCropBoxHeight', function (assert) {
        cropper.setCropBoxData({
          height: 100
        });

        var data = cropper.getCropBoxData();

        assert.ok(Math.round(data.height) === 150);
      });

    }
  });

})();
