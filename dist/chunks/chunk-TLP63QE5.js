// src/utils/handle-resize.ts
var handleResize = (callback, delay = 250, options) => {
  let timeoutId;
  let previousWidth = window.innerWidth;
  const resizeHandler = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (options?.widthOnly) {
        const currentWidth = window.innerWidth;
        const widthDiff = Math.abs(currentWidth - previousWidth);
        if (widthDiff >= (options.threshold || 0)) {
          callback();
          previousWidth = currentWidth;
        }
      } else {
        callback();
      }
    }, delay);
  };
  window.addEventListener("resize", resizeHandler);
  return () => {
    window.removeEventListener("resize", resizeHandler);
    clearTimeout(timeoutId);
  };
};

export {
  handleResize
};
//# sourceMappingURL=chunk-TLP63QE5.js.map
