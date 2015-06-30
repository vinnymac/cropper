  prototype.build = function () {
    var $this = this.$element,
        $clone = this.$clone,
        options = this.options,
        cropperContainer,
        $cropper,
        $cropBox,
        $face;

    if (!this.ready) {
      return;
    }

    if (this.built) {
      this.unbuild();
    }

    // Create cropper elements
    cropperContainer = document.createElement('div');
    cropperContainer.innerHTML = Cropper.TEMPLATE;
    this.$cropper = $cropper = cropperContainer.firstChild;

    // Hide the original image
    addClass($this, CLASS_HIDDEN);

    // Show the clone iamge
    removeClass($clone, CLASS_HIDE);

    this.$container = $this.parentNode;
    this.$container.appendChild($cropper);

    this.$canvas = $cropper.querySelector('.cropper-canvas');
    this.$canvas.appendChild($clone);

    this.$dragBox = $cropper.querySelector('.cropper-drag-box');
    this.$cropBox = $cropBox = $cropper.querySelector('.cropper-crop-box');
    this.$viewBox = $cropper.querySelector('.cropper-view-box');
    this.$face = $face = $cropBox.querySelector('.cropper-face');

    this.addListeners();
    this.initPreview();

    // Format aspect ratio
    options.aspectRatio = num(options.aspectRatio) || NaN; // 0 -> NaN

    if (options.autoCrop) {
      this.cropped = true;

      if (options.modal) {
        addClass(this.$dragBox, CLASS_MODAL);
      }
    } else {
      addClass($cropBox, CLASS_HIDDEN);
    }

    if (options.background) {
      addClass($cropper, CLASS_BG);
    }

    if (!options.highlight) {
      addClass($face, CLASS_INVISIBLE);
    }

    if (!options.guides) {
      toArray($cropBox.querySelectorAll('.cropper-dashed')).forEach(function (element) {
        addClass(element, CLASS_HIDDEN);
      });
    }

    if (options.cropBoxMovable) {
      addClass($face, CLASS_MOVE);
      $face.setAttribute('data-drag', 'all');
    }

    if (!options.cropBoxResizable) {
      toArray($cropBox.querySelectorAll('.cropper-line, .cropper-point')).forEach(function (element) {
        addClass(element, CLASS_HIDDEN);
      });
    }

    this.setDragMode(options.dragCrop ? 'crop' : options.movable ? 'move' : 'none');

    this.built = true;
    this.render();
    this.setData(options.data);
    one($this, EVENT_BUILT, options.built);
    $this.dispatchEvent(createEvent(EVENT_BUILT)); // Only trigger once
  };

  prototype.unbuild = function () {
    if (!this.built) {
      return;
    }

    this.built = false;
    this.initialImage = null;
    this.initialCanvas = null; // This is necessary when replace
    this.initialCropBox = null;
    this.container = null;
    this.canvas = null;
    this.cropBox = null; // This is necessary when replace
    this.removeListeners();

    this.resetPreview();
    this.$preview = null;

    this.$viewBox = null;
    this.$cropBox = null;
    this.$dragBox = null;
    this.$canvas = null;
    this.$container = null;

    remove(this.$cropper);
    this.$cropper = null;
  };
