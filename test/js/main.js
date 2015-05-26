(function () {

  'use strict';

  window.isPlainObject = function (obj) {
    var type = typeof obj;
    var isObject = type === 'function' || type === 'object' && !!obj;
    return isObject && obj.constructor === Object;
  };

  window.isNumber = function (n) {
    return typeof n === 'number' && !isNaN(n);
  };

  window.createCropperImage = function (attr) {
    var image = new Image();

    if (!window.isPlainObject(attr)) {
      attr = {};
    }

    if (!attr.src) {
      attr.src = '../assets/img/picture.jpg';
    }

    var container = document.createElement('div');
    container.className = 'container';
    container.appendChild(image);
    for (var attribute in attr) {
      if (attr.hasOwnProperty(attribute)) {
        image.setAttribute(attribute, attr[attribute]);
      }
    }
    document.body.appendChild(container);

    return image;
  };

})();
