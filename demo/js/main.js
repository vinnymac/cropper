$(function () {

  'use strict';

  var console = window.console || { log: function () {} },
      $alert = $('.docs-alert'),
      $message = $alert.find('.message'),
      showMessage = function (message, type) {
        $message.text(message);

        if (type) {
          $message.addClass(type);
        }

        $alert.fadeIn();

        setTimeout(function () {
          $alert.fadeOut();
        }, 3000);
      };

  // Demo
  // -------------------------------------------------------------------------

  (function () {
    var $image = $('.img-container > img'),
        $dataX = $('#dataX'),
        $dataY = $('#dataY'),
        $dataHeight = $('#dataHeight'),
        $dataWidth = $('#dataWidth'),
        $dataRotate = $('#dataRotate'),
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
            $dataX.val(Math.round(data.x));
            $dataY.val(Math.round(data.y));
            $dataHeight.val(Math.round(data.height));
            $dataWidth.val(Math.round(data.width));
            $dataRotate.val(Math.round(data.rotate));
          }
        };

    $image.get().forEach(function (element) {
      element.addEventListener('build.cropper', function (e) {
        console.log(e.type.split('.')[0]);
      });
      element.addEventListener('built.cropper', function (e) {
        console.log(e.type.split('.')[0]);
      });
      element.addEventListener('dragstart.cropper', function (e) {
        console.log(e.type.split('.')[0], e.detail.dragType);
      });
      element.addEventListener('dragmove.cropper', function (e) {
        console.log(e.type.split('.')[0], e.detail.dragType);
      });
      element.addEventListener('dragend.cropper', function (e) {
        console.log(e.type.split('.')[0], e.detail.dragType);
      });
      element.addEventListener('zoomin.cropper', function (e) {
        console.log(e.type.split('.')[0]);
      });
      element.addEventListener('zoomout.cropper', function (e) {
        console.log(e.type.split('.')[0]);
      });
    });

    var cropper = new window.Cropper($image.get(0), options);

    // Methods
    $(document.body).on('click', '[data-method]', function () {
      var data = $(this).data(),
          $target,
          result;

      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = cropper[data.method](data.option);

        if (data.method === 'getCroppedCanvas') {
          $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
        }

        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    }).on('keydown', function (e) {

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
            $image.one('built.cropper', function () {
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
      $inputImage.parent().remove();
    }


    // Options
    $('.docs-options :checkbox').on('change', function () {
      var $this = $(this);

      options[$this.val()] = $this.prop('checked');
      cropper.destroy();
      cropper = new window.Cropper($image.get(0), options);
    });


    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

  }());

});
