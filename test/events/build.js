$(function () {

  'use strict';

  var $image = window.createCropperImage();

  $image.addEventListener('build.cropper', function y(e) {
    $image.removeEventListener(e.type, y);

    QUnit.test('methods.build', function (assert) {
      var type = e.type.split('.');
      assert.ok(type[0] === 'build' && type[1] === 'cropper');
    });

    e.preventDefault();

    QUnit.test('methods.build: prevent default', function (assert) {
      assert.ok(e.defaultPrevented);
    });

  });

  $image.addEventListener('built.cropper', function y(e) {
    $image.removeEventListener(e.type, y);

    QUnit.test('methods.build: default prevented', function (assert) {
      assert.ok(e.type !== 'built');
    });

  });

  var cropper = new window.Cropper($image, {
    build: function (e) {

      QUnit.test('options.build', function (assert) {
        var type = e.type.split('.');
        assert.ok(type[0] === 'build' && type[1] === 'cropper');
      });

      e.preventDefault();

      QUnit.test('options.build: prevent default', function (assert) {
        assert.ok(e.defaultPrevented);
      });

    },

    built: function (e) {

      QUnit.test('options.build: default prevented', function (assert) {
        assert.ok(e.type !== 'built');
      });

    }
  });

  return cropper;

});
