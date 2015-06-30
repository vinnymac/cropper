/*!
 * Cropper v@VERSION
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-@YEAR Fengyuan Chen and other contributors
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function (root, factory) {

  // Save the other cropper
  var previousCropper = root.Cropper;

  // No conflict
  factory.noConflict = function () {
    root.Cropper = previousCropper;
    return this;
  };

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    module.exports = factory();
  } else {
    // Browser globals.
    root.Cropper = factory();
  }

}(this, function () {

  'use strict';
