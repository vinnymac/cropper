  prototype.build = function () {
    var $this = this.$element,
        $clone = this.$clone,
        options = this.options,
        $cropper,
        $cropBox;

    if (!this.ready) {
      return;
    }

    if (this.built) {
      this.unbuild();
    }

    // Create cropper elements
    this.$cropper = $cropper = $(Cropper.TEMPLATE);

    // Hide the original image
    addClass($this.get(0), CLASS_HIDDEN);

    // Show the clone iamge
    removeClass($clone.get(0), CLASS_HIDE);

    this.$container = $this.parent();
    this.$container.get(0).appendChild($cropper.get(0));

    this.$canvas = $cropper.get(0).querySelector('.cropper-canvas');
    this.$canvas.appendChild($clone.get(0));

    this.$dragBox = $cropper.get(0).querySelector('.cropper-drag-box');
    this.$cropBox = $cropBox = $cropper.get(0).querySelector('.cropper-crop-box');
    this.$viewBox = $cropper.get(0).querySelector('.cropper-view-box');

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
      addClass($cropper.get(0), CLASS_BG);
    }

    if (!options.highlight) {
      toArray($cropBox.querySelectorAll('.cropper-face')).forEach(function (element) {
        addClass(element, CLASS_INVISIBLE);
      });
    }

    if (!options.guides) {
      toArray($cropBox.querySelectorAll('.cropper-dashed')).forEach(function (element) {
        addClass(element, CLASS_HIDDEN);
      });
    }

    if (!options.movable) {
      toArray($cropBox.querySelectorAll('.cropper-face')).forEach(function (element) {
        element.setAttribute('data-drag', 'move');
      });
    }

    if (!options.resizable) {
      toArray($cropBox.querySelectorAll('.cropper-line, .cropper-point')).forEach(function (element) {
        addClass(element, CLASS_HIDDEN);
      });
    }

    this.setDragMode(options.dragCrop ? 'crop' : 'move');

    this.built = true;
    this.render();
    this.setData(options.data);
    $this.one(EVENT_BUILT, options.built).trigger(EVENT_BUILT); // Only trigger once
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

    remove(this.$cropper.get(0));
    this.$cropper = null;
  };
