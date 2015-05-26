  assign(prototype, {
    resize: function () {
      var $container = this.$container,
          container = this.container,
          canvasData,
          cropBoxData,
          ratio;

      if (this.disabled) {
        return;
      }

      ratio = $container.offsetWidth / container.width;

      if (ratio !== 1 || $container.offsetHeight !== container.height) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();

        this.render();
        for (var k in canvasData) {
          if (canvasData.hasOwnProperty(k)) {
            canvasData[k] = canvasData[k] * ratio;
          }
        }
        this.setCanvasData(canvasData);

        for (k in cropBoxData) {
          if (cropBoxData.hasOwnProperty(k)) {
            cropBoxData[k] = cropBoxData[k] * ratio;
          }
        }
        this.setCropBoxData(cropBoxData);
      }
    },

    dblclick: function () {
      if (this.disabled) {
        return;
      }
      if (hasClass(this.$dragBox, CLASS_CROP)) {
        this.setDragMode('move');
      } else {
        this.setDragMode('crop');
      }
    },

    wheel: function (event) {
      var delta = 1;

      if (this.disabled) {
        return;
      }

      event.preventDefault();

      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * 0.1);
    },

    dragstart: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent || event,
          touches = originalEvent && originalEvent.touches,
          e = originalEvent,
          dragType,
          dragStartEvent,
          touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.startX2 = e.pageX;
            this.startY2 = e.pageY;
            dragType = 'zoom';
          } else {
            return;
          }
        }

        e = touches[0];
      }

      dragType = dragType || e.target.getAttribute('data-drag');

      if (REGEXP_DRAG_TYPES.test(dragType)) {
        originalEvent.preventDefault();

        dragStartEvent = createEvent(EVENT_DRAG_START, {
          originalEvent: originalEvent,
          dragType: dragType
        });

        this.$element.dispatchEvent(dragStartEvent);

        if (dragStartEvent.defaultPrevented) {
          return;
        }

        this.dragType = dragType;
        this.cropping = false;
        this.startX = e.pageX;
        this.startY = e.pageY;

        if (dragType === 'crop') {
          this.cropping = true;
          addClass(this.$dragBox, CLASS_MODAL);
        }
      }
    },

    dragmove: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = originalEvent,
          dragType = this.dragType,
          dragMoveEvent,
          touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.endX2 = e.pageX;
            this.endY2 = e.pageY;
          } else {
            return;
          }
        }

        e = touches[0];
      }

      if (dragType) {
        originalEvent.preventDefault();

        dragMoveEvent = createEvent(EVENT_DRAG_MOVE, {
          originalEvent: originalEvent,
          dragType: dragType
        });

        this.$element.dispatchEvent(dragMoveEvent);

        if (dragMoveEvent.defaultPrevented) {
          return;
        }

        this.endX = e.pageX;
        this.endY = e.pageY;

        this.change();
      }
    },

    dragend: function (event) {
      var dragType = this.dragType,
          dragEndEvent;

      if (this.disabled) {
        return;
      }

      if (dragType) {
        event.originalEvent.preventDefault();

        dragEndEvent = createEvent(EVENT_DRAG_END, {
          originalEvent: event.originalEvent,
          dragType: dragType
        });

        this.$element.dispatchEvent(dragEndEvent);

        if (dragEndEvent.defaultPrevented) {
          return;
        }

        if (this.cropping) {
          this.cropping = false;
          toggleClass(this.$dragBox, CLASS_MODAL, this.cropped && this.options.modal);
        }

        this.dragType = '';
      }
    }
  });
