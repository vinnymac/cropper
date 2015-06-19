$(function () {

  'use strict';

  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  function toArray(obj, offset) {
    var args = [];

    if (isNumber(offset)) { // It's necessary for IE8
      args.push(offset);
    }

    return args.slice.apply(obj, args);
  }

  var console = window.console || { log: function () {} },
      alert = document.querySelector('.docs-alert'),
      messageEl = alert.querySelector('.message'),
      showMessage = function (message, type) {
        messageEl.textContent = message;

        if (type) {
          addClass(messageEl, type);
        }

        alert.style.display = 'block';
        alert.style.opacity = 100;

        setTimeout(function () {
          alert.style.display = 'none';
          alert.style.opacity = -0.1;
        }, 3000);
      };

  // Demo
  // -------------------------------------------------------------------------

  (function () {
    var image      = document.querySelector('.img-container > img'),
        dataX      = document.querySelector('#dataX'),
        dataY      = document.querySelector('#dataY'),
        dataHeight = document.querySelector('#dataHeight'),
        dataWidth  = document.querySelector('#dataWidth'),
        dataRotate = document.querySelector('#dataRotate'),
        options = {
          // data: {
          //   x: 420,
          //   y: 60,
          //   width: 640,
          //   height: 360
          // },
          // strict: false,
          // responsive: false,
          // checkImageOrigin: false

          // modal: false,
          // guides: false,
          // highlight: false,
          // background: false,

          // autoCrop: false,
          // autoCropArea: 0.5,
          // dragCrop: false,
          // movable: false,
          // resizable: false,
          // rotatable: false,
          // zoomable: false,
          // touchDragZoom: false,
          // mouseWheelZoom: false,

          // minCanvasWidth: 320,
          // minCanvasHeight: 180,
          // minCropBoxWidth: 160,
          // minCropBoxHeight: 90,
          // minContainerWidth: 320,
          // minContainerHeight: 180,

          // build: null,
          // built: null,
          // dragstart: null,
          // dragmove: null,
          // dragend: null,
          // zoomin: null,
          // zoomout: null,

          aspectRatio: 16 / 9,
          preview: '.img-preview',
          crop: function (data) {
            dataX.value      = Math.round(data.x);
            dataY.value      = Math.round(data.y);
            dataHeight.value = Math.round(data.height);
            dataWidth.value  = Math.round(data.width);
            dataRotate.value = Math.round(data.rotate);
          }
        };

    image.addEventListener('build.cropper', function (e) {
      console.log(e.type.split('.')[0]);
    });
    image.addEventListener('built.cropper', function (e) {
      console.log(e.type.split('.')[0]);
    });
    image.addEventListener('dragstart.cropper', function (e) {
      console.log(e.type.split('.')[0], e.detail.dragType);
    });
    image.addEventListener('dragmove.cropper', function (e) {
      console.log(e.type.split('.')[0], e.detail.dragType);
    });
    image.addEventListener('dragend.cropper', function (e) {
      console.log(e.type.split('.')[0], e.detail.dragType);
    });
    image.addEventListener('zoomin.cropper', function (e) {
      console.log(e.type.split('.')[0]);
    });
    image.addEventListener('zoomout.cropper', function (e) {
      console.log(e.type.split('.')[0]);
    });

    var cropper = new window.Cropper(image, options);

    // Methods
    toArray(document.querySelectorAll('[data-method]')).forEach(function (element) {
      element.addEventListener('click', function (e) {
        var option = e.currentTarget.getAttribute('data-option');
        try { option = JSON.parse(option); } catch (e) { }

        var target, result, data = {
          method : e.currentTarget.getAttribute('data-method'),
          option : option,
          target : e.currentTarget.getAttribute('data-target')
        };

        if (data.method) {
          data = $.extend({}, data); // Clone a new one

          if (!!data.target) {
            target = document.querySelector(data.target);

            if (!data.option && target.value) {
              try {
                data.option = JSON.parse(target.value);
              } catch (e) {
                console.log(e.message);
              }
            }
          }

          result = cropper[data.method](data.option);

          if (data.method === 'getCroppedCanvas') {
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
          }

          if ($.isPlainObject(result) && target) {
            try {
              target.value = JSON.stringify(result);
            } catch (e) {
              console.log(e.message);
            }
          }

        }
      });
    });

    $(document.body).on('keydown', function (e) {

      switch (e.which) {
        case 37:
          e.preventDefault();
          cropper.move(-1, 0);
          break;

        case 38:
          e.preventDefault();
          cropper.move(0, -1);
          break;

        case 39:
          e.preventDefault();
          cropper.move(1, 0);
          break;

        case 40:
          e.preventDefault();
          cropper.move(0, 1);
          break;
      }

    });


    // Import image
    var $inputImage = $('#inputImage'),
        URL = window.URL || window.webkitURL,
        blobURL;

    if (URL) {
      $inputImage.change(function () {
        var files = this.files,
            file;

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+$/.test(file.type)) {
            blobURL = URL.createObjectURL(file);
            image.addEventListener('built.cropper', function y(e) {
              e.target.removeEventListener(e.type, y);
              URL.revokeObjectURL(blobURL); // Revoke when load complete
            });
            cropper.reset();
            cropper.replace(blobURL);
            $inputImage.val('');
          } else {
            showMessage('Please choose an image file.');
          }
        }
      });
    } else {
      var inputImageEl = $inputImage.get(0);
      inputImageEl.parentNode.removeChild(inputImageEl);
    }


    // Options
    toArray(document.querySelectorAll('.docs-options input[type="checkbox"]')).forEach(function (element) {
      element.addEventListener('change', function () {
        options[this.value] = this.checked;
        cropper.destroy();
        cropper = new window.Cropper(image, options);
      });
    });

    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

  }());

});
