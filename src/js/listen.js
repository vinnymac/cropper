  prototype.addListeners = function () {
    var options = this.options,
      $this     = this.$element,
      $cropper  = this.$cropper;

    if (isFunction(options.dragstart)) {
      on($this, EVENT_DRAG_START, options.dragstart);
    }

    if (isFunction(options.dragmove)) {
      on($this, EVENT_DRAG_MOVE, options.dragmove);
    }

    if (isFunction(options.dragend)) {
      on($this, EVENT_DRAG_END, options.dragend);
    }

    if (isFunction(options.zoomin)) {
      on($this, EVENT_ZOOM_IN, options.zoomin);
    }

    if (isFunction(options.zoomout)) {
      on($this, EVENT_ZOOM_OUT, options.zoomout);
    }

    if (isFunction(options.change)) {
      on($this, EVENT_CHANGE, options.change);
    }

    on($cropper, EVENT_MOUSE_DOWN, (this._dragstart = proxy(this.dragstart, this)));
    on($cropper, EVENT_TOUCH_START, this._dragstart);
    on($cropper, EVENT_POINTER_DOWN, this._dragstart);
    on($cropper, EVENT_MS_POINTER_DOWN, this._dragstart);

    if (options.zoomable && options.mouseWheelZoom) {
      on($cropper, EVENT_WHEEL, (this._wheel = proxy(this.wheel, this)));
      on($cropper, EVENT_MOUSE_WHEEL, this._wheel);
      on($cropper, EVENT_DOM_MOUSE_SCROLL, this._wheel);
    }

    if (options.doubleClickToggle) {
      on($cropper, EVENT_DBLCLICK, (this._dblclick = proxy(this.dblclick, this)));
    }

    on(document, EVENT_MOUSE_MOVE, (this._dragmove = proxy(this.dragmove, this)));
    on(document, EVENT_TOUCH_MOVE, this._dragmove);
    on(document, EVENT_POINTER_MOVE, this._dragmove);
    on(document, EVENT_MS_POINTER_MOVE, this._dragmove);

    on(document, EVENT_MOUSE_UP, (this._dragend = proxy(this.dragend, this)));
    on(document, EVENT_TOUCH_END, this._dragend);
    on(document, EVENT_TOUCH_CANCEL, this._dragend);
    on(document, EVENT_POINTER_UP, this._dragend);
    on(document, EVENT_MS_POINTER_UP, this._dragend);
    on(document, EVENT_POINTER_CANCEL, this._dragend);
    on(document, EVENT_MS_POINTER_CANCEL, this._dragend);

    if (options.responsive) {
      on(window, EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
    }
  };

  prototype.removeListeners = function () {
    var options = this.options,
      $this     = this.$element,
      $cropper  = this.$cropper;

    if (isFunction(options.dragstart)) {
      off($this, EVENT_DRAG_START, options.dragstart);
    }

    if (isFunction(options.dragmove)) {
      off($this, EVENT_DRAG_MOVE, options.dragmove);
    }

    if (isFunction(options.dragend)) {
      off($this, EVENT_DRAG_END, options.dragend);
    }

    if (isFunction(options.zoomin)) {
      off($this, EVENT_ZOOM_IN, options.zoomin);
    }

    if (isFunction(options.zoomout)) {
      off($this, EVENT_ZOOM_OUT, options.zoomout);
    }

    if (isFunction(options.change)) {
      off($this, EVENT_CHANGE, options.change);
    }

    off($cropper, EVENT_MOUSE_DOWN, this._dragstart);
    off($cropper, EVENT_TOUCH_START, this._dragstart);
    off($cropper, EVENT_POINTER_DOWN, this._dragstart);
    off($cropper, EVENT_MS_POINTER_DOWN, this._dragstart);

    if (options.zoomable && options.mouseWheelZoom) {
      off($cropper, EVENT_WHEEL, this._wheel);
      off($cropper, EVENT_MOUSE_WHEEL, this._wheel);
      off($cropper, EVENT_DOM_MOUSE_SCROLL, this._wheel);
    }

    if (options.doubleClickToggle) {
      off($cropper, EVENT_DBLCLICK, this._dblclick);
    }

    off(document, EVENT_MOUSE_MOVE, this._dragmove);
    off(document, EVENT_TOUCH_MOVE, this._dragmove);
    off(document, EVENT_POINTER_MOVE, this._dragmove);
    off(document, EVENT_MS_POINTER_MOVE, this._dragmove);

    off(document, EVENT_MOUSE_UP, this._dragend);
    off(document, EVENT_TOUCH_END, this._dragend);
    off(document, EVENT_TOUCH_CANCEL, this._dragend);
    off(document, EVENT_POINTER_UP, this._dragend);
    off(document, EVENT_MS_POINTER_UP, this._dragend);
    off(document, EVENT_POINTER_CANCEL, this._dragend);
    off(document, EVENT_MS_POINTER_CANCEL, this._dragend);

    if (options.responsive) {
      off(window, EVENT_RESIZE, this._resize);
    }
  };
