(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {
      var options = cropper.options;

      QUnit.test('methods.setAspectRatio', function (assert) {
        var ratios = [0, 1 / 2, 1, 'auto', true, null, { a:1 }, ['auto', 2, 3], [1, 2, 3]];

        [].forEach.call(ratios, function (ratio, i) {

          cropper.setAspectRatio(ratio);

          switch (i) {
            case 0:
              assert.ok(isNaN(options.aspectRatio)); // 0 -> NaN
              break;

            case 1:
              assert.equal(options.aspectRatio, 1 / 2);
              break;

            case 2:
              assert.equal(options.aspectRatio, 1);
              break;

            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
              assert.ok(isNaN(options.aspectRatio)); // String/Boolean/Object -> NaN
              break;

            case 8:
              assert.equal(options.aspectRatio, 1);
              break;
          }

        });
      });

    }
  });

})();
