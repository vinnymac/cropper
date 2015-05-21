  prototype.load = function (url) {
    var options = this.options,
        $this = this.$element,
        crossOrigin,
        bustCacheUrl,
        buildEvent,
        $clone;

    if (!url) {
      if ($this.get(0) instanceof HTMLImageElement) {
        if (!$this.get(0).getAttribute('src')) {
          return;
        }

        url = $this.get(0).src;
      } else if ($this.get(0) instanceof HTMLCanvasElement && SUPPORT_CANVAS) {
        url = $this[0].toDataURL();
      }
    }

    if (!url) {
      return;
    }

    buildEvent = $.Event(EVENT_BUILD);
    $this.one(EVENT_BUILD, options.build).trigger(buildEvent); // Only trigger once

    if (buildEvent.isDefaultPrevented()) {
      return;
    }

    if (options.checkImageOrigin && isCrossOriginURL(url)) {
      crossOrigin = 'anonymous';

      if (!$this.get(0).crossOrigin) { // Only when there was not a "crossOrigin" property
        bustCacheUrl = addTimestamp(url); // Bust cache (#148)
      }
    }

    this.$clone = $clone = $('<img>');

    $clone.one('load', proxy(function () {
      var naturalWidth = $clone.get(0).naturalWidth || $clone.get(0).offsetWidth,
          naturalHeight = $clone.get(0).naturalHeight || $clone.get(0).offsetHeight;

      this.image = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
        rotate: 0
      };

      this.url = url;
      this.ready = true;
      this.build();
    }, this)).one('error', function () {
      remove($clone.get(0));
    });

    $clone.get(0).crossOrigin = crossOrigin || null; // "crossOrigin" must before "src" (#271)
    $clone.get(0).src         = bustCacheUrl || url;

    // Hide and insert into the document
    addClass($clone.get(0), CLASS_HIDE);
    insertAfter($this.get(0), $clone.get(0));
  };