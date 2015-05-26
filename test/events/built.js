$(function () {

  'use strict';

  var $image = window.createCropperImage();

  $image.addEventListener('built.cropper', function y(e) {
    $image.removeEventListener(e.type, y);

    QUnit.test('methods.built', function (assert) {
      var type = e.type.split('.');
      assert.ok(type[0] === 'built' && type[1] === 'cropper');
    });

  });

  $($image).cropper({
    built: function (e) {

      QUnit.test('options.built', function (assert) {
        var type = e.type.split('.');
        assert.ok(type[0] === 'built' && type[1] === 'cropper');
      });

    }
  });

});
