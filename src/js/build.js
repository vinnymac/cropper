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

    this.$container = $this.parent().append($cropper);
    this.$canvas = $cropper.find('.cropper-canvas').append($clone);
    this.$dragBox = $cropper.find('.cropper-drag-box');
    this.$cropBox = $cropBox = $cropper.find('.cropper-crop-box');
    this.$viewBox = $cropper.find('.cropper-view-box');

    this.addListeners();
    this.initPreview();

    // Format aspect ratio
    options.aspectRatio = num(options.aspectRatio) || NaN; // 0 -> NaN

    if (options.autoCrop) {
      this.cropped = true;

      if (options.modal) {
        addClass(this.$dragBox.get(0), CLASS_MODAL);
      }
    } else {
      addClass($cropBox.get(0), CLASS_HIDDEN);
    }

    if (options.background) {
      addClass($cropper.get(0), CLASS_BG);
    }

    if (!options.highlight) {
      var highlight = $cropBox.find('.cropper-face');
      addClass(highlight.get(0), CLASS_INVISIBLE);
    }

    if (!options.guides) {
      var guides = $cropBox.find('.cropper-dashed');
      addClass(guides.get(0), CLASS_HIDDEN);
    }

    if (!options.movable) {
      $cropBox.find('.cropper-face').data('drag', 'move');
    }

    if (!options.resizable) {
      var resizable = $cropBox.find('.cropper-line, .cropper-point');
      addClass(resizable.get(0), CLASS_HIDDEN);
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

    this.$cropper.remove();
    this.$cropper = null;
  };
