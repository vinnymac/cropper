(function () {

  'use strict';

  var crossOriginImage = 'http://fengyuanchen.github.io/cropper/img/picture.jpg',
      image = window.createCropperImage({
        src: crossOriginImage
      }),
      image2 = window.createCropperImage({
        src: crossOriginImage,
        crossOrigin: 'anonymous'
      });

  var cropper = new window.Cropper(image, {
    built: function () {

      QUnit.test('options.checkImageOrigin', function (assert) {
        assert.ok(cropper.$clone.attr('crossOrigin') === 'anonymous');
        assert.ok(cropper.$clone.attr('src').indexOf('timestamp') !== -1);
      });

    }
  });

  var cropper2 = new window.Cropper(image2, {
    built: function () {

      QUnit.test('options.checkImageOrigin: exists crossOrigin attribute', function (assert) {
        assert.ok(cropper2.$clone.attr('crossOrigin') === 'anonymous');
        assert.ok(cropper2.$clone.attr('src').indexOf('timestamp') === -1);
      });

    }
  });

})();
