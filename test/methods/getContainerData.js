(function () {

  'use strict';

  var image = window.createCropperCanvas();

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('methods.getContainerData', function (assert) {
        var data = cropper.getContainerData();

        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));
      });

    }
  });

})();
