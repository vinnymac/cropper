  var location = window.location,

      // Constants
      CROPPER_NAMESPACE = '.cropper',
      CROPPER_PREVIEW = 'preview' + CROPPER_NAMESPACE,
      CROPPER_PREVIEW_WIDTH = CROPPER_PREVIEW + '-width',
      CROPPER_PREVIEW_HEIGHT = CROPPER_PREVIEW + '-height',
      CROPPER_PREVIEW_ORIGINAL = CROPPER_PREVIEW + '-original',

      // RegExps
      REGEXP_DRAG_TYPES = /^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,

      // Classes
      CLASS_MODAL = 'cropper-modal',
      CLASS_HIDE = 'cropper-hide',
      CLASS_HIDDEN = 'cropper-hidden',
      CLASS_INVISIBLE = 'cropper-invisible',
      CLASS_MOVE = 'cropper-move',
      CLASS_CROP = 'cropper-crop',
      CLASS_DISABLED = 'cropper-disabled',
      CLASS_BG = 'cropper-bg',

      // Events
      EVENT_MOUSE_DOWN = 'mousedown',
      EVENT_TOUCH_START = 'touchstart',
      EVENT_POINTER_DOWN = 'pointerdown',
      EVENT_MS_POINTER_DOWN = 'MSPointerDown',
      EVENT_MOUSE_MOVE = 'mousemove',
      EVENT_TOUCH_MOVE = 'touchmove',
      EVENT_POINTER_MOVE = 'pointermove',
      EVENT_MS_POINTER_MOVE = 'MSPointerMove',
      EVENT_MOUSE_UP = 'mouseup',
      EVENT_TOUCH_END = 'touchend',
      EVENT_TOUCH_CANCEL = 'touchcancel',
      EVENT_POINTER_UP = 'pointerup',
      EVENT_POINTER_CANCEL = 'pointercancel',
      EVENT_MS_POINTER_UP = 'MSPointerUp',
      EVENT_MS_POINTER_CANCEL = 'MSPointerCancel',
      EVENT_WHEEL = 'wheel',
      EVENT_MOUSE_WHEEL = 'mousewheel',
      EVENT_DOM_MOUSE_SCROLL = 'DOMMouseScroll',
      EVENT_DBLCLICK = 'dblclick',
      EVENT_RESIZE = 'resize', // + CROPPER_NAMESPACE, // Bind to window with namespace
      EVENT_BUILD = 'build' + CROPPER_NAMESPACE,
      EVENT_BUILT = 'built' + CROPPER_NAMESPACE,
      EVENT_DRAG_START = 'dragstart' + CROPPER_NAMESPACE,
      EVENT_DRAG_MOVE = 'dragmove' + CROPPER_NAMESPACE,
      EVENT_DRAG_END = 'dragend' + CROPPER_NAMESPACE,
      EVENT_ZOOM_IN = 'zoomin' + CROPPER_NAMESPACE,
      EVENT_ZOOM_OUT = 'zoomout' + CROPPER_NAMESPACE,
      EVENT_CHANGE = 'change' + CROPPER_NAMESPACE,

      // Supports
      SUPPORT_CANVAS = (typeof document.createElement('canvas').getContext === 'function' || false),

      // Others
      sqrt = Math.sqrt,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      sin = Math.sin,
      cos = Math.cos,
      num = parseFloat,

      // Prototype
      prototype = {};
