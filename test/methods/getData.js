(function () {

  'use strict';

  var image = window.createCropperImage();

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('methods.getData', function (assert) {
        var data = cropper.getData();

        assert.ok(window.isPlainObject(data));
        assert.ok(window.isNumber(data.x));
        assert.ok(window.isNumber(data.y));
        assert.ok(window.isNumber(data.width));
        assert.ok(window.isNumber(data.height));
      });

    }
  });

})();
