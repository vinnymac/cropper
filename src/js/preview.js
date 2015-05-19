  prototype.initPreview = function () {
    var url = this.url;

    this.$preview = $(this.options.preview);
    this.$viewBox.get(0).innerHTML = '<img src="' + url + '">';

    // Override img element styles
    // Add `display:block` to avoid margin top issue (Occur only when margin-top <= -height)
    this.$preview.get().forEach(function (element) {

      element.setAttribute(CROPPER_PREVIEW_WIDTH, element.offsetWidth);
      element.setAttribute(CROPPER_PREVIEW_HEIGHT, element.offsetHeight);
      element.setAttribute(CROPPER_PREVIEW_ORIGINAL, element.innerHTML);

      element.innerHTML = '<img src="' + url + '" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation: 0deg!important">';
    });
  };

  prototype.resetPreview = function () {
    this.$preview.get().forEach(function (element) {

      element.innerHTML = element.getAttribute(CROPPER_PREVIEW_ORIGINAL);
      element.removeAttribute(CROPPER_PREVIEW_ORIGINAL);
    });
  };

  prototype.preview = function () {
    var image = this.image,
        canvas = this.canvas,
        cropBox = this.cropBox,
        width = image.width,
        height = image.height,
        left = cropBox.left - canvas.left - image.left,
        top = cropBox.top - canvas.top - image.top,
        rotate = image.rotate;

    if (!this.cropped || this.disabled) {
      return;
    }

    var images = this.$viewBox.find('img');
    images.get().forEach(function (element) {
      assign(element.style, {
        width      : width + 'px',
        height     : height + 'px',
        marginLeft : -left + 'px',
        marginTop  : -top + 'px',
        transform  : getRotateValue(rotate)
      });
    });

    this.$preview.get().forEach(function (element) {
      var data = {
            width  : parseFloat(element.getAttribute(CROPPER_PREVIEW_WIDTH)),
            height : parseFloat(element.getAttribute(CROPPER_PREVIEW_HEIGHT))
          },
          ratio = data.width / cropBox.width,
          newWidth = data.width,
          newHeight = cropBox.height * ratio;

      if (newHeight > data.height) {
        ratio = data.height / cropBox.height;
        newWidth = cropBox.width * ratio;
        newHeight = data.height;
      }

      assign(element.style, {
        width  : newWidth + 'px',
        height : newHeight + 'px'
      });

      toArray(element.querySelectorAll('img')).forEach(function (element) {
        assign(element.style, {
          width      : (width * ratio) + 'px',
          height     : (height * ratio) + 'px',
          marginLeft : (-left * ratio) + 'px',
          marginTop  : (-top * ratio) + 'px',
          transform  : getRotateValue(rotate)
        });
      });
    });
  };
