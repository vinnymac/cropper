  prototype.addListeners = function () {
    var options = this.options,
      $cropper = $(this.$cropper);

    on(this.$element, EVENT_DRAG_START, options.dragstart);
    on(this.$element, EVENT_DRAG_MOVE, options.dragmove);
    on(this.$element, EVENT_DRAG_END, options.dragend);
    on(this.$element, EVENT_ZOOM_IN, options.zoomin);
    on(this.$element, EVENT_ZOOM_OUT, options.zoomout);

    $cropper.on(EVENT_MOUSE_DOWN, (this._dragstart = proxy(this.dragstart, this))).on(EVENT_DBLCLICK, (this._dblclick = proxy(this.dblclick, this)));

    if (options.zoomable && options.mouseWheelZoom) {
      $cropper.on(EVENT_WHEEL, (this._wheel = proxy(this.wheel, this)));
    }

    $document.on(EVENT_MOUSE_MOVE, (this._dragmove = proxy(this.dragmove, this))).on(EVENT_MOUSE_UP, (this._dragend = proxy(this.dragend, this)));

    if (options.responsive) {
      $window.on(EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
    }
  };

  prototype.removeListeners = function () {
    var options = this.options,
      $cropper = $(this.$cropper);

    off(this.$element, EVENT_DRAG_START, options.dragstart);
    off(this.$element, EVENT_DRAG_MOVE, options.dragmove);
    off(this.$element, EVENT_DRAG_END, options.dragend);
    off(this.$element, EVENT_ZOOM_IN, options.zoomin);
    off(this.$element, EVENT_ZOOM_OUT, options.zoomout);

    $cropper.off(EVENT_MOUSE_DOWN, this.dragstart).off(EVENT_DBLCLICK, this.dblclick);

    if (options.zoomable && options.mouseWheelZoom) {
      $cropper.off(EVENT_WHEEL, this.wheel);
    }

    $document.off(EVENT_MOUSE_MOVE, this._dragmove).off(EVENT_MOUSE_UP, this._dragend);

    if (options.responsive) {
      $window.off(EVENT_RESIZE, this._resize);
    }
  };
