  prototype.load = function (url) {
    var options = this.options,
        $this = this.$element,
        crossOrigin,
        bustCacheUrl,
        buildEvent,
        $clone;

    if (!url) {
      if ($this instanceof HTMLImageElement) {
        if (!$this.getAttribute('src')) {
          return;
        }

        url = $this.src;
      } else if ($this instanceof HTMLCanvasElement && SUPPORT_CANVAS) {
        url = $this.toDataURL();
      }
    }

    if (!url) {
      return;
    }

    buildEvent = $.Event(EVENT_BUILD);
    $($this).one(EVENT_BUILD, options.build).trigger(buildEvent); // Only trigger once

    if (buildEvent.isDefaultPrevented()) {
      return;
    }

    if (options.checkImageOrigin && isCrossOriginURL(url)) {
      crossOrigin = 'anonymous';

      if (!$this.crossOrigin) { // Only when there was not a "crossOrigin" property
        bustCacheUrl = addTimestamp(url); // Bust cache (#148)
      }
    }

    this.$clone = $clone = document.createElement('img');

    $($clone).one('load', proxy(function () {
      var naturalWidth = $clone.naturalWidth || $clone.offsetWidth,
          naturalHeight = $clone.naturalHeight || $clone.offsetHeight;

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
      remove($clone);
    });

    $clone.crossOrigin = crossOrigin || null; // "crossOrigin" must before "src" (#271)
    $clone.src         = bustCacheUrl || url;

    // Hide and insert into the document
    addClass($clone, CLASS_HIDE);
    insertAfter($this, $clone);
  };