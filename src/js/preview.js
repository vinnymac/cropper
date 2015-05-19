  prototype.initPreview = function () {
    var url = this.url;

    this.$preview = $(this.options.preview);
    this.$viewBox.get(0).innerHTML = '<img src="' + url + '">';

    // Override img element styles
    // Add `display:block` to avoid margin top issue (Occur only when margin-top <= -height)
    this.$preview.each(function () {
      var $this = $(this);

      $this.get(0).setAttribute(CROPPER_PREVIEW_WIDTH, $this.width());
      $this.get(0).setAttribute(CROPPER_PREVIEW_HEIGHT, $this.height());
      $this.get(0).setAttribute(CROPPER_PREVIEW_ORIGINAL, $this.get(0).innerHTML);

      $this.get(0).innerHTML = '<img src="' + url + '" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation: 0deg!important">';
    });
  };

  prototype.resetPreview = function () {
    this.$preview.each(function () {
      var $this = $(this);

      $this.get(0).innerHTML = $this.get(0).getAttribute(CROPPER_PREVIEW_ORIGINAL);
      $this.get(0).removeAttribute(CROPPER_PREVIEW_ORIGINAL);
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

    this.$viewBox.find('img').css({
      width: width,
      height: height,
      marginLeft: -left,
      marginTop: -top,
      transform: getRotateValue(rotate)
    });

    this.$preview.each(function () {
      var $this = $(this),
          data = {
            width  : parseFloat($this.get(0).getAttribute(CROPPER_PREVIEW_WIDTH)),
            height : parseFloat($this.get(0).getAttribute(CROPPER_PREVIEW_HEIGHT))
          },
          ratio = data.width / cropBox.width,
          newWidth = data.width,
          newHeight = cropBox.height * ratio;

      if (newHeight > data.height) {
        ratio = data.height / cropBox.height;
        newWidth = cropBox.width * ratio;
        newHeight = data.height;
      }

      $this.width(newWidth).height(newHeight).find('img').css({
        width: width * ratio,
        height: height * ratio,
        marginLeft: -left * ratio,
        marginTop: -top * ratio,
        transform: getRotateValue(rotate)
      });
    });
  };
